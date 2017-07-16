# The Mobile-First Controversy Card App

An implementation of the Controversies of Science application for crowdsourcing information on scientific controversies.

I'm intentionally keeping this codebase separated from the react-worldviewer-prototype, which is an attempt to create an interactive infographic.  Although they are part of a similar effort, this aspect of the project is more focused on implementing actual workflows and crowdsourcing functionality.

To see a live version of this work-in-progress, go to http://worldviewer.github.io/react-worldviewer-app.

Setting the project up is simple.  Go to the root folder with `package.json`, and type:

    npm install
    npm run start

## What is This Thing?

*"For citizens who want to take part in the democratic processes of a technological society, all the science they need to know about is controversial..."*

(From the Preface to <a href="https://www.amazon.com/Golem-Should-About-Science-Classics/dp/1107604656/">*The Golem - What You Should Know About Science*</a>, by Harry M. Collins and Trevor Pinch)

The <a href="https://plus.google.com/collection/Yhn4Y">Controversies of Science G+ collection</a> has several aims which are all directed at improving the way that people think and talk about science.

The project will evolve into a social network which aims to teach critical thinking in the sciences by immersing non-specialists into a variety of historical and even ongoing complex scientific debates involving opposing worldviews.  This approach is inspired by current critical thinking instruction in International Baccalaureate literature classes.

The project will double as a systematic effort to crowdsource information about scientific controversies, by encouraging people to track the successes and failures of controversial or challenged claims in the sciences.  In this regard, TCoS will introduce a new form of participatory science journalism intended to better help people to use science as a tool for thinking.

A third goal is to teach the patterns of scientific controversies and methods for refining a personalized, independent worldview in the sciences.  The premise is that this will support laypeople and specialists out of their domain seeking to navigate some novel complex scientific claim where the experts have been challenged.  There is reason to believe that this approach can as a consequence reduce peoples' susceptibility to weak or pseudoscientific claims.

There is significant literature which supports the controversy-first approach to science education -- a fundamentally constructivist approach.  This approach contrasts sharply with positivist efforts to demarcate good from bad science, insofar as the demarcation is more distributed between the individual and experts.  A good place to start is this recent article here:

*<a href="https://medicalxpress.com/news/2017-03-dialogue-boost-critical.html">"Examining an issue as a debate or dialogue between two sides helps people apply deeper, more sophisticated reasoning</a>, according to new research published in Psychological Science, a journal of the Association for Psychological Science."*

While the original G+ collection has already demonstrated some successes towards these objectives, one of the most challenging aspects of teaching critical thinking is to motivate people to *want* to learn about alternative worldviews in the sciences -- a subject matter whose dry text-based format generally dissuades widespread interest.  The idea behind this current prototype is ...

- to enable the participatory aspects -- the crowdsourcing;
- to reduce through visualizations the cognitive load that the text-based approaches lead to;
- to identify an instructional technique that feels more like entertainment than education; and
- to identify a format for scientific controversies which is designed from scratch to support this niche's specific needs.

A far more detailed explanation of the problem this project is solving is explained after the prototype description.

<p align="center">
    <img src="https://github.com/worldviewer/react-worldviewer-prototype/blob/master/doc/letter-from-ryan-dupee.png" />
</p>

## The State of the Prototype

