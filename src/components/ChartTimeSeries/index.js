import React, { Component } from 'react';
import { Chart as UIChart, ChartDocument, ChartPlugins } from '@skybonds/ui-component-chart';
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


class ChartTimeSeries extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.initChart();
    // TODO: this hack enforces recalculation of chart borders, do this elsewhere
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.chartData.length > 0 && nextProps.chartTimeSeries.length > 0){
      this.updateChart(nextProps.chartData, nextProps.chartTimeSeries);
    }
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

  updateChart(chartData, chartTimeSeries) {
    this.refreshChart(chartData, chartTimeSeries);
  }

  refreshChart(chartData, chartTimeSeries) {
    let bonds = {};
    for (let dailyData of chartData) {
      bonds[dailyData.isin] = dailyData.data;
    }
    this.timeSeriesPlugin.update({ timeSeries: chartTimeSeries });
    this.valueSeriesPlugin.update({ timeSeries: chartTimeSeries });
    this.chartDocument.update( this.props.chartConfig(bonds, this.props.yAxis) );
  }

  render() {
    return (
      <div className={styles.chartTimeSeries}>
        <UIChart document={this.chartDocument} />
      </div>
    );
  }

}

ChartTimeSeries.propTypes = {
  yAxis: React.PropTypes.string.isRequired,
  chartTimeSeries: React.PropTypes.array.isRequired,
  chartData: React.PropTypes.array.isRequired,
  chartConfig: React.PropTypes.func.isRequired
};

export default ChartTimeSeries;
