import { requestProvider } from '../helpers';

const API_PATH = '/api/';

export const search = (query, limit, attrs) => {
  return requestProvider.get({
    url: API_PATH + 'search',
    qs: {
      query,
      limit,
      attrs
    }
  });
};
