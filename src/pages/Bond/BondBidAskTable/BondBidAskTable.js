import React, { Component } from 'react';
import * as Rates from '../../../data/providers/Rates';
import * as Market from '../../../data/providers/Market';
import NumberFormatter from '../../../helpers/formatters/NumberFormatter';
import DateFormatter from '../../../helpers/formatters/DateFormatter';
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
      const rates = await Rates.getByDate(bond.daily.date);
      const market = await Market.getMarket(bond.isin);

      let bondCurrency = bond.info.ccy;

      this.currencyRate =  (bond.info.ccy == this.localCurrency) ? 1 : rates[bondCurrency];
      this.principal = bond.daily.principal || bond.info.principal;

      this._prepareData(market.data)
      this.setState({
        'loaded': true
      })
    }
  }

  _prepareData(marketData) {

    marketData.sort(function(first, second) {
      return (new Date(first.timestamp).getTime()) < (new Date(second.timestamp).getTime());
    });

    let _quotes = this._getQuotes(marketData);
    this.quotes = _quotes;
    this.priceBidMax = this._getMax(_quotes);
    this.priceAskMin = this._getMin(_quotes);
    this.totals = this._getTotals(_quotes);
    this.timestamp = this._getTimestamp(_quotes);
  }

  _getMax(collection) {
    let max = null;
    for (let i = 0, len = collection.length; i < len; i++) {
      let quote = collection[i];
      if (quote.priceBid != null) {
        if ((max == null) || quote.priceBid > max) {
          max = quote.priceBid;
        }
      }
    }
    return max;
  }

  _getMin(collection) {
    let min = null;
    for (let i = 0, len = collection.length; i < len; i++) {
      let quote = collection[i];
      if (quote.priceAsk != null) {
        if ((min == null) || quote.priceAsk < min) {
          min = quote.priceAsk;
        }
      }
    }
    return min;
  }

  _getQuotes(collection = []) {
    let quotes = [];
    let quotesDays = {};
    for (let i = 0, len = collection.length; i < len; i++) {
      let quote = collection[i];

      if (!(quote.bid || quote.ask)) {
        continue;
      }
      let timestampDate = new Date(quote.timestamp);
      let quoteDay = timestampDate.toDateString().substring(8, 10) + ' ' + timestampDate.toDateString().substring(4, 7)

      if (!quotesDays[quoteDay]) {
        quotesDays[quoteDay] = true;
      } else {
        quoteDay = null;
      }
      quotes.push({
        name: quote.source,
        priceBid: quote.bid,
        yieldBid: quote.bidYield,
        sizeBid: this.type === 'short' && (quote.bidSize != null) ? quote.bidSize / 1000 : quote.bidSize,
        marketValueBid: quote.bidSize * this.principal * quote.bid * this.currencyRate || null,
        priceAsk: quote.ask,
        yieldAsk: quote.askYield,
        sizeAsk: this.type === 'short' && (quote.askSize != null) ? quote.askSize / 1000 : quote.askSize,
        marketValueAsk: quote.askSize * this.principal * quote.ask * this.currencyRate || null,
        priceSpread: quote.bidAskPriceSpread,
        yieldSpread: quote.bidAskYieldSpread,
        date: quote.timestamp,
        day: quoteDay,
        time: this._getTimeByTimestamp(quote.timestamp)
      });
    }
    return quotes;
  }

  _getTotals(collection) {
    return {
      priceBid: this._getWeightedAverage(collection, 'priceBid'),
      priceAsk: this._getWeightedAverage(collection, 'priceAsk'),
      priceSpread: this._getWeightedAverage(collection, 'priceSpread'),
      yieldBid: this._getWeightedAverage(collection, 'yieldBid'),
      yieldAsk: this._getWeightedAverage(collection, 'yieldAsk'),
      yieldSpread: this._getWeightedAverage(collection, 'yieldSpread'),
      sizeBid: this._getSum(collection, 'sizeBid'),
      sizeAsk: this._getSum(collection, 'sizeAsk'),
      marketValueBid: this._getSum(collection, 'marketValueBid'),
      marketValueAsk: this._getSum(collection, 'marketValueAsk')
    };
  }

  _getWeightedAverage(collection, field) {
    let count, i, len, quote, sum;
    count = 0;
    sum = 0;
    for (i = 0, len = collection.length; i < len; i++) {
      quote = collection[i];
      if (!(quote[field] != null)) {
        continue;
      }
      sum += quote[field];
      count++;
    }
    return sum / count || null;
  }

  _getSum(collection, field) {
    let i, len, quote, sum;
    sum = 0;
    for (i = 0, len = collection.length; i < len; i++) {
      quote = collection[i];
      if (quote[field] != null) {
        sum += quote[field];
      }
    }
    return sum || null;
  }

  _getTimeByTimestamp(timestamp) {
    if (timestamp) {
      return timestamp.slice(-9, -4)
    }

  }

  _getTimestamp(collection) {

    let ref;
    if ((ref = collection[0]) != null ? ref.date : void 0) {
      let diffTime = new Date().getTime() - (new Date(collection[0].date)).getTime();

      let seconds=(diffTime/1000)%60;
      let minutes=(diffTime/(1000*60))%60;
      let hours=(diffTime/(1000*60*60))%24;

      let roundHours = Math.floor(hours)
      if ( 1 <= roundHours <= 2 ) {
        return roundHours + ' hour ago'
      }

      if (roundHours >= 2) {
        return roundHours + ' hours ago'
      }

      let roundMinutes = Math.floor(minutes)
      if ( 1 <= roundMinutes <= 2 ) {
        return roundMinutes + ' minute ago'
      }

      if (roundMinutes >= 2) {
        return roundMinutes + ' minutes ago'
      }

      let roundSeconds = Math.floor(seconds)
      if ( 1 <= roundSeconds <= 2 ) {
        return roundSeconds + ' second ago'
      }

      if (roundSeconds >= 2) {
        return roundSeconds + ' seconds ago'
      }



      return {
        'seconds': seconds,
        'minutes': minutes,
        'hours': hours
      }
    } else {
      return null;
    }
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
