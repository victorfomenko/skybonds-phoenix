// For more information and options:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString

const PERCENT_FIELDS = ['yield', 'haircut', 'rollDown', 'roe', 'roeFromTr'];

const DEFAULT_OPTIONS = {
  locale: 'en',
  group: false,
  minFraction: 0,
  maxFraction: 2,
  placeholder: '',
  isPercent: false,
  asNumber: false,
  forceSign: false
};

// Safe scaling to avoid JS rounding quirks, see:
// http://stackoverflow.com/a/12830454/1469203
const scaleNumber = (value, scale)=> {
  let result = Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale);
  if(value - result > 0) {
    return (result + Math.floor(2 * Math.round((value - result) * Math.pow(10, (scale + 1))) / 10) / Math.pow(10, scale));
  } else {
    return result;
  }
};

// TODO Safari/Webkit lacks support of options param
export default (value, options = {})=> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  let num = Number(value);
  if (isNaN(num) || value == null || value === '') {
    return options.placeholder;
  }

  if (typeof options.isPercent == 'boolean' && options.isPercent ||
    typeof options.isPercent == 'string' && PERCENT_FIELDS.indexOf(options.isPercent) != -1) {
    num *= 100;
  }
  if (options.asNumber) {
    return scaleNumber(num, options.maxFraction);
  } else {
    let numString = num.toLocaleString(options.locale, {
      useGrouping: options.group,
      minimumFractionDigits: options.minFraction,
      maximumFractionDigits: options.maxFraction
    });
    if(num > 0 && options.forceSign) {
      numString = '+' + numString;
    }
    return numString;
  }
}
