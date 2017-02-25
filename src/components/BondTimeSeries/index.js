import React, { Component } from 'react';
import ChartTimeSeries from '../ChartTimeSeries';
import * as DataProvider from '../../data/providers/Data';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getColor } from '../../helpers/BondRating';
import moment from 'moment'
import styles from './styles.sass';

class BondTimeSeries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartTimeSeries: []
    }
  }

  componentWillMount() {
    this.initChart();
  }

  initChart() {
    let dates = this.getDates('YYYYMMDD');
    let timeSeries = [];
    timeSeries.push(this.getTimeSeriesConfig());

    Promise.all([DataProvider.getTimeSeries(this.props.bond.isin, dates)])
    .then((response)=> {
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
        isin: this.props.bond.isin,
        dates: this.getDates('YYYY-MM-DD'),
        color: getColor(this.props.bond.info.ratingGroup),
        isActive: true
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
        if(dailyData[isin] && dailyData[isin][formattedDate]) {
          obj[yAxis] = NumberFormatter(dailyData[isin][ formattedDate ][ yAxis ], { isPercent: yAxis, asNumber: true, placeholder: null });
        }
        return obj;
      }
    };
  }

  render() {
    return (
      <div className={styles.priceTS}>
        <ChartTimeSeries
          chartData={this.state.chartData}
          chartTimeSeries={this.state.chartTimeSeries}
          chartConfig={this.getChartConfig}
          yAxis={this.props.yAxis}
        />
      </div>
    );
  }

}

BondTimeSeries.propTypes = {
    yAxis: React.PropTypes.string.isRequired,
};

export default BondTimeSeries;
