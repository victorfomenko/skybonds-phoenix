import React, { Component } from 'react';
import * as Data from '../../../data/providers/Data';
import Promise from 'rsvp';
import style from './style.sass';
import { getColor, getSynonym } from '../../../helpers/BondRating';
import DateFormatter from '../../../helpers/formatters/DateFormatter';
import NumberFormatter from '../../../helpers/formatters/NumberFormatter';

class BondGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loaded': false,
      'issuer': null
    };
    this.localCurrency = 'RUB';

  }

  componentWillMount() {
    this.initData(this.props.bond);
  }


  async initData(bond = null) {
    if(bond.info.issuerId != null) {
      let couponPeriod = null;
      let attrs = [ 'ratingGroupIssuer','linkCbondsIssuer','issuer','spIssuer','mdyIssuer','ftcIssuer','country','group','registrationForm','type','ogrn','inn','websiteLink' ];
      const issuerInfo = await Data.getIssuersInfo([bond.info.issuerId], attrs);
      const repayment = await Data.getRepayment(bond.isin);
      if (repayment.data != null && repayment.data.length) {
        let monthsDiff = Math.round(this.monthDiff(this.parseDate(repayment.data[0].date), this.parseDate(repayment.data[1].date)));
        let daysDiff = this.daysDiff(this.parseDate(repayment.data[0].date), this.parseDate(repayment.data[1].date))

        switch (monthsDiff){
          case 12:
            couponPeriod = 'once a year'
          case 6:
            couponPeriod = 'twice a year'
          default:
            couponPeriod = 'every ' + daysDiff + ' days'
        }

      }

      this.setState({
        'loaded': true,
        'issuer': issuerInfo[0].data,
        'couponPeriod': couponPeriod
      });
    }
  }

  getOutlookLabel(outlook) {
    if ( typeof outlook === 'string') {
      switch (outlook.toLowerCase()) {
        case 'positive':
        case 'pos':
          return 'Positive ↑';
        case 'negative':
        case 'neg':
          return 'Negative ↓';
        case 'stable':
        case 'sta':
          return 'Stable ≈';
        default:
          return 'NA outlook';
      }
    } else
    {
      return 'NA outlook';
    }
  };

  parseDate(str) {
    if(!/^(\d){8}$/.test(str)) return 'invalid date';
    var y = str.substr(0,4),
      m = str.substr(4,2),
      d = str.substr(6,2);

    return new Date(y,(m-1),d);
  }

  daysDiff(d1, d2) {
    let timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }

  monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  getCleanWebLink(link) {
    return link.replace(/https?\:\/\/|\/$/ig, '')
  }

  render(){
    let bond = this.props.bond;
    let issuer = this.state.issuer;
    let couponPeriod = this.state.couponPeriod;
    let bondDailyPortfolio = this.state.bondDailyPortfolio;
    if(this.state.loaded){
      return (
        <div className={style.bondGeneral}>
          <ul className={style.bondGeneralIssuer}>
            <li className={style.bondGeneralIssuer_item}>
              <a href={ '/issuer/' + bond.info.issuerId } className={'common-link' + ' ' + style.bondGeneralIissuer_link}>{issuer.issuer}</a>
            </li>
            <li className={style.bondGeneralIssuer_item}>
              <a href={issuer.websiteLink} className={'common-link' + ' ' + style.bondGeneralIissuer_link}>{this.getCleanWebLink(issuer.websiteLink)}</a>
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
                  <div className={style.bondGeneralValues_row + ' ' + style.__date}>{DateFormatter(this.parseDate(bond.info.fitchDate))}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__date}>{DateFormatter(this.parseDate(bond.info.spDate))}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__date}>{DateFormatter(this.parseDate(bond.info.moodysDate))}</div>
                </span>

                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' ' + style.__outlook}>{this.getOutlookLabel(bond.info.fitch)}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__outlook}>{this.getOutlookLabel(bond.info.sp)}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__outlook}>{this.getOutlookLabel(bond.info.moodys)}</div>
                </span>
                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' ' + style.__rating} style={{color: getColor(bond.info.ratingGroup)}}>{bond.info.ratingGroup}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__rating} style={{color: getColor(bond.info.ratingGroup)}}>{bond.info.ratingGroup}</div>
                  <div className={style.bondGeneralValues_row + ' ' + style.__rating} style={{color: getColor(bond.info.ratingGroup)}}>{getSynonym(bond.info.ratingGroup)}</div>
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

                { (!bond.info.isFloater) ?
                  <li className={style.bondGeneralValues_field}>
                    <span className={style.bondGeneralValues_label}>Coupon</span>
                    <span className={style.bondGeneralValues_unit}>%,</span>
                    <span className={style.bondGeneralValues_unit}>{couponPeriod}</span>
                    <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.coupon, {
                      minFraction: 2,
                      maxFraction: 2
                    })}</span>
                  </li>
                  : ''
                }
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
                  <span className={style.bondGeneralValues_value}>{DateFormatter(this.parseDate(bond.info.issueDate))}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Maturity date</span>
                  <span className={style.bondGeneralValues_value}>{DateFormatter(this.parseDate(bond.info.maturityDate))}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Early redeemed</span>
                  <span className={style.bondGeneralValues_value}>{bond.info.finalDate}</span>
                </li>

                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Maturity</span>
                  <span className={style.bondGeneralValues_unit}>yrs</span>
                  <span className={style.bondGeneralValues_value}>{DateFormatter(this.parseDate(bond.info.maturityDate))}</span>
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
                  <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bond.info.totalOutstandingLC}</div>
                  { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bondDailyPortfolio.currentInvestmentLC}</div> : ''}
                  { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bondDailyPortfolio.issuerLimitLC}</div> : ''}
                </span>

                <span className={style.bondGeneralValues_value}>
                  <div className={style.bondGeneralValues_row + ' ' + style.bondGeneralValues_unit}>
                    <span>M </span>
                    <span>{bond.info.ccy}</span>
                    <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bond.info.totalOutstandingBC}</div>
                    { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bondDailyPortfolio.currentInvestmentBC}</div> : ''}
                    { (bondDailyPortfolio != null) ? <div className={style.bondGeneralValues_row + ' ' + style.__number}>{bondDailyPortfolio.issuerLimitBC}</div>: ''}
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
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.haircut,  { minFraction: 2, maxFraction: 2, percent: true } )}</span>
                </li>
              </ul>
            </li>
            <li className={style.bondGeneralValues_right}>
              <ul className={style.bondGeneralValues_list}>
                <li className={style.bondGeneralValues_field + ' ' + style.__primary}>
                  <span className={style.bondGeneralValues_label}>Yield</span>
                  <span className={style.bondGeneralValues_unit}>%</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.yield,  { minFraction: 2, maxFraction: 2, percent: true } )}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Roll down</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.rollDown,  { minFraction: 2, maxFraction: 2 })}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Total return</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{bond.daily.tr}</span>
                </li>

                <li className={style.bondGeneralValues_title}></li>
                <li className={style.bondGeneralValues_field + ' ' + style.__primary}>
                  <span className={style.bondGeneralValues_label}>Price</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.price,  { minFraction: 2, maxFraction: 2 })}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Accrued interest</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.accruedCoupon,  { minFraction: 2, maxFraction: 2 })}</span>
                </li>
                <li className={style.bondGeneralValues_field}>
                  <span className={style.bondGeneralValues_label}>Dirty price</span>
                  <span className={style.bondGeneralValues_unit}> %</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.price + bond.daily.accruedCoupon,  { minFraction: 2, maxFraction: 2 })}</span>
                </li>
                <li className={style.bondGeneralValues_title}></li>
                <li className={style.bondGeneralValues_field + ' ' + style.__primary}>
                  <span className={style.bondGeneralValues_label}>Duration</span>
                  <span className={style.bondGeneralValues_unit}>yrs</span>
                  <span className={style.bondGeneralValues_value}>{NumberFormatter(bond.daily.duration,  { minFraction: 2, maxFraction: 2 })}</span>
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
                      className={style.bondGeneralValues_label + ' ' + style.__long}>Months for recovery for total return</span>
                    <span className={style.bondGeneralValues_value}>{bondDailyPortfolio.mtrFromTr}</span>
                  </li>
                </ul>
                :
                ''
              }
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <span>Loading...</span>
      );
    }

  }
}

BondGeneral.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondGeneral;
