const getMean = (array) => {
  let sum = 0;
  let i = 0;
  let len = array.length;
  while (i < len) {
    sum += array[i];
    i++;
  }
  return sum / len;
};

const getVariance = (mean, array) => {
  let sum = 0;
  let i = 0;
  let len = array.length;
  while (i < len) {
    if (array[i]) {
      sum += Math.pow(array[i] - mean, 2);
    }
    i++;
  }
  return sum / len;
};

export const removeAbnormal = (keys, getter, value) => {
  return keys.filter((key) => {
    return getter(key) < value;
  });
};

export const removeOutOfRange = (keys, getter, bottom, top) => {
  return keys.filter((key) => {
    let value = getter(key);
    return (bottom <= value && value <= top);
  });
};

export const removeOutlier = (keys, allKeys, getter, sigma) => {
  let deviation, key, mean, result, values;

  if (typeof allKeys === 'function') {
    sigma = getter;
    getter = allKeys;
    allKeys = keys;
  }

  values = (()=> {
    let i, len, results;
    results = [];
    for (i = 0, len = allKeys.length; i < len; i++) {
      key = allKeys[i];
      results.push(getter(key));
    }
    return results;
  })();

  mean = getMean(values);
  deviation = sigma * Math.sqrt(getVariance(mean, values));
  result = keys;
  if (deviation) {
    result = keys.filter((key)=> {
      let value = getter(key);
      return (mean - deviation < value && value < mean + deviation);
    });
  }
  return result;
};
