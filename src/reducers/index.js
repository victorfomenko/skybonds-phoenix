import { combineReducers } from 'redux';

import user from './user';
import bond from './bond';
import home from './home';
import reports from './reports';
import summary from './summary';

const rootReducer = combineReducers({
  user,
  bond,
  home,
  reports,
  summary
});

export default rootReducer;
