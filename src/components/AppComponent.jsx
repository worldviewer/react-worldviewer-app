// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import RouteNavItem from './RouteNavItem/RouteNavItem';
import './App.css';
import '../styles/react-instantsearch-algolia-theme.css';

// AWS Dependencies
import { getUserToken, getCurrentUser, getAwsCredentials, invokeApig } from '../libs/aws';
import AWS from 'aws-sdk';

// React Router / Spinner / Preloader / Code-Splitter Dependencies
import { withRouter, Link } from 'react-router-dom';
import RouteLoader from './RouteLoader/RouteLoader';

// Error/Logger/Notifications Handling
import { log, logTitle, logError, logObject, logRoute } from '../libs/utils';
import mobiscroll from '../libs/mobiscroll.custom-3.2.5.min';
import '../libs/mobiscroll.custom-3.2.5.min.css';

class AppComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			navVisibility: 'hidden'
		};

		this.props = props;
	}

	handleNavLink = (event) => {
		event.preventDefault();
		this.props.history.push(event.currentTarget.getAttribute('href'));
	}

	handleLogout = (event) => {
		const currentUser = getCurrentUser();
		let username = null;

		if (currentUser !== null) {
			currentUser.signOut();
			username = currentUser.username;
		}

		if (AWS.config.credentials) {
			AWS.config.credentials.clearCachedId();
		}

		this.props.setUserToken(null);
		this.props.clearUser();

		log('User ' + username + ' logged out');

		this.props.history.push('/login');
	}

	getUsername() {
		logTitle('Auth Step 1: Fetching current user from local storage using the Cognito JS SDK ...');

		const currentUser = getCurrentUser();

		if (currentUser === null) {
			this.props.unsetUserTokenLoading();
			log('there is no user saved in local storage, will fetch credentials for unauthorized user ...');
		} else {
			// When we have a token in session, we need to save the 
			// username into Redux, because this is our primary key
			// for any dynamoDB interaction (like with API calls) 
			this.props.setUsername(currentUser.username);

			log('The current user is ' + currentUser.username);
			logObject('cognito user', currentUser);
		}

		log('');

		return currentUser;
	}

	componentWillMount() {
		logRoute(this.props.router.location.pathname);
	}

	// http://serverless-stack.com/chapters/load-the-state-from-the-session.html
	// We want to ensure that when the user refreshes the app, we load
	// the user token from the session. We are going to do this in 
	// componentDidMount. And since getUserToken is going to be called async;
	// we need to ensure that the rest of our app is only ready to go after
	// this has been loaded.
	async componentDidMount() {
		// Unsets when slugs are loaded
		this.props.setAppLoading();

		// Prevents reflow of mobile navbar on initial render
		setTimeout(() => {
			this.setState({
				navVisibility: 'visible'
			})
		}, 1000);

		const currentUser = this.getUsername();

		try {
			if (currentUser) {
				await this.getUserIDToken(currentUser);

				logTitle('Auth Step 4: Checking credentials for ' +
					currentUser.username + ' ...');
				await this.getCredentials(currentUser);
			} else {
				logTitle('Auth Step 2: Fetching credentials for unauthorized user ...')
				await getAwsCredentials(this.props.user.token);
				await this.props.setCredentialsFetchComplete();
			}
		} catch(e) {
			logError(e, 'Authentication Error: ' + e.message, this.props.user.token);
		}

		this.props.unsetUserTokenLoading();

		if (this.props.fetchComplete.credentials &&
			!this.props.fetchComplete.slugs &&
			!this.props.loading.slugs) {

			logTitle('Auth Complete!  The new credentials are ...');
			log('(in componentDidMount)');
			log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
			log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
			log('');

			this.getSlugs();
		}
	}

	async componentWillReceiveProps(nextProps) {
		// Do not fetch slugs until we have credentials
		if (!this.props.loading.slugs &&
			!this.props.fetchComplete.slugs &&
			!this.props.fetchComplete.credentials &&
			nextProps.fetchComplete.credentials) {

			logTitle('Auth Complete!  The new credentials are ...');
			log('(in componentWillReceiveProps)');
			log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
			log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
			log('');

			this.getSlugs();
		}

		if (!this.props.snackbar.message && nextProps.snackbar.message) {
			const
				message = nextProps.snackbar.message,
				duration = nextProps.snackbar.duration;

			logTitle('Copied text to clipboard');
			console.log('');

			mobiscroll.snackbar({
				message,
				duration
			});

			// Reset
			this.props.showSnackbar('', 0);
		}
	}

	// Fetch the slugs hash table, which gives us a hash table lookup to
	// convert short slugs into their long slug form.  We use the short slugs
	// for frontend routes, whereas the long-form slugs are used for backend routes.
	async getSlugs() {
		await this.props.setSlugsLoading();
		const slugs = await invokeApig( {base: 'cards', path: '/controversies'},
			this.props.user.token);
		await this.props.setCardSlugs(slugs);

		logTitle('Data Step 1: Fetching controversy card slugs ...');
		log(slugs);
		log('');

		this.props.unsetSlugsLoading();
		this.props.setSlugsFetchComplete();

		this.props.unsetAppLoading();
	}

	async getUserIDToken(currentUser) {
		try {
			if (currentUser) {
				const [userToken,] = await getUserToken(currentUser);
				this.props.setUserToken(userToken);
			}
		} catch(e) {
			logError(e, 'Session Token Error: You might want to try logging back in',
				this.props.user.token);
		}

		this.props.unsetUserTokenLoading();

		// We need to know when this process is complete so that we can restrict
		// access on pages where a user must be logged in
		this.props.setTokenFetchComplete();
	}

	async getCredentials(currentUser) {
		try {
			await getAwsCredentials(this.props.user.token);

			// https://medium.com/@kangzeroo/user-management-with-aws-cognito-2-3-the-core-functionality-ec15849618a4
			// "after we setup AWS.config.credentials it is important to
			// refresh the credentials using AWS.config.credentials.refresh
			// so that AWS will use the latest one we just added."
			AWS.config.credentials.refresh(() => {
				// this.props.unsetAppLoading();
				this.props.setCredentialsFetchComplete();
			});
		} catch(e) {
			logError(e, 'Error Authorizing User: ' + e.message, this.props.user.token);
		}
	}

	searchClickHandler(event) {
		logTitle('Reseting Route ...');
		log('');

		this.props.setSearchFacet('', '', '');
		// this.props.setSearchQuery('');
		this.props.history.push({pathname: '/', search: ''});
	}

	render() {
		const NavTitleStyle = {
			fontFamily: 'LeagueGothic',
			textTransform: 'uppercase',
			fontSize: '20px',
			letterSpacing: '1px'
		}

		let navStyles = this.props.navbar.hidden
			&& this.props.cardStack.level === 2 ?
			{ display: 'none' } :
			{
				position: 'fixed',
				visibility: this.state.navVisibility,
				width: '100%',
				zIndex: 100
			};

		return !this.props.loading.app && this.props.fetchComplete.slugs && (
			<div className="App">

				<Navbar fluid collapseOnSelect style={navStyles}>

					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/" style={NavTitleStyle}>Controversies of Science</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight>
							{ this.props.user.token
								? [ <NavItem key={1}
										onClick={this.handleLogout}>
										Logout
									</NavItem>,

									<NavItem key={2}
										onClick={this.searchClickHandler.bind(this)}>
										Search
									</NavItem> ]

								: [ <RouteNavItem key={1}
										onClick={this.handleNavLink}
										href="/signup">
										Signup
									</RouteNavItem>,

									<RouteNavItem key={2}
										onClick={this.handleNavLink}
										href="/login">
										Login
									</RouteNavItem>,

									<NavItem key={3}
										onClick={this.searchClickHandler.bind(this)}>
										Search
									</NavItem> ]

							}
						</Nav>
					</Navbar.Collapse>

				</Navbar>

				<RouteLoader />
			</div>
		);
	}
}

export default withRouter(AppComponent);
