import { load } from './localStorage';
import { ACCESS_TOKEN } from '../constants';

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'X-REQUEST-CLIENT-TYPE': 'web',
  'X-REQUEST-CLIENT-VERSION': '1.0',
};
const getQS = (params) => {
  const esc = encodeURIComponent;

  return Object.keys(params)
    .filter((key)=>{
      return params[key] != null
    })
    .map((key)=>{
      let value;
      if(Array.isArray(params[key])) {
        value = params[key].map(value => esc(value));
      } else {
        value = esc(params[key]);
      }
      return esc(key) + '=' + value
    })
    .join('&');
};

export const post = async ({ url, body, qs={} }) => {
  if(Object.keys(qs).length) {
    url += '?' + getQS(qs);
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'X-REQUEST-ID': Date.now(),
      'X-Access-Token': load(ACCESS_TOKEN),
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};


export const get = async ({ url, qs={} }) => {
  if(Object.keys(qs).length) {
    url += '?' + getQS(qs);
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      'X-REQUEST-ID': Date.now(),
      'X-Access-Token': load(ACCESS_TOKEN),
    },
  });
  return await res.json();
};
