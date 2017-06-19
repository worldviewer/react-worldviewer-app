// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Redux Dependencies
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './redux.js';

// React Router Dependencies
// Note that react-router-redux version is currently fixed to 5.0.0-alpha.6
// to resolve an error; update this version number when a stable release appears
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import App from './App.jsx';

// Middleware
const middlewareStoreEnhancer = applyMiddleware(
	thunkMiddleware.withExtraArgument({
		localStorage
	})
);

// Redux DevTools
const devToolStoreEnhancer =
	(window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()) ||
	((x) => x);

const
	history = createHistory(),
	routeMiddleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		reducer,
		router: routerReducer
	}),
	compose(middlewareStoreEnhancer, devToolStoreEnhancer),
	applyMiddleware(routeMiddleware)
);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);

// registerServiceWorker is explained at https://news.ycombinator.com/item?id=14373178
registerServiceWorker();
