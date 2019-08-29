import React from 'react';
import axios from 'axios';
import './App.css';
import UkMap from './UkMap.js';
import UserInterface from './UserInterface.js';
import PostcodeInfo from './PostcodeInfo.js';
import Data from './Data.js';

import {
  json
} from 'd3-fetch'

import {
  feature
} from "topojson-client"


//axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.baseURL = 'https://fastsmc-app-backend.azurewebsites.net'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        uk_geojson: null,
        backend_api: null,
        backend_postcode_indices: null,
        postcode_data: null,
        selected_postcode_index: 30,
        mouseover_postcode_index: 30,
        height: 100,
        display_data_index: 0,
        display_data_options: null,
        display_pop_index: 0,
        display_pop_options: null,
        display_timespan: 10,
      };

      var uk_topojson = json("uk-postcode-area.json");
      var backend_api = this.get_postcode_api();
      Promise.all([uk_topojson, backend_api]).then((values) => {
        const uk_topojson = values[0];
        const backend_api = values[1].data.postcodes;
        const display_pop_options = Object.keys(backend_api[0].data);
        const pop = display_pop_options[this.state.display_pop_index];
        const display_data_options = Object.keys(backend_api[0].data[pop]);
        const backend_thresholds = values[1].data.thresholds;
        const names_json = uk_topojson.objects['uk-postcode-area'].geometries.map(
          i => i.id);
        const names_bknd = backend_api.map(i => i.name);
        const indicies = this.calculate_index_mapping(names_json, names_bknd);

        this.setState({
          uk_geojson: feature(uk_topojson, uk_topojson.objects[
            'uk-postcode-area']),
          postcode_names: names_json,
          backend_api: backend_api,
          display_data_options: display_data_options,
          display_pop_options: display_pop_options,
          postcode_data: new Data(indicies, backend_thresholds),
        });
      }).then(() => {
        this.get_postcode_data(this.state.display_data_index, this.state
          .selected_postcode_index, this.state.display_pop_index);
      });
    }

    calculate_index_mapping(names1, names2) {
      var indices = new Array(names1.length);
      for (var i = 0; i < indices.length; i++) {
        var j = 0;
        while (j < names2.length && names2[j] !== names1[i]) {
          j++;
        }
        if (j === names2.length) {
          indices[i] = -1;
        } else {
          indices[i] = j;
        }
      }
      return indices;
    }

    updateDimensions = () => {
      this.setState({
        height: this.div_ref.clientHeight
      });
    };

    componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
        if (this.state.postcode_data) {
          this.state.postcode_data.set_threshold(this.state.display_timespan);
        }

        return (
            <div className="App" ref={element => this.div_ref = element}>
      <UkMap 
        className="UkMap" 
        ref={element => this.map_ref = element}
        height = {this.state.height}
        uk_geojson = {this.state.uk_geojson}
        postcode_data= {this.state.postcode_data}
        mouseover_postcode = {this.mouseover_postcode}
        selected_postcode = {this.state.selected_postcode_index}
        select_postcode = {this.select_postcode }
        highlight_postcode = {this.state.mouseover_postcode_index}
      />
      <div className="RHS">
        {this.state.postcode_data &&
        <UserInterface 
            className="UserInterface" 
            display_data_options = {this.state.display_data_options}
            display_data_index = {this.state.display_data_index}
            display_data_callback = {this.display_data_callback}
            display_pop_options = {this.state.display_pop_options}
            display_pop_index = {this.state.display_pop_index}
            display_pop_callback = {this.display_pop_callback}
            postcode_data = {this.state.postcode_data}
            display_timespan = {this.state.display_timespan}
            display_timespan_callback = {this.display_timespan_callback}
        />
        }
        {this.state.postcode_data &&
        <PostcodeInfo
            className="test" 
            postcode_index = {this.state.mouseover_postcode_index}
            uk_geojson = {this.state.uk_geojson}
            postcode_names = {this.state.postcode_names}
            postcode_data = {this.state.postcode_data}
        />
        }
        <div className="DetailedView">
        </div>
      </div> <
      /div>
    );
  }

  get_postcode_api() {
    const url = '/fastsmc/api/postcode';
    return axios.get(url);
  }



  get_postcode_data(display_data_index, selected_postcode_index, display_pop_index) {
    const display_data = this.state.display_data_options[display_data_index];
    const display_pop = this.state.display_pop_options[display_pop_index];
    const backend_index = this.state.postcode_data.get_backend_index(selected_postcode_index);
    const url = this.state.backend_api[backend_index].data[display_pop][display_data];
    axios.get(url,{
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/octet-stream'
      }
      }).then((response) => {
        // handle success
        const bytes = response.data;
        const floats_tmp = new Float32Array(bytes);
        // get rid of nans
        const floats = floats_tmp.map((i) => i || 0);

        this.setState(prevState => {
            prevState.postcode_data.set_data(floats);
           return {postcode_data: prevState.postcode_data}
        });
      })
      .catch(function(error) {
        console.log('Error getting postcode_data: ' + error);
      });
  }

  select_postcode = (postcode_index) => {
    this.setState({
      selected_postcode_index: postcode_index 
    });
    this.get_postcode_data(this.state.display_data_index, postcode_index, this.state.display_pop_index);
  };

  mouseover_postcode = (postcode_index) => {
    this.setState({
      mouseover_postcode_index: postcode_index 
    });
  };

  display_data_callback = (event) => {
    const value = event.currentTarget.selectedIndex;
    this.setState({
      display_data_index: value
    });
    this.get_postcode_data(value, this.state.selected_postcode_index, this.state.display_pop_index);
  };

  display_pop_callback = (event) => {
    const value = event.currentTarget.selectedIndex;
    this.setState({
      display_pop_index: value
    });
    this.get_postcode_data(this.state.display_data_index, this.state.selected_postcode_index, value);
  };


  display_timespan_callback = (value) => {
    this.setState({
      display_timespan: value,
    });
  };

}

export default App;
