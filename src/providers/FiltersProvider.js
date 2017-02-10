import requestProvider from './modules/Provider'

const config = require('./config');

class FiltersProvider {

    static getFilteredIsins(filters) {
        return requestProvider.post(
            config.dataApiV2 + 'filters/apply?stats=true&details=true',
            filters
        ).then(function(response) {
            if(response.statusText == 'OK'){
                return response.body;
            }
        });
    }
}

export default FiltersProvider;
