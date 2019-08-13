import React from 'react'
import './App.css'
import { Card, Elevation, Slider, HTMLSelect, H5 } from "@blueprintjs/core";

class UserInterface extends React.Component {
  render() {
    return (
      <Card interactive={true} elevation={Elevation.TWO}>
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
              min={this.props.display_timespan_min}
              max={this.props.display_timespan_max}
              stepSize={1}
              labelStepSize={this.props.display_timespan_step}
              onChange={this.props.display_timespan_callback}
              value={this.props.display_timespan}
          />
      </Card>
    )
  }
}
export default UserInterface
