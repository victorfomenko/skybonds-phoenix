export const post = async ({ url, body, success, failure, dispatch, token }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-REQUEST-CLIENT-TYPE': 'web',
        'X-REQUEST-CLIENT-VERSION': '1.0',
        'X-REQUEST-ID': Date.now(),
        'X-Access-Token': token,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    dispatch({ type: success, data, token })
    return data
  } catch (e) {
    dispatch({ type: failure })
  }
}

export const get = async ({ url, success, failure, dispatch, token }) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-REQUEST-CLIENT-TYPE': 'web',
        'X-REQUEST-CLIENT-VERSION': '1.0',
        'X-REQUEST-ID': Date.now(),
        'X-Access-Token': token,
      },
    })
    const data = await res.json()
    dispatch({ type: success, data, token })
    return data
  } catch (e) {
    dispatch({ type: failure })
  }
}