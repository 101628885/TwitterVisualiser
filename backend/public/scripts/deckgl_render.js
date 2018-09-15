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
let chicago_trajectories_data = null;
let highway_data = null;

// Array of options available to the user
// radius in metres
const OPTIONS = ['radius'];

const DATA_URL = {
	chicago_hist: 'https://data.cityofchicago.org/resource/6zsd-86xi.json',
	chicago_trajectories: 'http://api.myjson.com/bins/1b6z54',  // temp trajectories api
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
	const options = {};

	OPTIONS.forEach(key => {
		const value = document.getElementById(key).value;
		document.getElementById(key + '-value').innerHTML = value;
		options[key] = value;
	});

	const chicagoTweetLayer = new deck.HexagonLayer({
		id: 'chicago-tweet-layer',
		colorRange: COLOR_RANGE,
		lightSettings: LIGHT_SETTINGS,
		data: chicago_tweet_data,
		elevationRange: [0, 1000],
		elevationScale: 4,
		extruded: true,
		getPosition: d => d,
		opacity: 1,
		...options
	});

	const chicagoTrajectoriesLayer = new deck.GeoJsonLayer({
		id: 'chicago-trajectories-layer',
		data: chicago_trajectories_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => [160, 160, 180, 200],
		getLineColor: d => [255, 255, 255, 255],
		getRadius: d => 20,
		radiusMinPixels: 20,
	});

	deckgl.setProps({
		layers: [chicagoTrajectoriesLayer]
	});
}

/**
 * initialiseData() initialises the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	// const response = await fetch(DATA_URL.chicago_tweets);
	// const json = await response.json();
	// chicago_tweet_data = json.map(datum => (datum.coordinates[0].coordinates));

	const response = await fetch(DATA_URL.chicago_trajectories);
	json = await response.json();
	chicago_trajectories_data = json;

	renderLayer();
};

// Assign the renderLayer() function as event handler to each input control
OPTIONS.forEach(key => {
	document.getElementById(key).oninput = renderLayer;
});

initialiseData();
