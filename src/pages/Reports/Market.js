import React, { Component } from 'react';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
const _ = require('lodash');

import pageStyle from '../../styles/page.sass';
import reportStyle from './style.sass';

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
      <div className={pageStyle.skybondsWrap}>
        <div className={reportStyle.reportWrap}>
          <div className={reportStyle.reportHeader}>
            <Layers filteredDataHandler={this.handleFilterChange.bind(this)} />
          </div>
          <div className={reportStyle.reportView}>
            <div className={reportStyle.reportViewScatterPlot}>
              <div className={reportStyle.reportView_content}>
                <div className={reportStyle.reportViewScatterPlotDiagram}>
                  <ScatterPlot isins={this.state.isins} />
                </div>
              </div>
              <div className={reportStyle.reportView_aside}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Maket;
