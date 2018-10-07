/**
 * CONSTANT VALUES AND OBJECTS
 */ 

// registered mapbox api access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidHJpcHBhbG9za2kiLCJhIjoiY2psMGFyZ3A1MTMxMTNxbG1qb3V6YWV0YyJ9.qF4x-o4Z7E6iwYedWjGo6Q';

// initial settings for the deckgl instance
const INITIAL_VIEW_STATE = {
	latitude: 41.88,
	longitude: -87.62,
	zoom: 13,
	pitch: 0,
	bearing: 0,
};

// options available to the user
const OPTIONS = {
	TWEET: ['radius', 'visible', 'extruded'],
	TRAJECTORY: ['visible'],
	CENTROID: ['visible'],
};

/**
 * MAP DATA
 */

// source data urls
const DATA_URL = {
	CHICAGO_TWEET: '/tweetmap',
	CHICAGO_TRAJECTORY: '/tweetmap',
	CHICAGO_TEMP: 'https://tinyurl.com/ycawn5tc',
};

// some colo(u)rs
const DATA_COLOURS = {
	pointHighlight: [0, 255, 162, 255],
	trajectoryLine: [255, 221, 51, 150],
	trajectoryHighlight: [51, 187, 255, 255],
};

// data objects
let chicagoTweetData = {
	points: null,
};

let chicagoTrajectoryData = {
	points: null,
	sameType: null,
	allType: null,
};

let chicagoCentroidData = {
	sameType: null,
	allType: null,
};

// hex layer color range
const TWEET_COLOR_RANGE = [
	[29, 161, 242],
	[73, 227, 255],
	[216, 254, 181],
	[254, 237, 177],
	[254, 173, 84],
	[209, 55, 78]
];

// hex layer light settings
const LIGHT_SETTINGS = {
	numberOfLights: 1,
	ambientRatio: 0.4,
	diffuseRatio: 0.6,
	specularRatio: 0.2,
};

// main deck.gl object
const deckgl = new deck.DeckGL({
	container: 'deckmap',
	mapStyle: 'mapbox://styles/mapbox/dark-v9',
	mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
	...INITIAL_VIEW_STATE
});

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

// statsBuilder = () =>
// {
// 	let crimeCount = chicago_crime_data.features.length;
// 	let crimeDateRange = `${chicago_crime_data.features[0].properties.date_stats_text} - ${chicago_crime_data.features[crimeCount - 1].properties.date_stats_text}`
// 	let crimeTypeObject = {}
// 	chicago_crime_data.features.forEach((crime) => 
// 	{
// 		if(crimeTypeObject.hasOwnProperty(`${crime.properties.primary_type}`))
// 		{
// 			crimeTypeObject[`${crime.properties.primary_type}`] += 1  
// 		} else
// 		{
// 			crimeTypeObject[`${crime.properties.primary_type}`] = 1  
// 		}
// 	})
// 	$("#stats-date-range p").empty()
// 	$("#stats-total p").empty()
// 	$( "#stats-crimes p").empty()
// 	$("#stats-panel p").empty()

// 	$("#stats-date-range").append("<p><strong>" + crimeDateRange + "</strong>")
// 	$("#stats-total").append("<p><strong>Total Found:</strong> " + crimeCount)
	
// 	Object.keys(crimeTypeObject).forEach(function(crime)
// 	{
// 			$( "#stats-crimes" ).append( `<p><strong>${toTitleCase(crime) + ':</strong> ' + crimeTypeObject[crime]}</p>` );
// 	});

// 	$("#stats-tweets").append("<p><strong>Total Found:</strong> " + "30.0K")

// 	$("#stats-panel").show()
// }

// toTitleCase = (str) => {
// 	str = str.toLowerCase().split(' ');
// 	for (var i = 0; i < str.length; i++) {
// 		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
// 	}
// 	return str.join(' ');
// };

// const updateTrajectoryLayerTooltip = ({x, y, object, layer}) => {
// 	try {
// 		const tooltip = document.getElementById('tooltip');

// 		if (object) {
// 			tooltip.style.visibility = 'visible';
// 			tooltip.style.top = `${y}px`;
// 			tooltip.style.left = `${x}px`;

