import React, { Component } from 'react';
import './Help.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import getBigThingsDoneImage from '../../images/get-big-things-done.jpg';
import emailMeImage from '../../images/email-me.png';

class HelpComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="Help">
				<Grid>
					<Row>
						<Col>
							<img src={getBigThingsDoneImage}
								style={{width: '100%'}}
								alt='the future' />

							<div style={{margin: '15px'}}>
								<p>It takes a science fiction author to explain why I work on this project.<br /><br />

								<a href='http://www.worldpolicy.org/journal/fall2011/innovation-starvation'>Innovation Starvation
								</a><br />

								By Neal Stephenson<br /><br />

								<i style={{color: 'white'}}>"... I worry that our inability to match the achievements of the 1960s space program might be symptomatic of a general failure of our society to get big things done. My parents and grandparents witnessed the creation of the airplane, the automobile, nuclear energy, and the computer to name only a few. Scientists and engineers who came of age during the first half of the 20th century could look forward to building things that would solve age-old problems, transform the landscape, build the economy, and provide jobs for the burgeoning middle class that was the basis for our stable democracy ...<br /><br />

								Innovation can’t happen without accepting the risk that it might fail. The vast and radical innovations of the mid-20th century took place in a world that, in retrospect, looks insanely dangerous and unstable ...<br /><br />

								Today’s belief in ineluctable certainty is the true innovation-killer of our age. In this environment, the best an audacious manager can do is to develop small improvements to existing systems -- climbing the hill, as it were, toward a local maximum, trimming fat, eking out the occasional tiny innovation -- like city planners painting bicycle lanes on the streets as a gesture toward solving our energy problems. Any strategy that involves crossing a valley -- accepting short-term losses to reach a higher hill in the distance -- will soon be brought to a halt by the demands of a system that celebrates short-term gains and tolerates stagnation, but condemns anything else as failure. In short, a world where big stuff can never get done."</i><br />

								<h1>Help Wanted to<br />Get Big Stuff Done</h1>

								<h3>Current (or Former) Specialist<br />Scientists or Graduate Students</h3><br />

								I'm less interested in your CV than in your grasp for the context of your specialization: Do you have a feel for what types of papers get through peer review? Are you aware of problems with the accepted theory? Have you witnessed a defensive posture amongst those who dominate the domain? Have you become disillusioned with academic science? This is your chance to put it back onto a productive track, and to finally experience science as a generalist.<br /><br />

								<h3>Online Science Agitators</h3><br />

								This is not to be confused for people who troll others in order to elicit an emotional response. The point of online agitation is to repeatedly "poke the system" to learn and study over time how it responds. I am seeking out specialists, journalists or just informed laypeople who have an established track record at getting experts and other debunkers to go on the record on the various forums. We will use <i>Controversies of Science</i> as the center of this new network, and I will over time be building out site features to suit <b>your</b> needs, so that the site can keep a steady stream of interaction snapshots building out the controversy map.<br /><br />

								<h3>Artists and Graphic Designers</h3><br />

								My current mode of operation is: <i>build everything yourself</i>. I've had to do it that way because even if I feel I understand a way forward, there's just not a lot of consensus to be had for how to move modern science back into an innovative posture. But, this m.o. is a glacially slow process. If I was not making my own graphics, I could instead use that time to brainstorm and build out new site features. I especially need artists who would be willing, once per week, to dedicate some of their personal time towards the creation of new controversy card graphics. In other words, deep Photoshop and Illustrator experience.<br /><br />

								<h3>Maverick Science<br />Thought Leaders</h3><br />

								These are theorists whose work is rejected by mainstream science standards -- either because it challenges a very popular idea, or because it involves the questioning of certain popular assumptions or hypotheses. I need you to try to distill your idea into the controversy card format. Inspect the 182 existing cards, and try to observe the pattern: The point is to get a person to comprehension as quickly as possible, and to place your most compelling evidence up-front. Your text should address a layperson audience, but provide links to more technical details where important.<br /><br />

								<h3>Public Speakers</h3><br />

								I've done talks at conferences, but speaking is not -- yet -- one of my best assets. Do you have a skill for speaking -- either publicly or in online videos? Do you have a studio where you can record high-quality videos? (I may be able to help.) Each of the controversy cards could (and probably should) be turned into a video.<br /><br />

								<h3>Full-Stack Web /<br />Node.js Developers</h3><br />

								What is your story? What has led you from web development to an interest in scientific controversies? Can you point me to former work? Are you fluent in React, Redux, Node and/or AWS?<br /><br />

								<h3>Technical Writers</h3><br />

								If this is your interest, then please read all of the controversy cards and get back to me. My library of controversial science is always quite a bit larger than my ability to read it, and my list of scientific controversies is at all times growing.<br /><br />

								<h3>Thinkers</h3></p><br />

								<img src={emailMeImage} alt='stuff' style={{width: '100%'}} />
							</div>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HelpComponent);
