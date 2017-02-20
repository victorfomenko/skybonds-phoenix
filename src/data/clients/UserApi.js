import { requestProvider } from '../helpers';

const API_V1 = '/api/v1/user/';

export const auth = (email, pwd) => {
  return requestProvider.post({
    url: API_V1 + 'auth',
    body: { email, pwd }
  });
};

export const current = () => {
  return Promise.resolve({"firstName":"test","lastName":"test","roles":null,"organizations":[],"portfolios":[{"name":""}],"middleName":"","id":"137","email":"test@sovcombank.ru"})
  return requestProvider.get({
    url: API_V1 + 'current'
  });
};

export const logout = () => {
  return requestProvider.post({
    url: API_V1 + 'logout'
  });
};
