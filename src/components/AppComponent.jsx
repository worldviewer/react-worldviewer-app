// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import RouteNavItem from './RouteNavItem/RouteNavItem';
import { Notification } from 'react-notification';
import './App.css';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Spinner / Preloader / Code-Splitter
import Loadable from 'react-loadable';
import spinner from './Spinner/explosion-spinner.svg';

// Amazon Cognito Dependencies
import { getUserToken, getCurrentUser } from '../libs/awsLib';

// React Router Dependencies
import { Route, Switch } from 'react-router';
import { withRouter, Link } from 'react-router-dom';

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
				alt="Explosion Emoji Spinner"
				className="Spinner"
				src={spinner} />
		</div>

	// What happens if page doesn't load after timeout setting
	} else if (timedOut) {
		this.props.setAlert("Timeout: ", "You might want to try refreshing page");
		setTimeout(() => this.props.dismissAlert(), 5000);

		return null;

	} else if (error) {
		this.props.setAlert("Error: ", "Something's not right");
		setTimeout(() => this.props.dismissAlert(), 5000);

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
	delay: 500,
	timeout: 10000
};

// Components
// Routes are loaded on-the-fly, as needed, in order to reduce the initial load time
const AsyncHome = Loadable({
	...settings,
	loader: () => import('./Home/Home.jsx')
});

const AsyncLogin = Loadable({
	...settings,
	loader: () => import('./Login/Login.jsx')
});

const AsyncSignup = Loadable({
	...settings,
	loader: () => import('./Signup/Signup.jsx')
});

const AsyncNotFound = Loadable({
	...settings,
	loader: () => import('./NotFound/NotFound.jsx')
});

const AsyncNews = Loadable({
	...settings,
	loader: () => import('./News/News.jsx')
});

const AsyncSearch = Loadable({
	...settings,
	loader: () => import('./Search/Search.jsx')
});

const AsyncCard = Loadable({
	...settings,
	loader: () => import('./Card/Card.jsx')
});

const AsyncCardText = Loadable({
	...settings,
	loader: () => import('./CardText/CardText.jsx')
});

const AsyncComments = Loadable({
	...settings,
	loader: () => import('./Comments/Comments.jsx')
});

const AsyncFeedCardList = Loadable({
	...settings,
	loader: () => import('./FeedCardList/FeedCardList.jsx')
});

const AsyncFeedCard = Loadable({
	...settings,
	loader: () => import('./FeedCard/FeedCard.jsx')
});

// const
// 	mdControversy = () => (
// 		<MuiThemeProvider>
// 			<Controversy />
// 		</MuiThemeProvider>
// 	),

// 	mdFeedCard = () => (
// 		<MuiThemeProvider>
// 			<FeedCard />
// 		</MuiThemeProvider>
// 	);

class AppComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	dismissAlert() {
		console.log('dismiss');
		this.props.dismissAlert();
	}

	handleNavLink = (event) => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute('href'));
	}

	handleLogout = () => {
		const currentUser = getCurrentUser();

		if (currentUser !== null) {
			currentUser.signOut();
		}

		this.props.setUserToken(null);
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

			case '/home':
				AsyncSearch.preload();
				break;

			default:
				break;
		}
	}

	// http://serverless-stack.com/chapters/load-the-state-from-the-session.html
	// We want to ensure that when the user refreshes the app, we load
	// the user token from the session. We are going to do this in 
	// componentDidMount. And since getUserToken is going to be called async;
	// we need to ensure that the rest of our app is only ready to go after
	// this has been loaded.
	async componentDidMount() {
		const currentUser = getCurrentUser();

		if (currentUser === null) {
			this.props.unsetUserTokenLoading();
			return;
		}

		try {
			const userToken = await getUserToken(currentUser);
			this.props.setUserToken(userToken);
		} catch (e) {
			alert(e);
		}

		this.props.unsetUserTokenLoading();

		// We use the current router pathname to figure out which pages to preload
		this.preload(this.props.pathname);
	}

	render() {
		return !this.props.isLoadingUserToken && (
			<div className="App">

				{/* Revisit: Notification's onClick / onDismiss handlers appear to be broken */}
				<div onClick={() => this.props.dismissAlert()}>
					<Notification
						isActive={this.props.notification.active}
						message={this.props.notification.message}
						title={this.props.notification.title} />
				</div>

				<Navbar fluid collapseOnSelect>

					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Controversies of Science</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight>
							{ this.props.user.token
								? <NavItem
									onClick={this.handleLogout}>
										Logout
									</NavItem>

								: [ <RouteNavItem
									key={1}
									onClick={this.handleNavLink}
									href="/signup">
										Signup
									</RouteNavItem>,

									<RouteNavItem
										key={2}
										onClick={this.handleNavLink}
										href="/login">
											Login
									</RouteNavItem> ]

							}
						</Nav>
					</Navbar.Collapse>

				</Navbar>

				<Switch>
					<Route exact path="/" component={AsyncHome} />
					<Route exact path="/login" component={AsyncLogin} />
					<Route exact path="/signup" component={AsyncSignup} />
					<Route path="/news" component={AsyncNews} />
					<Route path="/search" component={AsyncSearch} />

					<Route path="/:controversy/worldview/card" component={AsyncCard} />
					<Route path="/:controversy/worldview/text" component={AsyncCardText} />
					<Route path="/:controversy/:worldview?/comments" component={AsyncComments} />

					<Route path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)/:feed" component={AsyncFeedCard} />
					<Route path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)" component={AsyncFeedCardList} />
					
					<Route component={AsyncNotFound} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(AppComponent);
