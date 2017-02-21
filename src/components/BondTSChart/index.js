import React, { Component } from 'react';
import { Chart, ChartDocument, ChartPlugins } from '@skybonds/ui-component-chart';
import * as DataProvider from '../../data/providers/Data';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import DateDayCaster from '../../data/casters/DateDayCaster';
import { getColor } from '../../helpers/BondRating';
import moment from 'moment'
import styles from './styles.sass';

const DEFAULT_CONFIG = {
  backgroundColor: '#fff',
  labelStyle:{
    color: '#000',
    fontSize: '10px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    textHeight: 11.5,
    textPadding: 4,
    opacity: 0.8,
  },
  margin: {
    top: 0,
    right: 42,
    bottom: 38,
    left: 0
  },
  paddingCoefficient: 0.25,
  localRegressionBandwidth: 0.9,
  axes: {
    x: 'date',
    y: 'price'
  },
  axesLimits: {
    x: [0, Infinity],
    y: [-Infinity, Infinity]
  },
  disableZoom: true,
  maxZoom: 1,
  zoom: {
    scale: 1,
    center: {
      x: 0.5,
      y: 0.5
    }
  },
};


class BondTSChart extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.initChart();
    this.updateChart();
    // TODO: this hack enforces recalculation of chart borders, do this elsewhere
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  initChart() {
    this.timeSeriesPlugin = new ChartPlugins.TimeSeriesPlugin;
    this.valueSeriesPlugin = new ChartPlugins.ValueScannerPlugin;

    this.timeSeriesPlugin.update({ timeSeries : [] });

    let chartDocumentConfig = _.clone(DEFAULT_CONFIG);
    chartDocumentConfig.plugins = [
      this.timeSeriesPlugin,
      this.valueSeriesPlugin
    ];
    this.chartDocument = new ChartDocument(chartDocumentConfig);
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

  refreshChart(data) {
    const bond = this.props.bond;
    let timeSeries = [];
    timeSeries.push(this.getTimeSeriesConfig());
    if(this.props.yAxis == 'spreadToBMK' && bond.info.ccy == 'USD' && bond.info.country != 'USA'){
      timeSeries.push(
        {isin: bond.isin + 'UST', color: '#999', dates: this.getDates('YYYY-MM-DD')}
      );
    }
    this.timeSeriesPlugin.update({ timeSeries: timeSeries });
    this.valueSeriesPlugin.update({ timeSeries: timeSeries });
    this.chartDocument.update( this.getChartConfig(bond, data, this.props.yAxis) );
  }

  getTimeSeriesConfig() {
    return {
        isin: this.props.bond.isin,
        dates: this.getDates('YYYY-MM-DD'),
        color: getColor(this.props.bond.info.ratingGroup),
        isActive: true
      };
  }

  getChartConfig(bond, data, yAxis) {
    let dailyData = {};
    for(var value of data) {
      if(value){
        let newDate = value.date;
        dailyData[newDate] = value;
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
          'date': date,
          'name': bond.info[ 'standardName' ]
        }
        if(dailyData[formattedDate]) {
          obj[yAxis] = NumberFormatter(dailyData[ formattedDate ][ yAxis ], { isPercent: yAxis, asNumber: true, placeholder: null });
        }
        return obj;
      }
    };
  }

  updateChart() {
    let dates = this.getDates('YYYYMMDD');
    DataProvider.getTimeSeries(this.props.bond.isin, dates)
      .then((response) => {
        this.refreshChart(response.data);
      });
  }

  render() {
    return (
      <div className={styles.priceTS}>
        <Chart document={this.chartDocument} />
      </div>
    );
  }

}

BondTSChart.propTypes = {
    yAxis: React.PropTypes.string.isRequired,
};

export default BondTSChart;
