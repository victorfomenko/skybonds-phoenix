import React, { Component } from 'react';
import Layers from './components/layers/Layers';
import Chart from './components/chart/Chart';
import style from './phonix.sass';
const _ = require('lodash');

class PhoenixApp extends Component {

  constructor(props) {
    super(props);
    const isins = [];
    this.state = {isins};

  }

  shouldComponentUpdate(nextProps, nextState){
    if(_.isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  handleFilterChange(isins) {
    this.setState({isins: isins});
  }

  render(){

    return (
      <div>
        {this.props.reportName}
        <Layers key='reportLayers' filteredDataHandler={this.handleFilterChange.bind(this)} />
        <Chart key='scatterPlotChart' isins={this.state.isins} />
      </div>
    );
  }
}

PhoenixApp.propTypes = {
  reportName: React.PropTypes.string.isRequired,
};

export default PhoenixApp;
