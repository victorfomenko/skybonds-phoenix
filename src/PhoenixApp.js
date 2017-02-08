import React, { Component } from 'react';
import Chart from './components/Chart/Chart';
import style from './phonix.sass';

class PhoenixApp extends Component {

  constructor(props) {
    super(props);

  }

  render(){

    return (
      <div>
        {this.props.reportName}
        <Chart />
      </div>
    );
  }
}

PhoenixApp.propTypes = {
  reportName: React.PropTypes.string.isRequired,
};

export default PhoenixApp;
