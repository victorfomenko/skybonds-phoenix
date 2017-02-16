export default {
  cast: function(value) {
    let num = Number(value);
    if (isNaN(num) || value == null || value === '') {
      return null;
    }
    return num;
  }
};