// 			if (object.geometry.coordinates[1])
// 			{
// 				tooltip.innerHTML = `
// 				<div>Crime Details</div>
// 				<div>Date: ${object.properties.date_text}</div>
// 				<div>Latitude: ${object.geometry.coordinates[1]}</div>
// 				<div>Longitude: ${object.geometry.coordinates[0]}</div>
// 				<div>Crime Type: ${object.properties.primary_type}</div>
// 				<div>Description: ${object.properties.description}</div>
// 				<div>Location: ${object.properties.location_description}</div>`
// 			}
// 			else
// 			{
// 				tooltip.innerHTML = '<div>Trajectory Points -></div>';
// 				object.geometry.coordinates[0].forEach(item => {
// 				tooltip.innerHTML += `
// 					<div>Point ${object.geometry.coordinates[0].indexOf(item) + 1}: ${item}</div>
// 				`;
// 				});
// 				renderLayers();
// 			}
// 		} else {
// 			tooltip.innerHTML = '';
// 			tooltip.style.visibility = 'hidden';
// 		}
// 	} catch(e) {
// 		// kaksoispite dededede
// 	}
// };

// const updatecentroidSameTypeLayerTooltip = ({x, y, object}) => {
// 	try {
// 		const tooltip = document.getElementById('tooltip');
// 		if (object) {
// 			tooltip.style.visibility = 'visible';
// 			tooltip.style.top = `${y}px`;
// 			tooltip.style.left = `${x}px`;
// 			tooltip.innerHTML = `<div>Centroid at: ${object.geometry.coordinates[0]}, ${object.geometry.coordinates[1]}</div>`;
// 		} else {
// 			tooltip.innerHTML = '';
// 			tooltip.style.visibility = 'hidden';
// 		}
// 	} catch(e) {
// 		// kaksoispite dededede
// 	}
// };

// const updateTweetLayerTooltip = ({x, y, object}) => {
// 	try {
// 		const tooltip = document.getElementById('tooltip');
// 		if (object) {
// 			tooltip.style.visibility = 'visible';
// 			tooltip.style.top = `${y}px`;
// 			tooltip.style.left = `${x}px`;
// 			tooltip.innerHTML = `
// 				<div>latitude: ${object.centroid[0]}</div>
// 				<div>longitude: ${object.centroid[0]}</div>
// 				<div>${object.points.length} tweet${(object.points.length === 1) ? '' : 's'}</div>
// 			`;
// 		} else {
// 			tooltip.innerHTML = '';
// 			tooltip.style.visibility = 'hidden';
// 		}
// 	} catch(e) {
// 		// kaksoispite dededede
// 	}
// };

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

const getCrimeTypeColor = (type) => {
	switch(type) {
		case "ASSAULT":
			return [65, 244, 113];
		case "THEFT":
			return [66, 244, 244];
		case "SEX OFFENSE":
			return [66, 194, 244];
		case "OTHER OFFENSE":
			return [66, 134, 244];
		case "OFFENSE INVOLVING CHILDREN":
			return [69, 66, 244];
		case "NARCOTICS":
			return [244, 66, 244];
		case "CRIMINAL DAMAGE":
			return [188, 66, 244];
		case "HOMICIDE":
			return [244, 66, 66];
		default:
			break;
	};
};

