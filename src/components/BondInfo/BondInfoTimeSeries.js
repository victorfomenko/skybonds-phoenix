import React, { Component } from 'react';
import ChartTimeSeries from '../ChartTimeSeries';
import * as DataProvider from '../../data/providers/Data';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getColor } from '../../helpers/BondRating';
import { getStartDateByPeriod } from '../../helpers/BondDatePeriod';
import { connect } from 'react-redux';
import moment from 'moment'
import styles from './BondInfoTimeSeries.sass';

class BondInfoTimeSeries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartTimeSeries: []
    }
  }

  componentWillMount() {
    this.refreshChart(this.props.period);
  }

  componentWillReceiveProps(nextProps) {
    this.refreshChart(nextProps.period);
  }

  refreshChart(period = null) {
    let dates = this.getDates(period, 'YYYYMMDD');
    let timeSeries = [];
    timeSeries.push(this.getTimeSeriesConfig(period));

    Promise.all([DataProvider.getTimeSeries(this.props.bond.isin, dates)])
      .then((response)=> {
        this.setState({chartData: response, chartTimeSeries: timeSeries});
      });
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

  getTimeSeriesConfig(period) {
    return {
      isin: this.props.bond.isin,
      dates: this.getDates(period, 'YYYY-MM-DD'),
      color: getColor(this.props.bond.info.ratingGroup),
      isActive: true
    };
  }

  getChartConfig(data) {
    let yAxis = this.props.yAxis;
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
    let config = {
      axes: {
        x: 'date',
        y: yAxis
      },
      margin: {
        top: 10,
        right: 0,
        bottom: 21,
        left: 0
      },
      buildDailyData: (isin, date) => {
        let formattedDate = DateDayCaster.format(new Date(date));
        let obj = {
          'isin': isin,
          'date': date
        };
        if(dailyData[isin] && dailyData[isin][formattedDate]) {
          obj[yAxis] = NumberFormatter(dailyData[isin][ formattedDate ][ yAxis ], { isPercent: yAxis, asNumber: true, placeholder: null });
        }
        return obj;
      }
    };


    return config
  }

  render() {
    return (
      <div className={styles.bondInfoTimeSeriesDiagram}>
        <ChartTimeSeries
          chartData={this.state.chartData}
          chartTimeSeries={this.state.chartTimeSeries}
          chartConfig={this.getChartConfig.bind(this)}
          yAxis={this.props.yAxis}
        />
      </div>
    );
  }

}

BondInfoTimeSeries.propTypes = {
  yAxis: React.PropTypes.string.isRequired,
  period: React.PropTypes.string.isRequired,
  chartConfig: React.PropTypes.object
};

const mapStateToProps = state => ({ summary: state.summary });
export default connect(mapStateToProps)(BondInfoTimeSeries);
