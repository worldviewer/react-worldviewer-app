import React, { Component } from 'react';
import './How.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class HowComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="How">
				<Grid>
					<Row>
						<Col>
							<div className='QuotedText' style={{cursor: 'pointer'}}
								onClick={() => window.location.replace('/science-as-a-golum/worldview/card', '_blank')}>

								<p>[W]e stand by our claim that <b>'For citizens who want to take part in the democratic processes of a technological society, all the science they need to know about is controversial'</b> ...</p>

								<p>The debate about the public understanding of science is equally confounded by confusion over method and content. What should be explained is methods of science, but what most people concerned with the issues want the public to know about is the truth about the natural world -- that is, what the powerful believe to be the truth about the natural world ...</p>

								<p>The 'public understanders', as we might call them, seem to think that if the person in the street knows more science -- as opposed to more <b>about</b> science -- they will be able to make more sensible decisions about these things.</p>

								<p>How strange that they should think this; it ranks among the great fallacies of our age. Why? -- because PhDs and professors are found on all sides in these debates. The arguments have largely been invented in universities ...</p>

								<p>We agree with the public understanders that the citizen needs to be informed enough to vote on technical issues, but the information needed is not about the content of science; <b>it is about the relationship of experts to politicians, to the media, and to the rest of us.</b></p>

								<span style={{textAlign: 'right'}}>
									<p style={{marginBottom: 0}}>Harry M. Collins and Trevor Pinch,<br /><i>The Golem: What You Should Know About Science</i></p>
								</span>
							</div>

							<p>I am creating the world's first open-to-the-public scientific social network.</p>

							<p>We are going to crowdsource information about scientific controversies. This may come as a surprise, but your efforts can help to differentiate real groundbreaking science where the experts prove wrong from misconceptions and pseudoscience. In return for your time, I will show you how to reason at a level even higher than a professional scientist about the universe around you.</p>

							<p>Although it may be yet a few more months before the crowdsourcing features start to appear on this site, you can begin this process today.</p>

							<h2>Step 1: Start<br />Paying Attention.<br />Read. Listen. Think.</h2>

							<p>Click the elephant on the homepage to bring up the category search, and select "Controversy Cards." Now, start reading those cards. These topics and reading selections have been carefully selected: the ongoing controversies have been curated as examples which exhibit a reasonable chance of bearing fruit; the historical controversies have been chosen because they can offer us humbling lessons for judging those debates which have yet to resolve; and the remainder of the cards provide crucial context which will help you build up this skill of judging controversial science.</p>

							<h4 className='PullQuote'>Science is the medium<br />for our investigation,<br />but the lessons will<br />teach us about people<br />-- and especially<br />ourselves</h4>

							<p>Every day of your life, you are being invited to rush to accept the judgment of experts by science journalists. The never-ending fanfare of bold announcements that ten problems before breakfast have been solved can leave us in a sort of mindless euphoria that if we can just manage to stick around for another 50 years, even death -- and eventually taxes -- will be a thing of the past. Over time, you may have unknowingly constructed a personal worldview upon this premise that science will make steady, predictable advances towards a better future if all you do is place faith in the specialist experts.</p>

							<p>This is a problem on so many levels -- for our culture, for our future and especially for <a href='https://www.thunderbolts.info/wp/2017/10/03/science-as-a-personal-journey/'>your own personal development</a>.</p>

							<ul className='BulletedPoints'>
								<li>With such an approach, <a href='https://www.controversiesofscience.com/bandwagon-research/worldview/card'>those few who develop the courage to point out serious fundamental flaws</a> in either theory or process are more likely to be attacked, <a href='https://www.controversiesofscience.com/schmidt/worldview/card'>and their warnings are more likely to go ignored.</a></li>

								<li>The leave-it-to-the-experts approach leaves the impression with the public that progress on big scientific questions will occur regardless of our own personal actions as laypeople. Those who grew up in the 50's, e.g., imagined as kids that great innovations were just going to happen -- <a href='https://www.controversiesofscience.com/innovation-starvation/worldview/card'>and what has happened instead towards the end of their lives is that many have wondered why there are no flying cars.</a></li>

								<li>The concept of <a href='https://www.controversiesofscience.com/expertise/worldview/card'>faith in expertise</a> rests upon the idea that scientists are not prone to layperson problems. But, when we confine deep thought in the sciences to <a href='https://www.controversiesofscience.com/over-specialization/worldview/card'>micro-specialists who themselves are (much like yourself) taking for granted claims in domains outside of their limited expertise</a>, we've culturally accepted the premise that <a href='https://www.controversiesofscience.com/generalist/worldview/card'>generalists are unnecessary.</a></li>

								<li>Worse yet, when people create a void of understanding for themselves on some sort of topic, the mind does not acknowledge this as empty space. <a href='https://www.controversiesofscience.com/believable-narrative/worldview/card'>It replaces that void with imagined, believable narratives.</a> These narratives tend to dominate online conversations.</li>
							</ul>

							<p>We need to culturally come to grips with the historical fact that <a href='https://www.controversiesofscience.com/radio-waves/worldview/card'>experts</a> <a href='https://www.controversiesofscience.com/laser/worldview/card'>are</a> <a href='https://www.controversiesofscience.com/expertise-trust/worldview/card'>sometimes</a> <a href='https://www.controversiesofscience.com/epigenetics/worldview/card'>wrong</a> -- and that the stakes are far too big to look to stereotypes for how we <b>imagine</b> that science works. As laypeople, we must take responsibility for our own future by developing our own critical sense for expertise. There is no getting around it: the only way to manifest our imagined future is to directly witness for ourselves the true complexity of the scientific enterprise.</p>

							<h2>Step 2: Start Tracking<br />Controversies</h2>

							<p>Your blind faith in scientific expertise can be broken with just one believable controversy, but you won't know until you start tracking it over time.</p>

							<p>Once you've learned a new controversy, the next step is to get into the daily habit of scanning for related science articles (or optionally, scientific papers). Your purpose should be to practice the avoidance of judgment. It's like casting a net: You must create the opportunity for the world to change your mind about it.</p>

							<h2>Step 3: Run the Claims<br />By Others</h2>

							<p>People can be incredibly self-conscious about revealing what they don't know about science. This is of course even a bigger issue when you are publicly questioning experts. But, until you get into this habit, certain large chunks of the scientific system will remain as black boxes.</p>

							<p>Ultimately, the reason you should be running claims against others is to learn from their responses. It may help to educate yourself on one controversy you find compelling, and then run it against 10 or 20 people. You're going to notice patterns in the responses which oftentimes have nothing to do with the persuasiveness of the evidence and arguments. To set yourself up for learning, you have to pick arguments which you're willing to give the benefit of the doubt. You should also avoid introducing any emotion at all, so that if you observe an emotional reaction, you know where it came from.</p>

							<h2>Step 4: Identify<br />and Rid Yourself of<br />Information Filters</h2>

							<p>If we shouldn't assume the validity of expertise when the textbook theory becomes challenged, a fair question to ask is who -- or what -- can we learn from?</p>

							<ul>
								<li>The best critiques of modern science we can find</li>
								<li>Common reaction patterns amongst laypeople and experts to claims</li>
								<li>Lessons from the history of science</li>
								<li>Scientific anomalies and contradictions</li>
								<li>Anybody who makes a persuasive argument, regardless of their credentials</li>
								<li>Especially unexpected or novel arguments</li>
								<li>People you disagree with (listen and ask questions until you understand their reasons)</li>
								<li>By double-checking your own understanding of the science by trying to explain it to others</li>
								<li>And once the site builds out, by speaking with fellow science agitators and maverick thought leaders</li>
							</ul>

							<h2>Step 5: Fine-tune<br />Your Big Picture<br />Mental Model<br />for Science</h2>

							<p>Once you've learned 10 or 20 believable scientific controversies, you'll start to develop a sense for the patterns which permeate all of them. You should be trying to connect all of the different pieces together: Can you link claimed mistakes in approach with claimed mistakes in theory? If you are directly witnessing online behaviors or patterns which don't make sense, can you find critiques of modern science that can explain them? What about psychology and sociology articles? Can you corroborate those claims with your own personal observations of people responding to controversial claims?</p>

							<p>To get yourself to a higher level of thinking, you have to acclimate yourself to this process of constructing your own personal mental model. We're going to be using science as the medium here, but once you understand this process, you can apply this to nearly any subject -- because a lot of what you're going to be discovering will actually relate to how people think in general.</p>

							<p>What I've learned after a decade of running claims is that there are no shortcuts to this process.  People, even theorists, who are engaging the subject of science at the very highest levels are themselves still largely unclear on the ways in which our human tendencies influence the selection of scientific theories.  I guarantee you that if you are willing to adopt these practices in your daily routine, you will in due time experience a fundamental transformation.</p>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(HowComponent);
