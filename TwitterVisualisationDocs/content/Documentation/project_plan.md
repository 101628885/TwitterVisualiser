---
title: Project Plan Document
---

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
    - [Purpose of Document](#purpose-of-document)
    - [Background](#background)
    - [Key Project Personnel](#key-project-personnel)
        - [Client](#client)
        - [Stakeholders](#stakeholders)
        - [Project Manager and Key Project Members](#project-manager-and-key-project-members)
- [Terms of Reference](#terms-of-reference)
    - [Goals](#goals)
    - [Objectives](#objectives)
    - [1.  Scope](#1-scope)
    - [Critical Success Factors](#critical-success-factors)
        - [Success criteria:](#success-criteria)
        - [Usability Requirements:](#usability-requirements)
        - [Factors which will cause failure:](#factors-which-will-cause-failure)
    - [Acceptance Criteria](#acceptance-criteria)
- [Establishment](#establishment)
    - [Project Environment](#project-environment)
    - [Project team training requirements](#project-team-training-requirements)
- [Activities, Deliverables and Capital Resources](#activities--deliverables-and-capital-resources)
    - [Deliverables](#deliverables)
    - [Activities and Tasks](#activities-and-tasks)
- [Resources](#resources)
    - [Organisation and Structure](#organisation-and-structure)
- [Risks](#risks)
- [Schedule](#schedule)
    - [Delivery Phases](#delivery-phases)
        - [Overview](#overview)
        - [Sprint 1](#sprint-1)
        - [Sprint 2](#sprint-2)
        - [Sprint 3 Onwards](#sprint-3-onwards)
    - [External Dependencies](#external-dependencies)
    - [Assumptions](#assumptions)
    - [Project Timeline](#project-timeline)

Introduction
============

Purpose of Document
-------------------

This document outlines the planning work necessary to conduct, track and report on the progress of the project. This document describes the project deliverables, estimates, requirements and tasks; and is aimed towards the client and stakeholders of the project.

Background
----------

This project was initially started in the second semester of 2017 by a team of post graduate students at Swinburne University. Our team was tasked with continuing the project by adding support for natural language processing techniques for the purpose of understanding the context of social media posts, and trajectory mapping to track the movement of crime.

Key Project Personnel
---------------------

### Client

Dr. Ahsan Morshed

Dr. Prem Prakash Jayaram

### Stakeholders

Dr. Tony Huang (Senior Lecturer at Swinburne University)

Mohan Baruwal Chhetri (Project supervisor)

### Project Manager and Key Project Members

Sam Burke - Team Leader

Stefan Tsvetkov - Client Liaison

Ming Sheng Quah - Project Quality Manager

Corey Jenkins - Planning Manager

Jason Liew - Support Manager

Shane Joachim - Development Manager

Terms of Reference
==================

Goals
-----

The project is to design a web/mobile application that will automatically collect data from social media sites such as Twitter.

The system will store those tweets on a NoSQL database (MongoDB) and use natural language processing techniques (NLP) to identify posts that contain information about the location/nature of a crime taking place.

Trajectory mapping will then be used to predict the direction and locations in which crime is most likely to occur, based on previously committed and related crimes.

This information will be queried and displayed in a cross platform mobile application. The user group are the clients themselves that will use the application for research purposes.

Objectives
----------

List of objects in order of importance:

1.  Harvest tweets from Twitter streams to store in a database

2.  Determine validity of tweets with respect to relevance to crime activity

3.  Develop a crime trajectory model based on tweet data

4.  Visualise crime statistics from the database via a mobile application

1.  Scope
    -----

-   Deliver a web/mobile app that can access the processing backend.

-   The backend will harvest social media information on a 24/7 basis based on selected keywords.

-   The backend will use natural language processing to understand the context of the tweets, check if they are relevant, and pick out key pieces of information to identify the nature and location of a crime.

-   The backend feeds this information into a trajectory model which will predict the direction a criminal is moving in based on the crimes committed.

Critical Success Factors
------------------------

### Success criteria:

-   The web/mobile apps will be able to reliably interface with the backend, even under varying degrees of system load.

-   The backend's NLP algorithm will be able to accurately identify tweets that have to do with a crime, and extract relevant data from said tweets.

-   The backend's trajectory modelling will be able to accurately track the movements of a criminal based on the tweets of witnesses.

-   The backend should be able to provide an accurate graphical rendering of collected crime statistics through the mobile app.

### Usability Requirements:

-   This system's audience limited to university research staff.

-   Advanced features/menus will not be hidden or obscured.

-   Limited usability testing will be conducted to make sure the app is accessible for staff.

### Factors which will cause failure:

-   Backend unable to differentiate between relevant and irrelevant tweets.

-   Backend NLP is unable to extract context data from tweet.

-   Backend trajectory model unable to accurately track movement of a criminal, even with available tweet data.

-   Frontend application is slow and poorly setup.

-   If the final solution is not a cross platform mobile application.

-   Complex usability.

-   Lack of meaningful visualisation based of stats.

-   Unable to link frontend and backend together.

Acceptance Criteria
-------------------

-   The backend has to successfully be able to determine which tweets are relevant.

-   The system will be able to create a relevant trajectory model based of data gathered by the system.

-   The NLP system  should be accurate at least 90% of the time.

-   10% margin of error.

-   Clean and easy to use user interface.

-   Cross platform mobile application.

-   Real time application.

Establishment
=============

Project Environment
-------------------

-   Room for weekly meeting, with enough seating for six team members and up to three clients.

-   Access to a cloud instance with MongoDB as the DBMS and NodeJS backend.

-   User account for said instance.

-   Development machines running OSX and Windows.

-   Mobile devices running iOS and Android.

Project team training requirements
----------------------------------

Basic tutorials and reading on:

1.  NodeJS

1.  NPM, Yarn etc.

2.  React and React Native

3.  NLP

1.  SpaCy.

2.  NLTK.

1.  Related frameworks too.

5.  Using Emulators

1.  Mac OS

1.  Xcode

2.  Android Studio

1.  AVD

3.  Nectar Instance

1.  Ubuntu 17.10

1.  Expo

1.  Cross platform emulator alternative


Activities, Deliverables and Capital Resources
==============================================
Deliverables
------------

**Server**

-   Access to the servers used to host the application as well as the database needs to be given to clients so that can can have full access.

-   Hosting information.

-   SSH keys.

-   Passwords.

-   The server is a Nectar instance set up by the client, without an expiry date

**Application**

-   APK and IPA application files

-   Source code related to:

-   Cross platform React Native application.

-   NodeJS backend.

-   PugJS.

-   MB Documentation site, which is a central repository for:

-   User guides

-   Design Documentation

-   Project Plan

-   SQAP

-   Etc...

**GIT Repository**
-   Full access rights to the repository need to be given to the client and team supervisor.

-   Give Client admin access.

-   Give Team Supervisor admin access.

**Project Plan**

-   The final project plan needs to be given to the client and team supervisor.

-   PDF file of project plan emailed to client.

-   PDF file of project plan emailed to team supervisor.

-   A Website with all relevant documentation and information.

**Software Quality Assurance Plan**

-   The final project plan needs to be given to the client and team supervisor.

-   Contains more details on standards and practices, documentation, usage and more!

**Deliverables Overview**

Access to the Nectar server instance will be given to the client as well as all the relevant keys, certs and passwords. The source code to application will be available on the teams repository that the clients will have full access rights to. The repository will contain all the code to build the react-native project. The repository will also contain instructions on how to setup the environments in order to run them locally.

A copy of the project plan and other documentation will be given to the client for them to review and sign off.

Activities and Tasks
--------------------

The team will be making use of the Scrum Agile development methodology during the project. Deliverables for the project will be developed over the course of multiple sprints lasting around 2 to 4 weeks each.

At the beginning of each sprint the team will conduct a sprint planning meeting to decide of tasks to complete for the current sprint and allocate team members to the various tasks. Tasks will be given estimates as to how much time (hours) they are most likely to consume. Actual time spent working on these tasks will be recorded, and metrics will be summarised at the end of the sprint to generate burndown charts and calculate the team velocity.

![Sample burndown chart for an individual sprint](https://lh6.googleusercontent.com/JtDjWbKjp-HkcBFrVUOamF0lvLCNglFRPSxw-6QCjS1wmha4bQdvGJYhUFpzZ0YlmCTAk72Qg-BPtFSi833m2jK3eBTrjr2qUvBbSXUwhXs7vQiCo4KoRGR4Pr5dbEFly--e2WbT)
*Sample burndown chart for an individual sprint*

Team members work on the project on their own local machines and make commits to the remote project repository on GitHub. The team will follow the Gitflow workflow convention ([as specified here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)) using the Git version control system. In summary, team members develop individual project features in separate appropriately-named feature branches and merge to a primary dev branch which serves as an integration branch for features. The master branch is reserved only for official project releases.

Each sprint will conclude with a sprint review meeting in which the team finalises the deliverables and showcases them to the client. A sprint retrospective is then conducted to review the process of the team and propose suggestions for improving the productivity of the subsequent sprints.

Resources
=========
Organisation and Structure
--------------------------

**Team Structure and Responsibilities**

- Team Clients - Dr. Ahsan Morshed & Dr. Prem Prakash Jayaram

- Team Supervisor - Mohan Baruwal Chhetri

- Team Leader - Sam Burke

    -   Delegating tasks to team members

    -   Making sure deliverables will be met

    -   Organising meetings

- Client Liaison - Stefan Tsvetkov

    -   Drafting official emails that will be sent to client by Team Leader

    -   Assisting in organisation of meetings

    -   Assisting others in their roles as this role is quite simple

- Project Quality Manager - Ming Sheng Quah

    -   Check and correct bugs in code

    -   Ensure that produced software meets set quality standards

- Planning Manager - Corey Jenkins

    -   Planning Sprints

    -   Planning tasks and their estimation of completion

- Support Manager - Jason Liew

    -   Coordinate training and orientation for learning new technologies

    -   Organise support and troubleshooting for equipment and networks

    -   Managing the automated build server and overseeing integration tests

    -   Implement and maintain tools for assisting the team in the development process such as the task board, repository and communication channels

- Development Manager - Shane Joachim

    -   Assessing the development process and efficiency of it.

    -   Developing growth strategies for increased efficiency.

    -   Setting up development standards and procedures.

Risks
=====

**Risks associated with this project.**

| Rank   | Name / Description         | Occurrence Probability(H/M/L)   | Severity(H/M/L)    | Mitigation Strategy   | Contingency   |
| ------ | -------------------------- | ------------------------------- | ------------------ | --------------------- | ------------- |
| 1      | Scope Risk                 | M                               | H                  | 7.1.1                 | 7.1.2         |
| 2      | Communication Risk         | H                               | H                  | 7.2.1                 | 7.2.2         |
| 3      | Schedule Risk              | M                               | M                  | 7.3.1                 | 7.3.2         |
| 4      | Technical Knowledge Risk   | L                               | H                  | 7.4.1                 | 7.4.2         |
| 5      | Personnel Risk             | L                               | M                  | 7.5.1                 | 7.5.2         |
**Scope Risk**

If the scope is not clearly defined there is chance that the outcome of the project may not be what the client wants.

6.1.1 Mitigation

-   Make sure the scope is clearly defined throughout the project by keeping the client involved with weekly meetings

6.1.2 Contingency

-   Discuss with team supervisor options of extending deadlines for specific items

-   Increase team work hours

**Communication Risk**

Poor communication between the team, clients and stakeholders could cause progress to halt and could cause members to work on tasks that have already been completed.

6.2.1 Mitigation

-   Face-to-face meetings on Mondays at university, as well as a group voice chat on the weekends.

-   Daily group text chat to keep members updated on progress and decisions.

-   Fortnightly meetings with the clients on campus.

-   Agenda and minutes posted on Trello for members that were unable to attend meetings.

6.2.2 Contingency

-   Conduct an emergency meeting with team supervisor to discuss the team's communication issues and figure out new strategies to mitigate.

**Schedule Risk**

Failure to adhere to the schedule of the project (e.g. not planning meetings accordingly) may result in lack of direction for the team members, causing the team to have mixed priorities. This may also end up in the team falling short on deadlines.

6.3.1 Mitigation

-   Conduct weekly team and supervisor meetings.

-   Make sure meeting agenda is made before the meeting and minutes are taken during meetings.

-   Constant communication with team members to ensure deadlines will be meet and work loads are similar.

6.3.2 Contingency

-   Increase workload to meet deadlines

-   Negotiate with team supervisor to extend due dates.

**Technical Knowledge Risk**

We may select technologies that are the beyond the capabilities of the team. This may include areas of development such as mobile and data visualisation that require independent research into these areas.

6.4.1 Mitigation

-   Choose technologies that the team is familiar with to minimise the time needed to skill up in these areas.

-   Team members with more knowledge of a particular technology then other team members will conduct small training session to bring them up to speed.

6.4.2 Contingency

-   If the barrier to learn a technology is too high the team will look into alternatives that will still meet the requirements of the project

**Personnel Risk**

Any events that would hinder a team member from working on the project poses a significant risk, as each team member has been assigned a critical role in ensuring the project's success. Such events include injury, illness, loss of contact, maiming, death, etc.

6.5.1 Mitigation

-   Make sure team members do not undertake in any 'dangerous' or 'risky' activities that could cause them serious harm.

-   Make sure all work done by individual team members is available to the rest of the team.

6.5.2 Contingency

-   Consult with team supervisor and possibly course convenor for steps to take during such an event.

Schedule
========
Delivery Phases
---------------
### Overview
Phases will take the form of 4 week sprint cycle with 2 sprints. At the end of each sprint the team plans to deliver a set of deliverables to the client

### Sprint 1

-   Get previous teams project working on our machines.

-   See if feasible to decouple previous teams code as it was not scalable to our needs.

-   Create MongoDB and NodeJS backend on Nectar instance provided by client.

-   Monitor and collect tweets by keywords on the backend.

-   Develop Interface on webapp to manually validate tweets.

-   Setup writing tweets to MongoDB.

-   Research potential cross-platform mobile development frameworks.

-   Setup CI build server on Bitrise.

-   Learn React Native concepts.

-   Develop basic React Native frontend application skeleton in Expo.

-   Develop frontend tweet browser page.

-   Develop frontend Mapview interface to track tweet locations.

### Sprint 2

-   Work on the project documentation.

-   SQAP.

-   Website with more related documentation.

-   SRS.

-   Design Documentation.

-   Implement NLP techniques.

-   Using SpaCy or other relevant Python frameworks  such as NLTK.

-   Implement logic to allow usage  of multiple dictionaries and libraries.

-   DBpedia, Wordnet , Gate nlp, Word API etc.

-   Increase the functionality in the react native application.

-   Adding concatenation of tweets, such as a crime hotspot.

-   Where we can show multiple tweets talking about the same incident.

-   Adding visualisation page based on stats.

-   A pie chart containing total number of classified tweets.

-   Relevant (green), irrelevant (red) and unclassified (grey).

-   Another pie chart with the training NLP providing the same output.

-   The two pie charts will allow for accuracy compariance to be done. To see how well the trained model can pick up on relevant and irrelevant tweets.

### Sprint 3 Onwards

-   Complete Trajectory Modeling.

-   Crimes that are related.

-   Mapping the related crimes.

-   Using D3 or Google Maps API.

External Dependencies
---------------------

[Nectar](https://nectar.org.au/)

-   We are running our web application and database on a Nectar instance. We are dependant on this service in order to access our web application and database.

[Twitter API](https://developer.twitter.com/en/docs)

-   We are relying on data that comes from Twitter's RESTful API service.

[DBpedia](http://wiki.dbpedia.org)

-   Allows to find synonyms of a keyword.

WordAPI [https://wordsapi.com](https://www.wordsapi.com)

-   Allows to find synonyms of a keyword.

[SpaCy](https://spacy.io)

-   An advanced natural language processing (NLP) and deep learning library.

[NLTK](https://www.nltk.org)

-   A natural language toolkit containing numerous open source libraries and references.

Assumptions
-----------

1.  That Twitter will allow us to access and save data through their public API for the length of the project.

2.  That Nectar Instances are stable.

3.  That our client is technically proficient.

4.  That there are enough accurate crime related tweets in and around Australia at the time being.

Project Timeline
----------------

![Timelime](https://lh6.googleusercontent.com/urVtGA926A3lZmaCP1xIi88FTiI95FYScp1b5lsLgSMQYHZsUzhTkV0TBYQho_WAbYAW0_iTVXF8gU6jzs0sXbxhK7BAfI4tWolDyTDafrKVS6Hc9cSoxRWqyfrDfUJbRC6daDs6)

![DetailsTimeLine](https://lh3.googleusercontent.com/XYxaTXcGBJIAAZKjElVllwreWB46V2hBmGFnaVughnl4Qi1KB3cJIHsf_FyjbaLHA0vgkakThHN37ydiwTAO1nS7n4HlD-c8DkOujWQrmmV0tMHEaxeSW4ahboV3QMi4BdVHzsLM)