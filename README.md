# Streamfinder
[![CircleCI](https://circleci.com/gh/BOC-CornflowerBlue/Streamfinder/tree/main.svg?style=svg)](https://circleci.com/gh/BOC-CornflowerBlue/Streamfinder/tree/main) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder) <!-- Coverage: [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=coverage)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder) -->
## This Ain't No Fishing App
Watch your favorite movies and T.V. shows cheaply, easily, and on demand. No fishing around to catch that perfect show. Once you use our app, you'll be hooked!

## Team Members
- Chris Monteilh
- Jaimie Diemer - [Engineering Journal](https://gist.github.com/PBandJaimie/e722b5382f8ad89001c2546d41b50b6a)
- [Mark Thomas](https://github.com/MarkPThomas) - [Engineering Journal](https://gist.github.com/MarkPThomas/11067bca74b4361ebe8f4c0129fbfa0e)
- [Robert Lawrence](https://github.com/rlawrence9) - [Engineering Journal](https://docs.google.com/document/d/160HoQLM2U_NombzwS5TFBo6Lx2uWAFDPhy6L-QYQGuU/edit?usp=sharing)
- [Steven Harder](https://github.com/stevenharderjr) - [Engineering Journal](https://gist.github.com/stevenharderjr/f99e9c7c05ac97e7f5d20e8212320884)
- [Taniel Pogharian](https://github.com/Taniel-P)

## Introduction
Streamfinder is a full stack app that our team of 6 developers made over a 4 week long project at Hack Reactor for Kage Enterprises, LLC, a theoretical client. The app serves to aggregate media data and subscription service data to help users select shows to watch and save money based on subscription usage, show availability, and social input from app users in the form of ratings, reviews, and likes.

## What This App Does
This app shows users a list of movies and T.V. shows to select from for watching based on the following criteria:
* Trending (based on community popularity)
* Recommended (based on user history)
* History (what the user has watched)

There is also a search feature where a user can look up movies.

The features listed are derived from various streaming services, emphasizing services that the user has subscriptions to. The app also tracks the user's engagement with various subscription services to help them see when they are underutilizing a given subscription.

The app was built in order to streamline and consolidate the user's media streaming experience and help them save money by seeing what services they actually use.

In addition to usage history providing a basis for feedback to the user, the community aspect of the app means that users can consume and contribute helpful information about shows in the form of ratings, reviews, and liking reviews.

## See It Live!
The app is currently being hosted live as we push updates on Amazon Web Services, [here](http://34.198.201.182:3000/).

You can also see our interactive wireframe concept [here](https://balsamiq.cloud/s4fh9u8/p6ql8za/r2278?f=N4IgUiBcAMA0IDkpxAYWfAMhkAhHAsjgFo4DSUA2gLoC%2BQA%3D)

## Tech Stack ( you can include logos)

The app is built using the following tools and tech stack:

* UX
  * [Balsamiq](https://balsamiq.com/wireframes/) (wireframing)
  * [Figma](https://www.figma.com/) (other diagrams)
  * [Adobe Photoshop](https://www.adobe.com/products/photoshop.html) (icons, placeholder images) (pending)
  * [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) (icons, placeholder images) (pending)
* RMERN Stack
  * [Redis](https://redis.io/) (for caching)
  * [Mongo](https://www.mongodb.com/) (database)
  * [Express](https://expressjs.com/) (backend server)
  * [React](https://reactjs.org/) (front end UX)
  * [Node JS](https://nodejs.org/en/) (backend language)
* API
  * [RapidAPI](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) (fetching media data)  
* Continuous Integration
  * [Jest](https://jestjs.io/) (local testing)
  * [Enzyme](https://enzymejs.github.io/enzyme/) (React testing) 
  * [CircleCI](https://circleci.com/) (continuous integration testing)
  * [Sonar Cloud](https://sonarcloud.io/) (app quality assessments as part of CI, code coverate)
* Hosting
  * [Amazon Web Services](https://aws.amazon.com/) (AWS) EC2 Instance  

## Anticipated Technical Challenges and Research
* Gathering the data. We aren't sure whether or not we can find an appropriate API to use out of the box, or if we need to develop a web scraper in order to gather the data. 
> * What did you learn?
* Keeping the service lightweight but robust with caching and databases.
> * What did you learn?
* Structuring the app so as to minimize redundant coding and testing, and maximize development flexibility and extension.
> * What did you learn?
* Making this a progressive web app (PWA) in order to allow it to work well on mobile devices.
> * What did you learn?

## Unexpected Challenges
> * Why was it a challenge
> * What did you learn?

## App Video Demo / Screen Shot Walkthrough
> * What were the user stories /  what was MVP (mention Minimal Viable Product)

## How Does the App Work?
> * What happens behind the scenes when the user interacts with it?
> * OR What are all the places the data travels?  What happens to that data?
> * Optionally include a diagram
> * How does the tech stack come together?

## Roles
In the beginning of the project as a team we elected 3 developers to managerial roles to help oversee and coordinate specific parts of the product development:
* Product Manager - [Mark Thomas](https://github.com/MarkPThomas)
* Architecture Owner - [Steven Harder](https://github.com/stevenharderjr)
* UI Owner - [Taniel Pogharian](https://github.com/Taniel-P)

In addition to the roles described below, the product manager decided to make these roles more managerial roles, with Architect Owner overseeing back end development, and UI Owner overseeing front end development. This was helpful in delegating and coordinating tasks among 6 people, as well as better strategizing implementation within each realm and the communication between them.

### Product Manager
The product manager helps facilitate work efforts, manages tickets, and tracks progress towards completing all tasks scheduled for the current sprint. More specifically, major responsibilities include:
* Run standups
* Oversee the ticketing system
* Meet with clients
* Guide User Story & Product Acceptance Criteria creation

### Architecture Owner
The architecture owner helps the team agree upon the overall tech stack and makes sure the team is informed of any system changes. They also ensure that team members are consistent with build tools, linters, workflow, and commits.

The architecture owner is responsible for ensuring the project is set up for continuous integration, continuous deploymnet, and ensuring the engineering team meets 60% test coverage.

### UI
The UI owner is responsible for the deliverable of the initial wireframes that will help generate and ultimately accompany the user stories. They also facilitate and delegate among team members to have wireframes ready to present during the client proposal meeting.

## Workflow
The following is a brief example of our spec, testing, and coding development process. Mark created this graphic and shared it with the team as a reference to help implement & maintain some of the workflow described below.
<img width="4073" alt="Agile_TDD Workflow_Cropped" src="https://user-images.githubusercontent.com/6684303/138580314-3e2f558e-e19c-45b0-ab2b-b48ec00e8fe8.png">

### External Stakeholders
We had a mock client to roughly guide the process. The project started by having a meeting with the client where they outlined their wants and needs, and we asked additional questions in order to create an initial spec. After working out a wireframe scheme, user stories and feature criteria, a [project proposal](https://docs.google.com/document/d/1bstKWtm06AKcyQmNuf1cBzCsZz_KYJE1L_GLMCli4JI/edit?usp=sharing) was written up and presented to the client to finalize expectations for the app development, deliverables, and deadlines.

One aspect of drawing up the project proposal was in identifying what would suffice for a minimum viable product (MVP) and what development is considered 'reach' development. This allowed us to prioritize developing MVP first, and only then working on features that we deemed 'reach' development.

### Agile
For managing the development of the app, we chose to utilize the [Agile](https://www.atlassian.com/agile) method of development. This was comprised of team standup meetings 3 times a week in order to quickly identify choke points, blockers, off track development, etc. as well as keeping everyone up to date with what the team as a whole is doing and what upcoming needs will be. 

Additionally, the development cycles for the spec and code base were comprise of the following iterative steps/components:

----
#### User Stories
For each feature to be developed, at least one user story must be written that closely describes the simple flow of the user from their need to achieving some result with the program. This is ultimately used for groups of tests.

----
#### Acceptance Criteria
For each user story (or set of stories), more concise lists of acceptance criteria are written out. These are simple criteria that determine whether a given test result is considered to pass, based on the goals/requirements of the product. These criteria ultimately comprise the specific test assertions that check if a set of actions achieve the desired state/result in the app.

Once `user stories` and `acceptance criteria` are defined (or selected for features partially complete), unit or integration tests are written. These also serve as the basis for defining specific tickets for development.

----
#### Ticketing
A ticketing process was used in order to define work chunks in advance, set due dates, and track progress. They also served as a convenient way to compile notes related to development, bug reports, and bug fixes.

For ticketing we used [Trello](https://trello.com/) for both the initial app R&D and design phase, as well as feature/component development and bug fixes.
<img width="1432" alt="Screen Shot 2021-10-23 at 10 37 41 PM" src="https://user-images.githubusercontent.com/6684303/138581049-12da84a3-d463-4295-8648-74f0cb4607e8.png">

**[Project Board](https://trello.com/rpp29boccornflowerblue)**

For each stage of deliverables for the project, we made a separate board for tracking tickets. Each developer then made a personal board where the appropriate ticket could then be copied down. Smaller tickets that developers generated for their own private R&D and testing would be generated and kept on their personal boards. All tickets could have due dates assigned, and multiple people assigned to them. In this way, it was easier to see what each state of development entailed, everyone was kept on the same page with overall development flow, but we weren't overwhelmed with the noise of so many tickets.

Developers could then make custom filters to easily see all open tickets relevant to them, sorted by labels and due dates.

Trello is really pretty small for development like this. Honestly, [JIRA](https://www.atlassian.com/software/jira) paired with [Confluence](https://www.atlassian.com/software/confluence) would have been better for a team and project of this size.

----
#### Paired Programming
Where helpful, team members pair programmed together.

----
#### Testing
We strived to maintain at least 60% line coverage for testing of our app throughout the development process. Developers strive to write tests first, and use the tests as a guide in developing app features. Utilizing this test-driven development (TDD), not only is good code coverage maintained, but more thought is given to the needs and structure of the code, and programming is kept more confined to the immediate needs of development. Risk of feature creep and going down rabbit holes is reduced.

----
#### Code Review
All pull requests require a peer review from another team member before the code is merged to the main code base.

----
#### Continuous Integration (CI)
All commits to a branch in the code repository is automatically checked by several testing and code auditing services. These automatically run associated tests and 'sniff' the code and return reports as to whether any tests are failing, how many lines of code are covered by tests, and a variety of other metrics. These all factor into consideration of the quality of the code being committed, with the tests themselves being strict gatekeepers for only merging code to the code base that is working and compatible with the existing app.

----
#### Continuous Deployment (CD)
Once code is merged to the `main` branch, we have a system set up that automatically pushes updates to our deployed app online with the code changes. In this way, the production app automatically updates itself as we make small iterative developments to the app.


### Feature Freeze
One week before release, we enacted a 'feature freeze', whereby no development could begin on new features. Some features are audited and might even be dropped if there are too many bugs that cannot be resolved before release. Freezing development in this way allows the team time to fix all outstanding bugs, find more bugs through expanded tests, refactor code to reduce technical debt, and finalize superficial aspects of the program, such as fine tuning CSS. This self-control is important in making sure the product that is release is itself complete and reliable, even if not everything on the wish-list as been included.


## Git Workflow
### Style Guides
To maintain uniformity of code and coordination of files and directory structures, we have a [team style guide](https://github.com/BOC-CornflowerBlue/Streamfinder/blob/main/docs/web-style-guide.md) that lays out the expections and standards for both. This covers HTML CSS, JavaScript, and React, from spelling cases to spaces. It isn't strictly enforced, but everyone can refer to it for guidance and checking code.

We installed [Pomander](https://medium.com/@paulmarinaro/pomander-the-eslinter-ed6132e0dce7) and [ESLint](https://eslint.org/) in order to maintain some strict enforcement of coding standards updon checking in to git. The configuration of these frameworks is in alignment with the style guide. 

Each developer cuts a separate branch from `main` for their work, which they ultimately merge with main. 

### Commit Guides
We have a standardized process and criteria for merging code branches with the `main` branch:

1. A pull request (PR) is submitted
 - This is followed up by notifying the team on Slack (since GitHub email notifications are too numerous & quiet)
 - Someone else volunteers to review the PR and anounces this on Slack so that the team is aware that the PR is being attended to.
2. PR is reviewed
 - Code is commented as is appropriate and helpful
 - All file changes are reviewed
 - If everything is at least functionally OK, PR is approved & code is merged to `main`, possiby with some requested changes for the developer to attend to, but which are not serious enough to deny a merge.
3. If PRs contain files covered by tests, all tests MUST pass before merge. The CI testing service will have run automatically and indicated this to the reviewer. Even if the reviewer is satisfied with their code review, **NO** PR is to be merged to `main` until all tests are passing. Even if the tests are bad/incomplete. In this case, at the very least the developer needs to turn off or not check in these tests in order to maintain a testing suite that only contains passing tests on `main`.
4. If the reviewer approves the PR, it is the reviewer's responsibility to immediately merge the PR. 

> * What did you learn from the process
> * What were key takeaways from stand ups, code reviews, etc

## Any non-MVP tickets (optional)
> * Code refactorings
> * Performance Optimizations
> * Additional features - Progressive Web App?
> * etc

## Notes From Sprint Retro
> * What additional features do you plan to add, how do you plan to implement those features?
> * Future refactoring?
> * Additional dev ops considerations?
> * UI/UX additions?

## Setup
- **Clone/pull repo**
- `npm install`
- `npm run dev` to build and run server and client side app (in development, bundles will be compiled and served by webpack in-memory)
- Navigate to `http://localhost:3000` in browser

## Contributing
- Install Pomander before attempting to push commits:
- `curl -s https://raw.githubusercontent.com/reactorcore/pomander/master/bin/install | bash`

## Documentation
- Documentation such as diagrams for the app and UX styling guidelines are stored in the **`./docs`** directory.
- See the [web style guide](./docs/web-style-guide.md) for the standards we are following for coding and project organization.

### Front End Diagrams
The following diagram shows the general arrangement of React app components with the page flow (blue arrows), state, props, and sub-component derivations (red arrows).

[Client Diagram](https://www.figma.com/file/ZLu2MtqT5Cd7Cew9ykgoRI/Front-End?node-id=0%3A1)
<img width="7344" alt="Diagram_Client" src="https://user-images.githubusercontent.com/6684303/139557558-0efa64c2-29b4-4db7-9344-a639c2a2dac5.png">

### Back End Diagrams
The back end skeleton was carefully created to simplify workflow, maintain SRP & DRY principles in the overall system, and abstract implementations well enough to make it easy to add/remove/change parts of the system, such as the caching and data stores. The downside to this refined development was that it made the system rather complex, but it is easy enough to understand with a diagram.

[Server Diagram](https://www.figma.com/file/x5VLB1r0nFazNrZKATSKE6/Server?node-id=0%3A1)
<img width="4165" alt="Diagram_Server" src="https://user-images.githubusercontent.com/6684303/139557016-c590e654-ebe3-4254-8b17-9d01c35b1cd4.png">

### Web Sequence Diagrams
The following diagram shows the methodology of how user interactions are handled for different scenarios within our overall app.
[Web Sequence Diagram]()
> TBA

## Testing
- [Jest](https://jestjs.io/) is the framework chosen to test React and probably all JavaScript code in the app.
- Tests are located in the **`./tests`** directory of the app for integration tests and global files, and are stored with the associated component or * .js file.
- Naming convention of unit test files: ```{filename}.test.js``` for every ```{filename}.js``` file, or ```index.test.js``` for a testing file for an entire component.
- ```npm test``` to run the tests

# Continuous Integration
Basic test of JavaScript continuous integration uses [CircleCI](https://circleci.com/) to run the tests, and [Coveralls](https://coveralls.io/) for reporting test coverage.

Circle CI: [![CircleCI](https://circleci.com/gh/BOC-CornflowerBlue/Streamfinder/tree/main.svg?style=svg)](https://circleci.com/gh/BOC-CornflowerBlue/Streamfinder/tree/main)
<!--
Coveralls: [![Coverage Status](https://coveralls.io/repos/github/rpp29-fec-gouda/atelier/badge.svg)](https://coveralls.io/github/rpp29-fec-gouda/atelier) -->

# SonarCloud 
Additionally, [SonarCloud](https://sonarcloud.io/projects) is used for an overall check of code quality.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

<!-- Quality: [![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=SDC-RPP29-sequoia_atelier-ratings-reviews&metric=alert_status)](https://sonarcloud.io/dashboard?id=SDC-RPP29-sequoia_atelier-ratings-reviews) -->

Maintainability: [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

Reliability: [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

Security: [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

Lines of Code: [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)
<!-- commented out coverage till it can be fixed -->
<!-- Coverage: [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=coverage)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder) -->

Bugs: [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=bugs)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

Code Smells: [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)

Technical Debt: [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=BOC-CornflowerBlue_Streamfinder&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=BOC-CornflowerBlue_Streamfinder)
