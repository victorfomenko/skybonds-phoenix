import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as BondsProvider from '../data/providers/Search';
import { isBondActual } from '../helpers/bondActual';


const SEARCH_LIMIT = 200;
const SEARCH_FIELDS = ['maturityDate', 'finalDate', 'issueDate', 'status', 'ccy', 'ratingGroup'];
const MIN_QUERY_LENGTH = 3;

export const searchRequest = (id, query, date) => async (dispatch) => {
  dispatch({ type: actionTypes.SEARCH_REQUEST });
  // TODO { bonds: [], issuers: [], groups: []} (((
  if(query.length < MIN_QUERY_LENGTH) {
    dispatch({ type: actionTypes.SEARCH_RESPONSE, id, query, data: [] });
  } else {
    try {

      const response = await SearchProvider.search(query, SEARCH_LIMIT, SEARCH_FIELDS);
      const data = [];

      // TODO rewrite with maps
      for(let i = 0; i < response.issuers.length; i++) {
        let group = {
          issuerId: response.issuers[i].id,
          issuerName: response.issuers[i].name,
          bonds: []
        };
        for(let b = 0; b < response.bonds.length; b++) {
          if(response.bonds[b].issuerId == response.issuers[i].id) {
            response.bonds[b].actual = isBondActual(response.bonds[b], date);
            group.bonds.push(response.bonds[b]);
          }
        }
        data.push(group);
      }

      dispatch({ type: actionTypes.SEARCH_RESPONSE, id, query, data });
    }
    catch (response) {
      dispatch({ type: actionTypes.SEARCH_RESPONSE, id, response })
    }
  }
};
