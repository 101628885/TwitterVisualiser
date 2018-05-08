---
title: SQAP
---
**Software Engineering Project A:**

**Software Quality Assurance Plan**

**Review  history**



| Version | Date | Author | Comments |
| --- | --- | --- | --- |
| 1.00 | 15/04/2018 | Ming Sheng Quah, Stefan Tsvetkov, Sam Burke, Shane Joachim, Jason Liew, Corey Jenkins | Created initial draft document. |
| 1.10 | 22/04/2018 | Ming Sheng Quah, Stefan Tsvetkov, Sam Burke, Jason Liew, Corey Jenkins | Finished first draft. |


**Acronyms/Abbreviations**

**ASAP** As Soon as Possible

**COB** Close of Business (5:00 PM)

**DMS** Data Management System

**GUI** Graphical User Interface



**Ver.** Version

**SQAP** Software Quality Assurance Plan

**CI** Continuous Integration

# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Management](#management)
- [Documentation](#documentation)
- [Standards, practices, conventions and metrics](#standards--practices--conventions-and-metrics)
- [Reviews  and Audits](#reviews-and-audits)
- [Testing](#testing)
- [Problem reporting &amp; corrective action](#problem-reporting-amp--corrective-action)
- [Tools and methodologies](#tools-and-methodologies)
- [Risk Management](#risk-management)


# Introduction

1.1         Author List/Roles



| Author | Student ID | Role Semester 1 | Role Semester 2 |
| --- | --- | --- | --- |
| Sam Burke | 9991697 | Team Leader | Team Leader |
| Ming Sheng Quah | 101162341 | Project Quality Manager | Project Quality Manager |
| Stefan Tsvetkov | 101628885 | Client Liaison | Client Liaison |
| Shane Joachim | 101176740 | Development Manager | Development Manager |
| Jason Liew | 101122743 | Support Manager | Support Manager |
| Corey Jenkins | 101101551 | Planning Manager | Planning Manager |

1.2     Purpose

This document outlines the policies and procedures that members of Team 06 will follow to achieve an overall high standard of quality for Crime Analytics, a mobile/web multi-platform application for our clients. All team members are expected to adhere to the processes outlined in this document.



# Management

1.1     Organisation/Roles

1.1.1     Team  Roles

- Team Leader
- Client Liaison
- Planning Manager
- Development Manager
- Support Manager
- Project Quality Manager

1.1.2     Communication Roles



**Client**

The Client Liaison acts as the single point of contact between the team and the client.  This allows coordination of all incoming and outgoing correspondence with the client and distribution to all team members. They are also responsible for setting up regular Client Meetings.

**Supervisor**

The Supervisor Liaison allows the University and Supervisor to have a single point of contact for the team.  However,  other team members may contact the Supervisor for issues themselves.  The role is typically filled by the Team Leader.



1.2     Tasks and Responsibilities

1.2.1     General Team Member Responsibilities

- If a team member is selected for a task they will complete the task by the allocated time. If unable to complete task in time, member is to raise an issue prior to deadline with the team leader.
- Meeting Actions are binding unless changed at a later meeting.
- Team members are responsible for the logging of their own time sheets.
- Members  are to conduct themselves in an appropriate manner facilitating a healthy work environment.
- Members  are required to maintain communication with team.
- Members  are required to follow all processes as described in the SQAP.
- Members  must make their best effort attend all allocated meetings/workshops and are to submit an apology if they are unable to attend.
- Members  are to follow all directives from champions.
- Members are to actively partake in group discussion and provide input to the product and the process.

1.2.2     Role Responsibilities

**Team  Leader**

- Responsible  for the running of weekly team meetings.
- Responsible  for the booking of weekly meeting room.
- Responsible  for maintaining administrative documentation.
- Responsible  for motivating and tracking team progress.
- Responsible  for monitoring work logs and time spent on project.
- Responsible  for being a point of contact for issues/resolution.

- Responsible  for liaising with supervisor.



**Liaison**

- This champion is directly responsible for all communications with the client.
- Correspondence  from team members must be relayed to/from client in a timely manner via client liaison.
- Minor/non-urgent communications are to be collated to avoid bombarding client.
- Any compiled versions that need to be tested will be sent via the liaison.
- Liaison is responsible  for ensuring client receives all relevant information for a test,  as well as distribution of the test results supplied by the client to the team (bidirectional communication).



**Project Quality**

- Responsible  for creating and maintaining document templates.
- Maintaining  quality and standards of documents.
- Responsible  for providing assistance with documentation issues.
- Responsible  for maintaining documentation tools.
- Responsible for correcting bugs as they are discovered.

**Development**

- Responsible  for quality control of code artifacts.
- Responsible  for tracking code progress
- In charge of organising developer meetings to discuss progress and address any difficulties or concerns.
- In charge of ensuring appropriate  workload is assigned for each developer.
- In charge of ensuring standards and best practices are met and followed, respectively,  during the development process.

**Planning**

- Creating and maintaining repository.
- Monitoring  commit messages.
- Maintaining  file structure and location standards.
- Providing  assistance with branching and merging.

**Support**

- Managing the automatic CI build server.
- Completing or delegating running of tests.
- Overseeing integration &amp; unit testing jobs and reporting results to the team.
- Coordinate training and orientation for learning new technologies.
- Implement and maintain tools for assisting the team in the development process such as the task board, repository and communication channels.



# Documentation

2.1     Software Documents

2.1.1     SQAP

The SQAP is a plan written before any development that outlines all standard practices and procedures to ensure a quality process therefore help produce a high quality product.

2.1.2 Project Plan

A document to guide the building of the product. It will include a brief description of the project and why it should be built, what needs to be done to build the software and a timeline for when modules should be complete.

As more modules are mapped and more details are known about each item, the project plan is to be updated. It should also contain milestones where applicable and deliverable dates.

2.1.3 Self-assessment reports

A self-assessment report is to be completed by each team member each as per the unit outline that will provide evidence of work completed and self reflection. It will document knowledge and experience that has been gained during the process.

This document should contain the following sections

- Summary
- Work completed
- Mistakes made
- Knowledge gained
- Evidence

2.1.4 SRS

A Software Requirements Specification will be developed to describe the behaviour of the proposed  DMS as derived from client requirements.

A general outline of the document is as follows:

1. Introduction
  1. 1 Purpose
  2. 2 Scope
  3. 3 Definitions, Acronyms, and Abbreviations
2. Overall Description
  1. 1 Product Features
  2. 2 System Requirements
  3. 3 Documentation
3. System Architecture
4. Interface Requirements
  1. 1 User Interfaces
  2. 2 Hardware Interfaces
  3. 3 Software Interfaces
  4. 4 Communication Interfaces
5. References

2.2 Management Documents

2.2.1  Meeting Agendas

- Each week different team members will be given the responsibility to create the agenda for the upcoming meetings with the client or the team supervisor.
- The agenda must be created in Google Docs using the defined meeting agenda template.
- Once an agenda has been drawn up, it must be uploaded to the team Trello board as a .pdf and the Google Doc Source URL.
- The Google Doc must be able to be edited.

2.2.2 Meeting Minutes

- Will be collected at every meeting.
- Will be taken underneath the current meeting agenda inside Google Docs
- Meeting minutes will be completed within the first hour after the meeting
- Meeting minutes can be uploaded as a pdf and sent to any member of that meeting



# Standards, practices, conventions and metrics

3.1     Purpose

Standards are essential for measuring and thus ensuring software quality. This section covers technical,

documentation as well as process standards which guide the project&#39;s development  and management. These standards mainly govern the output quality of each project&#39;s deliverable: libraries, applications, documents. In addition, they also serve as the development guidelines throughout the projects.

This section also includes practices that  the development  team shall adhere to,  and will be assessed against.

These standards and practices are the basis to ensure and measure quality of the project&#39;s deliverables. The detailed procedure for assessment against the standards and practices can be found in the Reviews and Audits section.

All documentation (including the full Github repository) will be available for the client upon completion of the project for any future usage.

3.2     Standards

The following standards will be used as the basis for quality control in this project. They shall be adhered to closely throughout the software life cycle. Standards will be reviewed to ensure that they are being met.

3.2.1     Coding Standard

The following language-specific  standards are used:

Node

- NPM Coding Style -   [https://docs.npmjs.com/misc/coding-style](https://docs.npmjs.com/misc/coding-style)

React Native

- Airbnb React/JSX Style Guide - [https://github.com/airbnb/javascript/tree/master/react](https://github.com/airbnb/javascript/tree/master/react)

3.2.2         Filename/Location standards

- The entire codebase for the solution will be hosted on the Github remote repository, divided into the frontend and backend directories for the React Native app and NodeJS app respectively.
- For the frontend, PascalCase will be used for filenames while camelCase will be used for filenames in the backend.
- There shall be no whitespace (spaces) in filenames.
-
●●Hyphens &quot; - &quot; or underscores &quot; \_ &quot; will be used to delimit the file and folder names in the event that the name is multiple words.
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8rAwAI6AL0EK/o3wAAAABJRU5ErkJggg==)

-
●●For non-code-related files, multiple related files with similar content such as the meeting minutes are to be stored within an appropriately named encapsulating folder.
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//89AwAI3ALuyqH1HQAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8nAwAI8AL4zIw8SAAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8/AwAI/AL+eMSysAAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8nAwAI8AL4zIw8SAAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8/AwAI/AL+eMSysAAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8/AwAI/AL+eMSysAAAAABJRU5ErkJggg==)


3.2.3    Github standards

-
●●The team will follow the Vincent Driessen GitFlow workflow and standards outlined at - [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8vAwAI+AL89h3njgAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//87AwAI7AL2nna94QAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//81AwAI1ALq8DAu2wAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//87AwAI7AL2nna94QAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//81AwAI1ALq8DAu2wAAAABJRU5ErkJggg==)

 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//81AwAI1ALq8DAu2wAAAABJRU5ErkJggg==)


3.3 Practices

The  following  practices will be used as the basis for quality control in this project.   They shall be adhered to closely throughout the software life cycle. Practices will be audited to ensure that they are being followed appropriately.

3.3.1     Communication Practices

**Client**

- All contact will be made to the client through the Team leader with the help of the Liason.

- In the event that these members are absent or on leave, alternative arrangements will be made (In advance if possible).
- Contact will be primarily made through email.
- Meetings  with the client shall be regular, taking place approximately every two weeks. However correspondence via phone or email should be more regular.
- Meetings will always have a minimum of two team members present.
- All team members are expected to be present.


**Team**

- The messaging platform Discord will be the primary method of communication outside of any face-to-face meetings.
- Student email addresses are to be used in all email communications.
- Documents are expected to be uploaded to the teams Trello board in either a pdf or a editable Google Doc&#39;s document.
- Discord channels and Emails need to be checked daily.
- Email communication will be kept to a professional standard.
- Emails can be used to confirm verbal contracts.
- Discord Video Conference meetings are permitted if face-to-face meetings are unable to be arranged, but should be kept to a minimum.

**Supervisor**

- Formal contact with the supervisor will conducted by the Team Leader.
- Supervisor Meetings will be conducted weekly at a scheduled time that is suitable for all team members.
- Contact will primarily be through email.
- Agreements with supervisor will be confirmed via email.
- All emails to the supervisor should CC the entire team unless they are of a personal nature.

3.3.2 Meetings

- Team meetings will be held on a weekly basis and will have a standard length 30 to 60 minutes.
- All team members are required to be present.
- If a team member can not be present, an apology needs to be communicated directly to the team leader As Soon as Possible (ASAP).
- All meetings require minutes to be taken.

- A meeting outside of the weekly team meeting does not need all members present; notes are required.
- Any meeting with the client requires at least two members present, again notes will be taken. Notes will distributed to client for confirmation.
- Notes will be stored on the Trello board.

3.3.3 Worklogs

- Worklogs will be created using Toggl
- Weekly update of Worklogs to uploaded to Trello
- Team Leader /Supervisor to monitor Worklogs.

3.3.4 Github

- Temporary/intermediate files are not to be committed

3.3.5 Coding practices

**General  guidelines**

- Strictly follow Node and React-native standards as outlined in 5.2.1
- Keep the code simple, avoid using unnecessary &quot;clever&quot; code.
- All methods, fields and properties must have comments that follows the standard in 5.2.1
- Development must be in-line with architectural design, in order to ensure transparency in code.
- Once a week meetings (60 minutes) to report progress/difficulties in development, could be conducted after weekly team meeting.The aim is to ensure problems are known early and progress are understood by the whole team.



# Reviews  and Audits

4.1 Purpose

This section of the SQAP defines a set of procedures used to validate project deliverables and to verify team processes with respect to defined requirements  and standards.

The purpose of validation is to ensure that the correct deliverables are being produced with respect to the client requirements and team standards. This is done through internal and external reviews.

The purpose of verification is the ensure that  processes outlined in the SQAP are followed to ensure product quality. This is done through internal and external audits.

The standards, procedures and practices can be found in chapter 5, Standards and Practices.

4.2 Review/Audit List

4.2.1 Reviews

Reviews are held during all phases of the project&#39;s life-cycle.

**Formal Review Process**

All formal review meetings must use the following process, a formal review is to be declared on a case by case basis:

1.  A review committee is selected and the specified roles are filled.

2.  The Moderator identifies and/or confirms the review&#39;s objectives.

3.  The  Moderator ensures that  all members of the committee understand the objectives and the review process.

4.   (a)  Individual: the review committee will prepare to review the work by examining it carefully for potential defects.

(b)  Team: the review committee meets at a planned time to pool the results of their preparation activity and arrive at a consensus regarding the status of the document or standard being reviewed

5.  Author of the work makes the required changes as specified by the review committee.

6.  Moderator verifies that the actions required by the Author have taken place.





**Informal  Review  Processes**

**Code**

Code quality is to be ensured through regular reviews as listed below. In the event that code is found to be unsatisfactory the results will be communicated to the relevant team member and raised as an Issue.

1.  Peer review: Both the backend server and frontend mobile app will be reviewed regularly by team members for obvious bugs, design or functionality issues. These issues will be communicated to the team member responsible for maintaining that part of the program.

• Coding Standard

•  Task Completion

• Verified against initial specifications, from each stage&#39;s detail design.

•  Agreement upon any changes to specifications

2.  Client review: The product will be reviewed and tested by the client at the end of each sprint against the following:

• Deliverable timeline

• Verified against specifications

• Validate task completion

**Meeting**

Meeting quality will primarily be maintained through audits of the correct process but all meeting related documents will also be reviewed for quality.

Meeting minutes will be reviewed  following  the first meeting of each secretary against the standards. This is done alongside the formal acceptance of minutes at the conclusion of each meeting.

Agenda will be accepted prior to  each meeting and formally reviewed  prior to  the following  meeting.

Any documents found to be unsatisfactory will have results communicated to the secretary and raised as an Issue.

**Management Document**

Management documents will be reviewed against document standards prior to being finalised and released.  In the event that  the document is found to be unsatisfactory, a list of improvements will be generated and raised as an issue. One example of this is the feedback sheets provided by the supervisor.

4.2.2     Audits

Audits should be held regularly during all phases of the project&#39;s life-cycle to ensure processes put in place are being adhered to.

**Coding Practices Audit**

Coding practices will be audited by code champion on a case by case basis (normally as a result of consecutive unsatisfactory peer reviews). Failure to meet defined coding processes will result in a list of improvements being generated and communicated to responsible team member/s.

**Communication Audit**

Communications  will be audited on a monthly basis by Team Leader. Failure to meet defined communication processes will result in a list of improvements being generated and communicated to responsible team member(s).

**Github  Practices Audit**

Github Practices will be audited as part of the routine maintenance by the Github champion. Failure to meet the prescribed practices will be communicated to relevant team members with recommendations for improvement.


# Testing

Testing will be predominantly in the form of field testing with the assistance of the client. This is the accepted method due the domain knowledge requirement of the user. The team is to perform as many tests on the releases before handing over to the client. Unit tests and integration tests will be utilised for verifying numerical/quantitative data generated by the program has been manipulated correctly, and for also confirming the generation of UI components in the frontend. Unit/integration tests should be written by the developer of the modules/code being tested before merging with the primary dev branch on the remote repository.

The team will also perform some usability/function testing on the prototype prior to release. This will most likely be involve trying to break/crash the program. As the project is heavily reliant on import and export of data, there are numerous times when IO Exceptions could be thrown. As part of this testing, the tester is to document all errors, messages and general comments relating to usability of the GUI.

Once the team has made their best effort to break the program, handled all exceptions, provided usable error messages and are satisfied with the release, it is to be given to the client for feedback.

5.1    Requirement

The  overall goal of the team is to satisfy the clients needs when building the software.  Therefore, strong consultation with them will result in a product that works, is usable and maintainable.The requirements outlined in SRS  shall be verified and validated by the client to ensure the product is suitable for deployment and use.

5.2    Use case generation

Use cases shall be validated and verified by the client with the assistance of the testing team.  Sample outputs from the client will allow a basic understanding for the team, but ultimately the client will be responsible for communication specific uses of the software to ensure the team can adapt it to suit.

 5.3    Installation and User Documentation Generation

The releases will be in the form of 2 application package files, one for use on Android devices (.apk) and one for iOS devices (.ipa), both of which will be provided to the client. The user simply has to transfer the appropriate file onto their devices and run it from there.

The client will also be supplied with a comprehensive user document that details the GUI and should have some examples of how to use it.  The client will also be supplied documentation of the code and the design documents. This is to assist with maintainability and use for future projects.

Once code has been finalised, and testing is completed, they will be supplied with all of the source code and a final build of the software.

# Problem reporting &amp; corrective action

6.1     Personnel

If an issue arises with personnel the Team Leader is to be notified. The Team Leader will follow up on the issue to gather all the facts.  Once known the Team Leader will suggest a corrective action. Corrective Action can include but is not limited to: counselling, team reorganization, protocol changes.

6.2     Work

6.2.1     Project  major timeline

There is one parent project, which is Project Mohan_🅱_ois. This project contains many sub-projects, which will be composed of the following modules:

- --NodeJS backend
- --MongoDB database
- --React Native mobile app
- --Web app
- --Python NLP system
- --Server instance
- --Documentation

Project Mohan Bois will use the scrum agile approach to our development process. Development will begin on the most core components (such as the backend and database), before moving onto higher level sub-projects such as NLP and the mobile app. We will also iterate on each sub-project,, adding additional functionality as needed.

Each sub-project will have a rolling release and will incorporate the newest features as they are pushed.

To implement this development plan, our repository will consist of the following branches:

•  &quot; dev&quot; containing the latest changes.
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8tAwAI2ALsRHigIwAAAABJRU5ErkJggg==)

•  &quot;master&quot; containing the last verified stable version.
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8zAwAI5ALypOdmJwAAAABJRU5ErkJggg==)

•  Other branches will be created if possible destabilising changes are made, then get merged back into &quot;dev&quot; as stability is verified..
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//83AwAI9AL6QlVpdgAAAABJRU5ErkJggg==)

6.2.2     Stage-dependent tasks

All tasks will be put up on the Trello board and a tag will be assigned to each task to indicate which sub-project it belongs to, as well as the priority level.
 ![](data:image/*;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP4//8jAwAI4ALwKj4zGQAAAABJRU5ErkJggg==)

For example, the &quot;Fill in SQAP&quot; task, assigned with the tags &quot;Documentation&quot; and &quot;High Priority&quot; means that the task belongs to the Documentation sub-project and should be completed before working on any other tasks.

6.2.3 Task creation and assignment

The minute taker will read through the meeting minutes and create tasks as they have been discussed during the meetings. Then, during the next team meeting, the task will be picked up by a team member who is responsible for that part of the project  or would like to work on that specific task. It will be that team member&#39;s responsibility to work on that task and ensure it meets specified quality guidelines.

6.2.4 Task life

Tasks should generally be completed by the end of the two week sprint, with the exception of larger tasks which may span over several sprints. Once a task has been completed, the appropriate deliverables should be pushed to the &quot;dev&quot; branch of the Github repository. If a task cannot be completed in time, team leader should be informed.

6.2.5 Issue Categories

Categories can be updated to adapt to the project&#39;s development, the following are most up to date:

- Administration
- Client Liaison
- Coding  - Prototype
- Documentation - General
- Documentation - PP
- Documentation - SD
- Documentation - SQAP
- Documentation - SRS
- Lecture
- Meeting - Client
- Meeting - Supervisor
- Meeting - Weekly
- Presentation Preparation
- Frontend
- Backend
- NLP
- Research - Coding
- Research - Documentation
- Review - External
- Review - Internal
- Github Management
- Requirements
- Design
- Coding
- Testing


# Tools and methodologies

7.1     Tools

7.1.1        Toggl

Toggl will be used by most team members to track time spent on work and generate weekly worklogs.

7.1.2        Github

Github will be used as a remote repository to hold the solution&#39;s codebase, both for the backend and frontend. There are two main branches; _dev_ and _master_. Team members develop individual project features in separate appropriately-named feature branches and merge to a primary _dev_ branch which serves as an integration branch for features. The _master_ branch is reserved only for official project releases. Issue tracking will also be conducted through GitHub.

7.1.3        Discord

Communication amongst team members will be done primarily through Discord. In most cases text-based communication will suffice, in addition to fortnightly-held group voice calls. Automated notifications from other tools utilised in the project will also be sent to the team Discord.

7.1.4        Trello

Trello will be used as the primary task board for the team. Artefacts and miscellaneous documentation such as the project plan, this document, all meeting agendas/minutes and worklogs will be hosted here. The project backlog and sprint backlog will also be held on Trello, and will contain all the items on which the team is to work on.

7.1.5 Travis CI

The Travis CI hosted build service will be used by the team for continuous integration. Builds will be automatically deployed to the team&#39;s Expo account for preview.

7.2         Design Methodology

We will be using Scrum Agile development methodology throughout the entire development process.

- Utilises multiple iterations lasting around 2 to 4 weeks each.
- Each iteration will have its timeline specified in the project plan and discussed during the sprint review meeting, which occurs at the start of each iteration. The following will be discussed:
  - Deliverables
  - Items to be worked on in the current sprint
  - Solution design
  - Estimations / Priority
  - Task Allocations
- Each iteration will conclude with a sprint review meeting in which the team finalises the deliverables and showcases them to the client.
- A sprint retrospective is then conducted to review the process of the team and propose suggestions for improving the productivity of the subsequent sprints.


# Risk Management

8.1     Purpose

Risk management is undertaken to facilitate the creation of a product that is high quality, on time and delivers the scope specified by the client.

8.2     Categorization

For this project five major categories of risks have been identified:

1. Scope Risk.
2. Communication Risk.
3. Schedule Risk.
4. Technical Knowledge Risk.
5. Personal Risk.

Each of these categories have a description, impact, how likely it is to occur and a mitigation tactic. In this case the probability and the impact will be assessed as either low, moderate or high.



| **Rank** | **Name / description** | **Occurrence Probability**** (H/M/L) **|** Severity****(H/M/L)** | **Contingency** |
| --- | --- | --- | --- | --- |
| 1 | Scope Risk | M | H | 7.1.2 |
| 2 | Communication Risk | H | H | 7.2.2 |
| 3 | Schedule Risk | M | M | 7.3.2 |
| 4 | Technical KnowledgeRisk | L | H | 7.4.2 |
| 5 | Personnel Risk | L | M | 7.5.2 |

8.3     Scope Risk Details

If the scope is not clearly defined there is chance that the outcome of the project may not be what the client wants.

**Mitigation**

- Make sure the scope is clearly defined throughout the project by keeping the client involved with weekly meetings.


**Contingency**

- Discuss with team supervisor options of extending deadlines for specific items.
- Increase team work hours.

8.4     Communication Risk Details

Poor communication between the team, clients and stakeholders could cause progress to halt and could cause members to work on tasks that have already been completed.

**Mitigation**

- Face-to-face meetings on Mondays at university, as well as a group voice chat on the weekends.
- Daily group text chat to keep members updated on progress and decisions.
- Fortnightly meetings with the clients on campus.

- Agenda and minutes posted on Trello for members that were unable to attend meetings.

**Contingency**

- Conduct an emergency meeting with team supervisor to discuss the team&#39;s communication issues and figure out new strategies to mitigate.


8.5     Schedule Risk Details

Failure to adhere to the schedule of the project (e.g. not planning meetings accordingly) may result in lack of direction for the team members, causing the team to have mixed priorities. This may also end up in the team falling short on deadlines.

**Mitigation**

- Conduct weekly team and supervisor meetings.
- Make sure meeting agenda is made before the meeting and minutes are taken during meetings.
- Constant communication with team members to ensure deadlines will be meet and work loads are similar.


**Contingency**

- Increase workload to meet deadlines.
- Negotiate with team supervisor to extend due dates.

8.6     Technical Knowledge Risk Details

We may select technologies that are the beyond the capabilities of the team. This may include areas of development such as mobile and data visualisation that require independent research into these areas.

**Mitigation**

- Choose technologies that the team is familiar with to minimise the time needed to skill up in these areas.
- Team members with more knowledge of a particular technology then other team members will conduct small training session to bring them up to speed.

**Contingency**

- If the barrier to learn a technology is too high the team will look into alternatives that will still meet the requirements of the project

8.7     Personal Risk Details

Any events that would hinder a team member from working on the project poses a significant risk, as each team member has been assigned a critical role in ensuring the project&#39;s success. Such events include injury, illness, loss of contact, maiming, death, etc.

**Mitigation**

- Make sure team members do not undertake in any &#39;dangerous&#39; or &#39;risky&#39; activities that could cause them serious harm.
- Make sure all work done by individual team members is available to the rest of the team.

**Contingency**

- Consult with team supervisor and possibly course convenor for steps to take during such an event.