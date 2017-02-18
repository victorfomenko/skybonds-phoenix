import React, { Component } from 'react';
import Promise from 'rsvp';
import * as DataProvider from '../../data/providers/Data';
import * as PortfolioProvider from '../../data/providers/Portfolio';
import Picker from '../Picker';
import ChartZoom from '../ChartZoom';
import { Chart, ChartDocument, ChartPlugins } from '@skybonds/ui-component-chart';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import styles from './styles.sass';

const DEFAULT_CONFIG = {
  backgroundColor: '#fff',
  labelStyle: {
    color: '#000',
    fontSize: '10px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    textHeight: 11.5,
    textPadding: 4,
    opacity: 0.8
  },
  paddingCoefficient: 0.15,
  localRegressionBandwidth: 0.9,
  margin: {
    left: 30,
    top: 0,
    right: 0,
    bottom: 38
  },
  axes: {
    x: 'duration',
    y: 'yield'
  },
  axesLimits: {
    x: [0, Infinity],
    y: [-Infinity, Infinity]
  },
  maxZoom: 24,
  zoom: {
    scale: 1,
    center: {
      x: 0.5,
      y: 0.5
    }
  },
  disableZoom: false
};

const DEFAULT_DATE = new Date('2017/02/05');

const AVAILABLE_FIELDS = ['yield', 'price', 'spreadToBMK', 'duration', 'yearsToPutCallMaturity', 'liquidity'];

class ScatterPlot extends Component {

  constructor(props) {
    super(props);
    // TODO: enable commented axes when we have portfolio
    const xAxisPicker = [
      {label: 'Duration', value: 'duration'},
      {label: 'Maturity', value: 'yearsToPutCallMaturity'},
      // {label: 'Months to Recovery', value: 'mtr'},
      // {label: 'Months to Recovery (TR)', value: 'mtrFromTr'}
    ];
    const yAxisPicker = [
      {label: 'Yield', value: 'yield'},
      // {label: 'Total Return', value: 'tr'},
      {label: 'Price', value: 'price'},
      {label: 'Spread to worst', value: 'spreadToBMK'},
      // {label: 'ROE', value: 'roe'},
      // {label: 'ROE (TR)', value: 'roeFromTr'}
    ];
    this.state = {
      xAxisPicker,
      yAxisPicker,
      activeXAxisPicker: 'duration',
      activeYAxisPicker: 'yield',
      zoom: {
        scale: 1
      }
    };
  }

  componentWillMount() {
    this.initChart();
    // TODO: this hack enforces recalculation of chart borders, on this elsewhere
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  componentWillReceiveProps(props) {
    this.updateChart(props.isins);
  }

  initChart() {
    this.dotsSetsPlugin = new ChartPlugins.DotsSetsPlugin;
    this.dotsSetsPlugin.update({ dotsSets: [] });

    let chartDocumentConfig = _.clone(DEFAULT_CONFIG);
    chartDocumentConfig.plugins = [
      this.dotsSetsPlugin
    ];
    this.chartDocument = new ChartDocument(chartDocumentConfig);
  }

  updateChart(isins = []) {
    let config = {
      date: DEFAULT_DATE,
      axes: {
        x: this.state.activeXAxisPicker,
        y: this.state.activeYAxisPicker
      },
      data: {
        info: {},
        daily: {}
      }
    };

    if(isins.length) {
      Promise.all([
        DataProvider.getBondsInfo(isins),
        DataProvider.getBondsDaily(isins, config.date, AVAILABLE_FIELDS),
        PortfolioProvider.getIsinsByDate(config.date)
      ]).then((response) => {
        config.data = {
          info: this.transformArrayToMap(response[0]),
          daily: this.transformArrayToMap(response[1]),
          portfolio: response[2].reduce((prev, current)=>{ prev[current] = true; return prev }, {})
        };
        this.refreshChart(isins, config);
      });
    } else {
      this.refreshChart(isins, config);
    }
  }

  transformArrayToMap(data) {
    let result = {};
    for(let item of data) {
      result[ item.isin ] = item.data;
    }
    return result;
  }

  refreshChart(isins, config) {
    this.dotsSetsPlugin.update( this.getDotsSetsConfig(isins, config.date) );
    this.chartDocument.update( this.getChartConfig(config.data, config.axes) );
  }

  getDotsSetsConfig(isins, date) {
    return {
      dotsSets: [{
        isins: isins,
        date: date,
        opacity: 1
      }]
    };
  }

  getChartConfig(data, axes) {
    return {
      axes: {
        x: axes.x,
        y: axes.y
      },
      buildDailyData: (isin, date) => {
        return {
          'isin': isin,
          'date': date,
          'name': data.info[ isin ][ 'standardName' ],
          'ratingGroup': data.info[ isin ][ 'ratingGroup' ],
          'liquidity': data.daily[ isin ] ? data.daily[ isin ][ 'liquidity' ] : null,
          [ axes.x ]: data.daily[ isin ] ? NumberFormatter(data.daily[ isin ][ axes.x ], { isPercent: axes.x, asNumber: true, placeholder: null }) : null,
          [ axes.y ]: data.daily[ isin ] ? NumberFormatter(data.daily[ isin ][ axes.y ], { isPercent: axes.y, asNumber: true, placeholder: null }) : null,
          'inPortfolio': data.portfolio[ isin ],
          'quantity': data.portfolio[ isin ]
        };
      }
    };
  }

  onXAxisPickerChange(pickerValue) {
    this.setState({ activeXAxisPicker: pickerValue }, () => {
      this.updateChart(this.props.isins);
    });
  }

  onYAxisPickerChange(pickerValue) {
    this.setState({ activeYAxisPicker: pickerValue }, () => {
      this.updateChart(this.props.isins);
    });
  }

  onZoomChange(scale) {
    this.setState({ zoom: { scale } });
  }

  render() {
    return (
      <div className={styles.diagramScatterPlot}>
        <div className={styles.diagramStats}>
        { this.props.isins.length > 0 &&
          <span>{this.props.isins.length} bonds</span>
        }
        { this.props.isins.length == 0 &&
          <span>No data</span>
        }
        </div>
        <Chart document={this.chartDocument} />
        <Picker className={styles.diagramPicker + ' ' + styles.__axisX}
                pickerList={this.state.xAxisPicker}
                selectedPicker={this.state.activeXAxisPicker}
                onPickerChange={this.onXAxisPickerChange.bind(this)}
                direction="up" />
        <Picker className={styles.diagramPicker + ' ' + styles.__axisY}
                pickerList={this.state.yAxisPicker}
                selectedPicker={this.state.activeYAxisPicker}
                onPickerChange={this.onYAxisPickerChange.bind(this)} />
        <ChartZoom currentScale={this.state.zoom.scale}
                   scaleStep={1}
                   onZoomChange={this.onZoomChange.bind(this)} />
      </div>
    );
  }

}

ScatterPlot.propTypes = {
};

export default ScatterPlot;
