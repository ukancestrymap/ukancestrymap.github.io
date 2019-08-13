import React from 'react'
import './App.css'
import {
  geoAlbers,
  geoPath
} from 'd3-geo'

import {
  scaleLinear
} from 'd3-scale'



class UkMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 100
    };
  }

  updateDimensions = () => {
    this.setState({
      height: this.svg_ref.clientHeight,
      width: this.svg_ref.clientWidth
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

    const projection = geoAlbers()
      .center([5, 54.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(5 * this.state.height)
      .translate([3 * this.state.width / 4, this.state.height / 2]);
    const pathGenerator = geoPath()
      .projection(projection);
    var postcodes;
    if (this.props.uk_geojson && this.props.selected_postcode_data) {


      // color scale
      const myColor = scaleLinear().domain([this.props.postcode_data_min, this.props
        .postcode_data_max
      ]).range(["white",
        "blue"
      ]);

      // find timespan indices
      var upper_index = this.props.backend_thresholds.findIndex((i) => i > this
        .props
        .display_timespan);
      if (upper_index === -1) {
        upper_index = this.props.backend_thresholds.length - 1;
      }
      var lower_weight;
      if (upper_index === 0) {
        lower_weight = 0;
      } else {
        lower_weight = (this.props.backend_thresholds[upper_index] - this.props
          .display_timespan) / (this.props.backend_thresholds[
          upper_index] - this.props.backend_thresholds[
          upper_index - 1]);
      }
      const upper_weight = 1 - lower_weight;

      // generate postcode paths
      postcodes = this.props.uk_geojson.features.map((d, i) => {
        const backend_index = this.props.backend_postcode_indices[i];
        if (backend_index >= 0) {
        const postcode_row_index = this.props.postcode_data_stride *
          backend_index;
        const upper_color = this.props.selected_postcode_data[
          postcode_row_index + upper_index];
        var color;
        if (lower_weight > 0) {
          const lower_color = this.props.selected_postcode_data[
            postcode_row_index + upper_index - 1];
          color = upper_color * upper_weight + lower_color * lower_weight;
        } else {
          color = upper_color;
        }
        return <path
        key = {'path' + i}
        d = {pathGenerator(d)}
        fill={ myColor(color) }
        onClick={ (event) => {this.props.select_postcode(backend_index);} }
        stroke={ 'rgba(0,0,0,0.5)' }
        className = 'postcodes'
      />;
        } else {
          return <path/>;
        }

      });
    }

    return <svg 
            ref={element => this.svg_ref = element}
            className='UkMap' 
            width={"100%"} 
            height={"100%"}>
            {postcodes}
           </svg>
  }
}
export default UkMap
