import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import * as Auth from './data/providers/Auth';
import * as Data from './data/providers/Data';


import rootReducer from './reducers';
import { loginWithToken } from './actions';
import { localStorageProvider } from './data/helpers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = ( async ()=> {
  let user = {};
  let summary = {};

  [user, summary] = await Promise.all([
    Auth.loginWithToken(),
    Data.getSummary().catch(e=> { return {} })
  ])
    .catch((e)=>{
      console.warn(e);
      return [];
    });

  return createStore(rootReducer, { user, summary },
    composeEnhancers(
      applyMiddleware(thunk),
    ),
  );
})();



//store.subscribe(throttle(() => localStorageProvider.save('state', store.getState()), 1000))
//store.dispatch(loginWithToken())
