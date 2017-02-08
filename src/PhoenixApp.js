import React, { Component } from 'react';
import Layers from './components/layers/Layers';
import Chart from './components/Chart/Chart';
import style from './phonix.sass';

class PhoenixApp extends Component {

  constructor(props) {
    super(props);
    const isins = [];
    this.state = { isins };

  }

  handleFilterChange(isins) {
    console.log(isins);
    this.setState({isins: isins});
  }

  render(){

    return (
      <div>
        {this.props.reportName}
        <Layers filteredDataHandler={this.handleFilterChange} />
        <Chart isins={this.state.isins} />
      </div>
    );
  }
}

PhoenixApp.propTypes = {
  reportName: React.PropTypes.string.isRequired,
};

export default PhoenixApp;
