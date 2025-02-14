# Multi-User Quiz App: Overview & Design Principles

## Overview
This multi-user quiz app is designed for conference attendees, including educators, developers, and researchers focused on data science education. It fosters engagement and knowledge-sharing through interactive quizzes, head-to-head competitions, and community-driven question responses. The app supports real-time interactions, user-generated responses, and dynamic leaderboards, making it ideal for professional and social environments.

## Notes on User Journey
This is a social connections app for people interested in data science education. It has three core goals: 1. First and foremost, build social glue by bringing people at a conference  together in a fun way and providing them opportunities to learn more about each other. 2.Build up an interesting dataset of information about attendees of a conference and make it available for the attendees to explore in a fun and anonymized fashion. 3. Identify the  strong and weak ties among members of a conference attendee community and track their development over time.

The social matching aspects of the app take on two layers, a private and a shared layer. The private layer is a personal discovery layer, in which the app user themself explores their knowledge about others in the attendee community and explores data about the community overall. The shared layer is one in which users interact with each other to have fun comparing their knowledge about each other; this layer serves the purpose of "breaking the ice" between people just meeting or getting to know each other better, or helps solidify and strengthen ties between people who already know each other by giving them a chance to both show their knowledge of existing friends' lives and preferences and learn more about already known friends. There is also a bridging aspect not yet built into the current app. This bridging aspect uses comaparisons of information about various attendees to suggest others in attendance who might be "good matches" or "intereseting opposites." In that way, the app serves as a type of matchmaker, bridging the gap between its private and public layers.

The primary user journey we want to optimize for has three phases. 

First, we want to bring the user on board in a fun and engaging manner while simultaneously gathering data about them and introducing them subtly to what the app has to offer. This phase focuses on ensuring that the app gathers sufficient data about the user that it can provide a valuable connecting experience while taking care not to frustrate or bore the user in the process. 

Second, we want to connect the user with others, and invite them to consider and explore their connections to others. In the private layer, this phase invites the user to explore their relationships to and knowledge about others in the group in a personal and private manner, through taking quizzes about other attendees and through identifying their connections to other attendees. In the shared layer, this phase invites users to connect with each other through fun head-to-head matches (or other still-unbuilt features). While this phase is focused at least in part on gathering information about strong and weak ties among attendees, it needs to do so in a manner that is fun and engaging, pulls the user in, and gives them reason to continue to engage with the app in the future.

Third, we want to provide the user with the opportunity to have fun exploring data overall. This phase aims to do that by making anonymized, interactive displays of user data available in open-ended interfaces that allow for the creation of a variety of different types of visualizations. Such visualizations might allow the user to explore data about attendees interests (e.g., How many of us are dog people vs. cat people?), connections (e.g., How many others do attendees know well on average? Has that changed across the course of the conference?), or correlations (e.g., Do researchers tend to live in cities more than teachers do?). This aspect of the app should invite playful engagement with data as well as the ability to share interesting discoveries with others in the form of user-generated visualizations.

In considering the user journey, it is essential to also consider the conditions of the app's use. The app is intended for use in a conference setting. That means that people will only have a short period of time to gain familiarity with the app, find value in its use, and build habits for using it as part of social interaction. This means that overall user experience must be optimized for maximum clarity and usability, and that the value and intriguing opportunity the app offers for exploration and connection must be immediately apparent and persist across the overall use of the app.

