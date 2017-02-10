import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'


import { store } from './store'
import Root from './containers/Root';

const rootEl = document.getElementById('root');


render(
  <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Root/>
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextRoot />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
