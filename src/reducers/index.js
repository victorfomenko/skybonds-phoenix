import { combineReducers } from 'redux';

import user from './user';
import home from './home';
import reports from './reports';

const rootReducer = combineReducers({
  user,
  home,
  reports
});

export default rootReducer;
