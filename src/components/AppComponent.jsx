// React Dependencies
import React, { Component } from 'react';

// UI Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import RouteNavItem from './RouteNavItem/RouteNavItem';
import { Notification } from 'react-notification';
import './App.css';
import '../styles/react-instantsearch-algolia-theme.css';

// AWS Dependencies
import { getUserToken, getCurrentUser } from '../libs/awsLib';
import AWS from 'aws-sdk';

// React Router / Spinner / Preloader / Code-Splitter Dependencies
import { withRouter, Link } from 'react-router-dom';
import RouteLoader from './RouteLoader/RouteLoader';

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

		const currentUser = getCurrentUser();

		if (currentUser === null) {
			this.props.unsetUserTokenLoading();
			return;
		}

		try {
			const userToken = await getUserToken(currentUser);
			this.props.setUserToken(userToken);
		} catch (e) {
			this.props.setAlert('User Token Error: ', e.message);
			setTimeout(() => this.props.dismissAlert(), 5000);
		}

		this.props.unsetUserTokenLoading();
	}

	render() {
		const NavTitleStyle = {
			fontFamily: 'LeagueGothic',
			textTransform: 'uppercase',
			fontSize: '20px',
			letterSpacing: '1px'
		}

		let navStyles = {
			visibility: this.state.navVisibility
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

				<RouteLoader />
			</div>
		);
	}
}

export default withRouter(AppComponent);
