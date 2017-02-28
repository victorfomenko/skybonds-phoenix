import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import * as Market from '../../data/providers/Market';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import { getQuotes, getMax, getMin, getTotals, getTimestamp } from '../../helpers/BondBidAsk';
import DateFormatter from '../../helpers/formatters/DateFormatter';
import style from './style.sass';

class BondBidAskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'loaded': false
    }
    this._initValues()
  }

  componentWillMount() {
    this.initData(this.props.bond);
  }

  _initValues() {
    this.quotes = [];
    this.priceBidMax = null;
    this.priceAskMin = null;
    this.totals = {};
    this.localCurrency = 'RUB';
    this.type = 'full'
    this.timestamp = null;
    this.currencyRate = null;
    this.principal = null;
  }

  async initData(bond = null) {
    if (bond.daily != null) {
      const rates = await Data.getRatesByDate(bond.daily.date);
      const market = await Market.getMarket(bond.isin);

      let bondCurrency = bond.info.ccy;

      this.currencyRate =  (bond.info.ccy == this.localCurrency) ? 1 : rates[bondCurrency];
      this.principal = bond.daily.principal || bond.info.principal;

      this._prepareData(market.data);
      this.setState({
        'loaded': true
      })
    }
  }

  _prepareData(marketData) {

    marketData.sort(function(first, second) {
      return (new Date(first.timestamp).getTime()) < (new Date(second.timestamp).getTime());
    });

    let _quotes = getQuotes(marketData, this.principal, this.currencyRate, this.type);
    this.quotes = _quotes;
    this.priceBidMax = getMax(_quotes);
    this.priceAskMin = getMin(_quotes);
    this.totals = getTotals(_quotes);
    this.timestamp = getTimestamp(_quotes);
  }


  render() {
    let bond = this.props.bond;
    let quotes = this.quotes;
    let priceBidMax = this.priceBidMax;
    let priceAskMin = this.priceAskMin;
    let totals = this.totals;
    let timestamp = this.timestamp;

    if(this.state.loaded){

      var listQuotes = this.quotes.map(function(quote) {
        return (

          <tr className={style.bondBidAskTable_row} key={quote.name}>
            <td className={style.bondBidAskTable_cell + ' ' + style.__text}>
              <span className={style.bondBidAskTable_text} >{quote.name}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__price + ' ' + style.__slash}>
              { (quote.priceBid != null) ?
                <span className={style.bondBidAskTable_value + ' ' + style.__bid + ' ' + ((quote.priceBid == priceBidMax) ? style.__max : '')}>{NumberFormatter(totals.priceBid, {
                  minFraction: 2,
                  maxFraction: 2
                }) }</span>
                :
                <span className={style.bondBidAskTable_empty}>Last trade</span>
              }
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__price}>
              { (quote.priceAsk) ?
                <span className={style.bondBidAskTable_value + ' ' + style.__bid + ' ' + ((quote.priceAsk == priceAskMin) ? style.__min : '')}>{NumberFormatter(totals.priceAsk, {
                  minFraction: 2,
                  maxFraction: 2
                })}</span>
                :
                <span className={style.bondBidAskTable_empty}>Last trade</span>
              }
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__spread}>
              <span className={style.bondBidAskTable_value}>{NumberFormatter(quote.priceSpread, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__yield + ' ' + style.__slash}>
              { (quote.yieldBid) ?
                <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(quote.yieldBid, {
                  minFraction: 2,
                  maxFraction: 2,
                  isPercent: true
                })}</span>
                :
                <span className={style.bondBidAskTable_empty}>Last trade</span>
              }
            </td>

            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__yield}>
              { (quote.yieldAsk) ?
                <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(quote.yieldAsk, {
                  minFraction: 2,
                  maxFraction: 2,
                  isPercent: true
                })}</span>
                :
                <span className={style.bondBidAskTable_empty}>Last trade</span>
              }
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__spread}>
              <span className={style.bondBidAskTable_value}>{NumberFormatter(quote.yieldSpread, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>


            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__slash}>
              <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(quote.sizeBid, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number}>
              <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(quote.sizeAsk, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>


            <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__slash}>
              <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(quote.marketValueBid, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__number}>
              <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(quote.marketValueAsk, {
                minFraction: 0,
                maxFraction: 0
              })}</span>
            </td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
            <td className={style.bondBidAskTable_cell + ' ' + style.__time}>
              <span className={style.bondBidAskTable_times}></span>
              { quote.day ?
                <div className={style.bondBidAskTable_day}>{quote.day}</div>
                : ''
              }
              <span className={style.bondBidAskTable_time}>{quote.time}</span>
            </td>
          </tr>


        );
      });

      return (
        <div className={style.bondBidAskTable} id="bidask">
          <div className={style.bondBidAskTable_wrap + ' ' + style.__full}>
            <div className={style.bondBidAskTable_title}>
              <span className={style.bondBidAskTable_part + ' ' + style.__bid}>Bid</span>
              <span> & </span>
              <span className={style.bondBidAskTable_part + ' ' + style.__ask}>Ask</span>
            </div>
            <table className={style.bondBidAskTable}>
              <thead>
              <tr>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink}></th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__gap}>&nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink} colSpan={3}>Price
                  <span className={style.bondBidAskTable_unit}> %</span>
                </th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink} colSpan={3}>Yield
                  <span className={style.bondBidAskTable_unit}> %</span>
                </th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink} colSpan={2}>Size
                  <span className={style.bondBidAskTable_unit}>K</span>
                </th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink} colSpan={2}>Market Value
                  <span className={style.bondBidAskTable_unit}>{bond.info.ccy}</span>
                </th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.__header + ' ' + style.__shrink}>
                  <span>Time</span>
                  <span className={style.bondBidAskTable_unit}>UTC</span>
                </th>
              </tr>
              <tr>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Bid</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Ask</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader + ' ' + style.__spread}>Spread</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Bid</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Ask</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader + ' ' + style.__spread}>Spread</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Bid</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Ask</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Bid</th>
                <th className={style.bondBidAskTable_cell + ' '  + style.__text + ' ' + style.__subheader}>Ask</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
                <th className={style.bondBidAskTable_cell + ' ' +style.__gap}> &nbsp;</th>
              </tr>
              </thead>
              <tbody className={style.bondBidAskTable_body}>
              <tr className={style.bondBidAskTable_row + ' ' + style.__average}>
                <td className={style.bondBidAskTable_cell + ' ' + style.__text + ' ' + style.bondBidAskTable_note}>Sum or weighted average</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__price + ' ' + style.__slash}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(totals.priceBid, {
                    minFraction: 2,
                    maxFraction: 2
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__price}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(totals.priceAsk, {
                    minFraction: 2,
                    maxFraction: 2
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__spread}>
                  <span className={style.bondBidAskTable_value}>{NumberFormatter(totals.priceSpread, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__yield + ' ' + style.__slash}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(totals.yieldBid, {
                    minFraction: 2,
                    maxFraction: 2,
                    isPercent: true
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__yield}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(totals.yieldAsk, {
                    minFraction: 2,
                    maxFraction: 2,
                    isPercent: true
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__spread}>
                  <span className={style.bondBidAskTable_value}>{NumberFormatter(totals.yieldSpread, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__slash}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(totals.sizeBid, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(totals.sizeAsk, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number + ' ' + style.__slash}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__bid}>{NumberFormatter(totals.marketValueBid, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__number}>
                  <span className={style.bondBidAskTable_value + ' ' + style.__ask}>{NumberFormatter(totals.marketValueAsk, {
                    minFraction: 0,
                    maxFraction: 0
                  })}</span>
                </td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__gap}> &nbsp;</td>
                <td className={style.bondBidAskTable_cell + ' ' + style.__time}>
                  <span className={style.bondBidAskTable_times}></span>
                  <span>{quotes.length}</span>
                  <span> times</span>
                </td>
              </tr>
              {listQuotes}
              </tbody>
            </table>
            { timestamp ?
              <p className={style.bondBidAskTable_timestamp}>
                <span>Last change </span>
                <span>{timestamp}</span>
                <span>. </span>
                <span>Delayed up to 15 minutes.</span>
              </p>
              : ''
            }
            { quotes.length == 0 ?
              <p className={style.bondBidAskTable_nodata}>No data.</p>
              : ''
            }
          </div>
        </div>
      )
    } else {
      return (
        <span>Loading...</span>
      );
    }

  }
}

BondBidAskTable.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondBidAskTable;
