import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartTimeSeries from '../ChartTimeSeries';
import ButtonGroup from '../ButtonGroup';
import * as DataProvider from '../../data/providers/Data';
import * as NewtonProvider from '../../data/providers/Newton';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getStartDateByPeriod } from '../../helpers/BondDatePeriod';
import { getColor } from '../../helpers/BondRating';
import Picker from '../Picker';
import moment from 'moment'
import styles from './styles.sass';

class BondPeersTimeSeries extends Component {
  constructor(props) {
    super(props);
    const periodList = [{label: '7D', value: '7d'},
      {label: 'M', value: '1m'},
      {label: '3M', value: '3m'},
      {label: '6M', value: '6m'},
      {label: 'Y', value: '1y'},
      {label: 'Past', value: 'max'}];

    const yAxisPicker = [
      {label: 'Yield', value: 'yield'},
      {label: 'Price', value: 'price'},
      {label: 'Spread to sovereign', value: 'spreadToBMK'},
      // {label: 'ROE', value: 'roe'},
    ];
    this.state = {
      yAxisPicker,
      yAxis: 'yield',
      periodList,
      selectedPeriod: '1m',
      chartData: [],
      chartTimeSeries: []
    };
  }

  componentWillMount() {
    this.initChart();
  }

  componentWillReceiveProps(nextProps) {
    this.updateChart(nextProps.selectedPeersIsins, nextProps.showBenchmark);
  }
  initChart() {
    let dates = this.getDates(this.state.selectedPeriod, 'YYYYMMDD');
    let timeSeries = [];

    timeSeries.push(this.getTimeSeriesConfig());
    Promise.all([
      DataProvider.getTimeSeries(this.props.parentBond.isin, dates)
      ]).
    then((response)=> {
      this.setState({chartData: response, chartTimeSeries: timeSeries});
    });
  }

  updateChart(selectedPeersIsins, showBenchmark) {
    let timeSeries = [];
    let promises = []
    let dates = this.getDates(this.state.selectedPeriod, 'YYYYMMDD');

    timeSeries.push(this.getTimeSeriesConfig());
    promises.push(DataProvider.getTimeSeries(this.props.parentBond.isin, dates));


    const peersBonds = this.transformArrayToMap(this.props.peersBonds);

    for(let isin of selectedPeersIsins) {
      promises.push(
        DataProvider.getTimeSeries(isin, dates)
      );
      timeSeries.push({
        label: peersBonds[isin].info.standardName,
        isin: isin,
        dates: this.getDates(this.state.selectedPeriod, 'YYYY-MM-DD'),
        color: peersBonds[isin].color,
      });
    }

    if(this.state.yAxis == 'yield' && showBenchmark) {
      let dateRange = this.getDateRange(this.state.selectedPeriod, 'YYYYMMDD');
      timeSeries.push({
        label: 'Benchmark curve',
        isin: this.props.parentBond.isin + 'Benchmark',
        dates: this.getDates(this.state.selectedPeriod, 'YYYY-MM-DD'),
        color: '#999',
      });
      promises.push(NewtonProvider.getBondBenchmark(this.props.parentBond.isin, dateRange.startDate, dateRange.endDate));
    }

    Promise.all(promises).then((response)=> {
      let data = response;
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

  getDates(period, format) {
    let startDate = null;
    if (period == 'max') {
      startDate = this.props.summary.dataSince
    } else {
      startDate = getStartDateByPeriod(this.props.summary.today, period);
    }

    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format(format) );
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  getDateRange(period, format) {
    let startDate = null;
    if (period == 'max') {
      startDate = this.props.summary.dataSince
    } else {
      startDate = getStartDateByPeriod(this.props.summary.today, period);
    }
    let endDate = this.props.summary.today;
    startDate = DateDayCaster.format(startDate);
    endDate = DateDayCaster.format(endDate);
    return { startDate, endDate };
  }


  getTimeSeriesConfig() {
    return {
      label: this.props.parentBond.info.name,
      isin: this.props.parentBond.isin,
      dates: this.getDates(this.state.selectedPeriod, 'YYYY-MM-DD'),
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
          if (isin.includes('Benchmark') && yAxis == 'yield'){
            obj[yAxis] = NumberFormatter(dailyData[isin][ formattedDate ][ 'yieldOfPeers' ], { isPercent: yAxis, asNumber: true, placeholder: null });
            return obj;
          }
          obj[yAxis] = NumberFormatter(dailyData[isin][ formattedDate ][ yAxis ], { isPercent: yAxis, asNumber: true, placeholder: null });
        }
        return obj;
      }
    };
  }

  onYAxisPickerChange(pickerValue) {
    this.setState({ yAxis: pickerValue }, () => {
      this.updateChart(this.props.selectedPeersIsins, this.props.showBenchmark);
    });
  }

  onPeriodChange(period) {
    this.setState({ selectedPeriod: period }, () => {
      this.updateChart(this.props.selectedPeersIsins, this.props.showBenchmark);
    });
  }

  render() {
    return (
      <div className={styles.bondPeersTimeSeries}>
        <div className={styles.bondPeersAxisYPicker}>
          <Picker className={styles.peersTimeSeriesPicker}
            pickerList={this.state.yAxisPicker}
            selectedPicker={this.state.yAxis}
            onPickerChange={this.onYAxisPickerChange.bind(this)} />
        </div>
        <div className={styles.bondPeersPeriodPicker}>
          <ButtonGroup
            buttons={this.state.periodList}
            onButtonClick={this.onPeriodChange.bind(this)}
            selectedButton={this.state.selectedPeriod}
          />
        </div>
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

const mapStateToProps = state => ({ summary: state.summary });
export default connect(mapStateToProps)(BondPeersTimeSeries);
