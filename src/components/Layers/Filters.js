import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import { connect } from 'react-redux';
import * as DataProvider from '../../data/providers/Data';
import { changeFilters, changeFiltersIsins } from '../../actions';
import { isPortfolioScb } from '../../helpers/portfolio';


class Filters extends Component {
  constructor(props) {
    super(props);
    let filters = this.formatPortfolio(props.layer.filters, props.user)
    this.state = { filters };
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let filters = this.formatPortfolio(nextProps.layer.filters, this.props.user)
    this.setState({
      filters: JSON.parse(JSON.stringify(filters))
    });
  }

  formatPortfolio(filters, user) {
    if(isPortfolioScb(user)) {
      filters['portfolio'] = {
        values: [{name: 'Portfolio'}]
      }
    }
    return filters
  }

  getYesterday(){
    // TODO !!Client date can be wrong!!
    // Better is get date from server
    let date = new Date();
    date.setDate(date.getDate() - 2);
    return date.toJSON().slice(0,10).replace(/-/g,'');
  }

  formatFilters(selectedFilters) {
    for (const key in selectedFilters) {
      //TODO Remove when it will optimise. Or move to filterFormatters
      if(key === 'range') {
        const values = selectedFilters[key]
        values.forEach(filter=>{
          const name = filter.name;
          const value = filter.values;
          selectedFilters[name] = value
        })

      }
    }
    delete selectedFilters['range']
    let filtersProviderParams = {'filters': selectedFilters};
    filtersProviderParams['date'] = this.getYesterday();;

    return filtersProviderParams;
  }

  async handleFiltersChange({ selected, all }) {
    const filters = this.formatFilters(selected);
    const { result, stats } = await DataProvider.filtersApply(filters, true);
    const newFilters = this.makeViewModel(stats, all);
    this.props.changeFilters(this.props.layer.id, newFilters);
    this.props.changeFiltersIsins(this.props.layer.id, result);
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
    return (
      <UIFilters
        filters={this.state.filters}
        onStateChange={state=>{
          this.handleFiltersChange({selected: state.selected, all: state.all});
        }}
      />
    );
  }
}



Filters.propTypes = {
  layer: React.PropTypes.object.isRequired,
  changeFilters: React.PropTypes.func.isRequired,
  changeFiltersIsins: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers, user: state.user });
export default connect(mapStateToProps, { changeFilters, changeFiltersIsins, })(Filters);
