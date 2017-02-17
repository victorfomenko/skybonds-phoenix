import { requestProvider } from '../helpers';

const API_V1 = '/api/v1/data/';

export const getByDate = (date) => {
  return requestProvider.get({
    url: API_V1 + 'rates/date/' + date
  });
};
