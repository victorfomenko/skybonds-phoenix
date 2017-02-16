import React, { Component } from 'react';
import * as Data from '../../../data/providers/Data';
import Promise from 'rsvp'
import style from './style.sass';

class BondGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loaded': false,
      'issuer': null
    }
    this.localCurrency = 'RUB'

  }

  componentWillMount() {
    this.initIssuer(this.props.bond.info.issuerId);
  }


  async initIssuer(id = null) {
    if(id != null) {
      let attrs = [ 'ratingGroupIssuer','linkCbondsIssuer','issuer','spIssuer','mdyIssuer','ftcIssuer','country','group','registrationForm','type','ogrn','inn','websiteLink' ];
      const response = await Data.getIssuersInfo([id], attrs);
      this.setState({
        'loaded': true,
        'issuer': response[0].data
      });
    }
  }

  getOutlookLabel(outlook) {
    if (outlook == null)
      return null
    switch (outlook.toLowerCase()) {
      case 'positive':
        return 'Positive ↑';
      case 'negative':
        return 'Negative ↓';
      case 'stable':
        return 'Stable ≈';
      case 'sta':
        return 'Stable ≈';
      default:
        return 'NA outlook';
    }
  };

  getDateFormat(date) {
    if (date instanceof Date){
      let dateFormatted = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
      return dateFormatted
    } else {
      return null
    }

  }

  parseDate(str) {
    if(!/^(\d){8}$/.test(str)) return "invalid date";
    var y = str.substr(0,4),
      m = str.substr(4,2),
      d = str.substr(6,2);
    return new Date(y,m,d);
  }

  getDateDiff(date) {
    let date1 = this.parseDate(date);
    let date2 = new Date();
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }


  render(){
    let bond = this.props.bond;
    let issuer = this.state.issuer;
    let bondDailyPortfolio = this.state.bondDailyPortfolio;
    if(this.state.loaded){
      return (
        <div className={style.bondGeneral}>
          <ul className={style.bondGeneralIssuer}>
            <li className={style.bondGeneralIssuer_item}>
              <a href={ '/issuer/' + bond.info.issuerId } className={'common-link' + ' ' + style.bondGeneralIissuer_link}>{issuer.issuer}</a>
            </li>
            <li className={style.bondGeneralIssuer_item}>
              <a href={issuer.websiteLink} className={'common-link' + ' ' + style.bondGeneralIissuer_link}>{issuer.websiteLink}</a>
            </li>
            <li className={style.bondGeneralIssuer_item}>
              <a href={bond.info.onCBonds} className={'common-link' + ' ' + style.bondGeneralIissuer_link}>Issue on Cbonds</a>
            </li>
            <li className={style.bondGeneralIssuer_item}>
              <span>{bond.info.sector}</span>
            </li>
          </ul>
          <ul className={style.bondGeneralValues}>
            <li className={style.bondGeneralValues_left}>
              <ul className={style.bondGeneralValues_list}>
                <li className={style.bondGeneralValues_field}>
                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' __date'}>{this.getDateFormat(this.parseDate(bond.info.fitchDate))}</div>
                  <div className={style.bondGeneralValues_row + ' __date'}>{this.getDateFormat(this.parseDate(bond.info.spDate))}</div>
                  <div className={style.bondGeneralValues_row + ' __date'}>{this.getDateFormat(this.parseDate(bond.info.moodysDate))}</div>
                </span>

                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' __outlook'}>{this.getOutlookLabel(bond.info.fitch)}</div>
                  <div className={style.bondGeneralValues_row + ' __outlook'}>{this.getOutlookLabel(bond.info.sp)}</div>
                  <div className={style.bondGeneralValues_row + ' __outlook'}>{this.getOutlookLabel(bond.info.moodys)}</div>
                </span>
                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' __rating'}>{bond.info.ratingGroup}</div>
                  <div className={style.bondGeneralValues_row + ' __rating'}>{bond.info.ratingGroup}</div>
                  <div className={style.bondGeneralValues_row + ' __rating'}>{bond.info.ratingSynonym}</div>
                </span>
                <span className={style.bondGeneralValues_label}>
                  <div className={style.bondGeneralValues_row}> Fitch</div>
                  <div className={style.bondGeneralValues_row}> S&P</div>
                  <div className={style.bondGeneralValues_row}> Moody</div>
                </span>
                </li>

                <li className={style.bondGeneralValues_title}>
                  <span>
                    {(!bond.info.isAmortizing) ? 'Non-Amortizing' : ''}
                    {(bond.info.isAmortizing) ? 'Amortizing' : ''}
                    {(bond.info.isConvertible) ? ' convertible' : ''}
                    {(bond.info.isSubordinated) ? ' subordinated' : ''}
                    {(bond.info.isFloater) ? ' floater' : ''}
                  </span>
                  <span> bond</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Coupon</span>
                  <span className={style.bondGeneralValues_unit}>%,</span>
                  <span className={style.bondGeneralValues_unit}>{bond.info.couponPeriod}</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.coupon}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Floating rate formula </span>
                  <span>{bond.info.floatingRateFormula}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Initial face Value</span>
                  <span className={style.bondGeneralValues_unit}>{bond.info.ccy}</span>
                  <span className={style.bondGeneralValues_value}>{bond.info.principal}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Issue date</span>
                  <span className={style.bondGeneralValues_value}>{this.getDateFormat(this.parseDate(bond.info.issueDate))}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Maturity date</span>
                  <span className={style.bondGeneralValues_value}>{this.getDateFormat(this.parseDate(bond.info.maturityDate))}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Early redeemed</span>
                  <span className={style.bondGeneralValues_value}>{bond.info.finalDate}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Maturity</span>
                  <span className={style.bondGeneralValues_unit}>yrs</span>
                  <span className={style.bondGeneralValues_value}>{this.getDateFormat(this.parseDate(bond.info.maturityDate))}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Put date</span>
                  <span className={style.bondGeneralValues_unit}></span>
                  <a href="#payments" className={style.bondGeneralValues_value + ' common-link'}>{bond.info.putDate}</a>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Call date</span>
                  <span className={style.bondGeneralValues_unit}></span>
                  <a href="#payments" className={style.bondGeneralValues_value + ' common-link'}>{bond.info.callDate}</a>
                </li>

                <li className={style.bondGeneralValues_title}></li>
                <li className={style.bondGeneralValues_field}>
                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' ' + style.bondGeneralValues_unit}>
                    <span>M </span>
                    <span>{this.localCurrency}</span>
                    <span> eq.</span>
                  </div>
                  <div className={style.bondGeneralValues_row + ' __number'}>{bond.info.totalOutstandingLC}</div>
                  { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' __number'}>{bondDailyPortfolio.currentInvestmentLC}</div> : ''}
                  { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' __number'}>{bondDailyPortfolio.issuerLimitLC}</div> : ''}
                </span>

                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' ' + style.bondGeneralValues_unit}>
                    <span>M </span>
                    <span>{bond.info.ccy}</span>
                    <div className={style.bondGeneralValues_row + ' __number'}>{bond.info.totalOutstandingBC}</div>
                    { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' __number'}>{bondDailyPortfolio.currentInvestmentBC}</div> : ''}
                    { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' __number'}>{bondDailyPortfolio.issuerLimitBC}</div>: ''}
                  </div>
                </span>
                <span className={style.bondGeneralValues_label}>
                  <div className={style.bondGeneralValues_row}>&nbsp;</div>
                  <div className={style.bondGeneralValues_row}>Total outstanding</div>
                  <div className={style.bondGeneralValues_row}>Current investment</div>
                  <div className={style.bondGeneralValues_row}>Issuer limit</div>
                </span>
                </li>
                <li className={style.bondGeneralValues_title}>Repo information</li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Discount</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.haircut}</span>
                </li>
              </ul>
            </li>
            <li className={style.bondGeneralValues_right}>
              <ul className={style.bondGeneralValues_list}>
                <li className={style.bondGeneralValues_field + ' __primary'}>
                  <span className={style.bondGeneralValues_label}>Yield</span>
                  <span className={style.bondGeneralValues_unit}>%</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.yield}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Roll down</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.rollDown}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Total return</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.tr}</span>
                </li>

                <li className={style.bondGeneralValues_title}></li>
                <li className={style.bondGeneralValues_field + ' __primary'}>
                  <span className={style.bondGeneralValues_label}>Price</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.price}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Accrued interest</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.accruedCoupon}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Dirty price</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.price + bond.daily.accruedCoupon}</span>
                </li>
                <li className={style.bondGeneralValues_title}></li>
                <li className={style.bondGeneralValues_field + ' __primary'}>
                  <span className={style.bondGeneralValues_label}>Duration</span>
                  <span className={style.bondGeneralValues_unit}>yrs</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.duration}</span>
                </li>
              </ul>

              { (bondDailyPortfolio != null) ?
                <ul className={style.bondGeneralValues_list}>
                  <li className={style.bondGeneralValues_title}></li>
                  <li className={style.bondGeneralValues_field}>
                    <span className={style.bondGeneralValues_label}>ROE</span>
                    <span className={style.bondGeneralValues_unit}> %</span>
                    <span className={style.bondGeneralValues_value}>{bondDailyPortfolio.roe}</span>
                  </li>
                  <li className={style.bondGeneralValues_field}>
                    <span className={style.bondGeneralValues_label}>Total ROE</span>
                    <span className={style.bondGeneralValues_unit}> %</span>
                    <span className={style.bondGeneralValues_value}>{bondDailyPortfolio.roeFromTr}</span>
                  </li>
                  <li className={style.bondGeneralValues_field}>
                    <span className={style.bondGeneralValues_label}>Months for recovery</span>
                    <span className={style.bondGeneralValues_value}>{bondDailyPortfolio}</span>
                  </li>
                  <li className={style.bondGeneralValues_field}>
                    <span
                      className={style.bondGeneralValues_label + ' __long'}>Months for recovery for total return</span>
                    <span className={style.bondGeneralValues_value}>{bondDailyPortfolio.mtrFromTr}</span>
                  </li>
                </ul>
                :
                ''
              }
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <span>Loading...</span>
      )
    }

  }
}

BondGeneral.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondGeneral
