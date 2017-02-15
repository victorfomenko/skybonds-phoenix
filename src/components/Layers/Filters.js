import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import * as DataProvider from '../../data/providers/Data';
let event = new (require('events').EventEmitter);

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.filters,
    };
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
    console.log('propsFilters: ', props.filters);
    //this.handleFiltersChange({selected: props.filters, all: props.filters})
  }

  componentWillReceiveProps(nextProps) {
    const filters = nextProps.filters;
    this.setState({ filters });
  }

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

  async handleFiltersChange({ selected, all }) {
    console.log('selectedFilters: ', selected);
    const filters = this.formatFilters(selected);
    const { result, stats } = await DataProvider.filtersApply(filters, true);
    const newFilters = this.makeViewModel(stats, all)
    this.setState({ filters: newFilters });
  }


  makeViewModel(stats, filters) {
    let viewModel = Object.assign({}, filters)
    let typeValues = {}

    stats.forEach(item => {
      switch(item.name){
        case 'sector':
          item.name = 'industry';
          break;
        case 'dom-int':
          item.name = 'domInt';
          break;
        case 'financial':
          if(item.values['true']){ item.values['financial'] = item.values['true']}
          if(item.values['false']){ item.values['non-financial'] = item.values['false']}

          delete item.values['true']
          delete item.values['false']
          break;
        case 'corporations':
          if(item.values['true']){ item.values['corporations'] = item.values['true']}
          if(item.values['false']){ item.values['non-corporations'] = item.values['false']}

          delete item.values['true']
          delete item.values['false']
          break;
        case 'floater':
        case 'convertible':
        case 'regular':
        case 'subord':
          if(item.values.true !== null) {
            typeValues[item.name] = item.values.true
          }
          break;
      }
    })
    if(Object.keys(typeValues).length){
      stats.push({
        name: 'type',
        values: typeValues
      })
    }

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
      <UIFilters
        filters={this.state.filters}
        onStateChange={state=>{
          this.handleFiltersChange({selected: state.selected, all: state.all})
        }}
      />
    )
  }
}



Filters.propTypes = {
  filters: React.PropTypes.object.isRequired
};

export default Filters
