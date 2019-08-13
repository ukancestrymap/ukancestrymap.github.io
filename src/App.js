import React from 'react';
import axios from 'axios';
import './App.css';
import UkMap from './UkMap.js';
import UserInterface from './UserInterface.js';

import {
  json
} from 'd3-fetch'

import {
  feature
} from "topojson-client"


axios.defaults.baseURL = 'http://localhost:5000'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        uk_geojson: null,
        backend_thresholds: null,
        backend_api: null,
        backend_postcode_indices: null,
        selected_postcode_data: null,
        postcode_data_stride: 0,
        selected_postcode_index: 30,
        height: 100,
        display_data_index: 0,
        display_data_options: null,
        display_pop_index: 0,
        display_pop_options: null,
        display_timespan: 10,
      };

      var uk_topojson = json("/uk-postcode-area.json");
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
          backend_api: backend_api,
          display_data_options: display_data_options,
          display_pop_options: display_pop_options,
          backend_postcode_indices: indicies,
          postcode_data_stride: backend_thresholds.length,
          backend_thresholds: backend_thresholds
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

        return (
            <div className="App" ref={element => this.div_ref = element}>
      <UkMap 
        className="UkMap" 
        ref={element => this.map_ref = element}
        height = {this.state.height}
        display_timespan = {this.state.display_timespan}
        backend_thresholds = {this.state.backend_thresholds}
        uk_geojson = {this.state.uk_geojson}
        backend_postcode_indices= {this.state.backend_postcode_indices}
        selected_postcode_data= {this.state.selected_postcode_data}
        select_postcode = {this.select_postcode }
        postcode_data_min= {this.state.postcode_data_min}
        postcode_data_max= {this.state.postcode_data_max}
        postcode_data_stride = {this.state.postcode_data_stride}
      />
      <div className="RHS">
        {this.state.backend_thresholds &&
        <UserInterface 
            className="UserInterface" 
            display_data_options = {this.state.display_data_options}
            display_data_index = {this.state.display_data_index}
            display_data_callback = {this.display_data_callback}
            display_pop_options = {this.state.display_pop_options}
            display_pop_index = {this.state.display_pop_index}
            display_pop_callback = {this.display_pop_callback}
            display_timespan = {this.state.display_timespan}
            display_timespan_min = {this.state.backend_thresholds[0]}
            display_timespan_max = {this.state.backend_thresholds[this.state.backend_thresholds.length-1]}
            display_timespan_step = {this.state.backend_thresholds[1]-this.state.backend_thresholds[0]}
            display_timespan_callback = {this.display_timespan_callback}
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
    const url = this.state.backend_api[selected_postcode_index].data[display_pop][display_data];
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

        const min = Math.min(...floats);
        const max = Math.max(...floats);

        this.setState({
          selected_postcode_data: floats,
          postcode_data_min: min,
          postcode_data_max: max 
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
