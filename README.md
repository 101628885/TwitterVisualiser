# TwitterVisualiser

> Modern cross-platform application with state of the art data visualisation

## What is TwitterVisualiser?

TwitterVisualiser is essentially an application which allows its users to view *crime* data pulled from Twitter.
This data is collected and filtered via a *Natural Language Processing (NLP)* system, which is used for *Data Visualisation*,
*Tweet Searches* and also *Trajectory mappings*.

Basic features include:
- A cross-platform mobile application built using *React-Native*.
- Real-time crime data processing in the backend server.
  - Using NLP and other techniques.
- Trajectory model based on accurate data sets.
- Meaningful data visualisation.

## Getting Started

The system uses `nodejs` and `react-native` for the backend and frontend respectively.
> `react-native` only supports `npm@4` and below. *Might have to downgrade NPM post-install.*
> Feel free to install `yarn` if you do not wish to use `npm@4`.

Installing `nodejs` on Windows using Chocolatey and OSX using Brew.
```powershell
# For Windows setup
choco install nodejs -y
choco install yarn # optional

# For OSX setup
brew install node
brew install yarn # optional
```

You are required to install `react-native` and `react-native-cli`.
```powershell
npm install -g create-react-native-app # NPM commands for both CMD and Terminal
npm install -g react-native-cli
```

Now you will have installed the necessary tools to create and/or run `react-native` applications.

## Opening (Backend)

Right now, the application is quite barebone. The backend is hosted in a *Nectar instance*, meaning
backend is something you don't have to worry about too much. This also means building and running the
backend is quite rare, hence its already hosted.

## Opening (Frontend)

Frontend is your playground (as long as you're in your own branch!) for you to explore and implement
the items from the sprints.

1. For the dependencies to be install in your directory, run `npm install` inside the frontend folder.
2. If you're using `yarn` be sure to run a `yarn install`.
3. Open up your preferred IDE or Text Editor - like VS Code ;) - and edit `app.js` or create and import new files.

## Running the application

In **OSX** things are quite simple, by running the command `react-native run-ios`, the iOS emulator will start with
the application loaded and a set of instructions. You can also use the *QR Code* generated by running the command earlier,
which allows you to remotely host the application on your phone. Makes *Android* testing easier if you have an android device.

In **Windows** things are a little different. You will not be able to test it on a *iOS* emulator unless you have an OSX device.
Which really sucks, but that's how it is! To run the application here, you need to have an *Android Virtual Device (AVD)* setup. Which
is pretty much *Android Studio* setup. If you don't want to do that, you can plug in an *android* device in debugging mode and run
the command `npm run` or `react-native run-android`. Here you just **pray** that it works. This will deploy the current state of
the application in *development* or *production* state, depending on your default settings. Here, everytime you edit the application
you would need to press the key `"a"` to restart the deployment, which allows the edits to show in your application. Meaning, hot-reload, does not exist in Windows. Sad reacts. ~ At least it works, and the application is cross-platform!

Also, for debugging, in your repective emulator or application running, you can enable *External Debugging*. This should open up a
webpage with a localhost URL in *Google Chrome*. Where you can debug the application using console or other methods.
