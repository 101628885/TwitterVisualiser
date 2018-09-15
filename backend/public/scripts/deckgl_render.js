/**
 * TODO:
 * 1. code cleanup, there's some code repetition in a few places
 * 2. add some loading animation while data is being loaded
 */

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidHJpcHBhbG9za2kiLCJhIjoiY2psMGFyZ3A1MTMxMTNxbG1qb3V6YWV0YyJ9.qF4x-o4Z7E6iwYedWjGo6Q';

const INITIAL_VIEW_STATE = {
	latitude: 41.88,
	longitude: -87.62,
	zoom: 11,
	pitch: 50,
	bearing: 0,
};

const deckgl = new deck.DeckGL({
	container: 'deckmap',
	mapStyle: 'mapbox://styles/mapbox/dark-v9',
	mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
	longitude: INITIAL_VIEW_STATE.longitude,
	latitude: INITIAL_VIEW_STATE.latitude,
	zoom: INITIAL_VIEW_STATE.zoom,
	pitch: INITIAL_VIEW_STATE.pitch,
});

let chicago_tweet_data = null;
let chicago_trajectory_data = null;

// Array of options available to the user
// radius in metres
const OPTIONS = {
	TWEET: ['radius', 'visible', 'extruded'],
	TRAJECTORY: ['visible']
};

const DATA_URL = {
	CHICAGO_TWEET: 'https://data.cityofchicago.org/resource/6zsd-86xi.json',
	CHICAGO_TRAJECTORY: 'http://api.myjson.com/bins/1b6z54',  // temp trajectories api
}

// for hex layers
const COLOR_RANGE = [
	[1, 152, 189],
	[73, 227, 206],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78]
];

const LIGHT_SETTINGS = {
	numberOfLights: 1,
	ambientRatio: 0.4,
	diffuseRatio: 0.6,
	specularRatio: 0.2,
};

/**
 * renderLayer() updates the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
const renderLayer = () => {
	const optionsTweet = {};
	const optionsTrajectory = {};

	// TODO: make this pretty, do like a forEach or something
	const radiusTweetValue = document.getElementById('radius-tweet-handle').value;
	document.getElementById('radius-tweet-value').innerHTML = radiusTweetValue;
	optionsTweet.radius = radiusTweetValue;
	const visibleTweetValue = document.getElementById('visible-tweet-handle').checked;
	optionsTweet.visible = visibleTweetValue;
	const extrudedTweetValue = document.getElementById('extruded-tweet-handle').checked;
	optionsTweet.extruded = extrudedTweetValue;
	const visibleTrajectoryValue = document.getElementById('visible-trajectory-handle').checked;
	optionsTrajectory.visible = visibleTrajectoryValue;

	const chicagoTweetLayer = new deck.HexagonLayer({
		id: 'chicago-tweet-layer',
		colorRange: COLOR_RANGE,
		lightSettings: LIGHT_SETTINGS,
		data: chicago_tweet_data,
		elevationRange: [0, 800],
		elevationScale: 1,
		getPosition: d => d,
		opacity: 0.4,
		...optionsTweet
	});

	const chicagoTrajectoryLayer = new deck.GeoJsonLayer({
		id: 'chicago-trajectory-layer',
		data: chicago_trajectory_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => [0, 255, 255, 200],
		getLineColor: d => [0, 153, 153, 255],
		getRadius: d => 60,
		radiusMinPixels: 60,
		...optionsTrajectory
	});

	deckgl.setProps({
		layers: [chicagoTweetLayer, chicagoTrajectoryLayer]
	});
};

/**
 * initialiseData() initialises the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	const response_chicago_trajectory = await fetch(DATA_URL.CHICAGO_TRAJECTORY);
	chicago_trajectory_data = await response_chicago_trajectory.json();

	let tweet_array = [];
	const response_chicago_tweet = await fetch(DATA_URL.CHICAGO_TWEET);
	json = await response_chicago_tweet.json();
	json.forEach(datum => {
		if ('location' in datum) 
			tweet_array.push(datum.location.coordinates);
	});
	chicago_tweet_data = tweet_array;

	renderLayer();
};

// Assign the renderLayer() function as an event handler to each input control
const registerEventHandlers = (options) => {
	// there's probably a better way to do this
	options.forEach(key => {
		console.log("Registering event handlers...");
		let idSuffix = "";
		switch(options) {
			case OPTIONS.TRAJECTORY: 
				idSuffix = "-trajectory-handle";
				break;
			case OPTIONS.TWEET: 
				idSuffix = "-tweet-handle";
				break;
			default: 
				break;
		}
		let inputType = document.getElementById(key + idSuffix).getAttribute("type");
		
		if (inputType === "checkbox") {
			console.log("Registering " + key + idSuffix);
			document.getElementById(key + idSuffix).onclick = renderLayer; }
		else
			document.getElementById(key + idSuffix).oninput = renderLayer;
	});
};

for (var key in OPTIONS) {
	registerEventHandlers(OPTIONS[key]);
}

initialiseData();
