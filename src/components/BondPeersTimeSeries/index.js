import React, { Component } from 'react';
import ChartTimeSeries from '../ChartTimeSeries';
import * as DataProvider from '../../data/providers/Data';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getColor } from '../../helpers/BondRating';
import Picker from '../Picker';
import moment from 'moment'
import styles from './styles.sass';

class BondPeersTimeSeries extends Component {
  constructor(props) {
    super(props);
    const yAxisPicker = [
      {label: 'Yield', value: 'yield'},
      {label: 'Price', value: 'price'},
      {label: 'Spread to sovereign', value: 'spreadToBMK'},
      // {label: 'ROE', value: 'roe'},
    ];
    this.state = {
      yAxisPicker,
      yAxis: 'yield',
      chartData: [],
      chartTimeSeries: []
    };
  }

  componentWillMount() {
    this.initChart();
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps.selectedPeersIsins);
  }

  initChart() {
    let dates = this.getDates('YYYYMMDD');
    let timeSeries = [];

    timeSeries.push(this.getTimeSeriesConfig());
    Promise.all([
      DataProvider.getTimeSeries(this.props.parentBond.isin, dates)
      ]).
    then((response)=> {
      this.setState({chartData: response, chartTimeSeries: timeSeries});
    });
  }

  updateChart(selectedPeersIsins) {
    let timeSeries = [];
    let promises = []
    let dates = this.getDates('YYYYMMDD');

    timeSeries.push(this.getTimeSeriesConfig());
    promises.push(DataProvider.getTimeSeries(this.props.parentBond.isin, dates));

    if(this.state.yAxis == 'yield' && this.props.showBenchmark) {
      // timeSeries.push({
      //   label: 'Benchmark curve',
      //   isin: peer.isin + 'Benchmark',
      //   dates: this.getDates('YYYY-MM-DD'),
      //   color: '#999',
      // });
    }

    const peersBonds = this.transformArrayToMap(this.props.peersBonds);

    for(let isin of selectedPeersIsins) {
      promises.push(
        DataProvider.getTimeSeries(isin, dates)
      );
      timeSeries.push({
        label: peersBonds[isin].info.standardName,
        isin: isin,
        dates: this.getDates('YYYY-MM-DD'),
        color: peersBonds[isin].color,
      });
    }
    Promise.all(promises).then((response)=> {
      this.setState({chartData: response, chartTimeSeries: timeSeries});
    });
  }

  transformArrayToMap(data) {
    let result = {};
    for(let item of data) {
      result[ item.isin ] = item;
    }
    return result;
  }

  getDates(format) {
    //TODO Need to make it work with period buttons
    const endDate = this.props.parentBond.date;
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 365);
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format(format) )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  getTimeSeriesConfig() {
    return {
      label: this.props.parentBond.info.name,
      isin: this.props.parentBond.isin,
      dates: this.getDates('YYYY-MM-DD'),
      color: getColor(this.props.parentBond.info.ratingGroup)
    };
  }

  getChartConfig(data, yAxis) {
    let dailyData = {};
    for(var key in data) {
      dailyData[key] = {};
      for(var value of data[key]) {
        if(value){
          let newDate = value.date;
          dailyData[key][newDate] = value;
        }
      }
    }
    return {
      axes: {
        x: 'date',
        y: yAxis
      },
      buildDailyData: (isin, date) => {
        let formattedDate = DateDayCaster.format(new Date(date));
        let obj = {
          'isin': isin,
          'date': date
        }
        if(dailyData[isin][formattedDate]) {
          obj[yAxis] = NumberFormatter(dailyData[isin][ formattedDate ][ yAxis ], { isPercent: yAxis, asNumber: true, placeholder: null });
        }
        return obj;
      }
    };
  }

  onYAxisPickerChange(pickerValue) {
    this.setState({ yAxis: pickerValue }, () => {
      this.updateChart(this.props.selectedPeersIsins);
    });
  }

  render() {
    return (
      <div className={styles.bondPeersTimeSeries}>
        <Picker className={styles.peersTimeSeriesPicker}
          pickerList={this.state.yAxisPicker}
          selectedPicker={this.state.yAxis}
          onPickerChange={this.onYAxisPickerChange.bind(this)} />
        <ChartTimeSeries
          chartData={this.state.chartData}
          chartTimeSeries={this.state.chartTimeSeries}
          chartConfig={this.getChartConfig}
          yAxis={this.state.yAxis}
        />
      </div>
    );
  }
}


BondPeersTimeSeries.propTypes = {
    parentBond: React.PropTypes.object.isRequired,
};

export default BondPeersTimeSeries;