/**
 * renderLayers() updates the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
const renderLayers = () => {
	// const optionsTweet = {};

	// const optionsCrimePoints = {};

	// const optionsTrajectorySame = {};
	// const optionsTrajectoryAll = {};

	// const optionsCentroidAll = {};
	// const optionsCentroidSame = {};

	// // const radiusTweetValue = document.getElementById('radius-tweet-handle').value;
	// // document.getElementById('radius-tweet-value').innerHTML = radiusTweetValue;
	// // optionsTweet.radius = radiusTweetValue;

	// const visibleTweetValue = document.getElementById('visible-tweet-handle').checked;
	// optionsTweet.visible = visibleTweetValue;

	// const visibleCrimePointValue = document.getElementById('visible-crime-point-handle').checked;
	// optionsCrimePoints.visible = visibleCrimePointValue;

	// // const extrudedTweetValue = document.getElementById('extruded-tweet-handle').checked;
	// // optionsTweet.extruded = extrudedTweetValue;


	// //Trjectory Checking
	// const visibleTrajectoryValue = document.getElementById('visible-trajectory-handle').checked;

	// const visibleTrajectorySameTypeValue = document.getElementById('visible-type-trajectory-handle').checked;
	// optionsTrajectorySame.visible = visibleTrajectoryValue ? visibleTrajectorySameTypeValue : visibleTrajectoryValue;
	// optionsTrajectoryAll.visible = visibleTrajectoryValue ? !visibleTrajectorySameTypeValue : visibleTrajectoryValue;

	// //Centroid Checking
	// const centroidValue = document.getElementById('visible-centroid-handle').checked;
	// optionsCentroidSame.visible = centroidValue ? visibleTrajectorySameTypeValue : centroidValue;
	// optionsCentroidAll.visible = centroidValue ? !visibleTrajectorySameTypeValue : centroidValue;

	const tweetLayer = new deck.HexagonLayer({
		id: 'tweet-layer',
		data: chicagoTweetData.points,
		pickable: true,
		colorRange: TWEET_COLOR_RANGE,
		lightSettings: LIGHT_SETTINGS,
		radius: 250,
		elevationRange: [0, 800],
		elevationScale: 4,
		opacity: 0.6,
		coverage: 0.9,
		fp64: false,
		z: 1,
		extruded: false,
		getPosition: d => d,
		// onHover: updateTweetLayerTooltip,
		// ...optionsTweet
	});

	const historicCrimeLayer = new deck.IconLayer({
		id: 'historic-icon-layer',
		data: chicagoTrajectoryData.points,
		iconAtlas: '/images/icon-point.png',
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 128,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => 'marker',
		getSize: d => 4,
		getColor: d => getCrimeTypeColor(d.properties.primary_type),
		// onHover: (() => console.log("Got one!")),
		// ...
	});

	const historicTrajectorySTLayer = new deck.PathLayer({
		id: 'hitoric-trajectory-st-layer',
		data: chicagoTrajectoryData.sameType,
		pickable: true,
		widthScale: 20,
		widthMinPixels: 2,
		widthMaxPixels: 8,
		getPath: d => d.path,
		getColor: d => getCrimeTypeColor(d.properties.primary_type),
		getWidth: d => 2,
		// onHover: ...
		// ...
	});

	const historicTrajectoryATLayer = new deck.PathLayer({
		id: 'hitoric-trajectory-at-layer',
		data: chicagoTrajectoryData.allType,
		pickable: true,
		widthScale: 20,
		widthMinPixels: 2,
		widthMaxPixels: 8,
		getPath: d => d.path,
		getColor: d => getCrimeTypeColor(d.properties.primary_type),
		getWidth: d => 2,
		// onHover: ...
		// ...
	});

	const historicCentroidSTLayer = new deck.IconLayer({
		id: 'historic-centroid-st-layer',
		data: chicagoCentroidData.sameType,
		iconAtlas: '/images/icon-centroid.png',
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 128,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => 'marker',
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		// onHover: (() => console.log("Got one!")),
		// ...
	});

	const historicCentroidATLayer = new deck.IconLayer({
		id: 'historic-centroid-at-layer',
		data: chicagoCentroidData.allType,
		iconAtlas: '/images/icon-centroid.png',
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 128,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => 'marker',
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		// onHover: (() => console.log("Got one!")),
		// ...
	});

	deckgl.setProps({
		layers: [],
	});
	// $('.loader').hide()
};

const filterData = async() => {
	return 0;
};

/**
 * Initialise the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	await fetch(DATA_URL.CHICAGO_TRAJECTORY)
	.then(res => res.json())
	.then(data => {
		chicagoTweetData.points = data.tweets[0].features.map(tweet => (
			tweet.geometry.coordinates
		));

		chicagoTrajectoryData.points = data.crime.crimeGeoPoints[0].features.map(point => ({
			coordinates: point.geometry.coordinates,
			properties: point.properties,
		}));

		chicagoTrajectoryData.sameType = data.crime.trajectorySameTypeGeoJSON[0].features.map(traject => ({
			path: traject.geometry.coordinates[0],
			properties: traject.properties,
		}));

		chicagoTrajectoryData.allType = data.crime.trajectoryAllTypeGeoJSON[0].features.map(traject => ({
			path: traject.geometry.coordinates[0],
			properties: traject.properties,
		}));

		chicagoCentroidData.sameType = data.crime.centroidsSame.features.map(centroid => ({
			coordinates: centroid.geometry.coordinates,
		}));

		chicagoCentroidData.allType = data.crime.centroidsAll.features.map(centroid => ({
			coordinates: centroid.geometry.coordinates,
		}));
	});

	// statsBuilder();
	renderLayers();
};

/**
 * Assign the renderLayers() function as an event handler to each input control
 */
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
		// wachu mean homie 
		//            - Jason
		// document.getElementById("visible-centroid-handle").onclick = renderLayers;
		// document.getElementById("visible-type-trajectory-handle").onclick = renderLayers;
		// document.getElementById("visible-crime-point-handle").onclick = renderLayers;

		// let inputType = document.getElementById(key + idSuffix).getAttribute("type");
		
		// if (inputType === "checkbox") {
		// 	document.getElementById(key + idSuffix).onclick = renderLayers; }
		// else
		// 	document.getElementById(key + idSuffix).oninput = renderLayers;
	});
};

