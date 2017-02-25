import * as NewtonApi from '../clients/NewtonApi';

export const getBondBenchmark = ({isin, start_date, stop_date, step}) => {
    return NewtonApi.getMarket(isin, start_date, stop_date, step);
};
