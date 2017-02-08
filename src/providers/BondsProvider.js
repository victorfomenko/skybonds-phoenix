import requestProvider from './classes/Provider'

const paths = require('./paths');
const DateDayCaster = require('./casters/DateDayCaster');

class BondsProvider {

  static getInfo(isins = []) {
    return requestProvider.post(
      paths.dataApiV1 + 'bonds/info', isins
    ).then(function(response) {
      if(response.statusText == 'OK'){
        return response.body;
      }
    });
  }


  static getDaily(isins = [], date, attrs = []) {
    attrs = attrs.join(',');
    if(attrs) {
      attrs = '?attrs=' + attrs
    }
    return requestProvider.post(
      paths.dataApiV1 + 'bonds/daily/' + DateDayCaster.format(date) + attrs, isins
    ).then(function(response) {
      if(response.statusText == 'OK'){
        return response.body;
      }
    });
  }

}

export default BondsProvider;
