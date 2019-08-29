import React from 'react'
import './App.css'
import {
  geoAlbers,
  geoCentroid,
  geoPath
} from 'd3-geo'


import {
  H5,
  Card,
  Elevation,
} from "@blueprintjs/core";



class PostcodeInfo extends React.Component {
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


    var postcode_path;
    var postcode_name;
    var postcode_data;
    if (this.props.uk_geojson && this.props.postcode_data.has_data()) {

      postcode_data = this.props.postcode_data.get_data(this.props.postcode_index);
      // generate postcode paths
      const postcode_geo = this.props.uk_geojson.features[this.props
        .postcode_index];
      postcode_name = postcode_geo.id;

      var center = geoCentroid(postcode_geo);
      // Compute the angular distance between bound corners

      const projection = geoAlbers()
        .center(center)
        .rotate([4.4, 0])
        .fitExtent([
          [0.2 * this.state.width, 0.2 * this.state.height],
          [0.8 * this.state.width, 0.8 * this.state.height]
        ], postcode_geo);

      const pathGenerator = geoPath().projection(projection);


      postcode_path = <path
        key = {'path' + this.props.postcode_index}
        d = {pathGenerator(postcode_geo)}
        stroke={ 'rgba(0,0,0,0.5)' }
        fill={"blue"}
        fillOpacity="0.2"
        className = 'postcodes'
      />;
    }

    return (
      <div className='PostcodeInfo'>
      <Card className='PostcodeInfoCard' interactive={false} elevation={Elevation.ZERO}>
          <H5>{postcode_name}</H5>
          <H5>{postcode_data}</H5>
          <svg 
            ref={element => this.svg_ref = element}
            width={"100%"} 
            height={"100%"}>
            {postcode_path}
           </svg>
      </Card>
      </div>
    );
  }
}
export default PostcodeInfo
