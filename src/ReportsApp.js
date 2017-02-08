import React, { Component } from 'react';
import Chart from './components/chart/Chart';
import Filters from './components/filters/Filters';
import style from './reports.sass';

class ReportsApp extends Component {

  constructor(props) {
    super(props);
  }

  handleFilteredData(data) {
    console.log(data);
  }

  render(){

    return (
      <div>
        {this.props.reportName}
        <Filters filteredDataHandler={this.handleFilteredData.bind(this)} />
        <Chart />
      </div>
    );
  }
}

ReportsApp.propTypes = {
  reportName: React.PropTypes.string.isRequired,
};

export default ReportsApp;
