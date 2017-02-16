import React, { Component } from 'react';
import Promise from 'rsvp'
import * as DataProvider from '../../data/providers/Data';
import Picker from '../Picker'
import { Chart, ChartDocument, ChartPlugins } from '@skybonds/ui-component-chart';

const defaultConfig = {
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
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
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

const defaultDate = new Date('2017/02/05');


class ScatterPlot extends Component {

  constructor(props) {
    super(props);
    const yAxisPicker = [{label: 'Yield', value: 'yield'},
                      {label: 'Total Return', value: 'tr'},
                      {label: 'Price', value: 'price'},
                      {label: 'Spread to worst', value: 'spread'},
                      {label: 'ROE', value: 'roe'},
                      {label: 'ROE (TR)', value: 'roeFromTr'}];

    const xAxisPicker = [{label: 'Duration', value: 'duration'},
                      {label: 'Maturity', value: 'maturity'},
                      {label: 'Months to Recovery', value: 'mtr'},
                      {label: 'Months to Recovery (TR)', value: 'mtrFromTr'}];
    this.state = { yAxisPicker, xAxisPicker, activeYAxisPicker: 'yield', activeXAxisPicker: 'duration' };
  }

  componentWillMount() {
    this.initChart();
  }


  componentWillReceiveProps(props) {
    this.updateChart(props.isins);
  }


  initChart() {
    this.dotsSetsPlugin = new ChartPlugins.DotsSetsPlugin;
    this.dotsSetsPlugin.update({ dotsSets: [] });

    let chartDocumentConfig = _.clone(defaultConfig);
    chartDocumentConfig.plugins = [
      this.dotsSetsPlugin
    ];
    this.chartDocument = new ChartDocument(chartDocumentConfig);
  }


  updateChart(isins = []) {
    isins = isins.slice(0, 200);
    let config = {
      date: defaultDate,
      axes: {
        x: defaultConfig.axes.x,
        y: defaultConfig.axes.y
      },
      data: {
        info: {},
        daily: {}
      }
    };

    if(isins.length) {
      let attrs = [config.axes.x, config.axes.y, 'liquidity'];
      Promise.all([
        DataProvider.getBondsInfo(isins),
        DataProvider.getBondsDaily(isins, config.date, attrs)
      ]).then((response) => {
        config.data = {
          info: this.transformArrayToMap(response[0]),
          daily: this.transformArrayToMap(response[1])
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
      result[ item.isin ] = item.data
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
          [ axes.x ]: data.daily[ isin ] ? data.daily[ isin ][ axes.x ] : null,
          [ axes.y ]: data.daily[ isin ] ? data.daily[ isin ][ axes.y ] : null
        };
      }
    }
  }

  handleYAxisPickerChange(pickerValue) {
    this.setState({ activeYAxisPicker: pickerValue });
  }

  handleXAxisPickerChange(pickerValue) {
    this.setState({ activeXAxisPicker: pickerValue });
  }


  render() {
    return (
      <div>
        <Picker pickerList={this.state.yAxisPicker} selectedPicker={this.state.activeYAxisPicker} onPickerChange={this.handleYAxisPickerChange.bind(this)} />
        <Chart document={this.chartDocument} />
        <Picker pickerList={this.state.xAxisPicker} selectedPicker={this.state.activeXAxisPicker} onPickerChange={this.handleXAxisPickerChange.bind(this)} />
      </div>
    )
  }

}

ScatterPlot.propTypes = {
};

export default ScatterPlot
