// For more information and options:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

const DEFAULT_OPTIONS = {
  locale: 'en',
  group: false,
  minFraction: 0,
  maxFraction: 2,
  placeholder: ''
};

export default (value, options = {})=> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  let num = Number(value);
  if (isNaN(num) || value == null || value === '') {
    return options.placeholder;
  }

  else if (num.toLocaleString != null) {
    return num.toLocaleString(options.locale, {
      useGrouping: options.group,
      minimumFractionDigits: options.minFraction,
      maximumFractionDigits: options.maxFraction
    });
  }

  else {
    return num.toString();
  }
}
