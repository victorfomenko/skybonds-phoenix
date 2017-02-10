export default {

  format: function(value) {
    if(value == null) {
      return null;
    }
    let year = value.getFullYear();
    let month = (('0' + (value.getMonth() + 1)).slice(-2));
    let day = (('0' + (value.getDate() + 1)).slice(-2));
    return year + month + day;
  }

};
