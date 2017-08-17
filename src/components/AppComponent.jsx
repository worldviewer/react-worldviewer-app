// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import RouteNavItem from './RouteNavItem/RouteNavItem';
import { Notification } from 'react-notification';
// import mobiscroll from '../libs/mobiscroll.custom-3.2.3.min';
import './App.css';
import '../styles/react-instantsearch-algolia-theme.css';

// AWS Dependencies
import { getUserToken, getCurrentUser, getAwsCredentials } from '../libs/awsLib';
import AWS from 'aws-sdk';

// React Router / Spinner / Preloader / Code-Splitter Dependencies
import { withRouter, Link } from 'react-router-dom';
import RouteLoader from './RouteLoader/RouteLoader';

// Data Persistence Dependencies
import { getSlugs } from '../libs/utils';

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

		if (currentUser !== null) {
			currentUser.signOut();
		}

		if (AWS.config.credentials) {
			AWS.config.credentials.clearCachedId();
		}

		this.props.setUserToken(null);

		this.props.history.push('/login');
	}

	// http://serverless-stack.com/chapters/load-the-state-from-the-session.html
	// We want to ensure that when the user refreshes the app, we load
	// the user token from the session. We are going to do this in 
	// componentDidMount. And since getUserToken is going to be called async;
	// we need to ensure that the rest of our app is only ready to go after
	// this has been loaded.
	async componentDidMount() {
		// Prevents reflow of mobile navbar on initial render
		setTimeout(() => {
			this.setState({
				navVisibility: 'visible'
			})
		}, 1000);

		const isHomePage = this.props.router.location.pathname === '/';

		// Fetch the slugs hash table, which gives us a hash table lookup to
		// convert short slugs into their long slug form.  We use the short slugs
		// for frontend routes, whereas the long-form slugs are used for backend routes.
		this.props.setSlugsLoading();
		getSlugs(isHomePage, this.props.setCardSlugs, this.props.user.token);
		this.props.unsetSlugsLoading();

		const currentUser = getCurrentUser();
		console.log('currentUser: ' + currentUser);

		try {
			const userToken = await this.getUserIDToken(currentUser);
			this.props.setUserToken(userToken);
			this.getCredentials(currentUser);
		} catch (e) {
			this.props.setAlert('User Token Error: ', e.message);
			setTimeout(() => this.props.dismissAlert(), 5000);
		}

		this.props.unsetUserTokenLoading();
	}

	async getUserIDToken(currentUser) {
		try {
			if (currentUser) {
				const userToken = await getUserToken(currentUser);

				this.props.setUserToken(userToken);
			}
		}
		catch(e) {
			this.props.setAlert("Session Token Error: ",
				"You might want to try logging back in");
			setTimeout(() => this.props.dismissAlert(), 5000);
		}

		this.props.unsetUserTokenLoading();

		// We need to know when this process is complete so that we can restrict
		// access on pages where a user must be logged in
		this.props.setTokenFetchComplete();
	}

	async getCredentials(currentUser) {
		// TODO: Save parts of credentials into Redux store.  Also: Re-evaluate
		// when exactly I should be calling this ...
		try {
			await getAwsCredentials(this.props.user.token);

			// https://medium.com/@kangzeroo/user-management-with-aws-cognito-2-3-the-core-functionality-ec15849618a4
			// "after we setup AWS.config.credentials it is important to
			// refresh the credentials using AWS.config.credentials.refresh
			// so that AWS will use the latest one we just added."
			AWS.config.credentials.refresh(() => {
				console.log('credentials have been refreshed ...');

				if (AWS.config.credentials) {
					console.log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
					console.log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey + '\n\n');
				} else {
					console.log('No credentials\n\n');
				}
			});
		}
		catch(e) {
			this.props.setAlert('Error Authorizing User: ', e.message);
			setTimeout(() => this.props.dismissAlert(), 5000);			
		}
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

		return !this.props.isLoadingUserToken && (
			<div className="App">

				{/* Revisit: Notification's onClick / onDismiss handlers appear to be broken */}
				<div onClick={() => this.props.dismissAlert()}>
					<Notification
						isActive={this.props.notification.active}
						message={this.props.notification.message}
						title={this.props.notification.title} />
				</div>

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
										onClick={ () => this.props.history.push('/') }>
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
										onClick={ () => this.props.history.push('/') }>
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
