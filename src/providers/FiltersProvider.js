import requestProvider from '../classes/Provider'

class FiltersProvider {
    constructor() {
    }

    getFilteredIsins(filters) {
        return requestProvider.post(
            'http://sit.skybonds.net/skybonds-data-api/api/v2/data/filters/apply?stats=true&details=true',
            filters
        ).then(function(response) {
            if(response.statusText == "OK"){
                return response.body;
            }
        });
    }
}

export default FiltersProvider;
