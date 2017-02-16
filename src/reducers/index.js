import { combineReducers } from 'redux';

import user from './user';
import reports from './reports';

const rootReducer = combineReducers({
  user,
  reports
});

export default rootReducer;
