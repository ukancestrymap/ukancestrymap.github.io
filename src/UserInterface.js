import React from 'react'
import './App.css'
import {
  FormGroup,
  RangeSlider,
  Card,
  Elevation,
  Slider,
  HTMLSelect,
  H5
} from "@blueprintjs/core";

class UserInterface extends React.Component {
  render() {
    const thresholds_min = this.props.postcode_data.thresholds[0];
    const thresholds_length = this.props.postcode_data.thresholds.length;
    const thresholds_max = this.props.postcode_data.thresholds[thresholds_length -
      1];
    const thresholds_step = this.props.postcode_data.thresholds[1] - thresholds_min;
    const data_min = this.props.postcode_data.min();
    const data_max = this.props.postcode_data.max();
    const data_step = (data_max - data_min) / 4.0;
    let data_range = this.props.color_range
    if (data_range[0] < data_min) {
      data_range[0] = data_min;
    }
    if (data_range[1] > data_max) {
      data_range[1] = data_max;
    }
    return (
      <Card interactive={false} elevation={Elevation.TWO}>
          <H5>Display Options</H5>
          <FormGroup
            helperText="some more info here..."
            label="Dataset"
            labelFor="dataset-input"
            inline={true}
          >
          <HTMLSelect 
              id="dataset-input"
              fill={true}
              options={this.props.display_pop_options} 
              onChange={this.props.display_pop_callback}
          />
          </FormGroup>
          <FormGroup
            helperText="some more info here..."
            label="Datatype"
            labelFor="datatype-input"
            inline={true}
          >
          <HTMLSelect 
              id="datatype-input"
              fill={true}
              options={this.props.display_data_options} 
              onChange={this.props.display_data_callback}
          />
          </FormGroup>
          <FormGroup
            helperText="some more info here..."
            label="Threshold"
            labelFor="threshold-input"
          >
          <Slider
              id="threshold-input"
              min={thresholds_min}
              max={thresholds_max}
              stepSize={1}
              labelStepSize={thresholds_step}
              onChange={this.props.display_timespan_callback}
              value={this.props.display_timespan}
          />
          </FormGroup>
          <FormGroup
            helperText="select the range of colors to display in the map"
            label="Color Range"
            labelFor="color-range-input"
          >
          <RangeSlider 
              id="color-range-input"
              min={data_min}
              max={data_max}
              stepSize={0.01*data_step}
              labelStepSize={data_step}
              value = {data_range}
              labelPrecision = {2}
              onChange = {this.props.color_range_callback}
          />
          </FormGroup>
      </Card>
    )
  }
}
export default UserInterface
