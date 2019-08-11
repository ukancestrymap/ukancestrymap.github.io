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
              options={this.props.data_options} 
              onChange={this.props.data_callback}
              value={this.props.data}
          />
          <Slider
              min={this.props.ancestory_min}
              max={this.props.ancestory_max}
              stepSize={this.props.ancestory_step}
              labelStepSize={this.props.ancestory_step}
              onChange={this.props.ancestory_callback}
              value={this.props.ancestory}
          />
      </Card>
    )
  }
}
export default UserInterface
