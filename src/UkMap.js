import React from 'react'
import './App.css'
import {
  geoAlbers,
  geoPath
} from 'd3-geo'



class UkMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100
    };
  }
  componentDidMount() {
    //Access the child component function from here
    this.setState({
      width: this.svg_ref.clientWidth
    });
  }
  render() {


    const projection = geoAlbers()
      .center([5, 54.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(5 * this.props.height)
      .translate([this.state.width / 2, this.props.height / 2]);
    const pathGenerator = geoPath()
      .projection(projection);
    var postcodes;
    if (this.props.uk_geojson && this.props.selected_postcode_data) {
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
      postcodes = this.props.uk_geojson.features.map((d, i) => {
        const backend_index = this.props.backend_postcode_indices[i];
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
        fill={ `rgba(38,50,56,${color})` }
        className = 'postcodes'
      />;
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