The app experience should be professional overall, since academic users will be the core of the audience and the app cannot risk turning them off by seeming surficial or like too much of a novelty, but at the same time it must optimize heavily for user delight — every click must be easy and in some way fun or intriguing, and the experience with the app, especially in the first phases, must pull the user forward at every turn. This may be accomplished by the use of color, animation, or the strategic use of messages with information or encouragement, among other things. For example while the user is answering onboarding questions, the app might provide peeks into later phases by offering live comparisons or data-related tidbits in a fun voice and tone (e.g., "Nice! You're in great company. 68% of attendees answering so far are cat people too!") or as soon as the user is finished with onboarding questions, the app might hint that there are connections out there to be had ("Thanks for giving me some info about you! I can already see that there are a lot of people here who share things in common with you. For example, at least 6 other people here are city dwellers who like Star Wars. Think you could name any? Let's check out whom you already know well and maybe we can find out…)

Specifics:

# The onboarding and quiz content draw from the same question pool overall, though it may be important to tag some onboarding questions as asked of every user on initial load to enable early comparison and because it may be the only opportunity to gather data from some users. The question posing and answwering technology are the same system whether the user is answering questions about themselves or about others.

# Head to head mode is a separate feature, in that it's a separate experience entirely as far as the user is concerned. The underlying mechanism and technology are identical to quiz mode, so it can use the same underpinnings for supporting the majority of the experience. However, the UX should be one of more connection and slight intrigue, and the logging and data capture should differentiate quizzes from head-to-head matches, since the latter represent moments of explicit connection among attendees. (Also, in the desired later stages of implementation, there is an aspiration to develop native-app features for launching head-to-head matches via a device proximity feature. This would add an inherent novelty and "fun factor" to the head-to-head matches and add significantly to the app's appeal, but only if it functioned seamlessy.)

# Question and answer data all flows from one common database of user responses, a database which is contunually growing over time. (This fact, by the way, can also be leveraged for community incentive — on the individual user level, the app will provide a community stats and leaderboard that serves as incentive to users to engage with the app itself — stats such as Total questions answered, Number of match connections made, or Number of charts shared can serve both to advertise and invite discovery and as positive social pressure to engage with the app repeatedly.)

# A user's answers provide data about their profile — the more data we have about the user, the more value the overall database can pro0vide for all, and the better value the app can provide the individual user. This points to a potential key mechanic the app might leverage — gamifying aspects of the app via an achievement framework could serve as a powerful incentive for the user to provide more data about themselves, and thus ensure the growth of thedatabase in a way that builds the value of the app accordingly. For example the user might unlock the ability to view basic community stats by answering the initial seven onboarding questions but be incentivized to answer seven more in order to unlock the Other People Like Me feature. The user might be incentivized to answer questions about whom they know in order to gain access to the Connections section of the app. And the user might be incentivized to hold their first head-to-head match by seeing a grayed out badge they can earn. The later phases might be easily unlocked by some,and then discovered by others so as to leverage social pressure to provide more data. For example, the user might be required to respond to all of the core questions available, perhaps 35 in total, to gain access to the app's visualization and chart-making features. A small subset of attendees will be completists and answer all the questions on first discovery of the app, gaining access ealy on to this visualization feature. Since that feature will be inherently appealing to all the "data geek" attendees, there will be significant FOMO-related pressure to complete all the available questions, thus providing more data for the app experience to leverage in powerful ways.

## High-Level Goals

1. **Facilitate Engaging Social Quizzes**
   - Enable users to answer onboarding questions that generate personalized quiz content.
   - Support head-to-head matchups where users compete in real-time quizzes.

2. **Enhance User Interaction Through Novel Input Methods**
   - Implement coordinate-based responses (e.g., placing answers on a map or graph).
   - Provide continuum-based sliders for confidence levels and estimations.

3. **Support Multi-User and Community-Based Learning**
   - Enable users to take quizzes about other participants based on profile answers.
   - Develop a "Community Explorer" where users can compare responses and discover patterns.

4. **Real-Time & Persistent Data Management**
   - Implement authentication with user profiles.
   - Store and retrieve quiz data via a backend API.
   - Maintain leaderboards and scoring based on user engagement.

5. **Ensure an Intuitive and Accessible Experience**
   - Provide a clean, mobile-friendly UI with smooth navigation.
   - Support adaptive question selection and progress tracking.
   - Integrate real-time updates for active quizzes and community interactions.

## Core Design Principles

### 1. **User-Centric Experience**
- Design should be intuitive, ensuring a seamless onboarding process.
- Provide bite-sized, engaging interactions to fit into the fast-paced conference environment.
- Ensure accessibility, with clear navigation and touch-friendly interactions.

### 2. **Social Engagement & Community Building**
- Use social features like quizzes about other attendees, "Community Ties" mapping, and shared data visualizations.
- Allow users to see responses from peers to foster engagement and discussion.
- Implement matchmaking mechanics (e.g., QR code-based pairings, suggested connections).

### 3. **Gamification & Stickiness**
- Utilize progression mechanics such as leveling up, unlocking new features, and earning badges.
- Encourage replayability with varied question sets and competitive head-to-head play.
- Reduce question repetition based on correct answers to reinforce learning and novelty.

### 4. **Delight & Unexpected Joy**
- Integrate short, low-fi animations to make interactions playful and engaging.
- Surface unexpected community insights (e.g., fun facts about the group).
- Implement Easter eggs or hidden interactions for moments of surprise.

### 5. **Real-Time & Interactive Data Exploration**
- Allow users to visualize data dynamically with a flexible, intuitive interface.
- Provide a "Find New Connections" feature that suggests similar or different users based on shared attributes.
- Enable users to create and share interactive data visualizations with the community.

### 6. **Effortless Interaction & Minimal Friction**
- Use QR codes or shared codes for fast, seamless connections.
- Allow quick re-matches in head-to-head quizzes with one-tap confirmations.
- Implement smart nudges to encourage continued participation without overwhelming users.

## Technical Considerations

- **Frontend:** Built using React/React Native for a fast, responsive UI.
- **Backend:** Real-time API for storing and retrieving quiz responses, user data, and leaderboards.
- **Database:** A scalable structure for handling user profiles, quiz data, and community ties.
- **Authentication:** OAuth or conference-specific authentication for secure access.
- **Data Visualization:** Interactive graphing capabilities to allow users to explore and share insights.

##Core Feature Draft Outline

- Know tab:
	- Upon opening the Know tab, the user is presented with a view of all existing users' avatars
	- A dynamic-fill search box allows for easy searching for a given user by name; as the user types into the search box, the remaining possibilities are dynamically displayed as selectable options below the search bar.
	- During completion of a dynamic search, only user avatars corresponding to the remaining possible search options are visible; as the possible results change, avatars smoothly fade out of or into view.
	- A Quiz Me button is displayed at the bottom of the screen
		- Pressing the Quiz Me button changes to a page with three options: Answer More Questions and See Who I Know
		- Answer More Questions triggers existing functionality
	- See Who I Know shows a page with three buttons, Pictures, Names, and Matching Quiz
		- Both trigger a progressive series of user selection functionality, in which the user can generate narrowing views through selection.
		- In the Picture view, the user is presented with all existing avatars that have selfies
			- The user can select all avatars corresponding to people whose picture they recognize, then submit to narrow the view to those, then of those
				- Select those whose names they know and submit, then of those
				- Select those they've talked to and submit, then of those
				- Select those they know well and submit
		- In the Names view, the user is presented with all existing user names.
			- The user can select the names they recognize, then submit, then of those
				- Select the names whose faces they could pick out of a crowd
		- The Matching Quiz view is available when the user has already completed an initial selection of both names and pictures. This view presents a series of multiple choice quizzes:
			- For pictures the user knows whose names they don't know, they are presented with the selfie picture and a three-option multiple-choice question of names
			- For names the user knows but couldn't pick out of a crowd, they are presented with the name and a three-option multiple-choice selection of user avatars
- Visualization tab:
	- Upon opening the visualization tab, the user is presented with two axes and a random dot scatter view showing one dot for every person in the database
	- The view contains three pulldown menus at bottom, one each for the vertical axis, horizontal axis, and legend
	- Changing the pulldown menus triggers dynamic shifts between various graph views
	- All shifts between graph views are animated. Dots on the screen move smoothly from one configuration to another, fade in or out of existence, and gain or lose color via smooth tweening and gentle easing
	- When a graph is created for a variable for which some people have not answered, only the answered people's representative dots remain on the graph. Existing non-representative dots with no values for the variable fade from view. Accordingly, any previously non-visible dots on a given graph that in turn possess values for a newly designated graph fade smoothly into view in their appropriate locations.
	- When graphs transition between dot plots and histograms, the dots move to a stacked-dot configuration, assuming locations in such a manner that they form a group of dots contiguously stacked inside the corresponding histogram bar locations as if the bars were containers, then fade out smoothly as histogram bars appear in their place.
	- When graphs transition between histograms and dot plots, the histogram bars morph into a corresponding stacked-dot configuration before the dots smoothly animate to their new positions.
	- Graph axes are labeled with the variables selected at any given time, and axes of numerical graphs are autoscaled to the range of the data being represented. Histogram axes are labeled beneath or beside the histogram bars. Legend colors are shown beneath the graph as labeled colored squares.
	- By choosing the various pulldown menus, the user can
		- Create a univariate dot plot graph of any numerical variable on either axis
		- Create a bivariate scatterplot by adding a second numerical variable to the unoccupied axis of an existing univariate plot
		- Remove a variable from either axis of a bivariate scatterplot to create a univariate scatterplot
		- Remove a variable from the axis of a univariate dot plot to create a random dot scatter
		- Create a histogram of any categorical variable
		- Add a categorical variable as a multicolor legend to any univariate dot plot or bivariate scatterplot
		- Add a numerical variable as a color gradient legend to any univariate dot plot or bivariate scatterplot
		- Create a multi-color stacked bar chart by adding a categorical variable to any histogram
