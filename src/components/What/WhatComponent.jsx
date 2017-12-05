import React, { Component } from 'react';
import './What.css';
import { withRouter } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

class WhatComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

		this.props = props;
	}

	render() {
		return (
			<div className="What">
				<Grid>
					<Row>
						<Col>
							<h1>Universities Have Yet to Systematically Track Scientific Controversies and the Public Should Do It For Them</h1>

							<h2>A proposal for the<br />creation of a scientific<br />social network where<br />the public crowdsources<br />information about<br />scientific controversies</h2>

							<p>By Chris Reeve</p>

							<p>I had waited patiently at least a year to have the conversation. I wanted to show a documentary on a controversial and important scientific controversy to a close friend. I thought it might actually aid his creative spirit, given his precarious situation as a Hollywood scriptwriter who was soon to run out of money.</p>

							<p>But, before I could fully explain just one of the hundreds of scientific controversies I track, he declared <i>"it's obviously wrong."</i></p>

							<p>How could he know? He had yet to hear the details.</p>

							<p>It's merely the most recent of the countless discouraging interactions I've had with people over the past dozen years on the topic of scientific controversies. What does it mean when people have a confident reaction before they've learned the details of some debate?</p>

							<p>After experiencing these same conversations with literally hundreds of people, the patterns eventually revealed themselves. This particular reaction implies that a narrative has replaced the missing information. The Harvard psychologist Daniel Kahneman has warned that narratives can effortlessly pop into our heads from the depths of our subconscious when a pattern is subconsciously noticed. It would seem in this case that I've been stereotyped by my friend as somebody who is completely out of his league.</p>

							<h2>The Modern Oppression<br />of Intellectual Diversity<br />in American Science</h2>

							<p>The production of new ideas in the sciences is a delicate process easily disrupted by cultural, sociological, or psychological anti-patterns.  In the context of scientific discovery and discourse, anti-patterns are behaviors that block progress in the sciences. This includes narratives, but also practices which have come to dominate scientific thinking in recent times -- like assuming the validity of the settled science approach, treating over-specialization as though there are no negative consequences, and refusing to connect the dots between academic research problems (like gatekeeping and the pressure to publish) with scientific consensus.  My own observations suggest that they tend to recur with remarkable consistency across society, and as suggested by Harvard’s Robert Kegan and Lisa Laskow Lahey <sup>1</sup> , it's because they service us in useful ways -- e.g., leaving us with a false sense that we understand our surroundings well enough to not feel threatened by them.</p>

							<p>Anybody who spends some time in online science forums or comments attached to science journalism will quickly learn of the overt hostility directed at those who might publicly criticize the theories of modern science. My own interest in scientific controversies originated with a deep curiosity about the origin of this phenomenon, which seems to limit the quality of online discussions about science. This hostility to online dissent drove me to pay closer attention to the history of science, and what I found was a pattern of intellectual oppression that is still repeating to this day.</p>

							<h2>What We Failed to Learn<br />from the Moonshot</h2>

							<p>A similar situation almost a century ago led the United States to an existential crisis.  A professor who proposed sending a rocket to the Moon, Robert Goddard, was ridiculed in a 1921 <i>New York Times</i> article (and many times after) for not understanding "the relation between action and reaction and the need to have something better than a vacuum against which to react. He seems to lack the basic knowledge ladled out daily in high schools."</p>

							<p>It was hardly a coincidence that Russia and Germany would go on to produce their own ICBM's alongside the United States: these were the two groups who did not ridicule the rocket's inventor.  By contrast, they maintained their correspondences with fervent interest.</p>

							<div className='QuotedText'>"It didn't matter that the New York Times was wrong and Goddard was right; Goddard felt humiliated.  He moved to New Mexico and continued his rocket research away from the public eye." <sup>2</sup></div>

							<div className='QuotedText'>"This public humiliation caused Goddard to retreat behind a wall of secrecy.  Few people after that learned about the work he was doing." <sup>3</sup></div>

							<p>There is a remarkable scene in one of the early Goddard documentaries -- titled Father of the Space Age -- recording a conversation about the V2 rockets (3,000 of which hit their targets).  The German scientist who is asked about the V2's responds by asking, <i>"Why do you ask me these questions?  Why don't you ask your own rocket pioneer, Dr. Goddard?  We learned these things by studying him."</i></p>

							<p>The documentary then remarked that <i>"it was a final irony for a man labeled impractical by America's military leaders."</i> <sup>4</sup></p>

							<p>The V2 rocket was created by the great German scientist Wernher von Braun, who would of course eventually emigrate to the United States to advance our own rocket program.  In the Father of the Space Age documentary, von Braun ironically remarks about Goddard:</p>

							<div className='QuotedText'>"And in the light of what has happened since his death, we can only wonder what might have been if America realized earlier the implications of his work." <sup>5</sup></div>

							<p>Amazingly, these public attacks on scientific innovation continued all the way up to 1956, after President Eisenhower had announced the United States satellite program!</p>

							<p>When inquired on his views of spaceflight, Dr. Richard van der Riet Woolley remarked:</p>

							<div className='QuotedText'>"Space travel is utter bilge"</div>

							<p>The newspapers did not allow him to forget this when Sputnik I went up the very next year.  There's little doubt how Dr. Woolley steered the British government as a leading member of the committee advising the British government on space research! <sup>6</sup></p>

							<p>For those who might be quick to propose that this was some sort of isolated incident undeserving of a lesson on tolerance of intellectual diversity, it bears reminding that the inventor of the maser (the laser's precursor) experienced a very similar treatment.  The leading scientists of the day told its inventor, Charles H. Townes, that the device was impossible.  Objections from scientists like Neils Bohr and John von Neumann were not offhand opinions regarding obscure physics; the objections came from the marrow of these mens' bones, and were based on the Heisenberg Uncertainty Principle. <sup>7</sup></p>

							<p>When the Nazis burned books in Babelplatz, it would some years later become plainly symbolic as an attack upon intellectual diversity.  An aspect of our more modern intellectual oppression which sharply contrasts with Babelplatz and the V2 is that there is not always a big show, explosion or existential crisis to draw attention to the problem.  We have to pay attention to observe the damage.</p>

							<h2>The Decline in<br />Conceptual Revolutions</h2>

							<p>In its July 1, 2005, issue, Science charted the milestones of modern science. The University of Washington’s Gerald Pollack has pointed to the unintended observable trend revealed by the article in his efforts to reform the funding of academic science. <sup>8</sup> Science's list of milestones reveals a serious problem not commonly discussed: a comparison of two eras—1865-1905 with 1965-2005—plainly reveals that the number of conceptual scientific revolutions is in a state of serious decline.</p>

							<p>If the issue is raised with an actual scientist, their response will probably look a bit like this example found online:</p>

							<div className='QuotedText'>In the 19th century, the scientific method was still a new idea and the world was rich with opportunities to make a breakthrough discovery. Today we are working on a much broader front, and the section you can work on is relatively much smaller, you have to be more specialized, and you have to collaborate much more with specialists in related field to achieve meaningful progress. So if you thought the number of conceptual revolutions would be as big today as it was a century earlier, there is definitely something wrong with your expectations, but not necessarily with the world of science.<sup>9</sup></div>
								
							<p>The rebuttal sounds reasonable on its surface—but there is a fatal flaw: it requires us to completely ignore the possibility that the original hypothesis was simply wrong. Theorist and science critic Don Scott explains the problem:</p>

							<div className='QuotedText'><p>In this process, one starts with a presumed law of nature—an obviously correct (accepted) generalization about the way things work—and deduces (works out, derives) its logical consequences.</p>

							<p>A hypothesis arrived at via this deductive method is promoted to the status of being a theory when and if a large enough body of experts accepts it. This is an application of the Socratic Method, also sometimes called the “dialectic method.” Socrates (469-399 B.C.) believed that truth was discovered through intense conversations with other informed people. Thus, in this method, a vote of the experts determines when and if a theory is correct. Once such a theory has been accepted, it is not easily rejected in light of conflicting evidence. It is, however, often modified—made more complicated. When over time a theory becomes officially accepted, the essence of the matter has been settled and fixed. Modifications to the fine points of the theory can then be proposed and debated, but the backbone structure of the theory is set. That framework has already been firmly established.</p>

							<p>An inherent flaw lurking in this method is: What if your “obviously correct,” basic, starting-point presumption is wrong?<sup>10</sup></p></div>

							<h2>Case in Point:<br />Cosmology as<br />Ripe for Disruption</h2>

							<p>We need only look at the dramatic over-confidence with which questionable claims are dogmatically accepted by professional scientists today to appreciate that there exists a very real refusal to seek out, consider, and elaborate alternative ideas.</p>

							<p>The wildly popular Big Bang theory is an excellent case in point. Plasma physicist Anthony Peratt quotes Nobel laureate Hannes Alfvén on its origin:</p>

							<div className='QuotedText'>"I was there when Abbé Georges Lemaitre first proposed this theory,” he recalls. Lemaitre was, at the time, both a member of the Catholic hierarchy and an accomplished scientist. He said in private that this theory was a way to reconcile science with St. Thomas Aquinas’ theological dictum of creatio ex nihilo—creation out of nothing." <sup>11</sup></div>

							<p>There was a time when the Big Bang idea might still have been workable. Today, the prospects for finding dark matter are much diminished, the distances between stars are far too great, and the resulting gravitational forces between them can be observed at the interstellar scale to be too small to construct a cosmology. Without dark matter, the entire theoretical structure of modern cosmology is at risk of crumbling.</p>

							<p>Little heed is given to blistering critiques of the cosmic microwave background:</p>

							<div className='QuotedText'>How, in big-bang cosmology, is the microwave background explained? Despite what supporters of big-bang cosmology claim, it is not explained. The supposed explanation is nothing but an entry in the gardener's catalogue of hypotheses that constitutes the theory. Had observation given 27 kelvins instead of 2.7 kelvins for the temperature, then 27 kelvins would have been entered in the catalogue. Or 0.27 kelvin. Or anything at all. <sup>12</sup></div>

							<p>Few appear to recall the recent history that theorists were unexpectedly forced to admit very late in this theory-making game -- in 1958! -- that the dominant state of observable matter is in fact the "fourth" state—plasma. Recall that Einstein died in 1955, and the Big Bang idea traces to around 1927. Plasma is a mixture of gas with charged particles which can be observed to respond to electromagnetic fields over gravity <i>"after a remarkably small fraction of the gas has undergone ionization."</i> <sup>13</sup> Observations of the ionosphere suggest this value can be as low as 1%. <sup>14</sup></p>

							<p>That problematic acknowledgement resulted from our first in situ measurements of space—you know, when we finally sent rockets up. A 1963 Popular Science article would admit in big bold letters: <i>“’Space’ was invented before we knew what was out there.”</i> <sup>15</sup></p>

							<p>And who at this point even cares that government supercomputers were used all the way back in the early 1980s to simulate galaxies with proper rotation curves, without the need for any dark matter at all, based upon the radically simple idea that electricity flows through space? <sup>16</sup> (The idea traces to plasma laboratory observations.)</p>

							<p>Anthony L. Peratt, a former advisor to the Department of Energy, has also attempted to subtly remind the scientific community, without any apparent success, that <i>"High-power microwave generation on earth belongs exclusively to devices using relativistic electron beams" and that "A relativistic electron beam that does not produce microwave radiation is unknown. These same basic mechanisms are likely to have their natural analogs in cosmic plasmas."</i> <sup>17</sup> Those of us who have followed his work understand that he is taking a profound swipe at the metaphysical conjecture that microwaves coming at us from all directions must necessarily represent the remnant of some Big Bang expansion.</p>

							<p>The point of this example is not to convince the reader that electricity flows through space. The scope of my argument (which necessarily leaves out many details) is restricted to simply demonstrating that once we get into the habit of digging into the details of scientific controversies, it becomes apparent that the decline in conceptual revolutions cannot be so easily dismissed as just some narrowing in on the "final answers," or as the online scientist informed me, an artifact of science's broad scope and the need for interdisciplinary collaboration amongst specialists.</p>

							<p>The usually unspoken reality of the situation is that the scientific community has opted for an incredibly risky all-or-nothing strategy, which has not gone according to plan. <sup>18</sup> And what we have now is an overt defensive posture set against newer competing ideas vocalized largely online by those who perceive that their intellectual investment is under attack.</p>

							<p>It must be emphasized that although these online warriors superficially "defend science," what they are actually defending it against are some of science's most cherished attributes: its willingness to admit that it has been wrong, and its propensity for innovation and change in the light of newer ideas based upon more recent ideas, observations. and experimental results. Their defense is an attack upon the current wave of maverick science thought leaders who are attempting to resolve the mainstream's various dysfunctions. The effect of these defenses is to propagate the myth that regular laypeople need not bother with the effort of actual thought -- which of course is the source of critique. <sup>19</sup></p>

							<p>If the public was for some reason to suddenly start paying attention to what is actually happening with all of the many debates of modern science, it would be a complete game-changer that could lead to rapid innovation in the sciences.</p>

							<h2>My Story</h2>

							<p>I recall the exact moment about five years ago when I decided to fix scientific discourse. I had by that point embedded myself for a previous five years as a sort of independent observer into a group of the world's most vocal critics of establishment science, the Thunderbolts Project. They are the direct intellectual descendants of modern science's most controversial man, Immanuel Velikovsky. To even mention the name in many circles is enough to shut down all discussion.</p>

							<p>The Thunderbolts Project has proposed a radical rewriting of the textbooks across a wide variety of domains, and they have put forward the very controversial and enigmatic suggestion that the key to unlocking the earliest stories that mankind ever told -- the mythological archetypes -- is to interpret those stories through the lens of plasma physics concepts. My immersion in their group would completely transform my understanding of what theorists who challenge the mainstream go through. But these decisions would also effectively isolate me from my fellow Carnegie Mellon graduates, and I sought out new friends who were fine with fraternizing with a heretic.</p>

							<p>And what I witnessed honestly took me by surprise: I oftentimes saw unexpected and well-formed arguments that were usually shouted down by people who had not taken the time to learn and study the claims. These critics usually "learn" the theory in the midst of very publicly arguing against it—an approach which can involve a lot of surprising revelations and subsequent saving face. It became obvious to me very early on -- a full decade ago -- that there was really only one way to understand this debate: I had to place myself at the very center of it by running claims online against laypeople and the group's best critics. I needed to "poke the machine" to witness firsthand how it reacted. But, rather than trying to seek out the truth of these debates, I would instead use the electricity-through-space debate to understand how people think about controversial science more broadly. I would later learn that I was unknowingly practicing a form of science education theory known as constructivism.</p>

							<p>I would come to understand that it was important to adhere to an unemotional approach. In other words, I was not in this <i>"for the lulz."</i> My intent has consistently been to learn how people think about scientific controversies by introducing large numbers of people to the same arguments I already know a bit about. Yet, time and time again, I would nevertheless be called a "troll" for the sin of suggesting that modern science might have gone astray. It was one of the many anti-patterns I would repeatedly observe and attempt to document -- that people who argue against mainstream science are generally labeled, dismissed, and grouped together as cranks, crackpots, and pseudoscientists. It was clear that there was really no attempt to distinguish true higher-order critical thinking from thinkers who had indeed run amok in some way. It also became clear that the reaction to critiques of modern science was itself harmful to science insofar as it is inherently lazy and hostile to innovation at a time when new creative ideas are desperately needed.</p>

							<p>By year seven, I had become completely obsessed with the topic. My girlfriend diagnosed me as a digital hoarder and demanded that I <i>"get a real job."</i> The natural choice was, of course, web developer. She paid for me to attend a coding bootcamp, and a friend who I will be forever indebted to scored me a fantastic job and cultured me into the programming world (thanks Liz!). By year nine, I would be actively developing a new scientific social network.</p>

							<p>When I was in high school, I excelled at always ranking at the very bottom of the exceptional. It seems that I was most impacted by the exceptional International Baccalaureate literature classes, where the students were repeatedly invited to consider multiple meanings for very complex texts. On a moment-by-moment basis, the process in retrospect seemed like a lot of awkward silence. Like probably many others, I was honestly out of my league and not quite prepared for those experiences. But many years later they would crucially help me realize that there is no meaningfully equivalent tradition in modern science, and that our discussions of science suffer horribly because of this academic monoculture.</p>

							<p>When, as an adult, I combined my many experiences running controversial claims online with a systematic review of published critiques of modern science, it became apparent which critics seemed most locked onto the most common anti-patterns. I was left with an exciting sense that I was starting to fully understand the scope of modern science's current predicament. I increasingly noticed that the source of my disagreements with others about how to "fix" the mess boiled down to my own willingness to immerse myself in reactions to scientific controversies; those experiences had left me with insights that were challenging to convey to people who refused to participate. That realization would in turn suggest a process for extricating ourselves from this mess.</p>

							<p>The picture that has gradually emerged over a decade of interactions is that of millions of little conversations happening in the many nooks and crannies of the Internet, where the participants may imagine that they are actually thinking at a high level, but where the scope of this thought is severely constrained by a large number of anti-patterns.</p>

							<p>It can certainly by now be called an American tradition that we generally love to tell others how we imagine that science must work. What becomes apparent through talking to people is that the ones who are the most vocal about it are the same people who have refused to actually listen to the critics and academic whistleblowers who actually have something meaningful to say on these topics. What is surprising is that this self-inflicted void of knowledge does not produce some humble uncertainty; it is instead replaced with overly-simplistic stereotypes about scientific method, scientists eager to disprove their own knowledge, and other fantastic idealizations. A more accurate analogy would be science as a bumbling golem that sometimes happens to bump into useful observations, which are then consistently ascribed to incorrect inferences.</p>

							<p>Imagine a million online conversations just going in the same exact circles, and really having very little relation to what is truthfully happening -- and you are now getting much closer to the reality of the situation of online scientific discourse today.</p>

							<p>Once a person sees for themselves this astounding waste of human resources, it's easy to become discouraged. But, the realization can also be empowering insofar as it also suggests a path out of the cycle of madness: What if we created a new type of social network that helps people to break out of their own anti-patterns? If people can be convinced to want that, then they can be transformed from progress blockers into higher-order scientific thinkers.</p>

							<p>Once I was able to finally distill the problem into these terms, a sense of real purpose now drove me. It occurred to me that although the technical gap to something that might resemble a "theory of everything" remained large, we could now finally create a process that would in due time reliably move us into a more useful direction. That process is to carefully identify and persuasively document all of the anti-patterns that are blocking progress at the level of conversation, and then translate those anti-patterns into social network design features that help the site's users to witness for themselves these patterns in other peoples' behaviors (essentially replicating my own experiences). Psychologists refer to this approach as crossing the subject-object barrier: It's taking something that a person is currently subject to, and turning it into an object the person can then manipulate.</p>

							<h2>Defining the Scope<br />of Modern Science's<br />Problems</h2>

							<p>The Internet remains a bit of a novel invention at this point in the sense that people are still trying to figure out what we can do with it. Social networking, in particular, remains in a mostly exploitative state where the public is lured into the generation of content that mostly services the needs of advertisers. Granted, users are rewarded with an escape from work, a way to keep in touch with friends, and a way to find new likeminded friends. But, after 10,000 hours of Facebooking, what have you? It's not so much a way to construct something, as it is a way to escape the construction of things.</p>

							<p>What if there was a social network that helped its users to think at a higher level through a process of aggregating information about challenges to mainstream science? If we adopt the remarkably simple assumption that some of these challenges will prove to be true, then those controversies would seem to be blocking progress in the sciences. Can we build a social network which through the crowdsourcing of information about scientific controversies acts as a sort of innovation engine?</p>

							<p>If anti-patterns are reducing individual conversations to pointless psychological patterns, it stands to reason that on a larger social scale, they are influencing the emergence and selection of theories. At the scale of society -- which the scientific community is embedded into -- the numerous conversational anti-patterns can in certain instances obstruct groundbreaking scientific innovations.</p>

							<p>Wherever there exists a challenge to modern scientific theory, we should create a home for information that can help people to formulate their own personal understanding -- and over time, judgments. If the information is binned in a manner that facilitates discovery of items of value, then perhaps the repeated exposure to challenges can lower peoples' immunity to change.</p>

							<h2>The Importance of<br />Defining the Problem</h2>

							<p>The Goddard story is the perfect story to illustrate this problem because there was an attempt to react to the situation afterwards, which we can learn from:</p>

							<div className='QuotedText'>After the Russian launch of Sputnik in 1957, there was a national outcry that American education was weak and that we were falling behind the Russians. One of the condemnations of school learning was that too much school instruction, and too much of our testing, emphasized nothing more than rote learning. The alternative that became widely promulgated, especially in science and mathematics, was to move instruction toward greater emphasis on teaching strategies centered on discovery learning, now more commonly called inquiry learning. The result was the development of programs where students were provided activities where the answers were not given, and where manipulation of materials or equipment could lead to discovery of concepts. Since it is patently obvious that children in school settings could not discover the concepts and principles constructed by geniuses in various fields over the past few centuries, it was not surprising that the emphasis on learning by discovery soon led to disenchantment with this approach by teachers and the public. Even under the best of circumstances, and with considerable guidance, only the more able students were demonstrating significant achievement. <sup>20</sup></div>

							<p>A good question to ask is if it really makes sense to pin the problem exclusively on science education? The most famous Goddard critique appeared in the New York Times, not a science textbook. In another instance, a New Zealand professor of physics and chemistry used a back-of-the-envelope energy calculation to show that the proposition of launching a rocket to the Moon was basically unsound. Both situations leave us with a hint that maybe the scope of modern science's problems were misidentified.</p>

							<p>It would seem that the public did not take the time to fully define the problems of modern science. Thus, the large bulk of this new effort is the daily process, over more than a decade, of studying how people respond to controversies that we already know something about. And the proposed solution is to aggregate a master list of anti-patterns with the creation of both content and a social networking infrastructure that routinely and repeatedly exposes these anti-patterns -- with the intent that this system will systematically teach people to transition the subject-object barrier.</p>

							<p>We can better understand the value of the proposal by identifying some of the most significant causes for the anti-patterns. Let's run through a short list.</p>

							<h2>The Internet's War<br />on Cranks and Crackpots</h2>

							<p>The paradox of the Internet is that although we suddenly have more instant access to information today than any previous generation, people have generally been convinced to avoid seeking out new meanings in this glut of information due to the observation that true wisdom is observably rare in critical websites, online forums, and comments.</p>

							<p>What is important to understand about this is that the low signal-to-noise ratio is simply the nature of the challenge (much like mining for gold or diamonds), and that there would be no endless parade of cranks and crackpots coming at modern science if it had its own house in order. The cranks occur because of modern science's dysfunction, so it stands to reason that we should seek to bring some order to this information with the expectation that most of what we are organizing will not lead us to answers. The point of organizing it is to be able to move through this information more efficiently.</p>

							<h2>The Widespread<br />Ignorance of Critique</h2>

							<p>Numerous critiques of modern science have been published in recent years, but nobody seems to be reading them. These critiques do nobody any good if understanding them requires reading 20 or 30 books. The system we use to digest science stories and announcements should come with an ability to annotate those articles with these critiques.</p>

							<h2>The Believable Narratives</h2>

							<p>My own online interactions have repeatedly confirmed Daniel Kahneman's claim that our natural reaction to information overload is to take subconscious cognitive shortcuts. It would seem that narratives serve an important purpose in our daily lives. If we did not rely upon them, we would lack the mental energy to get through our workdays. To the extent that a society is pushed to their cognitive limits, people will tend to rely more heavily upon them -- because this is thinking that just happens. It does not require mental effort to do it.</p>

							<p>Since we cannot do away with narratives, we should seek to identify their presence in scientific discourse.</p>

							<h2>The History of<br />Science Journalism</h2>

							<p>Science's popularity in American culture traces to the late 19th Century evangelists known as the “Men of Science.” These popularizers were notably generalists, and they attempted -- with great success, actually -- to "convert" the public to science from traditions steeped in superstition, ignorance, and intolerance.</p>

							<p>Science historian John Burnham recounts how science's traditional opposition to superstition became less clear-cut with the rise of Relativity and Quantum Mechanics. The uncertainties and paradoxes that resulted from these new ideas undermined science's explanatory tradition. Science journalists were called upon to explain the resulting confusion, and their subsequent failure to do so led to a new mode of operation for science journalism that involved the removal of all controversy from their reporting.</p>

							<p>It is by now clear that this was a mistake.</p>

							<h2>The Professionalization<br />of Academic Science</h2>

							<p>The public has completely misunderstood the meaning of professional scientist. Physicist and academic whistleblower Jeff Schmidt explains:</p>

							<div className='QuotedText'>My thesis is that the criteria by which individuals are deemed qualified or unqualified to become professionals involve not just technical knowledge as is generally assumed, but also attitude -- in particular attitude toward working within an assigned political and ideological framework ... The qualifying attitude, I find, is an uncritical, subordinate one, which allows professionals to take their ideological lead from their employers and appropriately fine-tune the outlook that they bring to their work. The resulting professional is an obedient thinker, an intellectual property whom employers can trust to experiment, theorize, innovate and create safely within the confines of an assigned ideology. The political and intellectual timidity of today's most highly educated employees is no accident. <sup>21</sup></div>

							<p>Schmidt's well-stated critiques suggest that maverick layperson thinkers have value to add to this process.</p>

							<h2>Over-Specialization<br />in the Sciences</h2>

							<p>Over-specialization can undercut science's highly-regarded capacity for self-correction by making the errors invisible to both insiders and outsiders. Micro-specialists oftentimes cannot understand fatal objections and comprehensive refutations of their standard paradigms when these originate from adjacent areas of science, and this allows a situation to develop where the whole of a vast area of science can become bogus knowledge.</p>

							<p>These specialization critiques collectively suggest that we need to revive a generalist tradition.</p>

							<h2>The Whitewashing<br />of Science's History</h2>

							<p>It is not especially difficult to find stories in the history of science (like Goddard's ridicule) that offer enormously valuable lessons, but which are also not taught in any university science courses. Their absence creates the opportunity for historical mistakes to be repeated.</p>

							<h2>Ignorance of the<br />Philosophy of Science</h2>

							<p>The widespread emphasis upon words like denial, facts, and consensus throughout online science discussions implies a fundamental misunderstanding of the limits and processes of science. And after numerous interactions with people online, it has become apparent that a root cause of this symptom is a failure amongst laypeople and scientists alike to understand what a "worldview" is.</p>

							<p>A scientific social network can be designed in such a way that its users learn the structure of science as a consequence of using the site. This is something that is badly needed today.</p>

							<h2>The Hyper-Focus<br />on Truth-Seeking</h2>

							<p>What we need to be focused on is process; but what people are usually drawn to in science is eliminating uncertainty by establishing truths. The confusion emerges due to science's dual nature as both a system of knowledge and a way of thought. The culture of professional science would have the public conceptualize science primarily as a body of knowledge, but when theories become challenged, we must consider the possibility that the experts may be wrong. And we should in those cases focus upon science as a way of thinking.</p>

							<p>Setting up a place where scientific controversies are tracked would serve this need to have two separate modes.</p>

							<h2>The Project</h2>

							<p>To date, a year of effort has gone into the production of 182 "controversy cards" in my Controversies of Science G+ collection (some of which are displayed in this article). <sup>22</sup> A search interface has been constructed, and more than 2,200 controversy-relevant quotes have been mixed into the search results. I've since identified additional topics that can take the collection to 400-500 controversy cards, even before inviting public participation. Once complete, then it will be time to get to the real business of testing out the crowdsourcing hypotheses put forward in this article.</p>

							<p>You can observe the current state of the project at the Controversies of Science website. <sup>23</sup></p>

							<p>Once the site is built out, I will motivate participation by constructing an online course that uses this ecosystem to teach higher-order thinking. We will use the vehicle of scientific controversies to teach people how to be thought leaders.</p>

							<h2>References</h2>

							<ol>
								<li>Robert Kegan, Lisa Laskow Lahey, <i>Immunity to Change: How to Overcome It and Unlock the Potential in Yourself and Your Organization</i>, 2009, e.g., see pages 38-39.</li>

								<li>Gloria Skurzynski, <i>This Is Rocket Science: True Stories of the Risk-Taking Scientists Who Figure Out Ways to Explore Beyond Earth.</i> <a href='https://books.google.com/books?id=-hMtbFlKW5AC&pg=PA1967&lpg=PA1967' target='_blank' rel='noopener noreferrer'>https://books.google.com/books?id=-hMtbFlKW5AC&pg=PA1967&lpg=PA1967</a></li>

								<li><a href='https://books.google.com/books?id=AdcvQPh_aJcC&pg=PA22' target='_blank' rel='noopener noreferrer'>https://books.google.com/books?id=AdcvQPh_aJcC&pg=PA22</a></li>

								<li>Father of the Space Age Youtube documentary, <a href='https://www.youtube.com/watch?v=wVAmBN28_pw' target='_blank' rel='noopener noreferrer'>https://www.youtube.com/watch?v=wVAmBN28_pw</a></li>

								<li>Ibid.</li>

								<li>Arthur C. Clarke, “Hazards of Prophecy,” <i>New Scientist</i>, Dec 20-27, 1979, p.20. <a href='https://books.google.com/books?id=3P5-7ZAAXsYC&pg=RA1-PA20&lpg=RA1-PA20' target='_blank' rel='noopener noreferrer'>https://books.google.com/books?id=3P5-7ZAAXsYC&pg=RA1-PA20&lpg=RA1-PA20</a></li>

								<li>Charles H. Townes, <i>How the Laser Happened: Adventures of a Scientist</i>, 2002, p.69.</li>

								<li><a href='https://www.theinstituteforventurescience.net/who-we-are' target='_blank' rel='noopener noreferrer'>https://www.theinstituteforventurescience.net/who-we-are</a></li>

								<li>Rolf Heckemann: <a href='https://plus.google.com/+ScotStevenson/posts/ce5RzJvkF6d' target='_blank' rel='noopener noreferrer'>https://plus.google.com/+ScotStevenson/posts/ce5RzJvkF6d</a></li>

								<li>Don Scott, <i>The Electric Sky</i>, 2006, p.13.</li>

								<li>Anthony L. Peratt, “Dean of the Plasma Dissidents,” <i>The World & I</i>, May 1988, p.190-197.</li>

								<li>Fred Hoyle, <i>Home is where the wind blows</i>, p.413-414.</li>

								<li>Richard Fitzpatrick, <i>Plasma Physics</i>, <a href='https://www.cfa.harvard.edu/~scranmer/Ay253/LecNotes/fitzpatrick_plasma_physics.pdf' target='_blank' rel='noopener noreferrer'>https://www.cfa.harvard.edu/~scranmer/Ay253/LecNotes/fitzpatrick_plasma_physics.pdf</a></li>

								<li>F. Delobeau, <i>The Environment of the Earth</i>, p.13, <a href='https://books.google.co.uk/books?id=WbkLRSNB3uwC&pg=PA13' target='_blank' rel='noopener noreferrer'>https://books.google.co.uk/books?id=WbkLRSNB3uwC&pg=PA13</a></li>

								<li>"James Van Allen Tells What Space is Really Like", <i>Popular Science</i>, April 1963, p73-76, 206-208. <a href='https://books.google.com/books?id=wiADAAAAMBAJ&pg=PA73&lpg=PA73' target='_blank' rel='noopener noreferrer'>https://books.google.com/books?id=wiADAAAAMBAJ&pg=PA73&lpg=PA73</a></li>

								<li>Ian Tresman, <a href='http://www.plasma-universe.com/Galaxy_formation' target='_blank' rel='noopener noreferrer'>http://www.plasma-universe.com/Galaxy_formation</a></li>

								<li>Anthony L. Peratt, <i>Physics of the Plasma Universe</i>, Second Edition, 2015, p.33-34. <a href='https://books.google.com/books?id=wt2CBAAAQBAJ&pg=PA34' target='_blank' rel='noopener noreferrer'>https://books.google.com/books?id=wt2CBAAAQBAJ&pg=PA34</a></li>

								<li>"Physics still can't identify matter that makes up the majority of the universe", Dan Hooper, <i>The Conversation</i>, October 26, 2017. <a href='https://phys.org/news/2017-10-physics-majority-universe.html' target='_blank' rel='noopener noreferrer'>https://phys.org/news/2017-10-physics-majority-universe.html</a></li>

								<li>Chris Reeve, Science as a Personal Journey, Thunderblogs. <a href='https://www.thunderbolts.info/wp/2017/10/03/science-as-a-personal-journey/' target='_blank' rel='noopener noreferrer'>https://www.thunderbolts.info/wp/2017/10/03/science-as-a-personal-journey/</a> (this current article could be considered a sequel to that one)</li>

								<li>Joseph D. Novak, <i>Learning, Creating and Using Knowledge: Concept Maps as Facilitative Tools in Schools and Corporations</i>, 2nd Ed., 2010, p.63.</li>

								<li>Jeff Schmidt, <i>Disciplined Minds: A Critical Look at Salaried Professionals and the Soul-Battering System that Shapes their Lives</i>, p.16.</li>

								<li>The Controversies of Science G+ Collection is at <a href='https://plus.google.com/collection/Yhn4Y' target='_blank' rel='noopener noreferrer'>https://plus.google.com/collection/Yhn4Y</a></li>

								<li>Controversies of Science website: <a href='https://www.controversiesofscience.com' target='_blank' rel='noopener noreferrer'>https://www.controversiesofscience.com</a></li>
							</ol>

							<p><i>CHRIS REEVE has a Bachelor's of Science in Electrical and Computer Engineering from Carnegie Mellon. He has worked and lived around Silicon Valley for much of his adult working life. He's recently begun work on a stealth-mode startup, but continues to build out controversiesofscience.com on weekends. His preferred tech stack is React, Redux, Node, AWS, Serverless and Algolia Search.  The site is under active development and is expected to take another 6-9 months to complete.</i></p>

						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

export default withRouter(WhatComponent);
