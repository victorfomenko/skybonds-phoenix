import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
require('../node_modules/@skybonds/ui-styles/style.sass');
require('../vendor/test');

const rootEl = document.getElementById('root');

const props = {
  reportName: 'Reports'
};


ReactDOM.render(
  <AppContainer>
    <Root
      reportName={props.reportName}
    />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextRoot = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot
          reportName={props.reportName}
        />
      </AppContainer>,
      rootEl
    );
  });
}
