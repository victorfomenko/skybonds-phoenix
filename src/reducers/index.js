import { combineReducers } from 'redux';

import user from './user';
import summary from './summary';
import home from './home';
import reports from './reports';
import bond from './bond';

const rootReducer = combineReducers({
  user,
  summary,
  home,
  reports,
  bond
});

export default rootReducer;
