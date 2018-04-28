import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, {component: require('./routes/Index')});
        });
      },
      childRoutes: [
        {
            path: 'homePage',
            name: 'homePage',
            getComponent(nextState, cb) {
              require.ensure([], require => {
                cb(null, require('./routes/Index'));
              });
            },
          },
          {
            path: 'orders',
            name: 'orders',
            getComponent(nextState, cb) {
              require.ensure([], require => {
                registerModel(app, require('./models/order/orders'));
                cb(null, require('./routes/order/Orders'));
              });
            },
          }
        ],
      },
  ];


  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
