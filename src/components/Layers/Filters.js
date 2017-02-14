import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import * as DataProvider from '../../data/providers/Data';
let event = new (require('events').EventEmitter);

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      filters: props.filters,
      silent: false
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const filters = nextProps.filters;
    event.emit('render', filters);
    this.setState({ filters });
  }

  // mapNames(value) {
  //   const dictionary = {
  //     'industry': 'sector',
  //     'domInt': 'dom-int',
  //   };
  //   if(dictionary[value] != null) { return dictionary[value] }
  //   return value
  // }

  // mapValues(value) {
  //   const dictionary = {
  //     'corporations' : 'true',
  //     'non-corporations': 'false',
  //     'financial' : 'true',
  //     'non-financial' : 'false',
  //     'very high' : 'very_high',
  //   };
  //   if(dictionary[value] != null) { return dictionary[value] }
  //   return value
  // }

  // sortStrategy(a, b) {
  //   var nameA, nameB;
  //   nameA = (String(a.name)).toUpperCase();
  //   nameB = (String(b.name)).toUpperCase();
  //   if (nameA < nameB) {
  //     return -1;
  //   }
  //   if (nameA > nameB) {
  //     return 1;
  //   }
  //   return 0;
  // }

  getYesterday(){ 
    // TODO !!Client date can be wrong!! 
    // Better is get date from server
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toJSON().slice(0,10).replace(/-/g,'')
  }

  formatFilters(selectedFilters) {
    let filtersProviderParams = {'filters': selectedFilters};
    filtersProviderParams['date'] = this.getYesterday();;

    return filtersProviderParams;
  }

  async handleFilterChange(filtersState) {
    const filters = this.formatFilters(filtersState.selected);
    const { result, stats } = await DataProvider.filtersApply(filters, true);
    const newFilters = this.makeViewModel(stats, filtersState.all)
    event.emit('render', newFilters);
    this.props.filteredDataHandler(result, filtersState)
  }


  makeViewModel(stats, filters) {
    let viewModel = Object.assign({}, filters)

    stats.forEach(item => {
      if(filters[item.name]){
        let values = filters[item.name].values;

        if(!values.length) return
        values.forEach(value=>{
          value.tag = null
          if(Object.keys(item.values).length) {
            value.disabled = true
          }
          if(Object.keys(item.values).length === 0){
            value.disabled = false
          }
          Object.keys(item.values).forEach(_value=>{
            if(value.name == _value){
              value.disabled = !Number(item.values[_value])
              value.tag = item.values[_value]
            }
          })
        })
        viewModel[item.name] = { values }
      }
    })
    return viewModel
  }

  render(){
    return (
      <div className="uiFilters">
        <UIFilters
          ee={event}
          filters={this.state.filters}
          onStateChange={this.handleFilterChange}
        />
      </div>
    )
  }
}



Filters.propTypes = {
    filteredDataHandler: React.PropTypes.func.isRequired,
    filters: React.PropTypes.object.isRequired
};

export default Filters
