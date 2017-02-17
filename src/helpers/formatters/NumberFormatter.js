// For more information and options:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

const PERCENT_FIELDS = ['yield', 'haircut', 'rollDown', 'roe', 'roeFromTr'];

const DEFAULT_OPTIONS = {
  locale: 'en',
  group: false,
  minFraction: 0,
  maxFraction: 2,
  placeholder: '',
  percent: false
};

export default (value, options = {})=> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  let num = Number(value);
  if (isNaN(num) || value == null || value === '') {
    return options.placeholder;
  }
  else if (num.toLocaleString != null) {
    if (typeof options.percent == 'boolean' && options.percent ||
      typeof options.percent == 'string' && PERCENT_FIELDS.indexOf(options.percent) != -1) {
      num = num * 100;
    }
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
