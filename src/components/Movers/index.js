import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from '../ButtonGroup';
import {isEqual, mapValues} from 'lodash';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import style from './styles.sass';

import { loadMovers } from '../../actions';

class Movers extends Component {

  constructor(props) {
    super(props);
    const unitList = [{label: 'price', value: 'price'},
                      {label: 'yield', value: 'yield'},
                      {label: 'spread', value: 'spread'}];

    const periodList = [{value: 'D'},
                      {value: '7D'},
                      {value: '14D'},
                      {value: 'M'},
                      {value: '3M'}];
    this.state = { unitList, periodList, isLoaded: true};
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps, this.props)) {
      const periods = this.getPeriodRange(nextProps.movers.selectedPeriod);
      this.loadMovers(nextProps.isins, periods.startDate, periods.endDate, nextProps.movers.selectedPeriod, nextProps.movers.selectedUnit);
    }
    this.setState({isLoaded: true});
  }

  getLastDate() {
    let endDate = new Date();
    endDate.setDate(endDate.getDate() - 3);
    return endDate;
  }

  getPeriodRange(period) {
    let endDate = this.getLastDate();
    let startDate = this.getLastDate();
    switch(period) {
      case '7D':
        startDate.setDate(startDate.getDate() - 7); break;
      case '14D':
        startDate.setDate(startDate.getDate() - 14); break;
      case 'M':
        startDate.setDate(startDate.getDate() - 30); break;
      case '3M':
        startDate.setDate(startDate.getDate() - 90); break;
      case 'D':
        startDate.setDate(startDate.getDate() - 1); break;
    }

    return { startDate, endDate };
  }

  async loadMovers(isins, startDate, endDate, selectedPeriod, selectedUnit){
    this.setState({isLoaded: false});
    if(isins) {
      await this.props.loadMovers({ isins, startDate: startDate, endDate: endDate, selectedPeriod, selectedUnit});
    }
  }


  handleUnitChange(unit) {
    let periods = this.getPeriodRange(this.props.movers.selectedPeriod);
    this.loadMovers(this.props.isins, periods.startDate, periods.endDate, this.props.movers.selectedPeriod, unit);
  }

  handlePeriodChange(period) {
    let periods = this.getPeriodRange(period);
    this.loadMovers(this.props.isins, periods.startDate, periods.endDate, period, this.props.movers.selectedUnit);
  }

  render() {
    var movers = this.props.movers;
    let increase = [];
    let decrease = [];
    if(Object.keys(movers.bonds) == 0) {
      increase =
        <tr className={style.reportAsideMoversTable_row}>
          <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
          <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
            No data
          </td>
        </tr>
      decrease =
        <tr className={style.reportAsideMoversTable_row}>
          <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
          <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
            No data
          </td>
        </tr>
    } else {
      for (var key in movers.bonds) {
        let bond = movers.bonds[key];
        let selectedUnit = movers.selectedUnit;
        if(movers.selectedUnit == 'spread') {
          selectedUnit = 'spreadToBMK';
        }
        let unitValue = (bond.dailyData) ? bond.dailyData[selectedUnit] : null;
        let change = NumberFormatter(bond.change, {minFraction: 2, maxFraction: 2});
        unitValue = NumberFormatter(unitValue, {minFraction: 2, maxFraction: 2});
        let changeRel = (unitValue) ? Math.round(bond.change / unitValue * 100) : null;
        changeRel = NumberFormatter(changeRel, {minFraction: 2, maxFraction: 2});

        if(bond.moverType == 'increase') {
          increase.push(
            <tr key={'marketmover_' + key } className={style.reportAsideMoversTable_row}>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
                <div className={style.reportAsideMoversTable_value}>{bond.staticData.name}</div>
              </td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__current}>{unitValue}</td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}><span>
              {(change>0)? '+' : ''}</span><span>{change}</span></td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}><span>
                  {(changeRel>0)? '+' : ''}
              </span><span>{changeRel}</span></td>
            </tr>
          );
        }
        else if(bond.moverType == 'decrease') {
          decrease.push(
            <tr key={'marketmover_' + key } className={style.reportAsideMoversTable_row}>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
                <div className={style.reportAsideMoversTable_value}>{bond.staticData.name}</div>
              </td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__current}>{unitValue}</td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}><span></span><span>{change}</span></td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}><span></span><span>{changeRel}</span></td>
            </tr>
          );
        }
      }
    }

    if(this.state.isLoaded) {
      return (
        <div className={style.reportAsideMovers}>
          <div className={style.reportAsideMovers_header}><span>Market movers by
          </span>
          <div className={style.reportAsideMoversUnit}>
            <ButtonGroup
              buttons={this.state.unitList}
              onButtonClick={this.handleUnitChange.bind(this)}
              selectedButton={movers.selectedUnit}
            />
          </div>
          </div>
          <div className={style.reportAsideMoversPeriod}>
            <ButtonGroup
              buttons={this.state.periodList}
              onButtonClick={this.handlePeriodChange.bind(this)}
              selectedButton={movers.selectedPeriod}
            />
          </div>
          <div className={style.reportAsideMovers_content}>
            <div className={style.reportAsideMovers_wrap}>
              <table className={style.reportAsideMoversTable}>
                <thead className={style.reportAsideMoversTable_header}>
                  <tr className={style.reportAsideMoversTable_row + ' ' + style.__top}>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>Biggest Increase</td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__current}><span>Last </span><span></span><span className={style.reportAsideMoversTable_unit}>%</span></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}>Δ for {movers.selectedPeriod}<span></span><span className={style.reportAsideMoversTable_unit}> BPS</span></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}>Δ<span className={style.reportAsideMoversTable_unit}> BPS</span></td>
                  </tr>
                </thead>
                <tbody className={style.reportAsideMoversTable_body}>
                  {increase}
                </tbody>
              </table>
              <table className={style.reportAsideMoversTable}>
                <thead className={style.reportAsideMoversTable_header}>
                  <tr className={style.reportAsideMoversTable_row + ' ' + style.__top}>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>Biggest Decrease</td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__current}><span>Last </span><span></span><span className={style.reportAsideMoversTable_unit}>%</span></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}>Δ for <span></span><span className={style.reportAsideMoversTable_unit}> BPS</span></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__change}>Δ<span className={style.reportAsideMoversTable_unit}> BPS</span></td>
                  </tr>
                </thead>
                <tbody className={style.reportAsideMoversTable_body}>
                  {decrease}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div>Loading...</div>);
    }
  }
}

Movers.propTypes = {
  loadMovers: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ movers: state.reports.market.movers });
export default connect(mapStateToProps, { loadMovers })(Movers);
