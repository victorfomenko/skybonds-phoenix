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
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let filters = this.formatPortfolio(nextProps.layer.filters, this.props.user)
    this.setState({
      filters: filters
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
    filtersProviderParams['date'] = this.getDate();

    return filtersProviderParams;
  }

  async onFiltersChange({ selected, all }) {
    console.log('selected', selected);
    const filters = this.formatFilters(selected);
    console.log('filters', filters);
    //const { result, stats } = await DataProvider.filtersApply(filters, true);
    //console.log('result', result);
    //const newFilters = this.makeViewModel(stats, all);
    //this.props.changeFilters(this.props.layer.id, newFilters);
    //this.props.changeFiltersIsins(this.props.layer.id, result);
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
          this.onFiltersChange({selected: state.selected, all: state.all});
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
