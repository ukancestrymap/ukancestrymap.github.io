import React from 'react';
import axios from 'axios';
import {
  withRouter
} from 'react-router-dom';
import queryString from 'query-string';
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


axios.defaults.baseURL = 'http://localhost:5000'
//axios.defaults.baseURL = 'https://fastsmc-app-backend.azurewebsites.net'

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
        color_range: [0, 1],
        color_range_mode: 1,
        threshold_scale: 30,
      };

      if (this.props.location.search) {
        const loaded_parameters = queryString.parse(this.props.location.search);
        console.log(loaded_parameters);
        const parseParamInt = (param, def) => {
          if (!param) {
            return def;
          }
          return parseInt(param);
        }
        const parseParamArray = (param, def) => {
          if (!param) {
            return def;
          }
          return param.map(parseFloat);
        }
        this.state.selected_postcode_index = parseParamInt(
          loaded_parameters.selected_postcode_index,
          this.state.selected_postcode_index);
        this.state.display_data_index = parseParamInt(loaded_parameters
          .display_data_index,
          this.state.display_data_index);
        this.state.display_pop_index = parseParamInt(loaded_parameters
          .display_pop_index,
          this.state.display_pop_index);
        this.state.display_timespan = parseParamInt(loaded_parameters
          .display_timespan,
          this.state.display_timespan);
        this.state.color_range = parseParamArray(loaded_parameters.color_range,
          this.state.color_range);
        this.state.color_range_mode = parseParamInt(loaded_parameters
          .color_range_mode,
          this.state.color_range_mode);
      }

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
        //console.log(`params are ${this.props.location}`);
        //console.log(this.props.location);
        //console.log(window.location.href);
        //let parameters_string = ""
        //if (this.props.location.search) {
        //  parameters_string = this.props.location
        //}
        console.log(`fixed = ${this.state.color_range_mode}`);
        const saved_parameters = {
          selected_postcode_index: this.state.selected_postcode_index,
          display_data_index: this.state.display_data_index,
          display_pop_index: this.state.display_pop_index,
          display_timespan: this.state.display_timespan,
          color_range: this.state.color_range,
          color_range_mode: this.state.color_range_mode,
        };

        const parameters_string = [
          window.location.protocol,
          '//',
          window.location.host,
          window.location.pathname,
          '?',
          queryString.stringify(saved_parameters),
        ].join('');

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
        color_range = {this.state.color_range}
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
            color_range_callback = {this.color_range_callback}
            color_range = {this.state.color_range}
            select_postcode = {this.select_postcode_name}
            postcode_names = {this.state.postcode_names}
            selected_postcode = {this.state.selected_postcode_index}
            threshold_scale = {this.state.threshold_scale}
            parameters_string = {parameters_string}
            color_range_mode = {this.state.color_range_mode}
            color_range_mode_callback = {this.color_range_mode_callback}
        />
        }
        {this.state.postcode_data &&
        <PostcodeInfo
            selected_postcode = {this.state.selected_postcode_index}
            postcode_index = {this.state.mouseover_postcode_index}
            uk_geojson = {this.state.uk_geojson}
            postcode_names = {this.state.postcode_names}
            postcode_data = {this.state.postcode_data}
            display_data_options = {this.state.display_data_options}
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
            prevState.postcode_data.set_threshold(prevState.display_timespan);
            let color_range = this.set_color_range(prevState.color_range_mode,
                                                   prevState.color_range,
                                                   prevState.postcode_data);
            return {
             postcode_data: prevState.postcode_data,
             color_range: color_range,
           }
        });
      })
      .catch(function(error) {
        console.log('Error getting postcode_data: ' + error);
      });
  }

  select_postcode_name = (postcode_name) => {
    const postcode_index = this.state.postcode_names.findIndex(x => x===postcode_name) 
    if (postcode_index > -1) {
      this.setState({
        selected_postcode_index: postcode_index 
      });
      this.get_postcode_data(this.state.display_data_index, postcode_index, this.state.display_pop_index);
    } 
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
    const threshold = value/this.state.threshold_scale;
    this.setState(prevState => {
        prevState.postcode_data.set_threshold(threshold);
        let color_range = this.set_color_range(prevState.color_range_mode,
                                               prevState.color_range,
                                               prevState.postcode_data);
        return {
         display_timespan: threshold,
         color_range: color_range,
       }
    });
  };

  color_range_callback = (range) => {
    this.setState({
      color_range: range,
    });
  };

  set_color_range = (mode, prev_color_range, data) => {
    let color_range = prev_color_range;
    console.log(`min = ${data.min()}, second_max = ${data.second_max()}`);
    if (mode === 0) {
      color_range = [data.min(), 
                     data.second_max()];
    } else if (mode === 1) {
      color_range = [
                  data.sorted_data[Math.round(data.sorted_data.length*0.05)].mean, 
                  data.sorted_data[Math.round(data.sorted_data.length*0.95)].mean, 
      ];
    }
    return color_range;
  };

  color_range_mode_callback = (event) => {
    const value = event.currentTarget.selectedIndex;
    this.setState(prevState => {
            let color_range = this.set_color_range(value,
                                                   prevState.color_range,
                                                   prevState.postcode_data);
            return {
             color_range_mode: value,
             color_range: color_range,
           }
        });
  };


}

export default withRouter(App);
