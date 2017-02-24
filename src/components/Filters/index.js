import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import { connect } from 'react-redux';
import { layerFilterBonds, layerGetFilterStats, changeLayersBonds } from '../../actions';
import { isPortfolioScb } from '../../helpers/portfolio';

const MAX_ISINS_PER_LAYER = 200;


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.formatPortfolio(props.layer.dataSource.filters, props.user),
      stats: props.layer.dataComputed.filters.stats,
      isins: props.layer.dataComputed.isins,
      searchIsins: props.layer.dataComputed.search.isins
    };
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filters: this.formatPortfolio(nextProps.layer.dataSource.filters, this.props.user),
      stats: nextProps.layer.dataComputed.filters.stats,
      isins: nextProps.layer.dataComputed.isins,
      searchIsins: nextProps.layer.dataComputed.search.isins
    });
  }

  formatPortfolio(filters, user) {
    if(filters['portfolio'] != null) {return filters}
    if(isPortfolioScb(user)) {
      filters['portfolio'] = {
        values: [{name: 'Portfolio'}]
      }
    }
    return filters;
  }

  getDate(){
    // TODO !!Client date can be wrong!!
    // Better is get date from server
    let date = new Date();
    date.setDate(date.getDate() - 3);
    return date
  }

  formatFilters(selectedFilters) {
    for (const key in selectedFilters) {
      //TODO Remove when it will optimise. Or move to filterFormatters
      if(key === 'range') {
        const values = selectedFilters[key];
        values.forEach(filter=>{
          const name = filter.name;
          const value = filter.values;
          selectedFilters[name] = value
        })

      }
    }
    delete selectedFilters['range']
    let filtersProviderParams = {'filters': selectedFilters};
    filtersProviderParams['date'] = this.getDate();

    return filtersProviderParams;
  }

  async onFiltersChange({ selected, all }) {
    const filters = this.formatFilters(selected);
    const needStatsFromFilters = this.state.searchIsins.length == 0;
    await this.props.layerFilterBonds(this.props.layer.id, filters, all, needStatsFromFilters);
    if(!needStatsFromFilters) {
      await this.props.layerGetFilterStats(this.props.layer.id, filters, this.state.isins);
    }
    this.props.changeLayersBonds(this.props.layer.id, this.state.isins.slice(0, MAX_ISINS_PER_LAYER), this.state.filters.date);
  }

  makeViewModel(stats, filters) {
    let viewModel = Object.assign({}, filters);
    let typeValues = {};

    stats.forEach(item => {
      switch(item.name){
        case 'yield':
        case 'spread':
        case 'price':
        case 'duration':
        case 'maturity':
        case 'discount':
          viewModel['range'].values = viewModel['range'].values.map(filter=> {
            if(item.name === filter.name) {
              return {
                name: item.name,
                values:  filter.values || [],
                defaultValues: item.values || [],
                selected: item.values.length ? true : false
              }
            }
            return filter
          })
      }
    })

    stats.forEach(item => {
      if(filters[item.name]){
        let values = filters[item.name].values;
        if(!values.length) return;
        values.forEach(value=>{
          value.tag = null;
          if(Object.keys(item.values).length) {
            value.disabled = true;
          }
          if(Object.keys(item.values).length === 0){
            value.disabled = false;
          }
          Object.keys(item.values).forEach(_value=>{
            if(value.name == _value){
              value.disabled = !Number(item.values[_value]);
              value.tag = item.values[_value];
            }
          });
        });
        viewModel[item.name] = { values };
      }
    });

    return viewModel;
  }

  render(){
    const filtersViewModel = this.makeViewModel(this.state.stats, this.state.filters);
    return (
      <UIFilters
        filters={filtersViewModel}
        onStateChange={(state)=>{
          this.onFiltersChange({selected: state.selected, all: state.all});
        }}
      />
    );
  }
}



Filters.propTypes = {
  layer: React.PropTypes.object.isRequired,
  layerFilterBonds: React.PropTypes.func.isRequired,
  changeLayersBonds: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers, user: state.user });
export default connect(mapStateToProps, { layerFilterBonds, layerGetFilterStats, changeLayersBonds })(Filters);
