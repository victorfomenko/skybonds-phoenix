import React, { Component } from 'react';
import ChartTimeSeries from '../ChartTimeSeries';
import * as DataProvider from '../../data/providers/Data';
import * as NewtonProvider from '../../data/providers/Newton';
import { connect } from 'react-redux';
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
    this.updateChart(nextProps.selectedPeers);
  }

  initChart() {
    let dates = this.getDates('YYYYMMDD');
    let timeSeries = [];

    timeSeries.push(this.getTimeSeriesConfig());
    Promise.all([
      DataProvider.getTimeSeries(this.props.bond.isin, dates)
      ]).
    then((response)=> {
      this.setState({chartData: response, chartTimeSeries: timeSeries});
    });
  }

  updateChart(selectedPeers) {
    let timeSeries = [];
    let promises = []
    let dates = this.getDates('YYYYMMDD');

    timeSeries.push(this.getTimeSeriesConfig());
    promises.push(DataProvider.getTimeSeries(this.props.bond.isin, dates));

    if(this.state.yAxis == 'yield' && this.props.showBenchmark) {
      // timeSeries.push({
      //   label: 'Benchmark curve',
      //   isin: peer.isin + 'Benchmark',
      //   dates: this.getDates('YYYY-MM-DD'),
      //   color: '#999',
      // });
    }

    for(let peer of selectedPeers) {
      promises.push(
        DataProvider.getTimeSeries(peer.isin, dates)
      );
      timeSeries.push({
        label: peer.name,
        isin: peer.isin,
        dates: this.getDates('YYYY-MM-DD'),
        color: peer.color,
      });
    }
    Promise.all(promises).then((response)=> {
      this.setState({chartData: response, chartTimeSeries: timeSeries});
    });
  }

  getDates(format) {
    //TODO Need to make it work with period buttons
    const endDate = this.props.bond.date;
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
      label: this.props.bond.info.name,
      isin: this.props.bond.isin,
      dates: this.getDates('YYYY-MM-DD'),
      color: getColor(this.props.bond.info.ratingGroup)
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
      this.updateChart(this.props.selectedPeers);
    });
  }

  render() {
    return (
      <div className={styles.peersTimeSeries}>
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
    bond: React.PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  selectedPeers: state.bond.selectedPeers,
  showBenchmark: state.bond.showBenchmark
});
export default connect( mapStateToProps )(BondPeersTimeSeries);
