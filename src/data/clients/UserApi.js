import { requestProvider } from '../helpers';

const API_V1 = '/api/v1/user/';

export const auth = (email, pwd) => {
  return requestProvider.post({
    url: API_V1 + 'auth',
    body: { email, pwd }
  })
};

export const current = () => {
  return requestProvider.get({
    url: API_V1 + 'current'
  })
};

export const logout = () => {
  return requestProvider.post({
    url: API_V1 + 'logout'
  })
};
