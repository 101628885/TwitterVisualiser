// registered mapbox api access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidHJpcHBhbG9za2kiLCJhIjoiY2psMGFyZ3A1MTMxMTNxbG1qb3V6YWV0YyJ9.qF4x-o4Z7E6iwYedWjGo6Q';

// initial settings for the deckgl instance
const INITIAL_VIEW_STATE = {
	latitude: 41.88,
	longitude: -87.62,
	zoom: 12,
	pitch: 40.5,
	bearing: 0,
};

// initial data variables
let chicago_tweet_data = null;
let chicago_crime_data = null;

let chicago_trajectory_same_type_data = null;
let chicago_trajectory_all_type_data = null;
let centroid_same_type_data = null;
let centroid_all_type_data = null;

let pointHighlightColour = [0, 255, 162, 255]

let trajectoryLineColour = [255, 221, 51, 150]
let trajectoryHighlightColor = [51, 187, 255, 255]
// array of options available to the user
const OPTIONS = {
	TWEET: ['radius', 'visible', 'extruded'],
	TRAJECTORY: ['visible'],
	CENTROID: ['visible']
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
const TWEET_COLOR_RANGE = [
	[1, 152, 189],
	[73, 227, 206],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78]
];

const CRIME_COLOR_RANGE = [
	[65, 244, 113],
	[66, 244, 244],
	[66, 194, 244],
	[66, 134, 244],
	[69, 66, 244],
	[244, 66, 244],
	[188, 66, 244],
	[244, 66, 66]
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
	
	if($('#startDate').val() != "")
	{
		query.Date = {
						$gte: $('#startDate').val(), 
						$lt: $('#endDate').val()
					};
	}

	axios.post('/tweetMap', query)
	.then((res) => 
	{
		chicago_trajectory_same_type_data = res.data.crime.trajectorySameTypeGeoJSON[0];
		chicago_trajectory_all_type_data = res.data.crime.trajectoryAllTypeGeoJSON[0];

		centroid_same_type_data = res.data.crime.centroidsSame;
		centroid_all_type_data = res.data.crime.centroidsAll;

		chicago_crime_data = res.data.crime.crimeGeoPoints[0];

		statsBuilder();
		renderLayers();
	});
	
}

statsBuilder = () =>
{
	let crimeCount = chicago_crime_data.features.length;
	let crimeDateRange = `${chicago_crime_data.features[0].properties.date_stats_text} - ${chicago_crime_data.features[crimeCount - 1].properties.date_stats_text}`
	let crimeTypeObject = {}
	chicago_crime_data.features.forEach((crime) => 
	{
		if(crimeTypeObject.hasOwnProperty(`${crime.properties.primary_type}`))
		{
			crimeTypeObject[`${crime.properties.primary_type}`] += 1  
		} else
		{
			crimeTypeObject[`${crime.properties.primary_type}`] = 1  
		}
	})
	$("#stats-date-range p").empty()
	$("#stats-total p").empty()
	$( "#stats-crimes p").empty()
	$("#stats-panel p").empty()

	$("#stats-date-range").append("<p><strong>" + crimeDateRange + "</strong>")
	$("#stats-total").append("<p><strong>Total Found:</strong> " + crimeCount)
	
	Object.keys(crimeTypeObject).forEach(function(crime)
	{
    	$( "#stats-crimes" ).append( `<p><strong>${toTitleCase(crime) + ':</strong> ' + crimeTypeObject[crime]}</p>` );
	});

	$("#stats-tweets").append("<p><strong>Total Found:</strong> " + "30.0K")

	$("#stats-panel").show()
}

toTitleCase = (str) => {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
};

const updateTrajectoryLayerTooltip = ({x, y, object, layer}) => {
	try {
		const tooltip = document.getElementById('tooltip');

		if (object) {
			tooltip.style.visibility = 'visible';
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;

			if (object.geometry.coordinates[1])
			{
				tooltip.innerHTML = `
				<div>Crime Details</div>
				<div>Date: ${object.properties.date_text}</div>
				<div>Latitude: ${object.geometry.coordinates[1]}</div>
				<div>Longitude: ${object.geometry.coordinates[0]}</div>
				<div>Crime Type: ${object.properties.primary_type}</div>
				<div>Description: ${object.properties.description}</div>
				<div>Location: ${object.properties.location_description}</div>`
			}
			else
			{
				tooltip.innerHTML = '<div>Trajectory Points -></div>';
				object.geometry.coordinates[0].forEach(item => {
				tooltip.innerHTML += `
					<div>Point ${object.geometry.coordinates[0].indexOf(item) + 1}: ${item}</div>
				`;
				});
				renderLayers();
			}
		} else {
			tooltip.innerHTML = '';
			tooltip.style.visibility = 'hidden';
		}
	} catch(e) {
		// kaksoispite dededede
	}
};

const updatecentroidSameTypeLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.getElementById('tooltip');
		if (object) {
			tooltip.style.visibility = 'visible';
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `<div>Centroid at: ${object.geometry.coordinates[0]}, ${object.geometry.coordinates[1]}</div>`;
		} else {
			tooltip.innerHTML = '';
			tooltip.style.visibility = 'hidden';
		}
	} catch(e) {
		// kaksoispite dededede
	}
};

const updateTweetLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.getElementById('tooltip');
		if (object) {
			tooltip.style.visibility = 'visible';
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>latitude: ${object.centroid[0]}</div>
				<div>longitude: ${object.centroid[0]}</div>
				<div>${object.points.length} tweet${(object.points.length === 1) ? '' : 's'}</div>
			`;
		} else {
			tooltip.innerHTML = '';
			tooltip.style.visibility = 'hidden';
		}
	} catch(e) {
		// kaksoispite dededede
	}
};

/**
 * renderLayers() updates the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
const renderLayers = () => {


	const optionsTweet = {};
	const optionsTrajectorySame = {};
	const optionsTrajectoryAll = {};

	const optionsCentroidAll = {};
	const optionsCentroidSame = {};

	const radiusTweetValue = document.getElementById('radius-tweet-handle').value;
	document.getElementById('radius-tweet-value').innerHTML = radiusTweetValue;
	optionsTweet.radius = radiusTweetValue;

	const visibleTweetValue = document.getElementById('visible-tweet-handle').checked;
	optionsTweet.visible = visibleTweetValue;

	const extrudedTweetValue = document.getElementById('extruded-tweet-handle').checked;
	optionsTweet.extruded = extrudedTweetValue;


	//Trjectory Checking
	const visibleTrajectoryValue = document.getElementById('visible-trajectory-handle').checked;

	const visibleTrajectorySameTypeValue = document.getElementById('visible-type-trajectory-handle').checked;
	optionsTrajectorySame.visible = visibleTrajectoryValue ? visibleTrajectorySameTypeValue : visibleTrajectoryValue;
	optionsTrajectoryAll.visible = visibleTrajectoryValue ? !visibleTrajectorySameTypeValue : visibleTrajectoryValue;

	//Centroid Checking
	const centroidValue = document.getElementById('visible-centroid-handle').checked;
	optionsCentroidSame.visible = centroidValue ? visibleTrajectorySameTypeValue : centroidValue;
	optionsCentroidAll.visible = centroidValue ? !visibleTrajectorySameTypeValue : centroidValue;

	
	const chicagoPointLayer = new deck.GeoJsonLayer({
		id: 'chicago-crime-layer',
		data: chicago_crime_data,
		stroked: true,
		getFillColor: d => {
			switch(d.properties.primary_type) {
				case "ASSAULT":
					return CRIME_COLOR_RANGE[0];
					break;
				case "THEFT":
					return CRIME_COLOR_RANGE[1];
					break;
				case "SEX OFFENSE":
					return CRIME_COLOR_RANGE[2];
					break;
				case "OTHER OFFENSE":
					return CRIME_COLOR_RANGE[3];
					break;
				case "OFFENSE INVOLVING CHILDREN":
					return CRIME_COLOR_RANGE[4];
					break;
				case "NARCOTICS":
					return CRIME_COLOR_RANGE[5];
					break;
				case "CRIMINAL DAMAGE":
					return CRIME_COLOR_RANGE[6];
					break;
				case "HOMICIDE":
					return CRIME_COLOR_RANGE[7];
					break;
			};
		},
		getLineColor: d => pointColour,
		getRadius: d => 60,
		autoHighlight: true,
		highlightColor: pointHighlightColour, 
		radiusMinPixels: 30,
		pickable: true,
		fp64: false,
		onHover: updateTrajectoryLayerTooltip,
		visble: visibleTrajectoryValue
	});

	const chicagoTrajectorySameTypeLayer = new deck.GeoJsonLayer({
		id: 'chicago-trajectory-same-layer',
		data: chicago_trajectory_same_type_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => trajectoryLineColour,
		getLineColor: d => trajectoryLineColour,
		getRadius: d => 60,
		autoHighlight: true,
		highlightColor: trajectoryHighlightColor, 
		radiusMinPixels: 60,
		pickable: true,
		fp64: false,
		onHover: updateTrajectoryLayerTooltip,
		...optionsTrajectorySame
	});

	const chicagoTrajectoryAllTypeLayer = new deck.GeoJsonLayer({
		id: 'chicago-trajectory-all-layer',
		data: chicago_trajectory_all_type_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: true,
		getFillColor: d => trajectoryLineColour,
		getLineColor: d => trajectoryLineColour,
		getRadius: d => 60,
		autoHighlight: true,
		highlightColor: trajectoryHighlightColor, 
		radiusMinPixels: 60,
		pickable: true,
		fp64: false,
		onHover: updateTrajectoryLayerTooltip,
		...optionsTrajectoryAll
	});

	const centroidSameTypeLayer =	new deck.GeoJsonLayer({
		id: 'centroid-same-layer',
		data: centroid_same_type_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: false,
		getFillColor: d => [241, 206, 74, 100],
		getLineColor: d => [241, 206, 74, 100],
		getRadius: d => 20,
		radiusMinPixels: 20,
		pickable: true,
		fp64: false,
		onHover: updatecentroidSameTypeLayerTooltip,
		...optionsCentroidSame
	});

	const centroidAllTypeLayer =	new deck.GeoJsonLayer({
		id: 'centroid-all-layer',
		data: centroid_all_type_data,
		stroked: true,
		lineWidthMinPixels: 3,
		lineJointRounded: false,
		getFillColor: d => [241, 206, 74, 100],
		getLineColor: d => [241, 206, 74, 100],
		getRadius: d => 20,
		radiusMinPixels: 20,
		pickable: true,
		fp64: false,
		onHover: updatecentroidSameTypeLayerTooltip,
		...optionsCentroidAll
	});

	const chicagoTweetLayer = new deck.HexagonLayer({
		id: 'chicago-tweet-layer',
		colorRange: TWEET_COLOR_RANGE,
		lightSettings: LIGHT_SETTINGS,
		data: chicago_tweet_data,
		elevationRange: [0, 800],
		elevationScale: 4,
		getPosition: d => d,
		opacity: 0.4,
		coverage: 0.8,
		pickable: true,
		fp64: false,
		onHover: updateTweetLayerTooltip,
		z: 1,
		...optionsTweet
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
		fp64: false,
		...optionsTweet
	});

	deckgl.setProps({
		layers: [chicagoTweetLayer, chicagoTrajectorySameTypeLayer, chicagoTrajectoryAllTypeLayer, centroidSameTypeLayer, centroidAllTypeLayer, chicagoPointLayer]
	});
	$('.loader').hide()
};

/**
 * initialiseData() initialises the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async () => {
	let response_chicago_trajectory = await fetch(DATA_URL.CHICAGO_TRAJECTORY).then(res => res.json());

	chicago_trajectory_same_type_data = response_chicago_trajectory.crime.trajectorySameTypeGeoJSON[0];
	chicago_trajectory_all_type_data = response_chicago_trajectory.crime.trajectoryAllTypeGeoJSON[0];

	chicago_crime_data = response_chicago_trajectory.crime.crimeGeoPoints[0];

	chicago_tweet_data = response_chicago_trajectory
	.tweets[0]
	.features
	.map(tweet => (tweet.geometry.coordinates));

	centroid_same_type_data = response_chicago_trajectory.crime.centroidsSame;
	centroid_all_type_data = response_chicago_trajectory.crime.centroidsAll;
	statsBuilder();
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
			default: 
				break;
		}

		//Ask Jason about doing this automagically
		//Bodge for now soz
		document.getElementById("visible-centroid-handle").onclick = renderLayers;
		document.getElementById("visible-type-trajectory-handle").onclick = renderLayers;

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
		console.log(key);
	}	
}

_init();

