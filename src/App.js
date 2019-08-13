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
const display_data_options = ["ibd_segments", "genome_fraction"];

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        uk_geojson: null,
        backend_api: null,
        backend_postcode_indices: null,
        selected_postcode_data: null,
        selected_postcode_index: 0,
        height: 100,
        display_data_index: 0,
        display_timespan: 10
      };

      var uk_topojson = json("/uk-postcode-area.json");
      var backend_api = this.get_postcode_api();
      Promise.all([uk_topojson, backend_api]).then((values) => {
        const uk_topojson = values[0];
        const backend_api = values[1].data.postcodes;
        const names_json = uk_topojson.objects['uk-postcode-area'].geometries.map(
          i => i.id);
        const names_bknd = backend_api.map(i => i.name);
        const indicies = this.calculate_index_mapping(names_json, names_bknd);

        this.setState({
          uk_geojson: feature(uk_topojson, uk_topojson.objects[
            'uk-postcode-area']),
          backend_api: backend_api,
          backend_postcode_indices: indicies
        });
      }).then(() => {
        this.get_postcode_data(this.state.display_data_index, this.state.selected_postcode_index);
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
        display_data_name = {display_data_options[this.state.data_index]}
        display_timespan = {this.state.ancestory}
        uk_geojson = {this.state.uk_geojson}
        backend_postcode_indices= {this.state.backend_postcode_indices}
        selected_postcode_data= {this.state.selected_postcode_data}
      />
      <div className="RHS">
        <UserInterface 
            className="UserInterface" 
            display_data_options = {display_data_options}
            display_data_name = {display_data_options[this.state.display_data_index]}
            display_timespan = {this.state.display_timespan}
            ancestory_min = {10}
            ancestory_max = {50}
            ancestory_step = {10}
            display_data_callback = {this.display_data_callback}
            display_timespan_callback = {this.display_timespan_callback}
        />
        <div className="DetailedView">
        </div>
      </div> <
      /div>
    );
  }

  get_postcode_api() {
    const url = '/fastsmc/api/postcode';
    console.log('getting api at ' + url);
    return axios.get(url);
  }

  get_postcode_data(display_data_index, selected_postcode_index) {
    const display_data = display_data_options[display_data_index];
    const url = this.state.backend_api[selected_postcode_index]['all'][display_data];
    axios.get(url,{
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/octet-stream'
      }
      }).then((response) => {
        // handle success
        const bytes = response.data;
        const floats = new Float32Array(bytes);
        this.setState({
          selected_postcode_data: floats 
        });
      })
      .catch(function(error) {
        console.log('Error getting postcode_data: ' + error);
      });
  }

  display_data_callback = (event) => {
    const value = event.currentTarget.selectedIndex;
    this.setState({
      display_data_index: value
    });
    this.get_postcode_data(value, this.state.selected_postcode_index);
  };

  display_timespan_callback = (value) => {
    this.setState({
      display_timespan: value
    });
  };

}

export default App;
