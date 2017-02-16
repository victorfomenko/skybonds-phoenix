import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import { connect } from 'react-redux';
import * as DataProvider from '../../data/providers/Data';
import { changeFilters, changeFiltersIsins } from '../../actions';


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.layer.filters
    };
    this.handleFiltersChange = this.handleFiltersChange.bind(this)
    console.log('propsFilters: ', props.layer.filters);
    //this.handleFiltersChange({selected: props.filters, all: props.filters})
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.layer.filters)
    this.setState({ 
      filters: nextProps.layer.filters
    });
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
    this.props.changeFilters(this.props.layer.id, newFilters)
    this.props.changeFiltersIsins(this.props.layer.id, result)
  }


  makeViewModel(stats, filters) {
    let viewModel = Object.assign({}, filters)
    let typeValues = {}

    stats.forEach(item => {
      switch(item.name){
        case 'yield':
        case 'spread':
        case 'price':
        case 'duration':
        case 'maturity':
        case 'discount':
          viewModel['range'] = viewModel['range'] || { values: [] }
          const values = item.values.length ? item.values : void 0
          const selected = item.values.length ? true : false
          const filter = {
            name: item.name,
            values: values || [],
            defaultValues: stats[item.name] || [],
            selected: selected
          }
          viewModel['range'].values.push(filter)
          break;
      }
    })
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
  layer: React.PropTypes.object.isRequired,
  changeFilters: React.PropTypes.func.isRequired,
  changeFiltersIsins: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers });
export default connect(mapStateToProps, { changeFilters, changeFiltersIsins })(Filters);
