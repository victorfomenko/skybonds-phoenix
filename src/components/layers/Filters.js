import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import FiltersProvider from '../../providers/FiltersProvider';
let event = new (require('events').EventEmitter);

class Filters extends Component {
  constructor(props) {
    super(props);
    const filters = props.filters;
    this.state = {filters};
  }

  componentWillReceiveProps(nextProps) {
    const filters = nextProps.filters;
    event.emit('render', filters);
    this.state = { filters, event };
  }

  mapNames(value) {
    const dictionary = {
      'industry': 'sector',
      'domInt': 'dom-int',
    };
    if(dictionary[value] != null) { return dictionary[value] }
    return value
  }

  mapValues(value) {
    const dictionary = {
      'corporations' : 'true',
      'non-corporations': 'false',
      'financial' : 'true',
      'non-financial' : 'false',
      'very high' : 'very_high',
    };
    if(dictionary[value] != null) { return dictionary[value] }
    return value
  }

  sortStrategy(a, b) {
    var nameA, nameB;
    nameA = (String(a.name)).toUpperCase();
    nameB = (String(b.name)).toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  transformFilters(selectedFilters) {
    let filtersProviderParams = {'filters': []};
    const today = new Date().toJSON().slice(0,10).replace(/-/g,'');
    filtersProviderParams['date'] = today;
    for (let key in selectedFilters) {
      let filterItem = {};
      filterItem.name = this.mapNames(key);
      filterItem.value = [];
      for(let value of selectedFilters[key]) {
        filterItem.value.push(this.mapValues(value.name));
      }
      filtersProviderParams.filters.push(filterItem);
    }
    return filtersProviderParams;
  }

  handleFilterChange(filtersState) {
    // let filters = this.transformFilters(filtersState.selected);
    // FiltersProvider.getFilteredIsins(filters).then((data) =>
      this.props.filteredDataHandler(filtersState);
  }


  render(){
    return (
      <div className="uiFilters">
        <UIFilters
          ee = {event}
          filters={this.state.filters}
          onStateChange={this.handleFilterChange.bind(this)}
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
