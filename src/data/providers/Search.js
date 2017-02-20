import * as SearchApi from '../clients/SearchApi';
import { isBondActual } from '../../helpers/BondActual';

const MIN_QUERY_LENGTH = 3;
const SEARCH_LIMIT = 200;


export const search = async (query, date) => {
  const INFO_ATTRS = ['maturityDate', 'finalDate', 'issueDate', 'status', 'ccy', 'ratingGroup'];
  if(query.length < MIN_QUERY_LENGTH) {
    return []
  }
  // const filtersIsins = await DataProvider.filtersApply(filters);

  const response = await SearchApi.search(query, SEARCH_LIMIT, INFO_ATTRS);

  const actualBonds = response.bonds.filter((bond)=>{
    return isBondActual(bond, date);
  }).map((bond)=>{
    return {
      isin: bond.isin,
      info: bond,
      daily: {}
    }
  });

  return actualBonds;
};
