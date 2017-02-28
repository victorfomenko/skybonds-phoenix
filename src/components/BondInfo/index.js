import React, { Component } from 'react';
import { getColor } from '../../helpers/BondRating';
import { connect } from 'react-redux';
import BondInfoHeader from './BondInfoHeader';
import BondInfoChart from './BondInfoChart';
import BondInfoCalculator from './BondInfoCalculator';
import BondInfoPeers from './BondInfoPeers';
import BondInfoContent from './BondInfoContent';
import LoadingCover from '../LoadingCover';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getLabel } from '../../helpers/BondOutlook';
import { closeBondInfo, getBondInfo } from '../../actions';
import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass';

class BondInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bond: null
    };
    this.onClickClose = this.onClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let bondInfo = nextProps.bondInfo;
    let putDate = this.getPutCallDate(nextProps.bondInfo.putDates);
    if (putDate != null){
      putDate = DateDayCaster.cast(putDate)
    }
    bondInfo.putDate = putDate;

    this.setState({
      bond: bondInfo
    });

  }

  componentWillUpdate(nextProps) {
    if (this.props.bondInfo.isin != nextProps.bondInfo.isin ) {
      this.props.getBondInfo(nextProps.bondInfo.isin, nextProps.bondInfo.date)
    }
  }

  getPutCallDate(dates) {
    if (dates == null || dates.length == 0) {
      return null
    }

    let date =  dates.find((function (_this) {
      return function (date) {
        return DateDayCaster.cast(date) > _this.state.bond.date
      };
    })(this));

    if (!date) {
      date = dates[0]
    }
    return date
  }

  onClickClose() {
    this.props.closeBondInfo()
  }

  render(){
    return (
      <div className={styles.reportAsideBondGeneral + ' ' + ( ( this.state.bond != null && this.state.bond.show) ? styles.__active : '')}>
        <div className={styles.reportAsideBond}>
          <span className={styles.reportAsideBond_link + ' ' + styles.reportAsideBond_close}
                onClick={ () => this.onClickClose()}>
            <Icon glyph={GLYPHS.CLOSE}
                  width="30" height="30" />
          </span>
          { (this.state.bond && this.state.bond.info ) &&
          <BondInfoHeader
            bond={this.state.bond}
          />
          }
          { ( ( this.state.bond && this.state.bond.daily) != null) &&
          <div className={styles.reportAsideBondContent}>
            <div className={styles.reportAsideBondContent_wrap}>
              <BondInfoChart bond={this.state.bond}/>
              <BondInfoCalculator bond={this.state.bond} date={this.props.date}/>
              <BondInfoPeers bond={this.state.bond}/>
              <BondInfoContent bond={this.state.bond}/>

              <div className={styles.reportAsideBondContent_section}>
                <ul className={styles.reportAsideBondContent_list}>
                  { this.state.bond.info.issuerWebsite != null &&
                  <li className={styles.reportAsideBondContent_item}>
                    <a href={ this.state.bond.info.issuerWebsite } target="_blank" className={styles.reportAsideBond_link}>Issuer's
                      homepage</a>
                  </li>
                  }
                  { this.state.bond.info.linkCbondsIssue != null &&
                  <li className={styles.reportAsideBondContent_item}>
                    <a href={ this.state.bond.info.linkCbondsIssue } className={styles.reportAsideBond_link} target="_blank">Issuer on
                      Cbonds</a>
                  </li>
                  }
                  { this.state.bond.info.linkCbondsTS != null &&
                  <li className={styles.reportAsideBondContent_item}>
                    <a href={ this.state.bond.info.linkCbondsTS } className={styles.reportAsideBond_link} target="_blank">TS on Cbonds</a>
                  </li>
                  }
                  { this.state.bond.info.link139 != null &&
                  <li className={styles.reportAsideBondContent_item}>
                    <a title={ this.state.bond.info.link139 } className={styles.reportAsideBond_link + ' ' + styles.reportAsideBondContent_tooltip} target="_blank">139-I instruction</a>
                  </li>
                  }
                  { this.state.bond.info.quoteType != null &&
                  <li className={styles.reportAsideBondContent_item}>
                    {this.state.bond.info.quoteType}
                  </li>
                  }
                </ul>
              </div>
            </div>
          </div>
          }
          <LoadingCover isLoading={ this.state.bond == null || this.state.bond.loading } />
        </div>
      </div>
    )
  }
}

BondInfo.propTypes = {
  date: React.PropTypes.object.isRequired,
  closeBondInfo: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ bondInfo: state.reports.market.bondInfo });
export default connect(mapStateToProps, { closeBondInfo, getBondInfo })(BondInfo);
