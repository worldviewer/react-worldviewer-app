// React Dependencies
import React, { Component } from 'react';

// React-Bootstrap Dependencies
import { Nav, NavItem, Navbar } from 'react-bootstrap';

// Components
import Home from './Home/Home.jsx';
import Login from './Login/Login.jsx';
import Signup from './Signup/Signup.jsx';
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
import { getUserToken, getCurrentUser } from './libs/awsLib';

// React Router Dependencies
import { Route, Switch } from 'react-router';
import { withRouter, Link } from 'react-router-dom';

// CSS Dependencies
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

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
		this.props.history.push(event.currentTarget.getAttribute('href'));
	}

	handleLogout = (event) => {
		const currentUser = getCurrentUser();

		if (currentUser !== null) {
			currentUser.signOut();
		}

		this.props.setUserToken(null);
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
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
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
