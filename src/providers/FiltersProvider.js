import requestProvider from './classes/Provider'

const paths = require('./paths');

class FiltersProvider {

    static getFilteredIsins(filters) {
        return requestProvider.post(
            paths.dataApiV2 + 'filters/apply?stats=true&details=true',
            filters
        ).then(function(response) {
            if(response.statusText == 'OK'){
                return response.body;
            }
        });
    }
}

export default FiltersProvider;
