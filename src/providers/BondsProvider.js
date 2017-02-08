import requestProvider from '../classes/Provider'

class BondsProvider {
    constructor() {
    }

    static getStaticData(isins) {
        return requestProvider.post(
            'http://sit.skybonds.net/skybonds-data-api/api/v1/data/bonds/info',
            isins
        ).then(function(response) {
            if(response.statusText == 'OK'){
                return response.body;
            }
        });
    }
}

export default BondsProvider;
