import React from 'react'
import './App.css'
import {
  FormGroup,
  RangeSlider,
  Button,
  Overlay,
  InputGroup,
  Card,
  Elevation,
  Slider,
  Checkbox,
  HTMLSelect,
  H5, H3,
  Popover,
  Icon,
  Intent,
} from "@blueprintjs/core";


const display_pop_map = {
  "IBD": "IBD",
  "fN": "fN",
}

const display_data_map = {
  "ibd_segments": "number of ancestors",
  "genome_fraction": "percent shared genome",
  "mutations": "mutations",
}

class Help extends React.Component {
  render() {
    return (
      <Popover>
        <Icon icon="help" intent={Intent.PRIMARY}/>
        <Card>{this.props.string}</Card>
      </Popover>
    )
  }
}

class Options extends React.Component {
  render() {
    console.log(`value = ${this.props.value}`);
    return (
      <div className="options-row">
          <div className="options-column1">
          {this.props.label}
          </div>
          <HTMLSelect 
              id={this.props.labelFor}
              className="options-column2"
              fill={true}
              options={this.props.options}
              onChange={this.props.onChange}
              value={this.props.options[this.props.value]}
          />
          <Help className="options-column3" string={this.props.longHelperText}/>
          </div>
    )
  }
}


class UserInterface extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing_postcode: false,
      editing_postcode_text: "",
      advanced: false,
      more_information: false,
    };
  }


  render() {
    const thresholds = this.props.postcode_data.get_thresholds().map(x => this.props
      .threshold_scale * x)
    const selected_threshold = this.props.threshold_scale * this.props
      .display_timespan
    const thresholds_min = thresholds[0];
    const thresholds_length = thresholds.length;
    const thresholds_max = thresholds[thresholds_length - 1];
    const thresholds_step = Math.round((thresholds_max - thresholds_min) / 5);
    console.log(
      `thresh = ${selected_threshold} thresholds_min = ${thresholds_min}, max = ${thresholds_max} threshold_step = ${thresholds_step}`
      );
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
    const population_options = this.props.display_pop_options.map(
      x => display_pop_map[x]
    )
    const data_options = this.props.display_data_options.map(
      x => display_data_map[x]
    )
    let postcode_name = this.state.editing_postcode_text
    if (this.props.postcode_names && !this.state.editing_postcode) {
      postcode_name = this.props.postcode_names[this.props.selected_postcode]
    }

    const standard = (
      <div>
          <H5>Display Options</H5>
          <Options 
            helperText="some more info here..."
            label="Dataset"
            labelFor="dataset-input"
            options={population_options} 
            onChange={this.props.display_pop_callback}
            value={this.props.display_pop_index}
            longHelperText="extra info here..."
          />
          <Options
            helperText="some more info here..."
            label="Datatype"
            labelFor="datatype-input"
            options={data_options} 
            onChange={this.props.display_data_callback}
            value={this.props.display_data_index}
            longHelperText="extra info here..."
          />
          <FormGroup
            helperText="ancestry calculated this many years in the past" 
            label="Threshold"
            labelFor="threshold-input"
          >
          <Slider
              id="threshold-input"
              min={thresholds_min}
              max={thresholds_max}
              stepSize={thresholds_step/10}
              labelStepSize={thresholds_step}
              onChange={this.props.display_timespan_callback}
              value={selected_threshold}
          />
          </FormGroup>
          <FormGroup
            helperText="area postcode (e.g. S or HA)"
            label="Postcode"
            labelFor="postcode-input"
            inline={true}
          >
          <InputGroup
            id="postcode-input"
            leftIcon="geosearch"
            placeholder="Enter postcode..."
            onFocus={() => this.setState({editing_postcode: true})}
            onBlur={() => this.setState({editing_postcode: false})}
            value={postcode_name}
            onChange={(e) => { this.setState({editing_postcode_text: e.target.value})}}
            onKeyPress={(e) => { 
              if (e.which === 13) {
                this.props.select_postcode(this.state.editing_postcode_text)
              }
            }}
          />
          </FormGroup>
          </div>
    );

    const advanced = (
      <div>
          <FormGroup
            helperText="select the range of colors to display in the map"
            label="Color Range"
            labelFor="color-range-input"
          >
          <Options 
            label="Mode"
            labelFor="mode-input"
            options={["second largest", "95% percentiles", "set by user"]} 
            onChange={this.props.color_range_mode_callback}
            value={this.props.color_range_mode}
            longHelperText="extra info here..."
          />
          <RangeSlider 
              id="color-range-input"
              min={data_min}
              max={data_max}
              stepSize={0.01*data_step}
              labelStepSize={data_step}
              value = {data_range}
              labelPrecision = {2}
              disabled = {this.props.color_range_mode !== 2}
              onChange = {this.props.color_range_callback}
          />
          </FormGroup>
          <FormGroup
            helperText="use this URL to save your current parameters"
            label="Copy parameters"
            labelFor="parameter-input"
          >
          <InputGroup
            id="parameter-input"
            leftIcon="bookmark"
            readOnly={true}
            value={this.props.parameters_string}
          />
          </FormGroup>
          </div>
    );

    return (
      <Card interactive={false} elevation={Elevation.TWO}>
      {standard}
      <Checkbox 
        checked={this.state.advanced} 
        label="Show advanced" 
        onChange={this.handleAndvancedChange} 
      />
      {this.state.advanced && advanced}
      <Button text="More Information" intent="primary" onClick={this.createOverlayHandler('more_information')} />
      <Overlay className="Overlay" isOpen={this.state.more_information}>
        <Card interactive={false} elevation={Elevation.TWO}>
        <H3>More Information</H3>
        <p>TODO: more information here about the visualisation</p>
        <Button text="Close" onClick={this.createOverlayHandler('more_information')} />
        </Card>
      </Overlay>
      </Card>
    )
  }

  handleAndvancedChange = () => {
    this.setState({
      advanced: !this.state.advanced
    });
  };

  createOverlayHandler(toggle) {
    return () => {
      this.setState({
        [toggle]: !this.state[toggle]
      });
    };
  }
}
export default UserInterface
