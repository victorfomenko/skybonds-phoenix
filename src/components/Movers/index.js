import React, { Component } from 'react';
import { connect } from 'react-redux';
import ButtonGroup from '../ButtonGroup';
import {isEqual, mapValues} from 'lodash';
import { Icon, GLYPHS } from '../../components/Icon';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import style from './styles.sass';

import { loadMovers, openBondInfo } from '../../actions';

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

    this.onClickByMover = this.onClickByMover.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!isEqual(nextProps.isins, this.props.isins)) {
      const periods = this.getPeriodRange(nextProps.movers.selectedPeriod);
      this.loadMovers(nextProps.isins, periods.startDate, periods.endDate, nextProps.movers.selectedPeriod, nextProps.movers.selectedUnit);
    }
    this.setState({isLoaded: true});
  }

  async loadMovers(isins, startDate, endDate, selectedPeriod, selectedUnit){
    this.setState({isLoaded: false});
    if(isins) {
      await this.props.loadMovers({ isins, startDate: startDate, endDate: endDate, selectedPeriod, selectedUnit});
    }
  }

  getLastDate() {
    // TODO !!Client date can be wrong!!
    // Better is get date from server
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

  onUnitChange(unit) {
    let periods = this.getPeriodRange(this.props.movers.selectedPeriod);
    this.loadMovers(this.props.isins, periods.startDate, periods.endDate, this.props.movers.selectedPeriod, unit);
  }

  onPeriodChange(period) {
    let periods = this.getPeriodRange(period);
    this.loadMovers(this.props.isins, periods.startDate, periods.endDate, period, this.props.movers.selectedUnit);
  }

  async onClickByMover(isin) {
    await this.props.openBondInfo(isin, this.getLastDate())
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
        let portfolioIcon = <Icon glyph={GLYPHS.TRIANGLE} width="10" height="10" />;
        let bond = movers.bonds[key];
        let selectedUnit = movers.selectedUnit;
        if(movers.selectedUnit == 'spread') {
          selectedUnit = 'spreadToBMK';
        }
        let unitValue = (bond.dailyData) ? bond.dailyData[selectedUnit] : null;
        unitValue = NumberFormatter(unitValue, {minFraction: 2, maxFraction: 2});
        let change = NumberFormatter((bond.change/100), {minFraction: 2, maxFraction: 2});
        let changeRel = (unitValue) ? Math.round(change / unitValue * 100) : null;
        changeRel = NumberFormatter(changeRel, {minFraction: 2, maxFraction: 2});

        if(bond.moverType == 'increase') {
          increase.push(
            <tr key={'marketmover_' + key }
                className={style.reportAsideMoversTable_row}
                onMouseEnter={()=>this.props.onActiveIsinChange(bond.isin)}
                onMouseLeave={()=>this.props.onActiveIsinChange(null)}
                onClick={ () => this.onClickByMover(bond.isin) }
            >
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}>
                {(bond.inBondPortfolio) ? portfolioIcon : ''}
              </td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
                <div className={style.reportAsideMoversTable_value}>{bond.staticData.standardName}</div>
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
            <tr key={'marketmover_' + key }
                className={style.reportAsideMoversTable_row}
                onMouseEnter={()=>this.props.onActiveIsinChange(bond.isin)}
                onMouseLeave={()=>this.props.onActiveIsinChange(null)}
                onClick={ () => this.onClickByMover(bond.isin) }>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}>
                {(bond.inBondPortfolio) ? portfolioIcon : ''}
              </td>
              <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>
                <div className={style.reportAsideMoversTable_value}>{bond.staticData.standardName}</div>
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
              onButtonClick={this.onUnitChange.bind(this)}
              selectedButton={movers.selectedUnit}
            />
          </div>
          </div>
          <div className={style.reportAsideMoversPeriod}>
            <ButtonGroup
              buttons={this.state.periodList}
              onButtonClick={this.onPeriodChange.bind(this)}
              selectedButton={movers.selectedPeriod}
            />
          </div>
          <div className={style.reportAsideMovers_content}>
            <div className={style.reportAsideMovers_wrap}>
              <table className={style.reportAsideMoversTable}>
                <thead className={style.reportAsideMoversTable_header}>
                  <tr className={style.reportAsideMoversTable_row + ' ' + style.__top}>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__symbol}></td>
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>Biggest rise</td>
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
                    <td className={style.reportAsideMoversTable_cell + ' ' + style.__name}>Biggest fall</td>
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
  loadMovers: React.PropTypes.func.isRequired,
  openBondInfo: React.PropTypes.func.isRequired,
  onActiveIsinChange: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ movers: state.reports.market.movers });
export default connect(mapStateToProps, { loadMovers, openBondInfo })(Movers);
