const API_V1 = '/api/v1/data';
const API_V2 = '/api/v2/data';

class DataApi {

  constructor() {

  }

  static filtersApply(filters) {
    return requestProvider.post(
      {
        url: API_V2 + 'filters/apply?stats=true&details=true',
        data: filters
      }
    );
  }

  static getBondsInfo(isins) {
    return requestProvider.post(
      {
        url: API_V1 + 'bonds/info',
        body: isins
      }
    )
  }

  static getBondsDaily(isins, date, attrs = []) {
    return requestProvider.post(
      {
        url: API_V1 + 'bonds/daily/' + DateDayCaster.format(date),
        body: isins,
        qs: attrs
      }
    )
  }

}

// TODO: handle errors on base _request layer
