import { combineReducers } from 'redux'

import layers from './layers';
import movers from './movers';

const market = combineReducers({
  layers,
  movers
});

export default market;