/**
 * Initialise the interactive JS components
 */
const setupInterface = () => {
	// load collapsible menus
	document.addEventListener("DOMContentLoaded", () => {
		var elems = document.querySelectorAll(".collapsible");
		var instances = M.Collapsible.init(elems, {
			accordion: false
		});
	});

	// setup menu visiblity toggles
	var presetRadios = document.getElementsByName("preset-select");
	var tweetDensityMenu = document.querySelector("#menu-tweet-density");
	var crimeTrajectoriesMenu = document.querySelector("#menu-crime-trajectories");

	crimeTrajectoriesMenu.style.display = "none";

	presetRadios.forEach(elem => {
		elem.addEventListener("click", () => {
			switch(elem.value) {
				case "tweet-density":
					tweetDensityMenu.style.display = "block";
					crimeTrajectoriesMenu.style.display = "none";
					break;
				case "crime-trajectories":
					tweetDensityMenu.style.display = "none";
					crimeTrajectoriesMenu.style.display = "block";
					break;
				default:
					break;
			}
		});
	});

	// load dropdown menus
	document.addEventListener("DOMContentLoaded", () => {
		var elements = document.querySelectorAll("select");
		var instances = M.FormSelect.init(elements);
	});

	// setup slider for radius of tweet hexes
	var tweetRadiusSlider = document.querySelector("#radius-tweet-handle");
	noUiSlider.create(tweetRadiusSlider, {
		range: {
			"min": 100,
			"max": 800
		},
		step: 10,
		start: [200],
		tooltips: false,
		format: wNumb({
			decimals: 0
		}),
	});

	// tweetRadiusSlider.noUiSlider.on('update', function (values, handle) {
  //   dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
	// });

	// document.querySelector('#radius-tweet-value').innerHTML = radiusTweetValue;

	// DATE FUNCTIONS

	// create a new date from a string, return as a timestamp
	const getTimestamp = str => {
		return new Date(str).getTime();
	}

	var tweetDateSlider = document.querySelector("#date-tweet-handle");
	noUiSlider.create(tweetDateSlider, {
		range: {
				min: getTimestamp('2010'),
				max: getTimestamp('2016')
		},
		step: 24 * 60 * 60 * 1000,
		start: [getTimestamp('2011'), getTimestamp('2015')],
		tooltips: false,
		connect: true,
		format: wNumb({
				decimals: 0
		})
	});
};

/**
 * initialise the everything
 */
const runScript = () => {
	setupInterface();
	initialiseData();
	for (var key in OPTIONS) {
		registerEventHandlers(OPTIONS[key]);
	}	
}

runScript();
