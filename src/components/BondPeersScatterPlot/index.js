import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart, ChartDocument, ChartPlugins } from '@skybonds/ui-component-chart';
import NumberFormatter from '../../helpers/formatters/NumberFormatter';
import { togglePeer } from '../../actions';
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
  disableZoom: true
};

const DEFAULT_DATE = new Date('2017/02/05');

const INFO_FIELDS = ['standardName', 'ratingGroup'];
const DAILY_FIELDS = ['yield', 'price', 'spreadToBMK', 'duration', 'yearsToPutCallMaturity', 'liquidity'];

class BondPeersScatterPlot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeXAxisPicker: 'duration',
      activeYAxisPicker: 'yield'
    };
  }

  componentWillMount() {
    this.initChart();
    // TODO: this hack enforces recalculation of chart borders, do this elsewhere
    setTimeout(()=>{
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    const bonds = [nextProps.parentBond].concat(nextProps.peersBonds);
    this.updateChart(bonds, nextProps.selectedPeersIsins);
  }

  initChart() {
    this.dotsSetsPlugin = new ChartPlugins.DotsSetsPlugin;
    this.dotsSetsPlugin.update({ dotsSets: [] });

    let chartDocumentConfig = _.clone(DEFAULT_CONFIG);
    chartDocumentConfig.plugins = [
      this.dotsSetsPlugin
    ];
    this.chartDocument = new ChartDocument(chartDocumentConfig);

    this.chartDocument.on('bondDotClick', (isin) => {
      if(isin != this.props.parentBond.isin){
        this.props.togglePeer(isin);
      }
    });

  }

  updateChart(bonds = [], highlightedIsins) {
    let config = {
      date: DEFAULT_DATE,
      axes: {
        x: this.state.activeXAxisPicker,
        y: this.state.activeYAxisPicker
      },
      data: {
        info: {},
        daily: {},
        portfolio: {}
      }
    };

    if(bonds.length) {
      let isins = [];
      for (let bond of bonds) {
        isins.push(bond.isin);
      }
      config.data = {
        info: this.transformArrayToMap(bonds, 'info'),
        daily: this.transformArrayToMap(bonds, 'daily'),
        portfolio: {}
      };
      this.refreshChart(isins, highlightedIsins, config);
    } else {
      // this.refreshChart(bonds,  config);
    }
  }

  transformArrayToMap(data, key) {
    let result = {};
    for(let item of data) {
      result[ item.isin ] = item[key];
    }
    return result;
  }

  refreshChart(dimmedIsins, highlightedIsins, config) {
    this.dotsSetsPlugin.update( this.getDotsSetsConfig(dimmedIsins, highlightedIsins, config.date) );
    this.chartDocument.update( this.getChartConfig(config.data, config.axes) );
  }

  getDotsSetsConfig(dimmedIsins, highlightedIsins, date) {
    const dimmedDots = {
      isins: dimmedIsins,
      date: date,
      opacity: 0.2
    };

    const highlightedDots = {
      isins: [this.props.parentBond.isin].concat(highlightedIsins),
      date: date,
      opacity: 1
    };
    return { dotsSets: [dimmedDots, highlightedDots] };
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
          'quantity': data.portfolio[ isin ] ? 1 : 0
        };
      }
    };
  }

  render() {
    return (
      <div className={styles.bondPeersScatterPlot}>
        <Chart document={this.chartDocument} />
      </div>
    );
  }

}

BondPeersScatterPlot.propTypes = {
};


const mapStateToProps = state => ({ });
export default connect( mapStateToProps, { togglePeer } )(BondPeersScatterPlot);

