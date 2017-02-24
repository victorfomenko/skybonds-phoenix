import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import Movers from '../../components/Movers';
import { Icon, GLYPHS } from '../../components/Icon';
import { getSpaces } from '../../data/providers/Spaces';
import { isEqual, intersection, uniq, union } from 'lodash';
import styles from './styles.sass';

const REPORT_ISINS_QUOTA = 200;
const VIEW_MODES = {
  SCATTERPLOT: 'scatterplot',
  TIMESERIES: 'timeseries',
  TABLE: 'table'
};


class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      reportIsins: [],
      activeIsin: '',
      viewMode: VIEW_MODES.SCATTERPLOT,
      date: '',
      reportID: props.match.params.reportID
    };
    getSpaces().then(spaces=>{
    });
    this.onViewModeChange = this.onViewModeChange.bind(this);
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

  onDateChange(event) {
    this.setState(event.target.value)
  }

  onViewModeChange(viewMode) {
    // console.log('view mode change', viewMode);
  }

  render(){
    return (
      <div className='skybondsWrap'>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        <div className={styles.reportWrap}>
          <div className={styles.reportHeader}>
            <Layers />
            <div className={styles.reportDate}><input type="date" value={this.state.date} onChange={this.onDateChange.bind(this)}/></div>
            <div className={styles.reportViewMode}>
              <ul className={styles.reportViewMode_list}>
                <li className={styles.reportViewMode_item + (this.state.viewMode === VIEW_MODES.SCATTERPLOT ? ' ' + styles.__active : '')} onClick={()=>this.onViewModeChange(VIEW_MODES.SCATTERPLOT)}>
                  <Icon glyph={GLYPHS.VIEW_SCATTERPLOT} width="13" height="11" />
                  <span>Scatter plot</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.reportView}>
            <div className={styles.reportViewScatterPlot}>
              <div className={styles.reportView_content}>
                <ScatterPlot
                  isins={this.state.reportIsins}
                  activeIsin={this.state.activeIsin}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
              </div>
              <div className={styles.reportView_aside}>
                <Movers
                  isins={this.state.reportIsins}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
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
