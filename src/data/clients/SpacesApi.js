import { requestProvider } from '../helpers';

const API_V1 = '/api/v1/spaces';

export const add = (id, data={}) => {
  return requestProvider.post({
    url: `${API_V1}/${id}/add`,
    body: data
  });
};

export const update = (id, data={}) => {
  return requestProvider.post({
    url: `${API_V1}/${id}/update`,
    body: data
  });
};
