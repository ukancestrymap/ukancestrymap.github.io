import React from 'react'
import './App.css'
import {
  geoAlbers,
  geoPath
} from 'd3-geo'

import {
  json
} from 'd3-fetch'

import {
  feature
} from "topojson-client"

class UkMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uk_geojson: null,
      width: 100,
      height: 100
    };
    json("/uk-postcode-area.json").then((data) => {
      this.setState({
        uk_geojson: feature(data, data.objects['uk-postcode-area'])
      });
    }).catch(err => {
      console.log('error reading uk postcode data ' + err);
    });

    this.svg = React.createRef();
  }
  updateDimensions = () => {
    this.setState({
      width: this.svg.current.clientWidth,
      height: this.svg.current.clientHeight
    });
  };
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    const width = this.state.width;
    const height = this.state.height;
    const projection = geoAlbers()
      .center([5, 54.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(5 * height)
      .translate([width / 2, height / 2]);
    const pathGenerator = geoPath()
      .projection(projection);
    var postcodes;
    if (this.state.uk_geojson) {
      postcodes = this.state.uk_geojson.features.map((d, i) => {
        return <path
        key = {'path' + i}
        d = {pathGenerator(d)}
        fill={ `rgba(38,50,56,${1 / this.state.uk_geojson.features.length * i})` }
        className = 'postcodes'
      />;
      });
    }

    return <svg ref={this.svg} className='UkMap' width={"100%"} height={"100%"}>
   {postcodes}
   </svg>
  }
}
export default UkMap
