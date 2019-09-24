import React from 'react'
import './App.css'
import postcode_info from './postcode_info.js'
import {
  geoAlbers,
  geoCentroid,
  geoPath
} from 'd3-geo'


import {
  H6,
  Card,
  Elevation,
} from "@blueprintjs/core";


class TopHistogram extends React.Component {

  render() {

    var first_n = [];
    const minHeap = new Heap((a, b) => b[0] - a[0]);
    for (i = 0; i < this.props.top_n; ++i) {
      first_n[i] = [this.props.postcode_data.get_data(i), i];
    }
    minHeap.init(first_n)
    for (i = this.props.top_n; i < this.props.postcode_data.length(); ++i) {
      minHeap.push([i, this.props.postcode_data.get_data(i)]);
      minHeap.pop();
    }



  }
}



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

    let to_postcode_path;
    let to_postcode_name;
    let to_postcode_name_long;
    let to_postcode_samples;
    let postcode_data;

    let from_postcode_name;
    let from_postcode_name_long;
    let from_postcode_samples;
    if (this.props.uk_geojson && this.props.postcode_data.has_data()) {

      postcode_data = this.props.postcode_data.get_data(this.props.postcode_index);
      // generate postcode paths
      const postcode_geo = this.props.uk_geojson.features[this.props
        .postcode_index];
      to_postcode_name = postcode_geo.id;
      const to_postcode_info = postcode_info[to_postcode_name]
      to_postcode_name_long = to_postcode_info.name;
      to_postcode_samples = to_postcode_info.samples[this.props.display_data_options]

      from_postcode_name = this.props.postcode_names[this.props.selected_postcode]
      const from_postcode_info = postcode_info[from_postcode_name]
      from_postcode_name_long = from_postcode_info.name;
      from_postcode_samples = from_postcode_info.samples[this.props.display_data_options]

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


      to_postcode_path = <path
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
          <H6>({from_postcode_name} - {from_postcode_name_long})</H6>
          <H6>->({to_postcode_name} -   {to_postcode_name_long})</H6>
          <H6>{postcode_data}</H6>
          <TopHistogram 
            data={this.props.postcode_data}
          />
          <svg 
            ref={element => this.svg_ref = element}
            width={"100%"} 
            height={"100%"}>
            {to_postcode_path}
           </svg>
      </Card>
      </div>
    );
  }
}
export default PostcodeInfo
