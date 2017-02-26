import React, { Component } from 'react';
import BondInfoTimeSeries from './BondInfoTimeSeries';
import ButtonGroup from '../ButtonGroup';
import styles from './bondInfoChart.sass';


class BondInfoChart extends Component {

  constructor(props) {
    super(props);

    const unitList = [{label: 'Price', value: 'price'},
      {label: 'Yield', value: 'yield'},
      {label: 'Spread', value: 'spreadToBMK'}];

    const periodList = [{label: 'W', value: '7d'},
      {label: 'M', value: '1m'},
      {label: 'Q', value: '3m'},
      {label: 'Y', value: '1y'},
      {label: '∞', value: 'max'}];

    this.state = {
      unitList,
      periodList,
      selectedUnit: 'price',
      selectedPeriod: '1m'
    };

  }

  componentWillMount() {}

  onUnitChange(unit) {
    this.setState({
        selectedUnit: unit
      })
  }

  onPeriodChange(period) {
    this.setState({
      selectedPeriod: period
    })
  }

  render() {

    return (
      <div className={styles.bondInfoTimeSeries}>
        <div className={styles.bondInfoChartUnit}>
          <ButtonGroup
            buttons={this.state.unitList}
            onButtonClick={this.onUnitChange.bind(this)}
            selectedButton={this.state.selectedUnit}
          />
        </div>
        <div className={styles.bondInfoChartPeriod}>
          <ButtonGroup
            buttons={this.state.periodList}
            onButtonClick={this.onPeriodChange.bind(this)}
            selectedButton={this.state.selectedPeriod}
          />
        </div>
        <BondInfoTimeSeries bond={this.props.bond} yAxis={this.state.selectedUnit} period={this.state.selectedPeriod}/>
      </div>
    );
  }

}

BondInfoChart.propTypes = {
  yAxis: React.PropTypes.string.isRequired
};

export default BondInfoChart;
