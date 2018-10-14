# VisCrime

[![Build Status](https://travis-ci.org/101628885/TwitterVisualiser.svg?branch=dev)](https://travis-ci.org/101628885/TwitterVisualiser)

> Modern cross-platform application with state of the art data visualisation

## What is VisCrime?

VisCrime is essentially an application which allows its users to view *crime* data pulled from Twitter.
This data is collected and filtered via a *Natural Language Processing (NLP)* system, which is used for *Data Visualisation*,
*Tweet Searches* and also *Trajectory mappings*.

Basic features include:
- A cross-platform mobile application built using *React-Native*.
- Real-time crime data processing in the backend server.
  - Using NLP and other techniques.
- Trajectory model based on accurate data sets.
- Meaningful data visualisation.

## Getting Started

The system uses `nodejs` for the backend.
> You will need to download `npm@4` or below. *Might have to downgrade NPM post-install.*

Installing `nodejs` on Windows using Chocolatey and OSX using Brew.
```powershell
# For Windows setup
choco install nodejs -y

# For OSX setup
brew install node
```

## Opening (Backend)

The VisCrime backend forms the main part of VisCrime, which hosts the web app, DeckGL visualisation map and handles storing, retrieving and processing data from the MongoDB database. 

1. To install dependencies for the backend, run the `npm install` command in the backend folder.
2. If you're making changes, please make sure `mongoController` isn't writing to our production MongoDB on Nectar:
`const url = 'mongodb://team:swinburne@43.240.97.166/tweets';`

## Running the application

To now run the application we can simply do an `npm start` command in the backend folder and it will fire up locally on port `3000`.