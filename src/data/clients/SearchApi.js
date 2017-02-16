import { requestProvider } from '../helpers';
import DateDayCaster from '../casters/DateDayCaster';

const API_PATH = '/api/';
const DATES_TO_CAST = ['maturityDate', 'finalDate', 'issueDate'];

export const search = (query, limit, attrs) => {
  return requestProvider.get({
    url: API_PATH + 'search',
    qs: {
      query,
      limit,
      attrs
    }
  }).then((response)=>{
    for(let i = 0; i < response.bonds.length; i++) {
      for(let a = 0; a < DATES_TO_CAST.length; a++) {
        let field = DATES_TO_CAST[a];
        if(response.bonds[i][field] != null) {
          response.bonds[i][field] = DateDayCaster.cast(response.bonds[i][field])
        }
      }
    }
    return response;
  });
};
