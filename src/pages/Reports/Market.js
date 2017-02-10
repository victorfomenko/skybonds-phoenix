import React, { Component } from 'react';
import Layers from '../../components/Layers/Layers';
import Chart from '../../components/Chart';
const _ = require('lodash');

class Maket extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    const isins = [];
    this.state = {
      reportName: 'Reports',
      isins: isins,
      reportID: props.match.params.reportID
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
        <span>reportID: {this.state.reportID}</span>
        <Layers filteredDataHandler={this.handleFilterChange.bind(this)} />
        <Chart isins={this.state.isins} />
      </div>
    );
  }
}


// console.log(new dataApi());

export default Maket;
