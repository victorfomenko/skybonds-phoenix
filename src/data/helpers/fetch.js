import { load } from './localStorage'

const ACCESS_TOKEN = 'accessToken'
const token = load(ACCESS_TOKEN)
const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
  'X-REQUEST-CLIENT-TYPE': 'web',
  'X-REQUEST-CLIENT-VERSION': '1.0',
  'X-REQUEST-ID': Date.now(),
  'X-Access-Token': token,
}
const getQS = (params) => {
    const esc = encodeURIComponent;
    
    return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

export const post = async ({ url, body, qs={} }) => {
    if(Object.keys(qs).length) {url += '?' + getQS(qs)}

    const res = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return data
}


export const get = async ({ url, qs={} }) => {
  if(Object.keys(qs).length) {url += '?' + getQS(qs)}

  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
  })
  const data = await res.json()
  return data
}