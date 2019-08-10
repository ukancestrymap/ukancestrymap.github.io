import React from 'react'
import './App.css'
import {
  geoAlbers,
  geoPath
} from 'd3-geo'

import {
  json
} from 'd3-fetch'

import { feature } from "topojson-client"

class UkMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uk_geojson: null
    };
    json("/uk-postcode-area.json").then((data) => {
      this.setState({
        uk_geojson: feature(data, data.objects['uk-postcode-area'])
      });
    }).catch(err => {
      console.log('error reading uk postcode data ' + err);
    });
  }
  render() {
    const width = 500;
    const height = 800;
    const projection = geoAlbers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(1200 * 3)
      .translate([width / 2, height / 2]);
    const pathGenerator = geoPath()
      .projection(projection);
    var postcodes;
    if (this.state.uk_geojson) {
      postcodes = this.state.uk_geojson.features.map((d, i) => {
        return <path
        key = {'path' + i}
        d = {pathGenerator(d)}
        className = 'postcodes'
      />;
      });
    }

    return <svg width={width} height={height}>
   {postcodes}
   </svg>
  }
}
export default UkMap
