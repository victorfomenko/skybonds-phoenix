import React, { Component } from 'react';
import * as Data from '../../data/providers/Data';
import * as Market from '../../data/providers/Market';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import { getQuotes, getMax, getMin, getTotals, getTimestamp } from '../../helpers/BondBidAsk';
import DateFormatter from '../../helpers/formatters/DateFormatter';
import LoadingCover from '../LoadingCover';
import styles from './bondInfoBidAsk.sass';

class BondInfoBidAsk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'loaded': false
    };
    this._initValues()
  }

  componentWillMount() {
    this.initData(this.props.bond);
  }

  _initValues() {
    this.quotes = [];
    this.priceBidMax = null;
    this.priceAskMin = null;
    this.localCurrency = 'RUB';
    this.type = 'full';
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
      return (new Date(second.timestamp).getTime()) - (new Date(first.timestamp).getTime());
    });

    let _quotes = getQuotes(marketData, this.principal, this.currencyRate, this.type);
    this.quotes = _quotes;
    this.priceBidMax = getMax(_quotes);
    this.priceAskMin = getMin(_quotes);
    this.timestamp = getTimestamp(_quotes);
  }


  render() {
    let quotes = this.quotes;
    let priceBidMax = this.priceBidMax;
    let priceAskMin = this.priceAskMin;
    let timestamp = this.timestamp;

    let valueDecimal = null;
    if (this.type == 'full' ) {
      valueDecimal = 3;
    } else
    { valueDecimal = 2}

    if(this.state.loaded){
      console.log('1');
      var listQuotes = quotes.map(function(quote, index) {
        return (
        <tr className={styles.reportAsideBondBidAsk_row} key={index}>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text}>
            <span className={styles.reportAsideBondBidAsk_text} title={quote.name}>{quote.name}</span>
          </td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number + ' ' + styles.__price + ' ' + styles.__slash}>
            { quote.priceBid != null ?
              <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__bid + ' ' + (quote.priceBid == priceBidMax ? styles.__max : '')}>{NumberFormatter(quote.priceBid, { minFraction: valueDecimal, maxFraction: valueDecimal})}</span>
              :
              <span className={styles.reportAsideBondBidAsk_empty}>Last trade</span>
            }
          </td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number + ' ' + styles.__price}>
            { quote.priceAsk != null ?
              <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__ask + ' ' + (quote.priceAsk == priceAskMin ? styles.__min : '')}>{NumberFormatter(quote.priceAsk, { minFraction: valueDecimal, maxFraction: valueDecimal})}</span>
              :
              <span className={styles.reportAsideBondBidAsk_empty}>Last trade</span>
            }
          </td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</td>

          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number + ' ' + styles.__yield + ' ' + styles.__slash}>
            { quote.yieldBid != null ?
              <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__bid}>{NumberFormatter(quote.yieldBid, { minFraction: valueDecimal, maxFraction: valueDecimal})}</span>
              :
              <span className={styles.reportAsideBondBidAsk_empty}>Last trade</span>
            }
          </td>

          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number + ' ' + styles.__yield}>
            { quote.yieldAsk != null ?
              <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__ask}>{NumberFormatter(quote.yieldAsk, { minFraction: valueDecimal, maxFraction: valueDecimal})}</span>
              :
              <span className={styles.reportAsideBondBidAsk_empty}>Last trade</span>
            }
          </td>

          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</td>

          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number + ' ' + styles.__slash}>
            <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__bid}>{NumberFormatter(quote.sizeBid, { minFraction: 1, maxFraction: 1})}</span>
          </td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__number}>
            <span className={styles.reportAsideBondBidAsk_value + ' ' + styles.__ask}>{NumberFormatter(quote.sizeAsk, { minFraction: 1, maxFraction: 1})}</span>
          </td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</td>
          <td className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__time}>
            { quote.day ?
              <div className={styles.reportAsideBondBidAsk_day}>{quote.day}</div>
              : ''
            }
            <span className={styles.reportAsideBondBidAsk_time}>{quote.time}</span>
          </td>
        </tr>
        )

      });

      return (
        <div className={styles.reportAsideBondBidAskGeneral}>
          <div className={styles.reportAsideBondBidAsk_wrap}>
            <div className={styles.reportAsideBondBidAsk_title}>
              <span className={styles.reportAsideBondBidAsk_part + ' ' + styles.__bid}>Bid</span>
              <span> &</span>
                <span className={styles.reportAsideBondBidAsk_part + ' ' + styles.__ask}> Ask</span>
            </div>
            <table className={styles.reportAsideBondBidAsk}>
              <thead className={styles.reportAsideBondBidAsk_thead}>
                <tr className={styles.reportAsideBondBidAsk_row}>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text + ' ' + styles.__header + ' ' + styles.__shrink}></th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}>&nbsp;</th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text + ' ' + styles.__header + ' ' + styles.__shrink} colSpan={2}>Price
                  <span className={styles.reportAsideBondBidAsk_unit}> %</span>
                </th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}>&nbsp;</th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text + ' ' + styles.__header + ' ' + styles.__shrink} colSpan={2}>Yield
                  <span className={styles.reportAsideBondBidAsk_unit}> %</span>
                </th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text + ' ' + styles.__header + ' ' + styles.__shrink} colSpan={2}>Size
                  <span className={styles.reportAsideBondBidAsk_unit}>K</span>
                </th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__gap}> &nbsp;</th>
                <th className={styles.reportAsideBondBidAsk_cell + ' ' + styles.__text + ' ' + styles.__header + ' ' + styles.__shrink}></th>
                </tr>
              </thead>
              <tbody className={styles.reportAsideBondBidAsk_body}>
                {listQuotes}
              </tbody>
            </table>
            { (quotes.length == 0) ?
              <div className={styles.reportAsideBondBidAsk_nodata}>No market data</div>
              :
              ''
            }

            { timestamp ?
              <p className={styles.reportAsideBondBidAsk_timestamp}>
                <span>Last change </span>
                <span>{timestamp}</span>
                <span>. </span>
                <span>Delayed up to 15 minutes.</span>
                <span> Time in UTC.</span>
              </p>
              : ''
            }

          </div>
        </div>
      )
    } else {
      console.log('2');
      return <LoadingCover isLoading={ true } />
    }

  }

};

BondInfoBidAsk.propTypes = {
  bond: React.PropTypes.object.isRequired
};

export default BondInfoBidAsk;
