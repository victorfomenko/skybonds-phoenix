export const post = async ({ url, token, body, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Access-Token': token,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    dispatch({ type: success, data })
  } catch (e) {
    dispatch({ type: failure })
  }
}

export const get = async ({ url, token, success, failure, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Access-Token': token,
      },
    })
    const data = await res.json()
    dispatch({ type: success, data })
  } catch (e) {
    dispatch({ type: failure })
  }
}


// export const post = async ({ url, body, success, failure, dispatch }) => {
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: new Headers({
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'X-REQUEST-CLIENT-TYPE': 'web',
//         'X-REQUEST-CLIENT-VERSION': '1.0',
//         'X-REQUEST-ID': Date.now()
//       }),
//       mode: 'no-cors',
//       body: JSON.stringify(body),
//     })
//     const data = await res.json()
//     dispatch({ type: success, data })
//   } catch (e) {
//     dispatch({ type: failure })
//   }
// }