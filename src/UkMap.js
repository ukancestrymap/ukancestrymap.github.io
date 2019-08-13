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
    if (this.state.uk_geojson) {
      postcodes = this.props.uk_geojson.features.map((d, i) => {
        const backend_index = this.props.backend_indices[i];
        const color = this.props.selected_postcode_data[backend_index];
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
