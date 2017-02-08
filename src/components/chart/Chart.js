import React, { Component } from 'react';
import Promise from 'rsvp'
import BondsProvider from '../../providers/BondsProvider';

const defaultConfig = {
  backgroundColor: '#fff',
  labelStyle: {
    color: '#000',
    fontSize: '10px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
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
    x: 'yield',
    y: 'duration'
  },
  axesLimits: {
    x: [0, Infinity],
    y: [-Infinity, Infinity]
  },
  maxZoom: 24,
  disableZoom: false
};

const defaultDate = new Date('2017/02/06');


class Chart extends Component {

  constructor(props) {
    super(props);
    this.initChart();
  }


  initChart() {
    this.dotsSetsPlugin = new SkybondsComponents.DotsSetsPlugin;
    this.curvesPlugin = new SkybondsComponents.CurvesPlugin;
    this.spreadsPlugin = new SkybondsComponents.SpreadsPlugin;
    this.dotCurveSpreadsPlugin = new SkybondsComponents.DotCurveSpreadsPlugin;
    this.valueScannerPlugin = new SkybondsComponents.ValueScannerPlugin;
    let chartDocumentConfig = _.clone(defaultConfig);
    chartDocumentConfig.plugins = [
      this.dotsSetsPlugin,
      this.curvesPlugin,
      this.spreadsPlugin,
      this.dotCurveSpreadsPlugin,
      this.valueScannerPlugin
    ];
    this.chartDocument = new SkybondsComponents.ChartDocument(chartDocumentConfig);
  }


  componentWillReceiveProps(props) {
    let date = defaultDate;
    let attrs = [defaultConfig.axes.x, defaultConfig.axes.y];
    if(props.isins.length) {
      this.getBondsData(props.isins, date, attrs).then((bondsData) => {
        this.refreshChart(bondsData);
      });
    }
  }


  getBondsData(isins, dailyDate, dailyAttrs) {
    let promises = [
      BondsProvider.getInfo(isins),
      BondsProvider.getDaily(isins, dailyDate, dailyAttrs)
    ];
    return Promise.all(promises).then((response) => {
      let infoData = response[0] || [];
      let dailyData = response[1] || [];
      return this.mergeBondsData(infoData, dailyData, dailyDate);
    });
  }


  mergeBondsData(infoData, dailyData, dailyDate) {
    infoData = infoData.map(function(bond){
      bond.info = bond.data;
      delete bond.data;
      return bond;
    });
    infoData = _.keyBy(infoData, 'isin');

    dailyData = dailyData.map(function(bond){
      bond.daily = {
        [ dailyDate ]: bond.data
      };
      delete bond.data;
      return bond;
    });
    dailyData = _.keyBy(dailyData, 'isin');

    return _.merge({}, infoData, dailyData);
  }


  refreshChart(bondsData) {
    console.log('bondsData', bondsData);
    this.dotsSetsPlugin.update(
      { dotsSets: this.getDotsSets(bondsData, defaultDate) }
    );
    this.chartDocument.update(
      this.getChartDocumentConfig(bondsData)
    );
  }


  getDotsSets(bondsData = [], date) {
    let dotsSets = [];
    dotsSets.push({
      isins: _.map(bondsData).map((bond) => { return bond.isin; }),
      date: date
    });
    console.log('dotsSets', dotsSets);
    return dotsSets;
  }


  getChartDocumentConfig(bondsData) {
    let chartDocumentConfig = _.clone(defaultConfig);

    chartDocumentConfig.buildDailyData = (isin, date) => {
      let object = {
        isin: bondsData[ isin ],
        date: date
      };

      let axes = {
        x: defaultConfig.axes.x,
        y: defaultConfig.axes.y
      };

      object[ axes.x ] = bondsData[ isin ][ daily ][ date ][ axes.x ];
      object[ axes.y ] = bondsData[ isin ][ daily ][ date ][ axes.y ];

      return object;
    };

    console.log('chartDocumentConfig', chartDocumentConfig);
    return chartDocumentConfig;
  }


  render() {
    return (
      <SkybondsComponents.Chart document={this.chartDocument} />
    )
  }

}

Chart.propTypes = {
};

export default Chart
