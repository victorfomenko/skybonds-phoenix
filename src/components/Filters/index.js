import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIFilters from '@skybonds/ui-filters/';

import { layerFilterBonds, layerGetFilterStats, changeLayersBonds } from '../../actions';
import { getEmptyFilters } from '../../data/helpers';

const MAX_ISINS_PER_LAYER = 200;


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersValues: props.layer.source.filters,
      filtersStats: props.layer.data.filters.stats,
      isins: props.layer.data.isinsAll,
      searchIsins: props.layer.data.search.isins
    };
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtersValues: nextProps.layer.source.filters,
      filtersStats: nextProps.layer.data.filters.stats,
      isins: nextProps.layer.data.isinsAll,
      searchIsins: nextProps.layer.data.search.isins
    });
  }

  getDate(){
    // TODO !!Client date can be wrong!!
    // Better is get date from server
    let date = new Date();
    date.setDate(date.getDate() - 3);
    return date
  }

  formatFilters(selectedFilters) {
    let result = {}
    for (const key in selectedFilters) {
      const values = selectedFilters[key];
      if(key === 'range') {
        values.forEach(filter=>{
          const name = filter.name;
          const value = filter.values;
          result[name] = value
        })
      }
      result[key] = values.map(item=>{return item.name})
    }
    delete result['range'];

    return {
      filters: result,
      date: this.getDate()
    }
  }

  async onFiltersChange({ selected, all }) {
    const filters = this.formatFilters(selected);
    const needStatsFromFilters = this.state.searchIsins.length == 0;
    const activeLayerId = this.props.activeLayerId;
    await this.props.layerFilterBonds(activeLayerId, filters, filters.filters, needStatsFromFilters);
    if(!needStatsFromFilters) {
      await this.props.layerGetFilterStats(activeLayerId, filters, this.state.isins);
    }
    this.props.changeLayersBonds(activeLayerId, this.state.isins.slice(0, MAX_ISINS_PER_LAYER), this.getDate());
  }

  makeViewModel(stats, values) {
    const viewModel = getEmptyFilters();
    const valuesViewModel = this.valuesViewModel(values);
    const statsViewModel = this.statsViewModel(stats);
    //console.log('statsViewModel', statsViewModel);

    for (const name in viewModel) {
      const defaultFilter =   viewModel[name];
      let values =  defaultFilter.values;

      //Add selected values
      const selectedValues =  valuesViewModel[name] ? valuesViewModel[name].values : null;
      if(selectedValues && selectedValues.length) {
        values.forEach((item, index)=>{
          selectedValues.forEach(value=> {
            if(item.name === value.name) {
              switch(name){
                case 'range':
                  item.values = value.values
                break;
                default:
                  item.selected = true;
              }
            }
          })
        })
      }

      //Add stats values
      if(stats && stats.length) {
        const statsValues = statsViewModel[name];
        values.forEach((item, index)=>{
          switch(name) {
            case 'range':
              statsValues.values.forEach(_value=>{
                if(item.name == _value.name){
                  item.defaultValues = _value.defaultValues
                }
              })
              break;
            case 'portfolio':
              break;
            default:
              item.tag = null;
              if(Object.keys(statsValues).length) {
                item.disabled = true;
              }
              if(Object.keys(statsValues).length === 0){
                item.disabled = false;
              }
              Object.keys(statsValues).forEach(_value=>{
                if(item.name == _value){
                  item.disabled = !Number(statsValues[_value]);
                  item.tag = statsValues[_value];
                }
              });
          }
        })
      }
    }
    return viewModel
  }

  valuesViewModel(val){
    let result = {
      range: { values: [] }
    };
    for(let key in val) {
      switch(key){
        case 'yield':
        case 'spread':
        case 'price':
        case 'duration':
        case 'maturity':
        case 'discount':
          const rangeValue = {
            name: key,
            values: val[key] || [],
            selected: val[key].length ? true : false
          }
          result['range'].values.push(rangeValue)
          delete result[key];
          break;
        default:
          const values = val[key].map(item => { return {name: item} });
          result[key] = {
            values: values
          };
      }
    }
    return result;
  }

  statsViewModel(stats) {
    let result = {
      range: { values: [] }
    };

    stats.forEach(item => {
      switch(item.name){
        case 'yield':
        case 'spread':
        case 'price':
        case 'duration':
        case 'maturity':
        case 'discount':
          const rangeValue = {
              name: item.name,
              defaultValues: item.values,
          }
          result['range'].values.push(rangeValue)
          delete result[item.name];
          break;
        default:
          result[item.name] = item.values;
      }
    });
    return result;
  }

  render() {
    const { filtersStats, filtersValues } = this.state;
    const filters = this.makeViewModel(filtersStats, filtersValues);

    return (
      <UIFilters
        filters={filters}
        onStateChange={state=>{
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

const mapStateToProps = state => ({ layers: state.reports.market.layers, activeLayerId: state.reports.market.activeLayerId });
export default connect(mapStateToProps, { layerFilterBonds, layerGetFilterStats, changeLayersBonds })(Filters);
