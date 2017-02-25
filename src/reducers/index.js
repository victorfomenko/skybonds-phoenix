import { combineReducers } from 'redux';

import user from './user';
import bond from './bond';
import home from './home';
import reports from './reports';

const rootReducer = combineReducers({
  user,
  bond,
  home,
  reports
});

export default rootReducer;
