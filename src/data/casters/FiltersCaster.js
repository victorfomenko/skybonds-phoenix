export default {
	format: (filters) => {
		var filter, filterArray, name, values;
		filterArray = [];
		for (name in filters) {
		  filter = filters[name];
		  if (filter instanceof Array) {
		    if (filter.length === 0) {
		      continue;
		    }
		  } else {
		    if (filter == null) {
		      continue;
		    }
		  }
		  values = filter instanceof Array ? filter : [filter];
		  if (name === 'floaters') {
		    name = 'floater';
		  }
		  if (name === 'convertibles') {
		    name = 'convertible';
		  }
		  if (name === 'industry') {
		    name = 'sector';
		  }
		  if (name === 'domInt') {
		    name = 'dom-int';
		  }
		  switch (name) {
		    case 'discount':
		    case 'yield':
		    case 'price':
		    case 'spread':
		    case 'duration':
		    case 'maturity':
		      if (name === 'maturity') {
		        name = 'yearsToPutCallMaturity';
		      }
		      if (name === 'spread') {
		        name = 'spreadToBMK';
		      }
		      if (name === 'discount') {
		        name = 'haircut';
		      }
		      if (name === 'yield') {
		        values = values.map(function(val) {
		          if (String(val).indexOf('Infinity') === -1) {
		            return val / 100;
		          }
		          return val;
		        });
		      }
		      if (values.length > 1) {
		        filterArray.push({
		          name: name,
		          value: values[0] + ':' + values[1]
		        });
		      }
		      break;
		    case 'corporations':
		    case 'non-corporations':
		    case 'financial':
		    case 'non-financial':
		      values.forEach(function(item) {
		        var value;
		        name = item.name;
		        value = values.map(function(val) {
		          var ref, ref1;
		          if ((ref = val.name) === 'financial' || ref === 'corporations') {
		            return true;
		          }
		          if ((ref1 = val.name) === 'non-financial' || ref1 === 'non-corporations') {
		            return false;
		          }
		        });
		        if (name === 'non-financial') {
		          name = 'financial';
		        }
		        if (name === 'non-corporations') {
		          name = 'corporations';
		        }
		        return filterArray.push({
		          name: name,
		          value: value
		        });
		      });
		      break;
		    case 'type':
		      values.forEach(function(item) {
		        values = values.map(function() {
		          return true;
		        });
		        return filterArray.push({
		          name: item.name,
		          value: values
		        });
		      });
		      break;
		    default:
		      values = values.map(function(item) {
		        return item.name;
		      });
		      filterArray.push({
		        name: name,
		        value: values
		      });
		  }
		}
		return filterArray;
	},
	cast: (stats) => {
		let typeValues = {};
		stats.forEach(function(arg, index) {
		  var name, values;
		  name = arg.name, values = arg.values;
		  if (name === 'floater' || name === 'convertible' || name === 'regular' || name === 'subord') {
		    if (values['true'] != null) {
		      typeValues[name] = values['true'];
		    }
		  }
		  if (name === 'yield' || name === 'price' || name === 'duration' || name === 'haircut' || name === 'spreadToBMK' || name === 'yearsToPutCallMaturity') {
		    if (name === 'haircut') {
		      name = 'discount';
		    }
		    if (name === 'spreadToBMK') {
		      name = 'spread';
		    }
		    if (name === 'yearsToPutCallMaturity') {
		      name = 'maturity';
		    }
		    if (name === 'yield') {
		      values = values.map(function(val) {
		        return val * 100;
		      });
		    }
		    stats[index] = {
		      name: name,
		      values: values
		    };
		  }
		  if (name === 'financial') {
		    if (values['true']) {
		      values['financial'] = values['true'];
		    }
		    if (values['false']) {
		      values['non-financial'] = values['false'];
		    }
		    delete values['true'];
		    delete values['false'];
		    stats[index] = {
		      name: name,
		      values: values
		    };
		  }
		  if (name === 'corporations') {
		    if (values['true']) {
		      values['corporations'] = values['true'];
		    }
		    if (values['false']) {
		      values['non-corporations'] = values['false'];
		    }
		    delete values['true'];
		    delete values['false'];
		    stats[index] = {
		      name: name,
		      values: values
		    };
		  }
		  if (name === 'sector' || name === 'dom-int') {
		    if (name === 'sector') {
		      name = 'industry';
		    }
		    if (name === 'dom-int') {
		      name = 'domInt';
		    }
		    return stats[index] = {
		      name: name,
		      values: values
		    };
		  }
		});

		if (Object.keys(typeValues).length) {
		  stats.push({
		    name: 'type',
		    values: typeValues
		  });
		}

		return stats;
	}
};
