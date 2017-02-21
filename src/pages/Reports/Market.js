import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Layers from '../../components/Layers';
import ScatterPlot from '../../components/ScatterPlot';
import Movers from '../../components/Movers';
import { getSpaces } from '../../data/providers/Spaces';
import { isEqual, intersection, uniq } from 'lodash';

import reportStyle from './style.sass';

class Market extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportName: 'Reports',
      reportIsins: [],
      activeIsin: '',
      reportID: props.match.params.reportID
    };
    getSpaces().then(spaces=>{
    });

  }

  shouldComponentUpdate(nextProps, nextState){
    if(isEqual(nextState, this.state)) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const reportIsins = this.getReportIsins(nextProps.market.layers.layersById);
    this.setState({ reportIsins });
  }

  getReportIsins(layers){
    let result = [];

    for(const key in layers) {
      const layer = layers[key];
      if(layer.viewMode == 'hidden'){
        continue;
      }

      const searchIsins = layer.dataComputed.search.bonds.map(bond=>{return bond.isin});
      const searchQuery = layer.dataSource.search.query;
      const filtersIsins = layer.dataComputed.filters.isins;

      if (searchIsins.length && filtersIsins.length) {
        result = [...result, ...intersection(searchIsins, filtersIsins)];
      } else if (searchIsins.length) {
        result = [...result, ...searchIsins];
      } else if(filtersIsins.length && searchQuery.length == 0) {
        result = [...result, ...filtersIsins];
      }
    }

    return uniq(result);
  }

  onActiveIsinChange(isin) {
    this.setState({ activeIsin: isin });
  }

  render(){
    return (
      <div className='skybondsWrap'>
        <Header firstName={this.props.user.firstName} lastName={this.props.user.lastName} />
        <div className={reportStyle.reportWrap}>
          <div className={reportStyle.reportHeader}>
            <Layers />
          </div>
          <div className={reportStyle.reportView}>
            <div className={reportStyle.reportViewScatterPlot}>
              <div className={reportStyle.reportView_content}>
                <ScatterPlot
                  isins={this.state.reportIsins}
                  activeIsin={this.state.activeIsin}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
              </div>
              <div className={reportStyle.reportView_aside}>
                <Movers
                  isins={this.state.reportIsins}
                  onActiveIsinChange={this.onActiveIsinChange.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({ user: state.user, market: state.reports.market });
export default connect(mapStateToProps)(Market);
