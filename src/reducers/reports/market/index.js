import { combineReducers } from 'redux';

import layers from './layers';
import movers from './movers';
import bondInfo from './bondInfo';

const market = combineReducers({
  layers,
  movers,
  bondInfo
});

export default market;
