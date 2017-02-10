import React, { Component } from 'react';
import Layers from '../Layers/Layers';
import Chart from '../Chart';
const _ = require('lodash');

class Maket extends Component {

  constructor(props) {
    super(props);
    const isins = [];
    this.state = {
      reportName: 'Reports',
      isins
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    if(_.isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  handleFilterChange(isins) {
    this.setState({ isins });
  }

  render(){

    return (
      <div>
        {this.state.reportName}
        <Layers filteredDataHandler={this.handleFilterChange.bind(this)} />
        <Chart isins={this.state.isins} />
      </div>
    );
  }
}


export default Maket;
