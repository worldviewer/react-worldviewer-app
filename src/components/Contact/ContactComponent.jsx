// React Dependencies
import React, { Component } from 'react';

// React-Router Dependencies
import { withRouter } from 'react-router-dom';

// UI Dependencies
import { Grid, Row, Col } from 'react-bootstrap';
import SwipeableViews from 'react-swipeable-views';
import mobiscroll from '../../libs/mobiscroll.custom-4.0.0-beta.min';
import '../../libs/mobiscroll.custom-4.0.0-beta.min.css';
import OpenSeadragon from 'openseadragon';
import './Contact.css';

// Images
import emailMeImage from '../../images/email-me.png';
import cmu from '../../images/carnegie-mellon.jpg';
import slashdotStory from '../../images/slashdot-story-large.png';
import facebookWall1 from '../../images/facebook-wall-1.png';
import facebookWall2 from '../../images/facebook-wall-2.png';
import ga from '../../images/general-assembly.jpg';
import generalize from '../../images/generalize.png';
import haltonArpPrototype from '../../images/halton-arp-prototype.jpg';
import cosGithub from '../../images/controversies-of-science-github.png';
import resume from '../../images/resume.png';
import personalJourney from '../../images/science-as-a-personal-journey.png';

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
				'2016/dec',
				'2017/may',
				'2017/jun',
				'2017/mid-jun',
				'2017/oct',
				'2017/mid-dec',
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

		this.props.history.push('/contact/' + this.state.menus[index]);
	}

	// There doesn't appear to be a way to scroll this thing on swipes
	handleSwipe(index) {
		logTitle('Swipe detected to pane ' + index);
		log('');

		this.setState({
			selectedMenuIndex: index
		});

		this.props.history.push('/contact/' + this.state.menus[index]);
	}

	componentDidMount() {
		const
			year = this.props.match.params.year,
			month = this.props.match.params.month,
			date = month ?
				year + '/' + month :
				year;

		logTitle('Detected date on page load:');
		log('year: ' + year);
		log('month: ' + month);
		log('');

		if (year) {
			this.setState({
				selectedMenuIndex: this.state.menus.indexOf(date)
			});
		}
	}

	setupDeepZoom(graphic, height, width) {
		const windowWidth = document.documentElement.clientWidth;

		logTitle('Setting up Deep Zoom ...');
		log('document.documentElement.clientWidth: ' + windowWidth);
		log('');

		const maxZoomLevel = windowWidth < 768 ? 2.0 : 1.0

		this.viewer = OpenSeadragon({
			id: 'openseadragon-cards',
			constrainDuringPan: true,
			visibilityRatio: 1.0,
			defaultZoomLevel: 0.05,
			minZoomLevel: 0.05,
			maxZoomLevel,
			autoResize: true,
			showZoomControl: false,
			showHomeControl: false,
			showFullPageControl: false,
			showSequenceControl: false,
			tileSources: {
				Image: {
					xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
					Url: '../../pyramids/' + graphic + '/pyramid_files/',
					Format: 'png',
					Overlap: '0',
					TileSize: '256',
					Size: {
						Height: height,
						Width: width
					}
				}
			}
		});
	}

	async viewSlashdotComments(event) {
		event.preventDefault();

		logTitle('Activating deep zoom');
		log('');

		await this.props.setPyramidStyles({
			...this.props.pyramid.styles,
			display: 'block'
		});

		this.setupDeepZoom('slashdot-comments', '11674', '1024');
		this.props.showSnackbar('Zoom into the thread.  Use menu to exit.', 20000);
	}

	async viewPhysOrgComments(event) {
		event.preventDefault();

		logTitle('Activating deep zoom');
		log('');

		await this.props.setPyramidStyles({
			...this.props.pyramid.styles,
			display: 'block'
		});

		this.setupDeepZoom('physorg-comments', '18523', '1024');
		this.props.showSnackbar('Zoom into the thread.  Use menu to exit.', 20000);
	}

	render() {
		const
			containerStyles = {
				padding: '25px',
				overflow: 'hidden'
			};

		return (
			<div className="Contact">
				<Grid>
					<Row>
						<Col>
							<mobiscroll.TabNav
								theme="ios-dark"
								display="inline"
								ref="tabNav">

									{ this.state.menus.map((item, index) => {

									return <mobiscroll.NavItem
											ref={el => this.tabnav = el}
											key={item} 
											selected={index === this.state.selectedMenuIndex}
											onClick={this.selectMenu.bind(this, index)}>

											{item}

										</mobiscroll.NavItem> }) }

							</mobiscroll.TabNav>

							<SwipeableViews index={this.state.selectedMenuIndex}
								onChangeIndex={this.handleSwipe.bind(this)}>

								<div style={containerStyles}>
									<p>I'm happy to talk to anybody who will take the time to learn how I arrived at this point of realizing that we must reform the way we discuss controversial science.</p>

									<p>This is crucial background information which must inform our conversations.</p>
								</div>

								<div style={containerStyles}>
									<img src={cmu} style={{width: '100%', marginBottom: '25px'}} alt='Carnegie Mellon University' />

									<p>When I graduated from Carnegie Mellon in '97, I lacked any personal interest in science at all. My focus was instead on engineering -- at first on hardware engineering.</p>
								</div>

								<div style={containerStyles}>
									By 2005, a couple of thought-provoking Youtube documentaries led me to take a closer look at the electricity in space debate.<br /><br />

									<iframe width="100%" title="Universe: The Cosmology Quest (Part 1)" src="https://www.youtube.com/embed/IFFl9S39CTM" frameBorder="0" allowFullScreen></iframe>

									<iframe width="100%" title="Universe: The Cosmology Quest (Part 2)" src="https://www.youtube.com/embed/m-2uvQ_MJz8" frameBorder="0" allowFullScreen></iframe>

									<iframe width="100%" title="Thunderbolts of the Gods" src="https://www.youtube.com/embed/5AUA7XS0TvA" frameBorder="0" allowFullScreen></iframe>
								</div>

								<div style={containerStyles}>
									<p>By 2007, I began the process of running claims between these against-the-mainstream theorists, their critics, and laypeople. I also began the creation of a personal library.  These conversations did not go as I expected; I started to notice a curious dogmatic resistance to the consideration of novel ideas in the sciences.</p>

									<p>I was especially shocked by the observation that the tech community was so incredibly hostile to the simple proposal that electricity might flow through space.  Something about the situation and the way that people referred to the Electric Universe on Slashdot, in particular, seemed very enigmatic.  My curiosity was piqued, and I felt that I had to understand the source of this resistance.</p>

									<mobiscroll.Form theme="ios-dark" onSubmit={this.viewSlashdotComments.bind(this)}>
										<div className="mbsc-btn-group mbsc-btn-group-block">
											<button>View thread</button>
										</div>
									</mobiscroll.Form>

									<a href='https://science.slashdot.org/story/07/05/05/0421244/astronomers-again-baffled-by-solar-observations'
										target='_blank' rel='noopener noreferrer'>

										<img src={slashdotStory} className='SlashdotStoryImage' alt='Slashdot Story Snapshot' style={{width: '100%'}} />
									</a>
								</div>

								<div style={containerStyles}>
									<img src={facebookWall1} alt='writing on the Facebook wall' style={{width: '100%'}} /><br /><br />

									<p>These experiences would prove crucial in 2012, when I realized that that there was a need for a more scientific social network. I began the creative process of defining the problem, talking with others and writing ideas down. Although I had dabbled in HTML and some ASP by this point, I lacked a comprehensive web development education.</p><br />

									<img src={facebookWall2} alt='Facebook graffiti' style={{width: '100%'}} />
								</div>

								<div style={containerStyles}>
									<img src={ga} alt='General Assembly logo' style={{width: '100%'}} /><br /><br />

									<p>I attended General Assembly in 2015, and although it definitely helped me to see the bigger picture of web development, after three years of coding, I've learned most of my preferred developer tools on my own.</p>

									<p>Like most everything in life, you get out of the bootcamp exactly what you put into it.</p><br />

									<span style={{color: 'black', backgroundColor: '#FD8324', padding: '5px', fontSize: '40pt'}}>#selftaught</span>
								</div>

								<div style={containerStyles}>
									<img src={generalize} alt='generalize' style={{width: '100%'}} /><br /><br />

									<p>By 2016, I was working at Wikia as a PHP developer. It is during this period that I created the 182 controversy cards in the <a href='https://plus.google.com/collection/Yhn4Y'>G+ collection</a>.</p>
								</div>

								<div style={containerStyles}>
									<p>By December of 2016, I decided to learn React (and a few months later, Redux). This marked a milestone of sorts, because I finally felt extremely comfortable in a frontend framework. I decided to first build out <a href='https://worldviewer.github.io/react-worldviewer-prototype/'>an animated controversy card demo</a>.</p><br />

									<a href='https://worldviewer.github.io/react-worldviewer-prototype/'>
										<img src={haltonArpPrototype} alt='Halton Arp prototype' style={{width: '100%'}} />
									</a>
								</div>

								<div style={containerStyles}>
									<p>I started to realize that I needed a search box for scientific controversies in May of 2017. It was more-or-less in place within a few weeks, but I would continue to put work into it to the present moment.</p><br />

									<a href='https://github.com/controversies-of-science/react-worldviewer-app'>
										<img src={cosGithub} alt='Controversies of Science Github' style={{width: '100%'}} />
									</a>
								</div>

								<div style={containerStyles}>
									<p>In June of 2017, I began work on a stealth-mode startup as system architect and first developer. It was my first experience constructing a codebase from scratch. That work continues to the present moment, and has left me with a better understanding of how to construct a scalable site using Amazon's AWS.</p><br />

										<img src={resume} alt='Resume' style={{width: '80%', display: 'block', margin: '0 auto'}} />
								</div>

								<div style={containerStyles}>
									<p>By mid-June, I had formulated a pitch for why we need to pay more attention to scientific controversies -- which I delivered in two parts at the <a href='https://www.thunderbolts.info/wp/2015/12/30/eu2016-speakers/'>2016 Electric Universe conference</a>.</p><br />

									<iframe width="100%" title="What We Failed to Learn from the Moonshot" src="https://www.youtube.com/embed/rwDnOLg0Nss" frameBorder="0" allowFullScreen></iframe>

									<iframe width="100%" title="Controversy-First Science Instruction" src="https://www.youtube.com/embed/GBaArcWmPo4" frameBorder="0" allowFullScreen></iframe>
								</div>

								<div style={containerStyles}>
									<p>I have noticed over time that a lot of my ideas for how to make science more innovative originate with my online discussions. As that realization has settled in, there emerged a realization that others can benefit from this experience. And that has led me to work towards a solution that relies heavily upon the tracking of scientific controversies over time. In October of 2017, I fine-tuned this pitch into a <a href='https://www.thunderbolts.info/wp/2017/10/03/science-as-a-personal-journey/'>"Thunderblog"</a>.</p><br />

									<a href='https://www.thunderbolts.info/wp/2017/10/03/science-as-a-personal-journey/'>
										<img src={personalJourney} alt='thunderblog article' style={{width: '100%'}} />
									</a>
								</div>

								<div style={containerStyles}>
									<p>I would next explain the origin of the scientific social network idea in the December 2017 Edge issue (which releases on December 15th).</p>
								</div>

								<div style={containerStyles}>
									<p>By this point -- after 5 years of ruminating on a scientific social network and 10 years of immersion in running claims online -- I have become very clear on what I think needs to be built. All of the design features for this social network are reactions to my many online experiences observing people respond to controversial science claims.</p>

									<p>Although I have over time frequented a variety of online platforms under a variety of pseudonyms (including Digg, BoingBoing, Slashdot and Parlio), my current daily interactions are on phys.org, where I now post under my real name. You can replicate my own experience by opening up this controversy app in one browser and phys.org in another.</p>

									<mobiscroll.Form theme="ios-dark"
										onSubmit={this.viewPhysOrgComments.bind(this)}>

										<div className="mbsc-btn-group mbsc-btn-group-block">
											<button style={{marginBottom: '18px'}}>
												View a recent phys.org thread
											</button>
										</div>
									</mobiscroll.Form>

									<p>My daily routine involves checking online science articles and published papers for new information that is relevant to any of the <a href='https://plus.google.com/collection/Yhn4Y'>182 controversy cards</a> which have already been published. When I encounter something of value, I post it into the comments of those cards. Unfortunately, many of the images associated with these posts have apparently been destroyed by Google. When the crowdsourcing features are added to the app, I will transfer all of the best comments to it.</p>

									<p>Another crucial part of my daily routine is the search for new controversies and daily organization of what I've found. This is a very important part of the process because I don't publish a controversy card until some (subjective) threshold is achieved that a coherent argument can be put forward.</p>

									<p>I also continue to maintain my immersion within the Thunderbolts Project<sup>TM</sup>, and am committed to bringing my most valuable learnings from those experiences to the public with my new platform.</p>

									<p>I believe that if we create a space where quality thinking is identified according to the values of each individual component of the larger scientific machine, that great things can happen. Academia can be reformed, but we should expect that this reform will have to come from the outside. And what I am proposing is that this reform will be a reaction to observing that the public can think at a very high level on complex issues of scientific importance. Once academia witnesses this in an undeniable manner, the relationship between layperson and specialist experts will be forever changed.</p><br />

									<img src={emailMeImage} alt='stuff' style={{width: '100%'}} />
								</div>
							</SwipeableViews>
						</Col>
					</Row>
				</Grid>

				<div
					ref={node => { this.dz = node; }}
					className="SlashdotComments"
					id="openseadragon-cards"
					style={this.props.pyramid.styles}>
				</div>

			</div>
		);
	}
}

export default withRouter(ContactComponent);
