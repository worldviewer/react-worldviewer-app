import React, { Component } from 'react';

// React-Bootstrap Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';

// Components
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import NotFound from './NotFound/NotFound.jsx';
import RouteNavItem from './RouteNavItem/RouteNavItem';

import News from './News/News.jsx';
import Search from './Search/Search.jsx';

import Controversy from './Card/Controversy.jsx';
import CardText from './CardText/CardText.jsx';
import Comments from './Comments/Comments.jsx';

import FeedCardList from './FeedCardList/FeedCardList.jsx';
import FeedCard from './FeedCard/FeedCard.jsx';

// Amazon Cognito Dependencies
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from './config.js';

// React Router Dependencies
import { Route, Switch } from 'react-router';
import { withRouter, Link } from 'react-router-dom';

// Material Design Dependencies
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const
	Card = () => (
		<MuiThemeProvider>
			<Controversy />
		</MuiThemeProvider>
	);

class AppComponent extends Component {
	constructor(props) {
		super(props);

		this.props = props;
	}

	handleNavLink = (event) => {
		event.preventDefault();
		console.dir('this.props.history: ' + this.props.history);
		this.props.history.push(event.currentTarget.getAttribute('href'));
	}

	handleLogout = (event) => {
		const currentUser = this.getCurrentUser();

		if (currentUser !== null) {
			currentUser.signOut();
		}

		this.props.setUserToken(null);
	}

	// getCurrentUser() and getUserToken() come from http://serverless-stack.com
	// /chapters/load-the-state-from-the-session.html. There is similar code at
	// http://docs.aws.amazon.com/cognito/latest/developerguide
	// /using-amazon-cognito-user-identity-pools-javascript-examples.html.
	getCurrentUser = () => {
		const userPool = new CognitoUserPool({
			UserPoolId: config.cognito.USER_POOL_ID,
			ClientId: config.cognito.APP_CLIENT_ID
		});

		return userPool.getCurrentUser();
	}

	getUserToken = (currentUser) => {
		return new Promise((resolve, reject) => {
			currentUser.getSession((err, session) => {
				if (err) {
					reject(err);
					return;
				}

				resolve(session.getIdToken().getJwtToken());
			});
		});
	}

	// http://serverless-stack.com/chapters/load-the-state-from-the-session.html
	// We want to ensure that when the user refreshes the app, we load
	// the user token from the session. We are going to do this in 
	// componentDidMount. And since getUserToken is going to be called async;
	// we need to ensure that the rest of our app is only ready to go after
	// this has been loaded.
	async componentDidMount() {
		const currentUser = this.getCurrentUser();

		if (currentUser === null) {
			this.props.unsetUserTokenLoading();
			return;
		}

		try {
			const userToken = await this.getUserToken(currentUser);
			this.props.setUserToken(userToken);
		}
		catch(e) {
			alert(e);
		}

		this.props.unsetUserTokenLoading();
	}

	render() {
		return !this.props.isLoadingUserToken && (
			<div>
				<Navbar fluid collapseOnSelect>

					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Controversies</Link>
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
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route path="/news" component={News} />
					<Route path="/search" component={Search} />

					<Route path="/:controversy/worldview/card" component={Card} />
					<Route path="/:controversy/worldview/text" component={CardText} />
					<Route path="/:controversy/:worldview?/comments" component={Comments} />

					<Route path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)/:feed" component={FeedCard} />
					<Route path="/:controversy/:level(worldview|model|propositional|conceptual|narrative)" component={FeedCardList} />
					
					<Route component={NotFound} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(AppComponent);
