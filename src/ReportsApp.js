import React, { Component } from 'react';
import Chart from './components/chart/Chart';
import style from './reports.sass';

class ReportsApp extends Component {

  constructor(props) {
    super(props);

  }

  render(){

    return (
      <div>{this.props.reportName}
        <Chart />
      </div>
    );
  }
}

ReportsApp.propTypes = {
  reportName: React.PropTypes.string.isRequired,
};

export default ReportsApp;
