// registered mapbox api access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidHJpcHBhbG9za2kiLCJhIjoiY2psMGFyZ3A1MTMxMTNxbG1qb3V6YWV0YyJ9.qF4x-o4Z7E6iwYedWjGo6Q';

// initial settings for the deckgl instance
const INITIAL_VIEW_STATE = {
	latitude: 41.88,
	longitude: -87.62,
	zoom: 11,
	pitch: 40.5,
	bearing: 0,
};

// initial data variables
let chicago_tweet_data = null;
let chicago_trajectory_data = null;

// array of options available to the user
const OPTIONS = {
	TWEET: ['radius', 'visible', 'extruded'],
	TRAJECTORY: ['visible']
};

// source data urls
const DATA_URL = {
	CHICAGO_TWEET: '/tweetmap',
	CHICAGO_TRAJECTORY: '/tweetmap',
}

// main deck.gl object
const deckgl = new deck.DeckGL({
	container: 'deckmap',
	mapStyle: 'mapbox://styles/mapbox/dark-v9',
	mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
	...INITIAL_VIEW_STATE
});

// hex layer color range
const COLOR_RANGE = [
	[1, 152, 189],
	[73, 227, 206],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78]
];

// hex layer light range
const LIGHT_SETTINGS = {
	numberOfLights: 1,
	ambientRatio: 0.4,
	diffuseRatio: 0.6,
	specularRatio: 0.2,
};

function filterMap() {
	$('.loader').show()
	let query = {}
	if($('#type').val().toUpperCase() != "ALL")
		query.Primary_Type = $('#type').val().toUpperCase();
	if($('#limit').val() != "" && typeof parseInt($('#limit').val()) == 'number')
		query.limit = $('#limit').val();
	query.Year = $('#year').val();
	console.log(query)
	axios.post('/tweetMap', query)
	.then((res) => 
	{
		chicago_trajectory_data = res.data.trajectory[0]
		renderLayers();
	});
}

/**
 * renderLayers() updates the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
const renderLayers = () => {
	const optionsTweet = {};
	const optionsTrajectory = {};

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
		elevationScale: 4,
		getPosition: d => d,
		opacity: 0.4,
		coverage: 0.8,
		...optionsTweet
	});

	const chicagoTrajectoryLayer = new deck.GeoJsonLayer({
		id: 'chicago-trajectory-layer',
		data: chicago_trajectory_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => [204, 0, 0, 200],
		getLineColor: d => [204, 0, 0, 200],
		onHover: i => console.log('Hovered:', ""),
		getRadius: d => 60,
		radiusMinPixels: 60,
		...optionsTrajectory
	});

	const chicagoTweetGeoLayer = new deck.GeoJsonLayer({
		id: 'chicago-tweet-geo-layer',
		data: chicago_tweet_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => [0, 255, 255, 200],
		getLineColor: d => [0, 153, 153, 255],
		onHover: info => console.log('Hovered:', info),
		getRadius: d => 60,
		radiusMinPixels: 60,
		...optionsTweet
	});

	deckgl.setProps({
		//layers: [chicagoTweetLayer, chicagoTrajectoryLayer, chicagoTweetGeoLayer]
		layers: [chicagoTrajectoryLayer, chicagoTweetLayer]
	});
	$('.loader').hide()
};

/**
 * initialiseData() initialises the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	let response_chicago_trajectory = await fetch(DATA_URL.CHICAGO_TRAJECTORY);
	response_chicago_trajectory = await response_chicago_trajectory.json();
	
	chicago_trajectory_data = response_chicago_trajectory.trajectory[0];
	chicago_tweet_data = response_chicago_trajectory
	.tweets[0]
	.features
	.map(tweet => (tweet.geometry.coordinates));

	console.log(chicago_trajectory_data)
	console.log(chicago_tweet_data)
	renderLayers();
};

// Assign the renderLayers() function as an event handler to each input control
const registerEventHandlers = (options) => {
	// there's probably a better way to do this
	options.forEach(key => {
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
			document.getElementById(key + idSuffix).onclick = renderLayers; }
		else
			document.getElementById(key + idSuffix).oninput = renderLayers;
	});
};

const _init = () => {
	initialiseData();
	for (var key in OPTIONS) {
		registerEventHandlers(OPTIONS[key]);
	}	
}

_init();
