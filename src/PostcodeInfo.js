import React from 'react'
import './App.css'
import postcode_info from './postcode_info.js'

import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalRectSeries,
} from 'react-vis';
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

    let data = [];
    for (let i = 0; i < this.props.data.length(); ++i) {
      data.push({data: this.props.data.get_data(i), name: this.props.names[i]});
    }
    data.sort((a, b) => b.data.mean - a.data.mean);
    const remove_top_n = 1;
    const first_n = data.slice(remove_top_n,this.props.top_n)

    let bar_chart_data_range = first_n.map(
      function(d, i) {
        return {
          x0: i-0.42,
          x: i+0.42,
          y0: d.data.lower_95,
          y: d.data.upper_95,
        };
      }
    );

    let bar_chart_data = first_n.map(
      function(d, i) {
        return {
          x: i,
          y: d.data.mean,
        };
      }
    );

    return (
      <XYPlot 
        height={200} 
        width={this.props.width} 
        margin={{left: 50}}
      >
      <VerticalBarSeries 
        data={bar_chart_data} 
        color={'blue'}
        opacity={0.5}
      />
      <VerticalRectSeries 
        data={bar_chart_data_range} 
        color={'blue'}
      />

      <XAxis 
        tickValues={[...Array(this.props.top_n-remove_top_n).keys()]} 
        tickFormat={(v) => data[v+remove_top_n].name}
      />
      <YAxis
        //tickFormat={(v) => v.toFixed(2)}
      />
      </XYPlot>
    )
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
      height: this.div_ref.clientHeight,
      width: this.div_ref.clientWidth
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
    let postcode_data = {lower_95: 0.0, mean: 0.0, upper_95: 0.0};

    let from_postcode_data = postcode_data;
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
      to_postcode_samples = to_postcode_info.samples[this.props
        .display_data_options]

      from_postcode_data = this.props.postcode_data.get_data(this.props.selected_postcode);
      from_postcode_name = this.props.postcode_names[this.props.selected_postcode]
      const from_postcode_info = postcode_info[from_postcode_name]
      from_postcode_name_long = from_postcode_info.name;
      from_postcode_samples = from_postcode_info.samples[this.props
        .display_data_options]

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

    const show_hover_postcode = false;

    let from_postcode_colored = (<span style={{color: "red"}}>{from_postcode_name}</span>)
    let to_postcode_colored = (<span style={{color: "green"}}>{to_postcode_name}</span>)

    return (
      <div 
        className='PostcodeInfo'
        ref={element => this.div_ref = element}
      >
      <Card className='PostcodeInfoCard' interactive={false} elevation={Elevation.ZERO}>
          <H6>{from_postcode_colored} - {from_postcode_name_long}</H6> 
          <H6>Top 10 postcodes</H6>
          {this.props.postcode_data.has_data() &&
          <TopHistogram 
            data={this.props.postcode_data}
            names={this.props.postcode_names}
            width={0.9*this.state.width}
            top_n={10}
          />
          }
          <H6>Between {from_postcode_colored} and {from_postcode_colored}: 
              [{from_postcode_data.lower_95.toPrecision(2)}, {from_postcode_data.mean.toPrecision(2)}, {from_postcode_data.upper_95.toPrecision(2)}]</H6>
          <H6>Between {from_postcode_colored} and {to_postcode_colored}: 
              [{postcode_data.lower_95.toPrecision(2)}, {postcode_data.mean.toPrecision(2)}, {postcode_data.upper_95.toPrecision(2)}]</H6>
          {show_hover_postcode &&
          <svg 
            ref={element => this.svg_ref = element}
            width={"100%"} 
            height={"40%"}>
            {to_postcode_path}
           </svg>
          }
      </Card>
      </div>
    );
  }
}
export default PostcodeInfo
