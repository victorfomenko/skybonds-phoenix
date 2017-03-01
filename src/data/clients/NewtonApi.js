import { requestProvider } from '../helpers';
import DateDayCaster from '../casters/DateDayCaster';

const API_V1 = '/api/v1/newton/';

export const getBondBenchmark = (isin, start_date, stop_date, step = 1) => {
  return requestProvider.get({
    url: API_V1 + 'bond_benchmark_ts,' + isin + ',' + start_date + ',' + stop_date + ',' + step,
  });
};

