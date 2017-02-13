import React, { Component } from 'react';
import Promise from 'rsvp'
import BondsProvider from '../../providers/BondsProvider';
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

  componentWillMount() {
    this.dotsSetsPlugin = new ChartPlugins.DotsSetsPlugin;
    this.dotsSetsPlugin.update({ dotsSets: [] });

    let chartDocumentConfig = _.clone(defaultConfig);
    chartDocumentConfig.plugins = [
      this.dotsSetsPlugin
    ];
    this.chartDocument = new ChartDocument(chartDocumentConfig);
  }


  componentWillReceiveProps(props) {
    let date = defaultDate;
    let attrs = [defaultConfig.axes.x, defaultConfig.axes.y, 'liquidity'];
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
    let dotsSets = { dotsSets: this.getDotsSets(bondsData, defaultDate) };
    let chartDocumentConfig = this.getChartDocumentConfig(bondsData);
    this.dotsSetsPlugin.update(dotsSets);
    this.chartDocument.update(chartDocumentConfig);
  }


  getDotsSets(bondsData = [], date) {
    let isins = _.map(bondsData).map((bond) => { return bond.isin; });
    return [{
      isins: isins,
      date: date,
      opacity: 1
    }];
  }


  getChartDocumentConfig(bondsData) {
    let result = _.clone(defaultConfig.axes);

    result.buildDailyData = (isin, date) => {
      let object = {
        isin,
        date
      };

      let axes = {
        x: defaultConfig.axes.x,
        y: defaultConfig.axes.y
      };

      // copyInfoValues = (target, source, fields) => {
      //   for(field of fields) {
      //     let value = source.info[ field ];
      //     return
      //   }
      // };
      // copyDailyValues = (target, source, fields) => {
      // };

      let bondInfoData = bondsData[ isin ].info;
      let bondDailyData = bondsData[ isin ].daily[ date ];
      object[ 'name' ] = bondInfoData.standardName;
      object[ 'ratingGroup' ] = bondInfoData.ratingGroup;
      object[ 'liquidity' ] = bondDailyData ? bondDailyData[ 'liquidity' ] : null;
      object[ axes.x ] = bondDailyData ? bondDailyData[ axes.x ] : null;
      object[ axes.y ] = bondDailyData ? bondDailyData[ axes.y ] : null;
      return object;
    };

    return result;
  }


  render() {
    return (
      <Chart document={this.chartDocument} />
    )
  }

}

ScatterPlot.propTypes = {
};

export default ScatterPlot
