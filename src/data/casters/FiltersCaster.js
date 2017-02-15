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
		return filterArray
	}
}