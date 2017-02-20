import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import * as Rates from '../../data/providers/Rates';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import style from './style.sass';


class BondRepaymentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'repaymentSchedule': []
    };
    this.initValues()
  }

  componentWillMount() {
    this.initData(this.props.bond);
  }

  initValues() {
    this.repaymentPast = [];
    this.repaymentCurrent = [];
    this.isRepaymentPastVisible = false;
    this.isRepaymentFutureVisible = false;
    this.nextPayment = null;
    this.bondCurrency = null;
    this.localCurrency = 'RUB';
  }

  async initData(bond = null) {
    if (bond.daily != null) {
      const rates = await Rates.getByDate(bond.daily.date);
      const repaymentsInfo = await Data.getRepayment(bond.isin);

      let repayments = repaymentsInfo.data;
      let issueDate = new Date(this.parseDate(bond.info.issueDate));

      let issueDay = issueDate.toDateString().substring(8, 10) + ' ' + issueDate.toDateString().substring(4, 7);


      this.issueDate = {
        date: issueDay,
        year: issueDate.getFullYear()
      };

      this.bondCurrency = bond.info.ccy;
      this.isInLocalCurrency = this.bondCurrency == this.localCurrency;
      let currencyRate =  this.isInLocalCurrency ? 1 : rates[this.bondCurrency];
      let cumulativeCoupon = null;
      let uniqueYears = {};
      uniqueYears[this.issueDate.year] = true;

      let _repaymentAll = [];
      for (let i = 0, len = repayments.length; i < len; i++) {
        let repayment = repayments[i];

        let repaymentDate = new Date(this.parseDate(repayment.date));

        let year = repaymentDate.getFullYear();
        let repeatLastYear = null;

        if (repaymentDate > this.props.date && !cumulativeCoupon){
          repeatLastYear = year;
        } else {
          repeatLastYear = null;
        }

        if (!uniqueYears[year]) {
          uniqueYears[year] = true
        } else {
          year = null;
        }

        if (repaymentDate > this.props.date) {
          cumulativeCoupon += repayment.couponAmount
        }


        _repaymentAll.push({
          date: this.parseDate(repayment.date),
          repeatLastYear: repeatLastYear,
          year: year,
          dateFormatted: repaymentDate.toDateString().substring(8, 10) + ' ' + repaymentDate.toDateString().substring(4, 7),
          couponRate: repayment.couponRate,
          couponAmount: repayment.couponAmount,
          couponAmountLC: !this.isInLocalCurrency ? repayment.couponAmount * currencyRate : void 0,
          redemptionOfPrincipal: repayment.redemption || null,
          redemptionOfPrincipalLC: repayment.redemption * currencyRate,
          cumulativeCoupon: cumulativeCoupon,
          cumulativeCouponLC: !this.isInLocalCurrency && cumulativeCoupon ? cumulativeCoupon * currencyRate : void 0
        })
      }

      let indexCurrent = -1;
      let i;
      for (let index = i = 0, len = _repaymentAll.length; i < len; index = ++i) {
        let repayment = _repaymentAll[index];
        if (repayment.date > this.props.date) {
          break;
        }
        indexCurrent = index;
      }

      this.repaymentPast = _repaymentAll.splice(0, indexCurrent + 1);
      if (this.repaymentPast.length) {
        this.repaymentPast[this.repaymentPast.length - 1].last = true;
      }

      this.repaymentCurrent = _repaymentAll.splice(0, 10)
      if (this.repaymentCurrent.length) {
        this.nextPayment = this.daysDiff(this.repaymentCurrent[0].date, this.props.date);
      }

      this.repaymentFuture = _repaymentAll;

      this._updateRepayment();

    }
  }

  parseDate(str) {
    if(!/^(\d){8}$/.test(str)) return 'invalid date';
    var y = str.substr(0,4),
      m = str.substr(4,2),
      d = str.substr(6,2);

    return new Date(y,(m-1),d);
  }


  _updateRepayment() {
    if (this.repaymentPast.length && this.repaymentCurrent.length == 0){
      this.isRepaymentPastVisible = true;
    }
    let _repaymentAll = [];
    if (this.isRepaymentPastVisible){
      _repaymentAll = _repaymentAll.concat(this.repaymentPast)
    }

    _repaymentAll = _repaymentAll.concat(this.repaymentCurrent);
    if (this.isRepaymentFutureVisible){
      _repaymentAll = _repaymentAll.concat(this.repaymentFuture)
    }

    this.setState({
      'repaymentSchedule': _repaymentAll
    })
  }


  daysDiff(d1, d2) {
    let timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }

  showRepaymentPast() {
    this.isRepaymentPastVisible = true;
    this._updateRepayment();
    this.render()
  }

  showRepaymentFuture() {
    this.isRepaymentFutureVisible = true;
    this._updateRepayment();
    this.render();
  }

  render(){
    let repaymentSchedule = this.state.repaymentSchedule;
    let nextPayment = this.nextPayment;
    let isInLocalCurrency = this.isInLocalCurrency;
    let localCurrency = this.localCurrency;
    let bondCurrency = this.bondCurrency;
    let isRepaymentPastVisible = this.isRepaymentPastVisible;
    let isRepaymentFutureVisible = this.isRepaymentFutureVisible;
    let repaymentPast = this.repaymentPast;
    let repaymentFuture = this.repaymentFuture;
    let issueDate = this.issueDate;
    let date = this.props.date;
    let showRepaymentFuture = this.showRepaymentFuture;
    let showRepaymentPast = this.showRepaymentPast;

    var listRepayment = repaymentSchedule.map(function(repayment, index) {
      return (
        <tr key={index} className={ style.bondRepaymentTable_row + ' ' + (repayment.date < date ? style.__past : '') + ' ' + (repayment.last ? style.__last : '') }>
          <td className={style.bondRepaymentTable_cell + ' ' + style.__date}>
            { (!repayment.year && !isRepaymentPastVisible && repaymentPast.length) ? repayment.repeatLastYear : repayment.year}
          </td>
          <td className={style.bondRepaymentTable_cell + ' ' + style.__date}>{repayment.dateFormatted}</td>
          <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
            {NumberFormatter(repayment.couponRate, {
                minFraction: 2,
                maxFraction: 2,
                group: true
              }
            )}</td>
          <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
            {NumberFormatter(repayment.couponAmount, {
                minFraction: 2,
                maxFraction: 2,
              group: true
              }
            )}</td>
          { !isInLocalCurrency &&
            <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
              {NumberFormatter(repayment.couponAmountLC, {
                  minFraction: 2,
                  maxFraction: 2,
                  group: true
                }
              )}
            </td>
          }
          <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
            {NumberFormatter(repayment.redemptionOfPrincipal, {
                minFraction: 0,
                maxFraction: 0,
              group: true
              }
            )}
          </td>
          { !isInLocalCurrency &&
            <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
              {NumberFormatter(repayment.redemptionOfPrincipalLC, {
                  minFraction: 0,
                  maxFraction: 0,
                  group: true
                }
              )}
            </td>

          }
          <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
            {NumberFormatter(repayment.cumulativeCoupon, {
                minFraction: 2,
                maxFraction: 2,
                group: true
              }
            )}
          </td>
          { !isInLocalCurrency &&
            <td className={style.bondRepaymentTable_cell + ' ' + style.__number}>
              {NumberFormatter(repayment.cumulativeCouponLC, {
                  minFraction: 2,
                  maxFraction: 2,
                  group: true
                }
              )}
            </td>
          }
        </tr>
      )
    })

    if(this.state.repaymentSchedule.length) {
      return (
        <div className={style.bondRepayment}>
          { !repaymentSchedule.length ?
            <div>
              <div className={style.bondRepaymentTitle}> Payment schedule</div>
              <p className={style.bondRepaymentNote}> No payment schedule data</p>
            </div>
            :
            <div className={style.bondRepaymentTitle}>
              <span>Payment schedule for</span>
              <span> 1 </span>
              <span>bond</span>
            </div>
          }
          { nextPayment ?
            <p className={style.bondRepaymentNote}>
              <span>{nextPayment}</span>
              <span> days to next payment</span>
            </p>
            : ''
          }
          { repaymentSchedule.length ?
            <table className={style.bondRepaymentTable}>
              <thead>
                <tr>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__header} colSpan={2}>Date</th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__header}>Coupon</th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__header} colSpan={isInLocalCurrency ? 1 : 2}>Coupon amount</th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__header} colSpan={isInLocalCurrency ? 1 : 2}>Amortization</th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__header} colSpan={isInLocalCurrency ? 1 : 2}>Cumulative coupon</th>
                </tr>
                <tr>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader} colSpan={2}></th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>%</th>
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>{bondCurrency}</th>
                  { !isInLocalCurrency &&
                    <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>
                    <span>{localCurrency}</span>
                    <span> equivalent</span>
                    </th>
                  }
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>{bondCurrency}</th>
                  { !isInLocalCurrency &&
                    <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>
                      <span>{localCurrency}</span>
                      <span> equivalent</span>
                    </th>
                  }
                  <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>{bondCurrency}</th>
                  { !isInLocalCurrency &&
                    <th className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__subheader}>
                      <span>{localCurrency}</span>
                      <span> equivalent</span>
                    </th>
                  }
                </tr>
              </thead>
              <tbody className={style.bondRepaymentTable_body}>
                { (!isRepaymentPastVisible && repaymentPast.length) ?
                  <tr>
                    <td colSpan={isInLocalCurrency ? 6 : 9}>
                      <a className={style.bondRepaymentTable_more} onClick={showRepaymentPast.bind(this)}>Past payments</a>
                    </td>
                  </tr>
                  : <tr></tr>
                }
                { (issueDate.date && isRepaymentPastVisible || repaymentPast.length == 0) &&
                    <tr className={style.bondRepaymentTable_row + ' ' + style.__past}>
                      <td className={style.bondRepaymentTable_cell + ' ' + style.__date}>
                        <span>{issueDate.year}</span>
                      </td>
                      <td className={style.bondRepaymentTable_cell + ' ' + style.__date}>
                        <span>{issueDate.date}</span>
                      </td>
                      <td className={style.bondRepaymentTable_cell + ' ' + style.__text + ' ' + style.__issue} colSpan={ isInLocalCurrency ? 4 : 7 }>
                        <span>— Issue date</span>
                      </td>
                    </tr>
                }

                {listRepayment}

                { (!isRepaymentFutureVisible && repaymentFuture.length) ?
                  <tr>
                    <td colSpan={ isInLocalCurrency ? 6 : 9 }>
                      <a className={style.bondRepaymentTable_more} onClick={showRepaymentFuture.bind(this)}>Future
                        payments</a>
                    </td>
                  </tr>
                  : <tr></tr>
                }
              </tbody>
            </table>
            : ''
          }

        </div>
      )} else {
      return <span>Loading...</span>
    }
  }
}

BondRepaymentTable.propTypes = {
  bond: React.PropTypes.object.isRequired,
  date: React.PropTypes.object.isRequired
};

export default BondRepaymentTable;
