import React from 'react'
import './App.css'
import { Card, Elevation, Slider, HTMLSelect, H5 } from "@blueprintjs/core";

class UserInterface extends React.Component {
  render() {
    const thresholds_min = this.props.postcode_data.thresholds[0];
    const thresholds_length = this.props.postcode_data.thresholds.length;
    const thresholds_max = this.props.postcode_data.thresholds[thresholds_length-1];
    const thresholds_step = this.props.postcode_data.thresholds[1]-thresholds_min;
    return (
      <Card interactive={false} elevation={Elevation.TWO}>
          <H5>To Display</H5>
          <HTMLSelect 
              fill={true}
              options={this.props.display_pop_options} 
              onChange={this.props.display_pop_callback}
          />
          <HTMLSelect 
              fill={true}
              options={this.props.display_data_options} 
              onChange={this.props.display_data_callback}
          />
          <Slider
              min={thresholds_min}
              max={thresholds_max}
              stepSize={1}
              labelStepSize={thresholds_step}
              onChange={this.props.display_timespan_callback}
              value={this.props.display_timespan}
          />
      </Card>
    )
  }
}
export default UserInterface
