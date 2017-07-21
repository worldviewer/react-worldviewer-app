// React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';

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

import App from './components/App.jsx';

// Bootstrap CSS - https://bootswatch.com/ - Solar Theme
// changes: .navbar {border-radius: none}
// removed media query .container widths
// added media query for margin-bottom on .navbar
// added tranisition delay to hamburger, .navbar-toggle
import './styles/bootstrap-solar.css';

// Fonts
import './styles/league-gothic-font.css';

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
// Generates error: "Error during service worker registration: DOMException: Only secure
// origins are allowed (see: https://goo.gl/Y0ZkNV)."  Turning off for now ...
// registerServiceWorker();
