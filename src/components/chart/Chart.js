import React, { Component } from 'react';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.initChart();
  }

  componentWillReceiveProps(props) {
    console.log('props', props);
    this.refreshChart();
  }

  refreshChart() {
    console.log('props change');
  }

  initChart() {
    console.log('init chart', this.props);
    let plugins = [
      SkybondsComponents.DotsSetsPlugin,
      SkybondsComponents.CurvesPlugin,
      SkybondsComponents.SpreadsPlugin,
      SkybondsComponents.DotCurveSpreadsPlugin,
      SkybondsComponents.ValueScannerPlugin
    ];
    let settings = {
      portfolio: 'scb',
      bonds: 'RU000A0JTK38 RU000A0JS3W6 XS0559915961 XS0643183220 US912828L575',
      y: 'yield',
      x: 'duration',
      date: '12 nov 2015',
      maxZoom: 24,
      chartZoom: {
        scale: 1,
        center: {
          x: 0.5,
          y: 0.5,
        }
      }
    };
    this.chartDocument = new SkybondsComponents.ChartDocument(plugins);
  }

  render() {
    return (
      <div>
        <SkybondsComponents.Chart document={this.chartDocument} />
      </div>
    )
  }
}

Chart.propTypes = {
};

export default Chart
