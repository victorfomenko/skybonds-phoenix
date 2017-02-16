import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import Movers from '../../components/Movers';
import {isEqual} from 'lodash';

import reportStyle from './style.sass';

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      totalIsins: [],
      reportID: props.match.params.reportID
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    if(isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const totalIsins = this.calcTotalIsins(nextProps.market.layers.layersById);
    this.setState({ totalIsins });
  }

  calcTotalIsins(layers){
    const isins = [];
    for(const key in layers) {
      isins.push(layers[key].filtersIsins);
    }
    return _.union(...isins);
  }

  render(){
    return (
      <div className='skybondsWrap'>
        <div className={reportStyle.reportWrap}>
          <div className={reportStyle.reportHeader}>
            <Layers />
          </div>
          <div className={reportStyle.reportView}>
            <div className={reportStyle.reportViewScatterPlot}>
              <div className={reportStyle.reportView_content}>
                <div className={reportStyle.reportViewScatterPlotDiagram}>
                  <ScatterPlot isins={this.state.totalIsins} />
                </div>
              </div>
              <div className={reportStyle.reportView_aside}>
                <Movers isins={this.state.totalIsins} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({ market: state.reports.market });
export default connect(mapStateToProps)(Market);
