// React Dependencies
import React, { Component } from 'react';

// React Router Dependencies
import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

// Spinner / Preloader / Code-Splitter
import Loadable from 'react-loadable';
import spinner from '../../images/explosion-spinner.svg';

// Error/Logger Handling
import { logRoute, logError } from '../../libs/utils';

// See bottom of http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
// This is a state handler for the react-loadable code splitter
const LoadingComponent = ({isLoading, error, pastDelay, timedOut}) => {
	const spinnerStyle = {
		alignItems: "center",
		display: "flex",
		height: "100%",
		justifyContent: "center",
		position: "fixed",
		width: "100%",
		zIndex: 100
	};

	// Handle the loading state, after pastDelay
	if (isLoading && pastDelay) {
		return <div style={spinnerStyle}>
			<img
				alt="Loading Spinner"
				className="Spinner"
				src={spinner} />
		</div>

	// What happens if page doesn't load after timeout setting
	} else if (timedOut) {
		logError(null, 'Application timed out: You might want to try refreshing the page. This may be a connectivity issue.',
			this.props.user.token);

		return null;

	} else if (error) {
		logError(error, 'Error: ' + error, this.props.user.token);

		return null;

	} else {
		return null;
	}
};

// http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
// Create React App (from 1.0 onwards) allows us to dynamically import parts of
// our app using import. While, the dynamic import() can be used for any component
// in our React app; it works really well with React Router. Since, React Router
// is figuring out which component to load based on the path; it would make sense
// that we dynamically import those components only when we navigate to them.

// It’s important to note that we are not doing an import here. We are only
// passing in a function to asyncComponent that will dynamically import() when
// the AsyncHome component is created. Also, it might seem weird that we are
// passing a function here. Why not just pass in a string (say ./containers/Home)
// and then do the dynamic import() inside the AsyncComponent? This is because
// we want to explicitly state the component we are dynamically importing. Webpack
// splits our app based on this. It looks at these imports and generates the
// required parts (or chunks).

const settings = {
	loading: LoadingComponent,
	delay: 1000,
	timeout: 10000
};

// Components
// Routes are loaded on-the-fly, as needed, in order to reduce the initial load time

const AsyncHome = Loadable({
	...settings,
	loader: () => import('../Home/Home.jsx')
});

const AsyncLogin = Loadable({
	...settings,
	loader: () => import('../Login/Login.jsx')
});

const AsyncSignup = Loadable({
	...settings,
	loader: () => import('../Signup/Signup.jsx')
});

const AsyncNotFound = Loadable({
	...settings,
	loader: () => import('../NotFound/NotFound.jsx')
});

const AsyncNews = Loadable({
	...settings,
	loader: () => import('../News/News.jsx')
});

const AsyncFeed = Loadable({
	...settings,
	loader: () => import('../Feed/Feed.jsx')
});

const AsyncMainStack = Loadable({
	...settings,
	loader: () => import('../../swipes/MainStack/MainStack.jsx')
});

class RouteLoaderComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	// See bottom of http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html
	// When we think we know what the page transition is going to be, we can
	// preload the next page at the end of componentDidMount.
	preload = (pathname) => {
		switch (pathname) {
			case '/signup':
			case '/login':
				AsyncHome.preload();
				break;

			default:
				break;
		}
	}

	async componentDidMount() {
		// We use the current router pathname to figure out which pages to preload
		this.preload(this.props.pathname);
	}

	componentWillReceiveProps(nextProps) {
		// For debugging purposes
		if (this.props.router.location.pathname !== nextProps.router.location.pathname) {

			logRoute(this.props.router.location.pathname + ' --> ' +
				nextProps.router.location.pathname);
		}
	}

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					location={this.props.location}
					component={AsyncHome} />

				<Route
					exact
					path="/login"
					location={this.props.location}
					component={AsyncLogin} />

				<Route
					exact
					path="/signup"
					location={this.props.location}
					component={AsyncSignup} />

				<Route
					path="/news"
					location={this.props.location}
					component={AsyncNews} />
					
				<Route
					path="/feed"
					location={this.props.location}
					component={AsyncFeed} />

				{/* https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component */}
				<Route
					path="/:controversy/:level(worldview)/card"
					render={ (props) =>
						<AsyncMainStack
							location={this.props.location}
							cardStackLevel={2}
							discourseLevel={true}
							{...props}/> } />

				<Route
					path="/:controversy/:level(worldview)/text"
					render={ (props) =>
						<AsyncMainStack
							location={this.props.location}
							cardStackLevel={1}
							discourseLevel={true}
							{...props}/> } />

				<Route path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)/comments"
					render={ (props) =>
						<AsyncMainStack
							location={this.props.location}
							cardStackLevel={5}
							discourseLevel={true}
							{...props}/> } />

				{/* This route will only work if :feed is valid, otherwise should dump user onto FeedCardList.
				    Swiping right from FeedCardList should be disabled, and will be triggered by selection. */}
				<Route
					path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)/:feed"
					render={ (props) =>
						<AsyncMainStack
							location={this.props.location}
							cardStackLevel={4}
							discourseLevel={true}
							{...props}/> } />

				<Route
					path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)"
					render={ (props) =>
						<AsyncMainStack
							location={this.props.location}
							cardStackLevel={3}
							discourseLevel={true}
							{...props}/> } />
				
				<Route
					component={AsyncNotFound} />
			</Switch>
		);
	}
}

export default withRouter(RouteLoaderComponent);
