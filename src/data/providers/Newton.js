import * as NewtonApi from '../clients/NewtonApi';

export const getBondBenchmark = async (isin, start_date, stop_date, step) => {
    const resp = await NewtonApi.getBondBenchmark(isin, start_date, stop_date, step);
    let obj = {
        isin: isin + 'Benchmark',
        data: [],
    };
    obj.data =  resp.map(item=> {
        return {
            date: item[0],
            yieldOfPeers: item[1],
        }
    });
    return obj;
};
