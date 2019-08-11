import React from 'react';
import './App.css';
import UkMap from './UkMap.js';
import UserInterface from './UserInterface.js';

const data_options = ["ibd_segments", "genome_fraction"];

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 0,
      ancestory: 10
    };
  }
  render() {
    return (
      <div className="App">
      <UkMap 
        className="UkMap" 
        data = {data_options[this.state.data]}
        ancestory = {this.state.ancestory}
      />
      <div className="RHS">
        <UserInterface 
            className="UserInterface" 
            data_options = {data_options}
            data = {data_options[this.state.data]}
            ancestory = {this.state.ancestory}
            ancestory_min = {10}
            ancestory_max = {50}
            ancestory_step = {10}
            data_callback = {this.data_callback}
            ancestory_callback = {this.getChangeHandler("ancestory")}
        />
        <div className="DetailedView">
        </div>
      </div>
    </div>
    );
  }

  data_callback = (event) => {
    const value = event.currentTarget.selectedIndex;
    this.setState({
        data: value
      });
  };

  getChangeHandler(key: string) {
    return (value: number) => {
      this.setState({
        [key]: value
      });
    }
  }
}

export default App;
