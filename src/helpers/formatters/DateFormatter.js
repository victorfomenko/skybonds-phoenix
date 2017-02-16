const REGEXP_FORMATS = {
  'RU': '$1.$2.$3',
  'EN': '$1/$2/$3'
};

const DEFAULT_OPTIONS = {
  regexp: REGEXP_FORMATS.RU,
  placeholder: ''
};

export default (value, options = {})=> {
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  if(value == null || value.getTime == null || isNaN( value.getTime() )) {
    return options.placeholder;
  }
  let year = value.getFullYear();
  let month = (('0' + (value.getMonth() + 1)).slice(-2));
  let day = (('0' + (value.getDate())).slice(-2));
  return (day + month + year).replace(/(\d{2})(\d{2})(\d{4})/, options.regexp);
}
