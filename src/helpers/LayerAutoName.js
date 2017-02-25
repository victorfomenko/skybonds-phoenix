import { sortByOrder, getGroup, getGroupsCount } from '../helpers/BondRating'

const getShortRatingsArray = (ratingData) => {
  let result = [];
  if(ratingData == null){
    return result;
  }
  let ratings = ratingData.filter((item)=>{
    return item.selected
  }).map((item)=>{
    return item.name;
  });
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

const collectionToArray = (values)=> {
  if (values == null) {
    values = [];
  }
  return values.filter((item)=>{
    return item.selected
  }).map((item)=>{
    return item.name;
  });
};

const governmentCollectionToArray = (values)=> {
  if (values == null) {
    values = [];
  }
  return values.filter((item)=>{
    return item.selected
  }).map((item)=>{
    if (item.name === 'true') {
      return 'government';
    } else if (item.name === 'false') {
      return 'non-government';
    }
  });
};

const rangeCollectionToArray = (values)=> {
  if (values == null) {
    values = [];
  }
  return values.filter((item)=>{
    return item.selected && item.values.length > 0
  }).map((item)=>{
    return capitalize(item.name) + '(' + stripInfinity(item.values[0]) + ':' + stripInfinity(item.values[1]) + ')';
  });
};

const stripInfinity = (value)=> {
  if(value === Infinity || value === -Infinity) {
    return ''
  }
  return String(value)
};

const capitalize = (value)=> {
  return value[0].toUpperCase() + value.slice(1);
};

const capitalizeValues = (values)=> {
  let results = [];
  values.forEach((value)=>{
    results.push(capitalize(value));
  });
  return results;
};

const addStringToResult = (result, value)=> {
  if (value.length) {
    result.push(value);
  }
  return result;
};

const addArrayToResult = (result, values)=> {
  if (values.length) {
    return result.push(values.join(FILTER_VALUE_SEPARATOR));
  }
  return result;
};

const FILTER_VALUE_SEPARATOR = '/';

const FILTER_NAME_SEPARATOR = ', ';


export const getAutoName = (layerSearch, layerFilters) => {
  let result = [];
  addStringToResult(result, layerSearch.query);
  addArrayToResult(result, collectionToArray(layerFilters.industry));
  addArrayToResult(result, getShortRatingsArray(layerFilters.rating));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.outlook)));
  addArrayToResult(result, collectionToArray(layerFilters.country));
  addArrayToResult(result, collectionToArray(layerFilters.currency));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.domInt)));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.corporations)));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.financial)));
  addArrayToResult(result, capitalizeValues(governmentCollectionToArray(layerFilters.government)));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.liquidity)));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.type)));
  addArrayToResult(result, capitalizeValues(collectionToArray(layerFilters.portfolio)));
  addArrayToResult(result, rangeCollectionToArray(layerFilters.range));
  if (result.length) {
    return result.join(FILTER_NAME_SEPARATOR);
  } else {
    return 'Empty set';
  }
};
