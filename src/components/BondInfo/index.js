import React, { Component } from 'react';
import { getColor } from '../../helpers/BondRating';
import { connect } from 'react-redux';
import * as Data from '../../data/providers/Data';
import DateFormatter from '../../helpers/formatters/DateFormatter';
import { getLabel } from '../../helpers/BondOutlook';
import { closeBondInfo } from '../../actions';
import { Icon, GLYPHS } from '../../components/Icon';
import style from './style.sass';

class BondInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'isin': null,
      'loaded': false,
      'info': null,
      'daily': null
    };

    this.onClickClose = this.onClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.date = new Date(this.props.date);
    console.log('this.props', this.props);
    let isin = nextProps.bondInfo.isin;

    if (isin != null ) {
      this.initBond(isin, this.date);
    };

  }

  initBond(isin = null, date = null) {

    let dailyAttrs = ['coupon'];
    let infoAttrs = ['isin', 'standardName', 'maturityDate', 'issuerId', 'issuer', 'sector', 'outlook', 'ratingGroup'];
    if(isin != null && date != null ) {
      Promise.all([
        Data.getBondsInfo([isin], infoAttrs),
        Data.getBondsDaily([isin], date, dailyAttrs),
        Data.getBondsSchedulePut(isin)
      ]).then((response) => {
        this.setState({
          'loaded': true,
          'bond': {
            'info': response[0][0].data,
            'daily': response[1][0].data,
            'isin': isin,
            'putDate': this.getPutCallDate(response[2].data)
          }

        });

      });
    }
  }

  getPutCallDate(dates) {
    if (dates.length == 0) {
      return null
    }

    let date =  dates.find((function (_this) {
      return function (date) {
        return _this.parseDate(date) > _this.date
      };
    })(this));

    if (!date) {
      date = dates[0]
    }
    return date
  }

  parseDate(str) {
    if(!/^(\d){8}$/.test(str)) return 'invalid date';
    var y = str.substr(0,4),
      m = str.substr(4,2),
      d = str.substr(6,2);

    return new Date(y,(m-1),d);
  }

  onClickClose() {
    this.props.closeBondInfo()
  }

  toggleExclude() {

  }

  isExcludedIssuer() {
    return true
  }

  toggleExcludeIssuer() {

  }

  addSetOfSimilarBonds() {

  }

  render(){
    const bond = this.state.bond;
    if(this.state.loaded) {
      return (
        <div className={style.reportAsideBondGeneral + ' ' + (this.props.bondInfo.show ? style.__active : '')}>
          <div className={style.reportAsideBond}>
            <span className={style.reportAsideBond_link + ' ' + style.reportAsideBond_close}
                  onClick={ () => this.onClickClose()}>
            <Icon glyph={GLYPHS.CLOSE}
                  width="30" height="30" />
            </span>
            <div className={style.reportAsideBondHeader}>
              <ul className={style.reportAsideBondHeader_rows}>
                <li className={style.reportAsideBondHeader_line}>
                  <a href={'/bond/' + bond.info.isin } target="_blank"
                     className={style.reportAsideBond_link + ' ' + style.reportAsideBondHeader_title}>{bond.info.standardName}</a>
                  {/*<input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__bond}
                         onClick={this.toggleExclude()}/>
                         */}
                </li>
                <li className={style.reportAsideBondHeader_line}>
                  <ul className={style.reportAsideBondHeader_list}>
                    <li className={style.reportAsideBondHeader_item}>
                      <span>Maturity date </span>
                      <span>{DateFormatter(this.parseDate(bond.info.maturityDate))}</span>
                    </li>
                    <li className={style.reportAsideBondHeader_item}>
                      <span>Coupon </span>
                      <span>{bond.daily.coupon}</span>
                    </li>
                    { bond.putDate ?
                      <li className={style.reportAsideBondHeader_item}>
                        <span>({DateFormatter(this.parseDate(bond.putDate))})</span>
                      </li>
                      : ''
                    }
                    <li className={style.reportAsideBondHeader_line}>
                      <ul className={style.reportAsideBondHeader_list}>
                        <li className={style.reportAsideBondHeader_item + ' ' + style.reportAsideBondHeader_item__issuer}>
                          {/* !this.isExcludedIssuer() ?
                            <input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__issuer}
                                   onClick={this.toggleExcludeIssuer()} checked/>
                            :
                            <input type="checkbox" className={style.reportAsideBondHeader_excluded + ' ' + style.__issuer}
                                   onClick={this.toggleExcludeIssuer()}/>
                          */}
                          <a href={'/issuer/' + bond.info.issuerId }
                             className={style.reportAsideBond_link}>{bond.info.issuer}</a>
                        </li>
                        <li className={style.reportAsideBondHeader_item}>
                          <a href="" className={style.reportAsideBond_link} onClick={this.addSetOfSimilarBonds()}></a>
                          <span>{bond.info.sector}, </span>
                          <span style={{color: getColor(bond.info.ratingGroup)}}>{bond.info.ratingGroup}</span>
                        </li>
                        <li className={style.reportAsideBondHeader_item + ' ' + style.reportAsideBondHeader_outlook}>
                          <span>{ getLabel(bond.info.outlook) }</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className={style.reportAsideBondHeader_line}>
                  <ul className={style.reportAsideBondHeader_list}>
                    <li className={style.reportAsideBondHeader_item}>{bond.isin}</li>
                  </ul>
                </li>
              </ul>
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
