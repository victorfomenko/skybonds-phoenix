import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import Header from '../../components/Header';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import Movers from '../../components/Movers';
import { Icon, GLYPHS } from '../../components/Icon';

import { MARKET_REPORT_VIEW_MODES } from '../../data/constants';
import { getSpaces } from '../../data/providers/Spaces';
import { loadReports } from '../../actions';

import styles from './styles.sass';

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      reportIsins: [],
      activeIsin: '',
      viewMode: MARKET_REPORT_VIEW_MODES.SCATTERPLOT,
      date: props.summary.today,
      reportID: props.match.params.reportID
    };
    this.onViewModeChange = this.onViewModeChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return !isEqual(nextState, this.state);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.market && nextProps.market.id) {
      this.setState({
        reportIsins: nextProps.market.data.allLayersIsinsByQuotaVisible,
        market: nextProps.market
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
    this.setState(e.target.value)
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
              <Layers />
              <div className={styles.reportDate}><input type="date" value={this.state.date} onChange={this.onDateChange.bind(this)}/></div>
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

const mapStateToProps = state => ({ user: state.user, market: state.reports.market, summary: state.summary });
export default connect(mapStateToProps, { loadReports })(Market);
