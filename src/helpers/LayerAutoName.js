import { sortByOrder, getGroup, getGroupsCount } from '../helpers/BondRating'

const SUPPORTED_FILTERS = [ 'industry', 'rating', 'outlook', 'country', 'currency', 'domInt',
  'corporations', 'financial', 'government', 'liquidity', 'type', 'portfolio', 'price', 'spread',
  'yield', 'duration', 'maturity', 'discount'];
const CAPITALIZABLE_FILTERS = [                   'outlook',                        'domInt',
  'corporations', 'financial', 'government', 'liquidity', 'type', 'portfolio', 'price', 'spread',
  'yield', 'duration', 'maturity', 'discount'];
const RANGE_FILTERS = ['price', 'spread', 'yield', 'duration', 'maturity', 'discount'];
const FILTER_VALUE_SEPARATOR = '/';
const FILTER_NAME_SEPARATOR = ', ';

const getShortedRatings = (ratings) => {
  let result = [];
  if(ratings == null){
    return result;
  }
  let ratingFilter = sortByOrder(ratings);
  let ratingGroupsCount = getGroupsCount();
  Object.keys(ratingGroupsCount).forEach((group)=>{
    let ratingsOfGroup = [];
    ratingFilter.forEach((rating)=>{
      if(getGroup(rating) === group) {
        ratingsOfGroup.push(rating);
      }
    });
    if(ratingGroupsCount[group] > 1 && ratingsOfGroup.length == ratingGroupsCount[group]){
      result.push('all ' + group);
    } else {
      result = result.concat(ratingsOfGroup);
    }
  });
  return result;
};


export const getAutoName = (search, filters) => {
  let result = [];
  if(search.query) {
    result.push(search.query)
  }
  SUPPORTED_FILTERS.forEach((filter)=>{
    let values = filters[filter];
    if(values) {
      if(filter === 'rating') {
        values = getShortedRatings(values);
      }
      if(filter === 'government') {
        values = values.map((value)=>{
          switch(value) {
            case 'true': return 'government'; break;
            case 'false': return 'non-government'; break;
          }
        })
      }
      if(RANGE_FILTERS.indexOf(filter) !== -1) {
        values = values.map((value)=>{
          if(value === Infinity || value === -Infinity) {
            return '';
          }
          return value;
        });
        values = [ filter + '(' + values.join(':') + ')' ];
      }
      if(CAPITALIZABLE_FILTERS.indexOf(filter) !== -1) {
        values = values.map((value)=>{
          return value[0].toUpperCase() + value.slice(1)
        });
      }
      result.push(values.join(FILTER_VALUE_SEPARATOR));
    }
  });
  if (result.length) {
    return result.join(FILTER_NAME_SEPARATOR);
  } else {
    return 'Empty set';
  }
};
