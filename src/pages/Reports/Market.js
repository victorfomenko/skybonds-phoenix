import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import Header from '../../components/Header';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import BondInfo from '../../components/BondInfo';
import Movers from '../../components/Movers';
import { Icon, GLYPHS } from '../../components/Icon';

import DateFormatter from '../../helpers/formatters/DateFormatter';
import { MARKET_REPORT_VIEW_MODES } from '../../data/constants';
import { getSpaces } from '../../data/providers/Spaces';
import { loadReports } from '../../actions';

import styles from './styles.sass';

const formatNativeInputDate = (date) => {
  return DateFormatter(date, {regexp: '$3-$2-$1'})
};

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      reportIsins: [],
      activeIsin: '',
      viewMode: MARKET_REPORT_VIEW_MODES.SCATTERPLOT,
      dateToday: this.props.summary.today,
      reportID: props.match.params.reportID
    };
    this.onViewModeChange = this.onViewModeChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(nextState, this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    if((this.props.match.params.reportID !== nextProps.market.id) && nextProps.market.id != null) {
      nextProps.push(`/reports/market/${nextProps.market.id}`)
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.market && nextProps.market.id) {
      this.setState({
        reportIsins: nextProps.market.data.allLayersIsinsByQuotaVisible,
        market: nextProps.market,
        reportID: nextProps.market.id
      });
    }
  }

  componentDidMount() {
    this.props.loadReports(this.state.reportID, this.state.date);
  }

  onActiveIsinChange(isin) {
    this.setState({ activeIsin: isin });
  }

  onDateChange(e) {
    let newDate = new Date(e.target.value);
    if(isNaN(newDate.getTime()) ||
      newDate.getTime() < this.props.summary.dataSince ||
      newDate.getTime() > this.props.summary.today)
    {
      newDate = this.props.summary.today;
    }
    this.setState({ dateToday: newDate });
  }

  onViewModeChange(viewMode) {
    // console.log('view mode change', viewMode);
  }

  render(){
    const { market } = this.state;
    return (
      <div className='skybondsWrap'>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        { market ?
          <div className={styles.reportWrap}>
            <div className={styles.reportHeader}>
              <Layers dateToday={this.state.dateToday} />
              <div className={styles.reportDate}>
                <input type="date"
                       value={formatNativeInputDate(this.state.dateToday)}
                       min={formatNativeInputDate(this.props.summary.dataSince)}
                       max={formatNativeInputDate(this.props.summary.today)}
                       onChange={this.onDateChange.bind(this)}/>
              </div>
              <div className={styles.reportViewMode}>
                <ul className={styles.reportViewMode_list}>
                  <li className={styles.reportViewMode_item + (this.state.viewMode === MARKET_REPORT_VIEW_MODES.SCATTERPLOT ? ' ' + styles.__active : '')} onClick={()=>this.onViewModeChange(MARKET_REPORT_VIEW_MODES.SCATTERPLOT)}>
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
                    dateToday={this.state.dateToday}
                    activeIsin={this.state.activeIsin}
                    onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
                </div>
                <div className={styles.reportView_aside}>
                  <Movers
                    isins={this.state.reportIsins}
                    dateToday={this.state.dateToday}
                    onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
                  <BondInfo
                    date={'2017/02/17'}
                  />
                </div>
              </div>
            </div>
          </div>
          : <div>Loading...</div> }
      </div>
    );
  }
}

Market.propTypes = {
  user: React.PropTypes.shape({}).isRequired,
  market: React.PropTypes.object.isRequired,
  loadReports: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.user, summary: state.summary, market: state.reports.market });
export default connect(mapStateToProps, { loadReports })(Market);
