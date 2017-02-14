export const save = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.warn(err)
  }
}

export const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const remove = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    return undefined
  }
}