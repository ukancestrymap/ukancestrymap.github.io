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

    var postcodes;
    if (this.props.uk_geojson && this.props.postcode_data.has_data()) {

      // color scale
      const myColor = scaleLinear().domain(
        [this.props.color_range[0],
          this.props.color_range[1]
        ]).range(["white", "blue"]);

      const projection = geoAlbers()
        .center([5, 54.4])
        .rotate([4.4, 0])
        .parallels([50, 60])
        .fitExtent([
          [0, 0],
          [0.9 * this.state.width, 0.9 * this.state.height]
        ], this.props.uk_geojson);

      const pathGenerator = geoPath()
        .projection(projection);

      // generate postcode paths
      postcodes = this.props.uk_geojson.features.map((d, i) => {
        const color = this.props.postcode_data.get_data(i);
        const stroke_width =
          i === this.props.highlight_postcode ||
          i === this.props.selected_postcode ? 2.5 : 1;
        const stroke_color = 
          i === this.props.highlight_postcode ||
          i === this.props.selected_postcode ? 'red' : 'rgba(0,0,0,0.5)';
        if (!isNaN(color)) {
          return <path
                  key = {'path' + i}
                  d = {pathGenerator(d)}
                  fill={ myColor(color) }
                  onClick={ (event) => {this.props.select_postcode(i);} }
                  onMouseOver={ (event) => {this.props.mouseover_postcode(i);} }
                  stroke={stroke_color}
                  strokeWidth={stroke_width}
                  className = 'postcodes'
                 />;
        } else {
          return <path/>;
        }

      });
    }

    return (
      <svg 
            ref={element => this.svg_ref = element}
            className='UkMap' 
            width={"100%"} 
            height={"100%"}>
            {postcodes}
           </svg>
    );
  }
}
export default UkMap
