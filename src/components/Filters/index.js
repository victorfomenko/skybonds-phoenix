import React, { Component } from 'react';
import UIFilters from '@skybonds/ui-filters/';
import { connect } from 'react-redux';
import { layerFilterBonds, layerGetFilterStats, changeFilters, changeFiltersIsins, changeLayersBonds } from '../../actions';
import { isPortfolioScb } from '../../helpers/portfolio';

const MAX_ISINS_PER_LAYER = 200;


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersValues: props.layer.source.filters,
      filtersStats: props.layer.data.filters.stats,
      isins: props.layer.data.isins,
      searchIsins: props.layer.data.search.isins
    };
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtersValues: nextProps.layer.source.filters,
      filtersStats: nextProps.layer.data.filters.stats,
      isins: nextProps.layer.data.isins,
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
    delete selectedFilters['range'];
    let filtersProviderParams = {'filters': selectedFilters};
    filtersProviderParams['date'] = this.getDate();

    return filtersProviderParams;
  }

  async onFiltersChange({ selected, all }) {
    const filters = this.formatFilters(selected);
    const needStatsFromFilters = this.state.searchIsins.length == 0;
    await this.props.layerFilterBonds(this.props.layer.id, filters, needStatsFromFilters);
    if(!needStatsFromFilters) {
      await this.props.layerGetFilterStats(this.props.layer.id, filters, this.state.isins);
    }
    this.props.changeLayersBonds(this.props.layer.id, this.state.isins.slice(0, MAX_ISINS_PER_LAYER), this.state.filters.date);
  }

  getDefaultFilters() {
    let filters = {
      industry:{
        values: [
          {name: 'Agency'},
          {name: 'Mining/Diversified'},
          {name: 'Banks'},
          {name: 'Mortgage'},
          {name: 'Ferrous metals'},
          {name: 'Light industry'},
          {name: 'Other'},
          {name: 'Supranational'},
          {name: 'Communication'},
          {name: 'Finance'},
          {name: 'Non-ferrous metals'},
          {name: 'Electric Power'},
          {name: 'Information and High Technologies'},
          {name: 'Transportation'},
          {name: 'Health Care Centers'},
          {name: 'Trade and retail'},
          {name: 'Timber and paper&pulp industry'},
          {name: 'Sovereign'},
          {name: 'Agricultural'},
          {name: 'Oil and Gas'},
          {name: 'Chemicals'},
          {name: 'Power'},
          {name: 'Construction and development'},
          {name: 'Food'},
          {name: 'Auto/Truck mfrs'},
          {name: 'Municipal'},
          {name: 'Media and Entertainment'}
        ]
      },
      currency: {
        values: [
          {name:'ITL'},
          {name:'NZD'},
          {name:'HUF'},
          {name:'ILS'},
          {name:'CLP'},
          {name:'ZAR'},
          {name:'CRC'},
          {name:'JMD'},
          {name:'TRY'},
          {name:'KZT'},
          {name:'DOP'},
          {name:'COP'},
          {name:'CAD'},
          {name:'KRW'},
          {name:'GBP'},
          {name:'DKK'},{name:'PLN'},{name:'CNY'},{name:'DEM'},{name:'RON'},{name:'CHF'},{name:'SAR'},{name:'JPY'},{name:'IDR'},{name:'SEK'},{name:'USD'},{name:'MXN'},{name:'ZMW'},{name:'SGD'},{name:'CZK'},{name:'NOK'},{name:'PEN'},{name:'NGN'},{name:'UAH'},{name:'NAD'},{name:'GEL'},{name:'GHS'},{name:'INR'},{name:'AUD'},{name:'EUR'},{name:'BRL'},{name:'HKD'},{name:'MYR'},{name:'RUB'}],
        sortStrategy: function (a, b) {
          let map = {};
          let order = [
            'RUB',
            'USD',
            'EUR'
          ];

          order.forEach((value, index) => {
            map[value] = order.length - index;
          });

          order = map;

          const nameA = String(a.name).toUpperCase();
          const nameB = String(b.name).toUpperCase();
          const aWeight = order[nameA] ? order[nameA] : 0;
          const bWeight = order[nameB] ? order[nameB] : 0;
          if (aWeight > bWeight){return -1;}
          if (aWeight < bWeight){return 1;}
          if (nameA < nameB){return -1;}
          if (nameA > nameB){return 1;}
          return 0;
        }
      },
      rating: {
        values: [
          { name: 'AAA', color: '#72ceff' },
          { name: 'AA+', color: '#ef7c00' },
          { name: 'AA', color: '#ef7c00' },
          { name: 'AA-', color: '#ef7c00' },
          { name: 'A+', color: '#a800cc' },
          { name: 'A', color: '#a800cc' },
          { name: 'A-', color: '#a800cc' },
          { name: 'BBB+', color: '#00963f' },
          { name: 'BBB', color: '#00963f' },
          { name: 'BBB-', color: '#00963f' },
          { name: 'BB+', color: '#47599d' },
          { name: 'BB', color: '#47599d' },
          { name: 'BB-', color: '#47599d' },
          { name: 'B+', color: '#ff6e7e' },
          { name: 'B', color: '#ff6e7e' },
          { name: 'B-', color: '#ff6e7e' },
          { name: 'CCC+', color: '#ffd400' },
          { name: 'CCC', color: '#ffd400' },
          { name: 'CCC-', color: '#ffd400' },
          { name: 'CC', color: '#af6725' },
          { name: 'C', color: '#b04127' },
          { name: 'D', color: '#808080' },
          { name: 'NR', color: '#cbcbcb' }
        ],
        sortStrategy: function (a, b) {
          let ratings = {
            'AAA': {color: '#72ceff', group: 'AAA', synonym: 'Aaa', order: 100},
            'AA+': {color: '#ef7c00', group: 'AA', synonym: 'Aa1', order: 96},
            'AA': {color: '#ef7c00', group: 'AA', synonym: 'Aa2', order: 95},
            'AA-': {color: '#ef7c00', group: 'AA', synonym: 'Aa3', order: 94},
            'A+': {color: '#a800cc', group: 'A', synonym: 'A1', order: 91},
            'A': {color: '#a800cc', group: 'A', synonym: 'A2', order: 90},
            'A-': {color: '#a800cc', group: 'A', synonym: 'A3', order: 89},
            'BBB+': {color: '#00963f', group: 'BBB', synonym: 'Baa1', order: 86},
            'BBB': {color: '#00963f', group: 'BBB', synonym: 'Baa2', order: 85},
            'BBB-': {color: '#00963f', group: 'BBB', synonym: 'Baa3', order: 84},
            'BB+': {color: '#47599d', group: 'BB', synonym: 'Ba1', order: 81},
            'BB': {color: '#47599d', group: 'BB', synonym: 'Ba2', order: 80},
            'BB-': {color: '#47599d', group: 'BB', synonym: 'Ba3', order: 79},
            'B+': {color: '#ff6e7e', group: 'B', synonym: 'B1', order: 76},
            'B': {color: '#ff6e7e', group: 'B', synonym: 'B2', order: 75},
            'B-': {color: '#ff6e7e', group: 'B', synonym: 'B3', order: 74},
            'CCC+': {color: '#ffd400', group: 'CCC', synonym: 'Caa1', order: 71},
            'CCC': {color: '#ffd400', group: 'CCC', synonym: 'Caa2', order: 70},
            'CCC-': {color: '#ffd400', group: 'CCC', synonym: 'Caa3', order: 69},
            'CC': {color: '#af6725', group: 'CC', synonym: 'Ca', order: 65},
            'C': {color: '#b04127', group: 'C', synonym: 'C', order: 60},
            'D': {color: '#808080', group: 'D', synonym: 'D', order: 57},
            'NR': {color: '#cbcbcb', group: 'NR', synonym: 'NR', order: 55}
          };

          let getOrder = (rating)=> {
            return ratings[rating].order;
          };

          let result = getOrder(a.name);
          if (result == null) {result = 0;}
          let result1 = getOrder(b.name);
          if (result1 == null) {result1 = 0;}
          return result1 - result;
        }
      },
      outlook: {
        values: [
          {
            name: 'na'
          },
          {
            name: 'negative'
          },
          {
            name: 'stable',
            selected: false
          },
          {
            name: 'positive',
            disabled: false
          },
        ]
      },
      country: {
        values: [
          {
            name: 'USA',
            selected: false
          },
          {
            name: 'RUS'
          },
          {
            name: 'GBR',
            selected: false
          }
        ]
      },

      domInt: {
        values: [
          {
            name: 'domestic'
          },
          {
            name: 'international'
          }
        ]
      },
      corporations: {
        values: [
          {
            name: 'corporations'
          },
          {
            name: 'non-corporations'
          }
        ]
      },
      financial: {
        values: [
          {
            name: 'financial'
          },
          {
            name: 'non-financial'
          }
        ]
      },
      government: {
        values: [
          {
            name: 'true'
          },
          {
            name: 'false'
          }
        ]
      },
      liquidity: {
        values: [
          {name: 'non-liquid'},
          {name: 'low'},
          {name: 'average'},
          {name: 'high'},
          {name: 'very high'}
        ]
      },
      range: {
        values: [
            {name: 'price', values:[], defaultValues:[]},
            {name: 'spread', values:[], defaultValues:[]},
            {name: 'yield', values:[], defaultValues:[]},
            {name: 'duration', values:[], defaultValues:[]},
            {name: 'maturity', values:[], defaultValues:[]},
            {name: 'discount', values:[], defaultValues:[]}
          ],
      },
      type: {
        values: [
          {name: 'regular'},
          {name: 'subord'},
          {name: 'floater'},
          {name: 'convertible'}
        ]
      }
    };
    if(isPortfolioScb(this.props.user)) {
      filters['portfolio'] = {
        values: [{name: 'Portfolio'}]
      }
    }
    return filters
  }

  makeViewModel1(stats, values) {
    const viewModel = this.getDefaultFilters();
    const valuesViewModel = this.valuesViewModel(values);

    for (const name in viewModel) {
      const defaultFilter =   viewModel[name];
      let values =  defaultFilter.values;

      //Add selected values
      const selectedValues =  valuesViewModel[name] ? valuesViewModel[name].values : null;
      if(selectedValues && selectedValues.length) {
        values.forEach((item, index)=>{
          selectedValues.forEach(value=> {
            if(item.name === value.name) {
              item.selected = true;
            }
          })
        })
      }

      //Add stats values
      console.log('stats:', stats);
      if(stats && stats.length) {
        values.forEach((item, index)=>{
          stats.forEach(value=> {
            if(item.name === value.name) {
              item.selected = true;
            }
          })
        })
      }
    }

    return viewModel
  }

  valuesViewModel(val){
    let result = {};
    for(let key in val) {
      const values = val[key].map(item => { return {name: item} });
      result[key] = {
        values: values
      };
    }
    return result;
  }

  statsViewModel(stats) {
    // const filters = this.getDefaultFilters();
    // let viewModel = Object.assign({}, filters);
    // let typeValues = {};

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
    });

    // stats.forEach(item => {
    //   if(filters[item.name]){
    //     let values = filters[item.name].values;
    //     if(!values.length) return;
    //     values.forEach(value=>{
    //       value.tag = null;
    //       if(Object.keys(item.values).length) {
    //         value.disabled = true;
    //       }
    //       if(Object.keys(item.values).length === 0){
    //         value.disabled = false;
    //       }
    //       Object.keys(item.values).forEach(_value=>{
    //         if(value.name == _value){
    //           value.disabled = !Number(item.values[_value]);
    //           value.tag = item.values[_value];
    //         }
    //       });
    //     });
    //     viewModel[item.name] = { values };
    //   }
    // });
    // return viewModel;
  }

  render() {
    const { filtersStats, filtersValues } = this.state;
    const filters = this.makeViewModel1(filtersStats, filtersValues);

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
  changeFilters: React.PropTypes.func.isRequired,
  changeFiltersIsins: React.PropTypes.func.isRequired,
  changeLayersBonds: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({ layers: state.reports.market.layers, user: state.user });
export default connect(mapStateToProps, { layerFilterBonds, layerGetFilterStats, changeFilters, changeFiltersIsins, changeLayersBonds })(Filters);
