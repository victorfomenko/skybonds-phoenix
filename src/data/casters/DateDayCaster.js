export default {

  format: (value)=> {
    if(value == null) {
      return null;
    }
    let year = value.getFullYear();
    let month = (('0' + (value.getMonth() + 1)).slice(-2));
    let day = (('0' + (value.getDate())).slice(-2));
    return year + month + day;
  },

  cast: (value)=> {
    if(typeof value == 'string' && value.length == 8)  {
      return new Date(value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3T00:00:00+0000'));
    } else {
      return null;
    }
  }

};
