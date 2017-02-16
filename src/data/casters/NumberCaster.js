export default {
  cast: function(value) {
    let num;
    if (value === '' || value === '-' || value === null || value === (void 0)) {
      return null;
    }
    num = Number(value);
    if (isNaN(num)) {
      return null;
    }
    return num;
  }
};
