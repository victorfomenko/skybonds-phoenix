import * as SearchApi from '../clients/SearchApi';
import { isBondActual } from '../../helpers/BondActual';

const MIN_QUERY_LENGTH = 3;
const SEARCH_LIMIT = 200;
const SEARCH_INFO_ATTRS = ['issuer', 'maturityDate', 'finalDate', 'issueDate', 'status', 'ccy', 'ratingGroup'];


export const searchBonds = async (query, date) => {
  if(query.length < MIN_QUERY_LENGTH) {
    return []
  }
  const response = await SearchApi.search(query, SEARCH_LIMIT, SEARCH_INFO_ATTRS);
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
