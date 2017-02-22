import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import BondInfo from '../../components/BondInfo';
import Movers from '../../components/Movers';
import { getSpaces } from '../../data/providers/Spaces';
import { isEqual, intersection, uniq, union } from 'lodash';
import reportStyle from './style.sass';

const REPORT_ISINS_QUOTA = 200;


class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      reportIsins: [],
      activeIsin: '',
      reportID: props.match.params.reportID
    };
    getSpaces().then(spaces=>{
    });

  }

  shouldComponentUpdate(nextProps, nextState){
    if(isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const reportIsins = this.getReportIsins(nextProps.market.layers.layersById);
    this.setState({ reportIsins });
  }

  getReportIsins(layers){
    let nonEmptyLayers = [];
    for(let key in layers) {
      const layerIsins = layers[key].dataComputed.isins;
      if(layerIsins.length) {
        nonEmptyLayers.push(layerIsins);
      }
    }
    nonEmptyLayers = nonEmptyLayers.sort((a,b)=>{
      return a.length - b.length;
    });
    let maxIsinsPerLayer = Math.floor(REPORT_ISINS_QUOTA / nonEmptyLayers.length);
    let remainingQuota = REPORT_ISINS_QUOTA;
    let layersIsinsByQuota = [];
    nonEmptyLayers.forEach((isins, index)=>{
      let isinsByQuota = isins.slice(0, maxIsinsPerLayer);
      layersIsinsByQuota.push(isinsByQuota);
      remainingQuota -= isinsByQuota.length;
      if(index < nonEmptyLayers.length - 1) {
        maxIsinsPerLayer = Math.floor(remainingQuota / (nonEmptyLayers.length - index - 1));
      }
    });
    return union(...layersIsinsByQuota);
  }

  onActiveIsinChange(isin) {
    this.setState({ activeIsin: isin });
  }

  render(){
    return (
      <div className='skybondsWrap'>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        <div className={reportStyle.reportWrap}>
          <div className={reportStyle.reportHeader}>
            <Layers />
          </div>
          <div className={reportStyle.reportView}>
            <div className={reportStyle.reportViewScatterPlot}>
              <div className={reportStyle.reportView_content}>
                <ScatterPlot
                  isins={this.state.reportIsins}
                  activeIsin={this.state.activeIsin}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
              </div>
              <div className={reportStyle.reportView_aside}>
                <Movers
                  isins={this.state.reportIsins}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
                <BondInfo
                  date={'2017/02/17'}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({ user: state.user, market: state.reports.market });
export default connect(mapStateToProps)(Market);
