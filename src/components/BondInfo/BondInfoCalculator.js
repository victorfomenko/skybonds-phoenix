import React, { Component } from 'react';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import { isPortfolioScb } from '../../helpers/portfolio';
import { connect } from 'react-redux';
import * as PortfolioData from '../../data/providers/Portfolio';
import * as Data from '../../data/providers/Data';
import { Icon, GLYPHS } from '../../components/Icon';
import DateDayCaster from '../../data/casters/DateDayCaster';
import styles from './bondInfoCalculator.sass';


class BondInfoCalculator extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._initValues();
    this._refreshCalculator();
  }

  _initValues() {
    this.priceBase = this.props.bond.daily.price;
    this.yieldBase = this.props.bond.daily.yield*100;

    this.localCurrency = 'RUB';

    this.state = {
      priceValue: '',
      yieldValue: '',
      priceSettings: {
        min: null,
        max: null
      },
      yieldSettings: {
        min: null,
        max: null
      },
      tr: null,
      mtr: null,
      mtrFromTr: null,
      roe:  null,
      roeFromTr: null,
    };

  }

  isCalculatorChanged() {
    let priceBase = NumberFormatter(this.priceBase, { minFraction: 2, maxFraction: 2} );
    let yieldBase = NumberFormatter(this.yieldBase, { minFraction: 2, maxFraction: 2} );
    return priceBase != this.state.priceValue || yieldBase != this.state.yieldValue
  }

  onPriceChange(event) {

    let priceValue = event.target.value;
    let yieldValue = this._calculateYieldData(priceValue);
    let tr = this._calculateTrDailyData(yieldValue);
    let portfolioData = this._calculatePortfolioData(yieldValue);
    let updatedState = portfolioData;
    updatedState.yieldValue = NumberFormatter(yieldValue, { minFraction: 2, maxFraction: 2} );
    updatedState.priceValue = NumberFormatter(priceValue, { minFraction: 2, maxFraction: 2} );
    updatedState.tr = tr;
    this.setState(updatedState);
  }

  onYieldChange(event) {
    let yieldValue = event.target.value;
    let priceValue = this._calculatePriceData(yieldValue);
    let tr = this._calculateTrDailyData(yieldValue);
    let portfolioData = this._calculatePortfolioData(yieldValue);
    let updatedState = portfolioData;
    updatedState.yieldValue = NumberFormatter(yieldValue, { minFraction: 2, maxFraction: 2} );
    updatedState.priceValue = NumberFormatter(priceValue, { minFraction: 2, maxFraction: 2} );
    updatedState.tr = tr;
    this.setState(updatedState);
  }

  resetCalculator() {
    let priceData = this._getDefaultPriceData();
    let yieldData = this._getDefaultYieldData();
    let bondDailyPortfolio = this._getPortfolioData();
    let yieldValue = NumberFormatter(yieldData.yieldValue, { minFraction: 2, maxFraction: 2} );
    let tr = this._calculateTrDailyData(yieldValue);

    this.setState({
      priceValue: NumberFormatter(priceData.priceValue, { minFraction: 2, maxFraction: 2} ),
      yieldValue: NumberFormatter(yieldData.yieldValue, { minFraction: 2, maxFraction: 2} ),
      priceSettings: priceData.priceSettings,
      yieldSettings: yieldData.yieldSettings,
      mtr: bondDailyPortfolio.mtr,
      mtrFromTr: bondDailyPortfolio.mtrFromTr,
      roe:  bondDailyPortfolio.roe,
      roeFromTr:  bondDailyPortfolio.roeFromTr,
      tr: tr
    })
  }

  _getDefaultPriceData() {
    this.priceBase = this.props.bond.daily.price;
    let priceSettings = {
      min: this.priceBase - 2,
      max: this.priceBase + 2,
      step: 0.1
    };
    return {
      priceValue: this.priceBase,
      priceSettings: priceSettings
    }
  };

  _getDefaultYieldData() {
    this.yieldBase = this.props.bond.daily.yield*100;
    let yieldSettings = {
      min: this.yieldBase - 2,
      max: this.yieldBase + 2,
      step: 0.1
    };
    return {
      yieldValue: this.yieldBase,
      yieldSettings: yieldSettings
    }
  };

  _getPortfolioData() {
    if (this.bondDailyPortfolio == null) {return}
    return {
      mtr: this.bondDailyPortfolio.mtr,
      mtrFromTr: this.bondDailyPortfolio.mtrFromTr,
      roe: this.bondDailyPortfolio.roe*100,
      roeFromTr:  this.bondDailyPortfolio.roeFromTr*100
    };
  }

  async _refreshCalculator() {
    let isin = this.props.bond.isin;
    const rates = await await Data.getRatesByDate(DateDayCaster.format(this.props.bond.date));
    this.swapRate = rates.swap;

    this.bondDailyPortfolio = null;
    if(isPortfolioScb(this.props.user)) {
      const bondDailyPortfolioResp = await PortfolioData.getDailyData([ isin ], this.props.bond.date );
      this.bondDailyPortfolio = bondDailyPortfolioResp[0].data
    }
    this.resetCalculator()
  }

  _calculateYieldData (priceValue) {
    let duration = this.props.bond.daily.duration;
    let result = this.yieldBase + (priceValue - this.priceBase) * 100 / this.priceBase / -duration;
    return result
  }

  _calculatePriceData (yieldValue) {
    let duration = this.props.bond.daily.duration;
    let result = this.priceBase + this.priceBase * -duration * (yieldValue - this.yieldBase) / 100;
    return result
  }

  _calculateTrDailyData(yieldValue) {
    return Number(yieldValue) + this.props.bond.daily.rollDown*100
  }

  _calculatePortfolioData(yieldValue) {
    let fundingCost = this.bondDailyPortfolio.fundingCost*100;
    let equityPart = this.bondDailyPortfolio.equityPart;
    let depositPart = this.bondDailyPortfolio.depositPart;
    let duration = this.props.bond.daily.duration;
    let rollDown = this.props.bond.daily.rollDown*100;
    yieldValue = Number(yieldValue);
    let additional = null;
    if (this.props.bond.info.ccy == 'RUB') {
      additional = 0;
    } else {
      additional = this.swapRate * (equityPart + depositPart)
    }

    return {
      mtr: duration / (Number(yieldValue) - fundingCost + additional) * 12,
      mtrFromTr: duration / (Number(yieldValue) + rollDown - fundingCost + additional) * 12,
      roe: (Number(yieldValue) - fundingCost + additional) / equityPart,
      roeFromTr: (Number(yieldValue) + rollDown - fundingCost + additional) / equityPart
    };

  }

  render() {

    let bond = this.props.bond;
    return (
      <table className={styles.reportAsideBondCalculator_table}>
        <tbody>
        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Maturity</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.yearsToPutCallMaturity, {
            minFraction: 2,
            maxFraction: 2
          })}</td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={3}></td>
        </tr>
        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Duration</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.duration, {
            minFraction: 2,
            maxFraction: 2
          })}</td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={3}></td>
        </tr>

        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Price</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>
            <input
              type="text"
              className={styles.reportAsideBondCalculatorStrip_name + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')}
              onChange={this.onPriceChange.bind(this)}
              value={this.state.priceValue}

            />
          </td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={2}>
            <input type="range"
                   value={this.state.priceValue}
                   onChange={this.onPriceChange.bind(this)}
                   min={this.state.priceSettings.min}
                   max={this.state.priceSettings.max}
                   step={0.1}
                   className={styles.reportAsideBondCalculator_range}
            />
          </td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__reset}>
            { this.isCalculatorChanged() &&
              <span className={styles.reportAsideBondCalculator_reset}
                    onClick={ () => this.resetCalculator()}>
                <Icon glyph={GLYPHS.CLOSE}
                      width="10" height="10"/>
              </span>
            }
          </td>

        </tr>

        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Yield</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>
            <input
              type="text"
              className={styles.reportAsideBondCalculatorStrip_name + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')}
              onChange={this.onYieldChange.bind(this)}
              value={this.state.yieldValue}
            />
          </td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={2}>
            <input
              type="range"
              value={this.state.yieldValue}
              onChange={this.onYieldChange.bind(this)}
              step={0.1}
              min={this.state.yieldSettings.min}
              max={this.state.yieldSettings.max}
              className={styles.reportAsideBondCalculator_range}/>
          </td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__reset}>
            { this.isCalculatorChanged() &&
            <span className={styles.reportAsideBondCalculator_reset}
                  onClick={ () => this.resetCalculator()}>
                <Icon glyph={GLYPHS.CLOSE}
                      width="10" height="10"/>
              </span>
            }
          </td>
        </tr>

        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Expected First Year Roll Down</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.rollDown, { minFraction: 2, maxFraction: 2, isPercent: true} )}</td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={3}></td>
        </tr>

        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Yield with Roll Down</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')}>{NumberFormatter(this.state.tr, {
            minFraction: 2,
            maxFraction: 2
          })}</td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={3}></td>
        </tr>

        { this.state.mtr != null &&
        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Months to Recovery</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')}>{NumberFormatter(this.state.mtr, {
            minFraction: 2,
            maxFraction: 2
          })}</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')} colSpan={3}>
            <span className={styles.reportAsideBondCalculator_block}>{NumberFormatter(this.state.mtrFromTr, {
              minFraction: 2,
              maxFraction: 2
            })}</span> (TR)
          </td>
        </tr>
        }

        { this.state.roe != null &&
        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>ROE</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')}>{NumberFormatter(this.state.roe, { minFraction: 2, maxFraction: 2} )}</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + (this.isCalculatorChanged() ? styles.__modified : '')} colSpan={3}>
            <span className={styles.reportAsideBondCalculator_block}>{NumberFormatter(this.state.roeFromTr, { minFraction: 2, maxFraction: 2} )}</span> (TR)
          </td>
        </tr>
        }

        <tr className={styles.reportAsideBondCalculator_row}>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__title}>Coupon</td>
          <td className={styles.reportAsideBondCalculator_cell + ' ' + styles.__number}>{NumberFormatter(bond.daily.coupon, { minFraction: 2, maxFraction: 2} )}</td>
          <td className={styles.reportAsideBondCalculator_cell} colSpan={3}></td>
        </tr>
        </tbody>
      </table>
    );
  }

};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(BondInfoCalculator);
