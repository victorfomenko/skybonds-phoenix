import { actionTypes } from './actionTypes';
import * as SearchProvider from '../data/providers/Search';
import * as DataProvider from '../data/providers/Data';
import { isBondActual } from '../helpers/BondActual';
import { keyBy } from 'lodash';

const SEARCH_LIMIT = 200;
const SEARCH_FIELDS = ['maturityDate', 'finalDate', 'issueDate', 'status', 'ccy', 'ratingGroup'];
const MIN_QUERY_LENGTH = 3;

export const searchRequest = (id, query, date) => async (dispatch) => {
  dispatch({ type: actionTypes.SEARCH_REQUEST });
  // TODO { data: [] } (((
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
            response.bonds[b].isActual = isBondActual(response.bonds[b], date);
            group.bonds.push(response.bonds[b]);
          }
        }
        data.push(group);
      }

      dispatch({ type: actionTypes.SEARCH_RESPONSE, id, query, data });

      const attrs = ['yield', 'duration'];
      const isins = response.bonds.filter((bond)=>{
        return bond.isActual;
      }).map((bond)=>{
        return bond.isin;
      });
      const dailyData = await DataProvider.getBondsDaily(isins, date, attrs);
      let dailyDataMap = keyBy(dailyData, 'isin');
      for(let group of data) {
        for(let bond of group.bonds) {
          if(dailyDataMap[ bond.isin ] && dailyDataMap[ bond.isin ].data != null) {
            bond['yield'] = dailyDataMap[ bond.isin ].data.yield;
            bond['duration'] = dailyDataMap[ bond.isin ].data.duration;
          }
        }
      }
      dispatch({ type: actionTypes.SEARCH_RESPONSE, id, query, data });
    }
    catch (response) {
      dispatch({ type: actionTypes.SEARCH_RESPONSE, id, response });
    }
  }
};
