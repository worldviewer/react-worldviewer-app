// React Dependencies
import React, { Component } from 'react';

// React-Router Dependencies
import { withRouter } from 'react-router-dom';

// UI Dependencies
import { Grid, Row, Col } from 'react-bootstrap';
import emailMeImage from '../../images/email-me.png';
import SwipeableViews from 'react-swipeable-views';
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta.min';
import '../../libs/mobiscroll.custom-4.0.0-beta.min.css';
import './Contact.css';

// Logging
import { log, logTitle } from '../../libs/utils';

class ContactComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenuIndex: 0,
			menus: [
				'timeline',
				'1997',
				'2005',
				'2007',
				'2012',
				'2015',
				'2016',
				'dec/2016',
				'may/2017',
				'jun/2017',
				'mid-jun/2017',
				'oct/2017',
				'mid-dec/2017',
				'now'
			]
		};

		this.props = props;
	}

	selectMenu(index) {
		logTitle('Selected Menu Index: ' + index);
		log('');

		this.setState({
			selectedMenuIndex: index
		});
	}

	render() {
		const
			containerStyles = {
				padding: '25px',
				overflow: 'hidden'
			};

		return (
			<div className="Contact" style={{height: '90vh'}}>
				<Grid>
					<Row>
						<Col>
							<mobiscroll.TabNav
								theme="ios-dark"
								display="inline"
								ref="tabNav">

									{ this.state.menus.map((item, index) => {

									return <mobiscroll.NavItem 
											key={item} 
											selected={index === this.state.selectedMenuIndex}
											onClick={this.selectMenu.bind(this, index)}>

											{item}

										</mobiscroll.NavItem> }) }

							</mobiscroll.TabNav>

							<SwipeableViews index={this.state.selectedMenuIndex}>
								<div style={containerStyles}>
									I'm happy to talk to anybody who will take the time to learn how I arrived at this point of realizing that we must reform the way we discuss controversial science.<br /><br />

									This is crucial background information which must inform our conversations.
								</div>

								<div style={containerStyles}>
									When I graduated from Carnegie Mellon in '97, I lacked any personal interest in science at all. My focus was instead on engineering -- at first on hardware engineering and later, web development.
								</div>

								<div style={containerStyles}>
									By 2005, a couple of thought-provoking Youtube documentaries led me to take a closer look at the electricity in space debate.
								</div>

								<div style={containerStyles}>
									By 2007, I began the process of running claims between these against-the-mainstream theorists, their critics, and laypeople. I began the creation of a library dedicated to scientific controversies.
								</div>

								<div style={containerStyles}>
									These experiences would prove crucial in 2012, when I realized that that there was a need for a more scientific social network. I began the creative process of defining the problems of modern science, talking with others and writing ideas down. Although I had dabbled in HTML and some ASP by this point, I lacked a comprehensive web development education.
								</div>

								<div style={containerStyles}>
									I attended General Assembly in 2015, and although it definitely helped me to see the bigger picture of web development, after three years of coding, I consider myself by now mostly self-taught. I dabbled in Angular, but kept looking for a better framework.
								</div>

								<div style={containerStyles}>
									By 2016, I was working at Wikia as a PHP developer. It is during this period that I created the 182 controversy cards in the G+ collection (link).
								</div>

								<div style={containerStyles}>
									By December of 2016, I decided to learn React (and a few months later, Redux). This marked a milestone of sorts, because I finally felt extremely comfortable in a frontend framework. I decided to first build out an animated controversy card demo (link).
								</div>

								<div style={containerStyles}>
									I started to realize that I needed a search box for scientific controversies in May of 2017. It was more-or-less in place within a few weeks, but I would continue to put work into it to the present moment.
								</div>

								<div style={containerStyles}>
									In June of 2017, I began work on a stealth-mode startup as system architect and first developer. It was my first experience constructing a codebase from scratch. That work continues to the present moment (real-time data), and has left me with a better understanding of how to construct a scalable site using Amazon's AWS.
								</div>

								<div style={containerStyles}>
									By mid-June, I had formulated a pitch for why we need to pay more attention to scientific controversies -- which I delivered in two parts at the 2016 Electric Universe conference.
								</div>

								<div style={containerStyles}>
									I have noticed over time that a lot of my ideas for how to make science more innovative originate with my online discussions. As that realization has settled in, there emerged a realization that others can benefit from this experience. And that has led me to work towards a solution that relies heavily upon the tracking of scientific controversies over time. In October of 2017, I fine-tuned this pitch into a Thunderblog.
								</div>

								<div style={containerStyles}>
									I would next explain the origin of the scientific social network idea in the December 2017 Edge issue (which releases on December 15th).
								</div>

								<div style={containerStyles}>
									By this point -- after 5 years of ruminating on a scientific social network and 10 years of immersion in running claims online -- I have become very clear on what I think needs to be built. All of the design features for this social network are reactions to my many online experiences observing people react to controversial science claims.

									Although I have over time frequented a variety of online platforms under a variety of pseudonyms (including Digg, BoingBoing, Slashdot and Parlio), my current daily interactions are on phys.org, where I now post under my real name. You can replicate my own experience by opening up the app in one browser and phys.org in another.

									My daily routine involves checking online science articles and published papers for new information that is relevant to any of the 182 controversy cards (link) which have already been published. When I encounter something of value, I post it into the comments of those cards. Unfortunately, many of the images associated with these posts have apparently been destroyed by Google, and they have ignored my requests to fix them. When the crowdsourcing features are added to the app, I will transfer all of the best comments to the app.

									Another crucial part of my daily routine is the search for new controversies and daily organization of what I've found. This is a very important part of the process because I don't publish a controversy card until some (subjective) threshold is achieved that a coherent argument can be put forward.

									I also continue to maintain my immersion within the Thunderbolts Project (TM), and am committed to bringing my most valuable learnings from those experiences to the public with my new platform.

									I believe that if we create a space where quality thinking is identified according to the values of each individual component of the larger scientific machine, that great things can happen. Academia can be reformed, but we should expect that this reform will have to come from the outside. And what I am proposing is that this reform will be a reaction to observing that the public can think at a very high level on complex issues of scientific importance. Once academia witnesses this in an undeniable manner, the relationship between layperson and specialist experts will be forever changed.

									<img src={emailMeImage} alt='stuff' style={{width: '100%'}} />
								</div>
							</SwipeableViews>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(ContactComponent);
