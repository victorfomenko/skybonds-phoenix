import React, { Component } from 'react';
import { getColor } from '../../helpers/BondRating';
import { connect } from 'react-redux';
import BondInfoHeader from './BondInfoHeader';
import BondInfoChart from './BondInfoChart';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getLabel } from '../../helpers/BondOutlook';
import { closeBondInfo } from '../../actions';
import { Icon, GLYPHS } from '../../components/Icon';
import styles from './styles.sass';

class BondInfo extends Component {
  constructor(props) {
    super(props);
    this.bond = null;
    this.onClickClose = this.onClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.bond = nextProps.bondInfo;
    let putDate = this.getPutCallDate(nextProps.bondInfo.putDates);
    if (putDate != null){
      putDate = DateDayCaster.cast(putDate)
    }
    this.bond.putDate = putDate
  }

  getPutCallDate(dates) {
    if (dates == null || dates.length == 0) {
      return null
    }

    let date =  dates.find((function (_this) {
      return function (date) {
        return DateDayCaster.cast(date) > _this.bond.date
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
    if(this.bond && this.bond.isin ) {
      return (
        <div className={styles.reportAsideBondGeneral + ' ' + (this.bond.show ? styles.__active : '')}>
          <div className={styles.reportAsideBond}>
            <span className={styles.reportAsideBond_link + ' ' + styles.reportAsideBond_close}
                  onClick={ () => this.onClickClose()}>
            <Icon glyph={GLYPHS.CLOSE}
                  width="30" height="30" />
            </span>
            <BondInfoHeader
              bond={this.bond}
            />
            <div className={styles.reportAsideBondContent}>
              <div className={styles.reportAsideBondContent_wrap}>
                <BondInfoChart bond={this.bond} yAxis='yield' />
              </div>
            </div>

          </div>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
}

BondInfo.propTypes = {
  date: React.PropTypes.string.isRequired,
  closeBondInfo: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ bondInfo: state.reports.market.bondInfo });
export default connect(mapStateToProps, { closeBondInfo })(BondInfo);