Authorization and authentication are now set up using Amazon Cognito.  Swipes can now be used to navigate the app; this structure still needs to be approximated for desktop.  This was done by implementing three separate stacks of swipes: One for each level of discourse (the FeedStack's), one stack for the different types of content associated with one specific controversy card (the CardStack), and one stack that navigates the discourse levels (the MainStack).

The desktop implementation will be straightforward for the CardStack, because they can just sit next to each other.  There will need to be some sort of navigation buttons on desktop.

Since one of the primary objectives of the app is to teach the epistemological structure of science (and especially what a worldview is), I am now briefly showing a diagram of the users' current layer of discourse when they swipe vertically between them.

Simulated feed data is now created for all five levels of discourse (worldview, model, propositional, concept and narrative) for the Halton Arp controversy.  This is the first time that this categorization scheme has actually been put to some sort of real-world application, and it seems to work pretty well.  I noticed along the way that it is not always obvious which of the model, propositional or conceptual categories that some piece of information should bin into (so users may need some assistance built into the app to guide them on this); I think the best strategy for this would be to include questions at the point of content submission (with links to jump to the other levels).  In total, I was able to generate 67 (!) sample feed submissions -- which should provide for an extremely realistic experience with the demo.

Algolia search has been integrated, but there remain a variety of minor bugs.  And the pages which will house these results are yet to be filled out yet.

I've updated the scraper script to grab all of the large-resolution graphics from the G+ collection, but for some reason, G+ has really screwed this up.  About a third of these links were very low rez, so I had to download them by hand.  And I think this means that I need to take care to actually check these into the repository -- so that I never have to do this again.

One thing that I'm noticing about Deep Zoomer is that it's very important that the resolution be known for each of these large pyramid-encoded images.  If these values are for some reason off, then the result is really bad.

Had to use execSync() rather than exec() for slicing the large images into pyramids.

Did a few passes through all of the controversy card images (1) to validate that all pyramid encodings worked; (2) to encode the width/height/slugs into a metacards.json file that I'll add into the /metacards endpoint; and (3) to validate that all of the graphics text is legible (and when not, upgrade the resolution / recreate the pyramid).  I think the image pyramids are now in a state that I can forget about all controversy card pyramids created to date.  I've been pleasantly surprised with how reliable Openseadragon has been; it's a bitch to set it up properly, but once you dial it in with the correct width/height/directory settings, it is extremely reliable.  I didn't see a single major pyramid generation error throughout the 180+ controversy cards generated by Node last night.

All controversy card image assets have now been uploaded to S3.  A similar treatment will be required for the feed post images which have already been generated for the Halton Arp controversy card.

But, as I go through that process, it's important to think about how search will happen, so that I can build out an approach which will scale well with the site's content.

I'm going to defer on message search until I decide on how to implement messaging (the solution may already come with a search interface).

There are client-side React components such as `react-fuzzy-search` which will allow for searches to have typos in them -- which would be extremely useful for science-related searches.  `react-fuzzy-search` also provides me with search score, and it fits the job as well because it allows me to search for particular fields within the JSON.

What it does not apparently do is permit me to rank hits based upon which of the JSON fields matched (something that, by contrast, comes standard with Algolia).  I want results to favor this hierarchy:

- Controversy Card Title
- Controversy Card Summary
- Controversy Card Text
- Feed Post Title
- Feed Post Text

... and eventually ...

- Image Text (will have to be manually entered at some future date)
- Message Title
- Message Text

Algolia has a size limit for individual records of only 10k, and they advise that records should be broken up if they exceed this amount.  For this reason, I am currently unable to import all of my JSON.  I've asked them to boost it up to 40-50k so that I can trial their tool.  So far, it looks like the perfect solution, but if I have to break these posts up by paragraph, it might add significant complexity to the markdown processing.

I discovered that with small images, it's important to instruct Image Magick (through the Magick-Slicer options string) to bump the quality up to 100 (from its default of 92).  This seems to start mattering at around a resolution of 2048 x 2048.

The command for that would be

    ./magick-slicer -i large.jpg -p '-quality 100' -o ./pyramid

It looks like whenever Image Magick switches from 256 to 512 tile width, the quality of the result suffers considerably -- but oddly, I can just set the resolution to double the actual value (1024 --> 2048), and I regain my quality.  Once I am ready to automate this process into a workflow, I'll have to fix all file-splitting to 256 width tiles.

All image assets are now up on S3.

Some additional thought needs to go into thinking through the features I intend to build out in the coming months in order to identify what other fields the JSON should have.  For example, one thing that I need to do is to upload all of my existing graphics work for each controversy card each into their own large-format github repositories (https://git-lfs.github.com/) so that these graphics can be reformulated or improved by others.  Those repositories will exist on the Controversies of Science github account at https://github.com/controversies-of-science, so each card should have a repository location associated with it.

I'm now generating JSON in a format which facilitates Algolia searching, and it will tell me exactly which paragraph the hit occurs on.  I was at first resistant on breaking up the content by paragraph, but now I am seeing benefits.  Having an ability to identify content by paragraph permits me to annotate by paragraph things like prepackaged shares, related controversy cards or user annotations.

Feed markdown is now importing into Algolia in paragraphs (even though there is some unexpected search result highlighting in Algolia).  There may still be some touch-up work left to do on this Algolia JSON, but I'll do it as I go.

And I've now switched over to using the AWS CDN images for all Algolia search results, and I've spent some time refactoring my scrape script to make it easier to follow.  There is some work left to be done with regards to refactoring the image pyramid generator, but this is low priority.

This basically concludes the bulk of the data preparation for the app.

I've successfully brought React Router Redux into the app, the router is now working as it should, and there is boilerplate in place now for each of the destinations I'll be creating in the coming week.

Short-form slugs have been created for each controversy.  They have been manually generated for each controversy.  If possible, the router should use this list to identify valid controversies.

The same sort of thing should be done for feeds.  This will ensure that the no-matches are properly catching.

## The Simulated Feed API Generator

- Should convert markdown to unicode-encoded HTML
- Should automatically convert zoomable images to dzi's
- Will for now push udpates to github manually
- Fields for: citizen scientist name / title, title, image location, zoomable flag / max zoom, content, array of metrics objects, date / time, github url, crowdsourcing pattern
- Image names must be automatically generated such that collisions never occur
- Data should be included at the /feeds endpoint, so that we can update /cards and /feeds independently
- Script must evaluate whether or not a particular feed item has changed, rather than mindlessly converting all entries
- Save to db

## The Feeds and Attached Messages

When it comes time to implement user submission of feed posts, I'll be taking a closer look at Netlify's Open Source Ecosystem described at https://www.netlify.com/open-source/.

<p align="center">
    <img src="https://github.com/worldviewer/react-worldviewer-prototype/blob/master/doc/netlify-ecosystem.png" />
</p>

## The Worldviewer App Structure

- This system is designed to create information gathering habits within information consumers.  The system should help people to adapt to the rules, but only go so far to adapt the rules to the information consumers' pre-existing information consumer habits.

- Base the initial design off of G+, but using, when necessary, the React components at http://www.material-ui.com/.  This should ease the transition for most people by starting with something already familiar.

- All content is (at least initially) curated by a set of editors assigned by specialty.

- Links / content / commentary can be submitted by anybody, but please understand that editors may restructure these submissions and augment the content if these changes better suit the site's principles.

- A distinction is made between "contributions" and "comments".  A contribution is information that is relevant to a scientific controversy, whereas a comment need not be.  Some comments will be elevated by moderators (or may evolve) to contributions.  Comments can be more freeform.

- Disagreements should generally be judged according to the site's principles, but the editors should be given much freedom to decide on their own.

- There will be a place to discuss the site's principles, where cases can be made to change them.

- The app should teach the structure of science at each level where it is integrated into the app's UI.  Of significant importance is the goal of teaching laypeople what a worldview is, and the value of a constructivist approach when some textbook claim has become challenged.  One way to do this: On transition, overlay graphic on screen of relevant structure of science.

- Clicking on H1's (like "Model Talk") drops down an explanation of the purpose of this area + suggestions for how to contribute.

- Categories are agnostic of the content type -- can be books, journals, press releases, videos, podcasts, whatever.

- The worldview, model, propositional and conceptual levels are four separate feeds, where each post is labeled according to their H2 category.

- Users rate all feed content according to the criteria, but some user's ratings carry more weight.

- Consider creating controversy cards to explain the judging criteria.

- Users must not be required to remember the judging criteria; they should be reminded at the moments when it matters.

- Non-threaded conversations can attach to each feed item (similar to G+).  See http://www.material-ui.com/#/components/list.

- When these conversations derail off-topic or into an unproductive direction, editors are free to turn visibility off by default (user must click to see).  The point of this is to solve the information overload problem -- not bind ourselves to being so nice that it hamstrings everybody else's need to have a clean information channel.

- There is search throughout the app which is always constrained to the context of the current view panel.

- Map the four levels of discourse to routes

- Animated cards are mixed in with static cards.

- There should be a place where people can publicly pitch a new controversy card, and the public can provide feedback and even rate them (criteria?).

- There should be a set of clearly-stated criteria for identifying and selecting the best controversies to cover.

- (Future Feature) The Paper Annotator - a chance to apply all of the various criteria at all levels of discourse directly to the original scientific papers themselves; emphasis upon questionable claims dressed up in esoteric academic jargon; upon surprising admissions that were never reported on by science journalists; upon confirmations for challenges to textbook theory.

- Over time, the objective should be to make sure that the materials are internally linking to each other.

Consistent format for all citizen scientist contributions, unexpanded:

- Image (deep zoomable via OpenSeaDragon gestures)
- Title of the Controversy Card it is attached to > H1 > H2 as a breadcrumb trail
- Title of the contribution
- Expand content
- Ranking criteria numbers listed inside of chips
- Link to social share

Expanded:

- Citizen scientists' bio link (since we'll allow forking of content, there can be multiple authors)
- Text Content

**THE CLASH OF WORLDVIEWS**

- *An Observational or Experimental Confirmation* - try to be concise if the link between the two is not immediately obvious; emphasis upon documenting the needed context for a typical layperson to understand it (you can assume they have read the controversy card, points deducted if there is some sort of misunderstanding of the controversy or science).

- *Links to the Best Related Critiques* - short-form journalism ("articles"); emphasis upon basic journalism and science standards; do not fall back upon overly-simplistic filters (like ignoring all publications by a particular source), take the time to actually evaluate the claims; emphasis upon the author's selection of details; upon applicability to the controversy; upon level of detail with the sourcing (please add corrections for broken links); emphasis upon empirical science over other forms (thought experiments, purely observational, excessive reliance upon constructs).

- *Press Releases or Scientific Papers that Relate to this Controversy* - not to be confused with PR's that more properly relate to the challenged theory; emphasis upon significance to the controversy; emphasis upon the logic of the claimed fit; points for filtering out unnecessary information or emphasizing the important bits (either bolding or highlighting); particular emphasis upon relevant points from scientific papers which have not shown up in mainstream science aggregators.

- *Noteworthy Online Discussions* - (please include URL to exchange and take high-resolution snapshots of the exchange by pressing command-plus a few times in your browser to embiggen the snapshotted text) emphasis upon identification of misconceptions or misguided "debunking"; upon proper addition of context (could people understand what the point of this was?); upon surprising claims; upon noting patterns discussed in controversy cards; upon character studies of the main players in online debates; upon any related online censorship; upon people who take the time to run claims and report back on their findings with snapshots; upon any discussions for how to deal with online challenges.  Points always deducted for evidence of any petty or trollish behaviors (or any other violation of the site's own principles when members interact with the larger science community since these behaviors can lead to stereotypes).

- *Observational / Experimental Suggestions* - pretend you are a graduate student who actually had access to facilities, equipment and funding, can you devise a test that might resolve the debate?  emphasis upon whether or not sufficient technical detail was provided to fully understand the idea; upon whether or not people think it might work; points for creative problem-solving.  Don't hold ideas back here if you lack all of the quantitative details, assume that somebody else at a later time may be able to help with that.

- *Crucial Resources* - where would somebody go to get a deeper background in this subject? if it's just a chapter of a larger book, please identify (or if helpful) describe the chapters; emphasis upon whether or not the material is accessible to laypeople, but technical materials are of course important here too; if the material is very technical, the reviewer can rank the material higher if they provide their own annotated version of the resource.  Opinions on how to properly approach the subject are encouraged.

**MODEL TALK**

- *The Best Explanations* - selected according to usage of visuals, clarity on assumptions, good presentation of historical context, thorough conceptual explanation of any presented mathematics, written at a level that a layperson non-scientist can understand.  These pieces should not be rated on the basis of age so long as there is no confusion generated from the introduction of that former context.

- *Modeling Practices & Assumptions* - explanation of some particular modeling practice or assumption (preferably focused on just one at a time), with an emphasis upon how the practice/assumption would be conveyed within scientific papers or press releases (such that the reader is now better equiped to identify this pattern in the future).  Points for emphasis upon hidden practices or assumptions whose exposure alters the interpretation of the results.  This would be a good spot to place discussions about statistics.

- *The History and Origin of the Idea* - emphasis upon unexpected context, little-known historical facts/interpretations or popular beliefs, famous or otherwise important quotes.

- *Tracking the Science Journalism and Public Perception* - emphasis upon tracking changes in the journalism; upon initial expressions of surprise or honest admissions which are subsequently rolled into the model (which can help us to identify hindsight biases); upon any omission of context or detail which undermines the offered conclusions; upon materials presented purely for their clickbait attributes; upon dubious logic.  Extra points for those who take the time to dig up some unexpected science journalism gem from the distant past which gives us some insight on how ideas have transformed over time.

- *Press Releases that Relate to the Challenged Theory* - not to be confused with PR's that are more directly relevant to the controversy, and realize there is a category already dedicated to inconsistences and anomalies; try to focus people on the specific part you want them to read, and help us understand why it should matter to us.

- *Things to Know About Wikipedia's Coverage on This* - think supplemental -- the point is not to replicate work already done on Wikipedia (this is analysis, not duplication); emphasis upon ideology posing as facts, questionable selection of evidence, information about wiki wars and activities of those known to abuse the platform.  If the entry (and its history) is unremarkable and uncontroversial, then this bin should be empty.

- *The Inconsistencies and Anomalies* - emphasis upon internal inconsistencies and any attempts to resolve them -- born of either observations or logic; slight emphasis upon those which are more empirically established, but it's okay if some of these turn out to be to incorrect (let's keep a broad dragnet).

**PROPOSITIONS**

- *Dumb Questions* - emphasis upon how common these questions pop up.

- *Poignant Questions* - do not judge these questions on your perception of whether or not they will prove true; the emphasis is upon asking good questions that can in some way be justified; emphasis upon creativity and synthesis (bringing together two ideas whose connection is not immediately obvious).

- *Creative Conjectures* - a general-purpose bin for conjectures; ranking might not be necessary.

- *Confident Claims*

- *Predictions* - emphasis upon the rationale (does this person know something we previously did not?); points after-the-fact if it proves correct.

**CONCEPTS**

- *Concept Maps* - emphasis upon use of concept maps as a pedagogical tool.

- *Explain the Math* - emphasis upon the conceptual explanation or critique of some mathematics.

- *Multiple Representations in Multiple Agents* - emphasis upon some mismatch in definitions, either according to worldview or domain.

**NARRATIVES**

- *Examples* - emphasis upon exposure of unsupported or faddish narratives; upon effective demonstrations, with evidence, that the narratives are off.

### The Mobile Safari Scroll Bug

I've seen online that Mobile Safari has had various scrolling issues.  I seem to have one of my own now: A sudden swipe to the right on the Summary component permanently scrolls the infographic up off the screen by about 20%, which then sticks.  I've not seen this behavior in any of the other browsers -- just iOs Safari.

# The Backstory

The rest of this document goes into the theory, history and experiences which led to this idea.

## Defining the Problem of Visualizing Scientific Controversies

There have been many historical attempts at visualizing debate -- none of which having gained much in the way of widespread traction.  In fact, it might be fair to call the documentation of argumentation visualization in ...

<p align="center">
  <a href="https://www.amazon.com/Visualizing-Argumentation-Collaborative-Educational-Sense-Making/dp/1852336641/ref=sr_1_1?ie=UTF8&qid=1484428766&sr=8-1&keywords=visualization+of+argumentation">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/visualizing-argumentation.png" />
  </a>
</p>

... a sort of newspaper obituary for argumentation visualization where the accomplishments of people you've never met are listed out.

It seems that many people have been struck with the -- arguably obvious -- realization that we need to have a way to bring a sense of order to this area.  But, there remain, to my eye, deep misunderstandings about what problems truly need to be solved in this area.

### Example 1

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/ai-controversy-map.jpg" />
</p>

### Example 2

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/arguman-zoomed-out.jpg" />
</p>

### Example 3

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/old-school-argumentation-mapping.png" />
</p>

What each of these examples should show with just a quick glance is that the simple 2d structure is not adequately conveying the complexity of the situation.

But, further, the elements in these diagrams do not convey a sense of: I want to learn with this!

It's tedious.

And it fails to convey the fact that communication is always occurring on several simultaneous levels.  We need a "third dimension" to do that.

## Prototype Description

### Objectives:

- Make scientific controversies entertaining.
- People who use the app will tacitly learn what a worldview is.
- Create an infographic viewer which is designed from inception to work on a mobile screen, and which can accommodate the "controversy card" design pattern.
- For the purpose of this prototype, I will pick a single example graphic which demonstrates the form of entertainment and learning I am seeking (this will be the <a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/DCDKHXnrdoH">Halton Arp controversy card</a>).
- (!MVP) I won't focus at this point on navigating between different controversy cards (I have almost 200 of them), so all of the data for now will be mocked; the point of this prototype is to experiment with interactions using React components.

### Responsive and Interactive

- The app should be responsive and fully take advantage of mobile gestures
- Rather than use the G+ graphic as it was uploaded, the graphic should be broken up into its four main parts: the title, the summary, the graphic and the circled annotation icon.  The point of this is to expand the options for interaction and animation.  If necessary, graphics resolution can be enlarged.
- Each element should respond in its own appropriate way to interactions.
- Since the goal is to make controversies entertaining, I hope to over time experiment with various animations -- and regularly check in with designers for feedback.

### Swipes

- Vertical swipes should teach the epistemological structure of science, in that the levels of thought are differentiated by vertical swipes (clash of worldview at the top, model-level layer one down from there, propositional one down from that, and at the very bottom, concepts).  This realization stems from more than a decade of online interactions on controversial science topics.
- Since the graphics used have been designed for zooming, horizontal swipes should transition through any "slides" which exist within it (which for the time being will be defined by a local, static JSON list).
- The controversy card exists at the top worldview layer.
- Swiping the app upwards should bring up a feed of the best related resources (the model layer).  This would be a mix of resources -- annotated articles, excerpts from books, excerpts from threaded discussions, social media posts, anything that is related to the debate which characterizes the mainstream perspective on the subject.  Any bolding or highlighting within these resources would need to be pertinent to this particular controversy (and these would likely rely upon some pre-existing annotation service or tool).  Each of these sources are characterized (like crank dot net) by one of a set of labels: "metaphysics", "mainstream", "scientism", "alarmist", etc.  This should probably be a reddit-like rankable list.
- Another swipe up should bring up a list of propositions (questions, conjectures, claims) -- which in turn act as collections of resources to support those propositions.  The ranking standards here are quite different from the model layer; we are talking here more about getting people to think.
- Another swipe up takes the user to the concept level, which includes concept maps, definitions, links to relevant wikis, etc.  This could be ranked in terms of how helpful they are to understanding the debate.
- (!MVP) At each level, new content can be added by users (but I won't be constructing a real database or API backend just yet).

### Annotations and Comments (!MVP)

- Annotations to the graphic should only appear at a minimum zoom, so that they do not interfere with the graphic itself
- Perhaps a heat map can occasionally appear to show the annotation activity (?), or be toggled
- Comments can attach to any content on any level (need to investigate best way to implement this on mobile)

### Interactions

- Clicking the circled annotation icon animates in a ranked set of related controversy icons, connected by a line, and titled, with background shaded dark or light to contrast
- The summary can be slid out of the way to the bottom of the screen to make room for observing the graphic.  And when it is, the annotation icon also slides out of the way to the nearest side.
- Clicking any circled content within the graphic zooms and centers to it; additional pinching can further zoom the content, if needed.

### TBD

- How will I display the article text?
- How will social media sharing occur?
- How will inter-card navigation occur?
- How will users be able to annotate all content?
- What css framework should I use?
- Is there a React mobile framework which starts me out with a bunch of useful components?  Or, should I assemble these together piecemeal?

## Why I Will Solve this Problem

The driving motivation here comes from my experiences running claims between against-the-mainstream theorists and their critics, and then taking those experiences and attempting to pitch laypeople.

To fully appreciate the depth of scientific controversy, a person has to take for granted -- through some provisional process of belief -- that the experts are wrong about some sort of ongoing debate.  Then, from that worldview, convince somebody else.

The refusal to go through that process creates a blind spot for people who design these systems.  The truth is that people who design argumentation systems approach the subject in a positivist manner.  Yet, positivism is plainly geared towards what Thomas Kuhn refers to as "normal" science.

When it comes to scientific controversies, the correct approach is a constructivist epistemology.

If those words don't mean anything to you, you might want to skim through these explanations ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/constructivism-bbal-cards.jpg" />
</p>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/H1akZRDWs5Y">**The Positivists vs the Constructivists**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/fTuMvbBD3Dg">**The Constructivist Revolution**</a>

The Cliff's notes is that the only way to create a system which can actually stand a chance of changing somebody's mind on a real-world issue -- which one must presume is the actual point of these diagrams -- is to actually believe that experts can sometimes be wrong -- as has historically been the case, of course.

If you don't believe that that can be happening right now, going into the situation of designing an argumentation interface, then that epistemology is predictably going to reveal itself through your design.  You might as well be working on something else.

My own approach has been to systematically document critique of modern science, because I believe that we can increase the rate of innovation within the sciences.  On rare occasion, I will add my own insights into the collection; but for the most part -- and quite intentionally -- I believe that we should not be re-writing the works of these critics, because an important part of what must be learned by laypeople is that this critique comes from a diverse set of independent thinkers.  These people are not coordinating, and yet, they frequently corroborate one anothers' works.

Before continuing on to my proposed solution, let's jump through some samples which I think will help the typical layperson to better define the problems of modern science ...

<p align="center">
    <img src="https://github.com/worldviewer/open-layers-worldviewer/blob/master/doc/controversy-cards.jpg" />
</p>

Note that the *Controversies of Science* collection includes "controversy cards" which cover 6 separate categories ...

- *ongoing* - Recent, ongoing controversies
- *historical* - Controversies possibly still at play, but more historical in nature
- *person* - Some people you should know about + character studies
- *reform* - Relevant to academic reform and redesigning scientific discourse
- *critique* - The best critical commentary ever published for modern science
- *thinking* - How to think like a scientist about controversies

The cards shown above are a limited sampling of some of those categories.

To learn more about any of these topics, find the link below ...

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/FXj2NzSzjSo">**The Decline in Conceptual Revolutions**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/LHiQnz7caYV">**The College Experience**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/ARg3vVaoKfk">**The Narrative of Scientific Discovery**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/i6e3YHua8z1">**The Anti-Pattern of Settled Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/9zhxMNRDha3">**The Pre-Scientific Judgment of New Ideas**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/FpsEoynk6cH">**The Unlearning of Creativity**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/9UVEhtvjuAo">**The Crowdsourcing of Scientific Controversies**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HV5W3xBr1AQ">**The Force Concept Inventory Test**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/a465vDkKrSd">**The History of Peer Review**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Dxq5nJgeDGo">**The Journal Oligopoly**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/QtKVXCKte2C">**Over-Specialization**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Drcac91Aava">**The Scientific Attitude**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/YL5TQWx5U6a">**The Two Systems of the Mind**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/3uPsnDLdbKi">**The Pressure to Publish**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/1eZJwiPZMuN">**The Wisdom of Crowds**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/HrBYGqWXFwY">**Innovation's Long Tail**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/U6qWs62w9Mo">**Innovation Starvation**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/DGgoWbwziq8">**The Information Cascade**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Rauu21NEors">**Tourists vs Explorers**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/UoR73bKjt4F">**Why Outsider Mavericks Matter in Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/hCWxYGv6KBU">**Why Critique Science**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/ZNuUvggTdrf">**The 5 Stages of the Mind**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Qd6aZV2ASvR">**The Lesson of the Cracking of Enigma**</a>

<a href="https://plus.google.com/+ChrisReeveOnlineScientificDiscourseIsBroken/posts/Cp7MKcMN3dr">**The Generalist**</a>

## The Future of Scientific Controversy

From these experiences of pitching alternative worldviews online through technical arguments, I came to realize that the web is not fundamentally structured to accommodate or facilitate the "clash of worldviews". And some of these problems occur at the level of communication infrastructure. Just to give some examples ...

**(1) Text is a major problem for conveying new ideas.** Challenges to textbook theory do not fit into a tweet; yet, people just don't want to invest the time required to learn about controversies through the necessary reading unless they have a pre-existing sense that the idea is correct. Controversies are caught in the middle of this tension between the need to be terse, in order to accommodate busy people, and the need to adequately explain the complexity of a technical debate.

What I am proposing is that we can address this problem by making controversies more interactive.  The public has a role to play in the future of scientific discovery.

I'm also suggesting that the approach we've seen with _Cosmos_ and a host of other similar science entertainment is not the only way to make science entertaining; we can also build information systems which simultaneously empower the participant and visually delight them.  **We can transform scientific controversies into a new form of entertainment.**

(2) Comments are traditionally placed at the bottom of an article online, and in a linear fashion. To get to a comment about something in particular, you typically have to digest the feed. On some sites, the feed becomes uselessly long after just an hour. I don't know about you, but when I look at the comments on Huffington Post, and I see that there are 5,000 posts, there is a sense that my contribution means nothing at all. I can't be the only one who feels like that

I feel strongly that the box of comments at **the bottom of the article is built to fail. You cannot scale that box for innovative ideas; what it is good for is conveying consensus -- not controversy.**

Probably nobody ever said: *"A comment beneath an article convinced me of a new paradigm in science."*

(3) **I've been strongly impacted by what I've learned about annotations, but very cautious about the existing approaches. I feel that the history of annotations suggests that they are more important than we today recognize.** But, I also see that annotations seem to necessarily look different for each niche ... I wonder if there can actually be a general-purpose solution for annotations? (perhaps even contrary to what Hypothes.is envisions, despite my deep respect for their intentions and work).

My reaction to these and other realizations -- born of a decade of running and pitching claims online -- is to try to reconstruct the communication infrastructure ... to question everything about how it is currently done, and experiment with solutions that are a reaction to the problems I ran into trying to pitch new ideas to a skeptical public.

**What we have yet to build is an Internet communication platform which is fundamentally designed to convince somebody of something which they've never before believed.**

This is what I am building towards.