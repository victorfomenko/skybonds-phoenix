import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import * as Auth from './data/providers/Auth';


import rootReducer from './reducers';
import { loginWithToken } from './actions';
import { localStorageProvider } from './data/helpers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = ( async ()=> {
	let data = {};
	try {
		data = await Auth.loginWithToken();
	}
	catch (e) {
		data = {};
	}
	return createStore(rootReducer, {user: data},
	  composeEnhancers(
	    applyMiddleware(thunk),
	  ),
	);
})();



//store.subscribe(throttle(() => localStorageProvider.save('state', store.getState()), 1000))
//store.dispatch(loginWithToken())
