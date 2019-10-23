/**
 * CONSTANT VALUES AND OBJECTS
 */ 

// registered mapbox api access token
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoidHJpcHBhbG9za2kiLCJhIjoiY2psMGFyZ3A1MTMxMTNxbG1qb3V6YWV0YyJ9.qF4x-o4Z7E6iwYedWjGo6Q";

// initial settings for the deckgl instance
const INITIAL_VIEW_STATE = {
	latitude: 41.88,
	longitude: -87.62,
	zoom: 13,
	pitch: 0,
	bearing: 0,
};

// hard-coded crime types
const CRIME_TYPES = ["ASSAULT", "THEFT", "BURGLARY", "SEX OFFENSE", "OTHER OFFENSE", "DOMESTIC VIOLENCE", "NARCOTICS", "CRIMINAL DAMAGE", "HOMICIDE", "GAMBLING", "KIDNAPPING", "NON-CRIMINAL"];

/**
 * MAP DATA
 */

// source data urls
const DATA_URL = {
	CHI_TWEET: "/tweetmap",
	CHI_TRAJECTORY: "/tweetmap",
	CHI_TEMP: "https://tinyurl.com/ycawn5tc",
};

// some colo(u)rs
const DATA_COLOURS = {
	pointHighlight: [0, 255, 162, 255],
	trajectoryLine: [255, 221, 51, 150],
	trajectoryHighlight: [255, 255, 66, 255],
};

// data objects
let chiTweetData = {
	points: null,
};

let chiMlData = {
	points: null,
};

let chiTrajectoryData = {
	points: null,
	sameType: null,
	allType: null,
};

let chiCentroidData = {
	sameType: null,
	allType: null,
};

let currentDate = "";

let timeline = null;

// the dates currently covered by the data stored in the main data objects
let dataDateRange = [];

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
	container: "deckmap",
	mapStyle: "mapbox://styles/mapbox/dark-v9",
	mapboxApiAccessToken: MAPBOX_ACCESS_TOKEN,
	...INITIAL_VIEW_STATE
});

//Updates tooltip for new data when hovered over by user.
const updateMlLayerTooltip = ({x, y, object}) => {
	try {
		
		console.log(object);
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>Latitude: ${object.centroid[0]}</div>
				<div>Longitude: ${object.centroid[0]}</div>
				<div>${object.points.length} image${(object.points.length === 1) ? "" : "s"}</div>
				<div>${object.points[0].properties.Caption}</div>
				<div><img width="100%" src=http://43.240.97.137/images/${object.points[0].properties.Image}></img></div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		console.log(e);
	}
};

//Updates tool tips when user hovers over on deck.gl map
const updateTrajectoryLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");

		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;

			if (object.geometry.coordinates[1]) {
				tooltip.innerHTML = `
				<div>Crime Details</div>
				<div>Date: ${object.properties.date_text}</div>
				<div>Latitude: ${object.geometry.coordinates[1]}</div>
				<div>Longitude: ${object.geometry.coordinates[0]}</div>
				<div>Type: ${object.properties.primary_type}</div>
				<div>Description: ${object.properties.description}</div>
				<div>Location: ${object.properties.location_description}</div>`
			} else {
				tooltip.innerHTML = `<div>Trajectory Path:</div>`;
				object.properties.trajectory_description.forEach((item, i, array) => {
					trajectoryPointType = item.split(" on ")[0];
					colourArray = getCrimeTypeColor(trajectoryPointType);
					colourString = `${colourArray[0]}, ${colourArray[1]}, ${colourArray[2]}`;
					return tooltip.innerHTML += `<div><span>
						<div 
							class="tooltip-legend" 
							style="
								background: rgb(${colourString}) none repeat scroll 0% 0%;
							"
						></div>
					</span> ${item} ${i + 1 < array.length ? "then" : ""}</div>`;
				});
			}
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// Error
	}
};

//Updates tooltip for centroids when hovered over by user.
const updateCentroidSameTypeLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `<div>Centroid at: ${object.geometry.coordinates[0]}, ${object.geometry.coordinates[1]}</div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// Error
	}
};

//Updates tooltip for Tweets when hovered over by user.
const updateTweetLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>Latitude: ${object.centroid[0]}</div>
				<div>Longitude: ${object.centroid[0]}</div>
				<div>${object.points.length} tweet${(object.points.length === 1) ? "" : "s"}</div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// Error
	}
};

//Updates tooltip for Chicago Crime points when hovered over by user.
const updateHistoricCrimeLayerTooltip  = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			colourArray = getCrimeTypeColor(object.properties.primary_type);
			colourString = `${colourArray[0]}, ${colourArray[1]}, ${colourArray[2]}`;
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>
					<span>
						<div 
							class="tooltip-legend" 
							style="
								background: rgb(${colourString}) none repeat scroll 0% 0%;
							"
						></div>
					</span>
					${object.properties.primary_type}
				</div>
				<div>Latitude: ${object.coordinates[0]}</div>
				<div>Longitude: ${object.coordinates[1]}</div>
				<div>Date: ${object.properties.date_text}</div>
				<div>Description: ${object.properties.description}</div>
			`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// Error
	}
};

//Gets colour for chicago data based on crime type
const getCrimeTypeColor = (type, pointDate, currentDate) => {
	// default opacity for all points
	var opacity = 255;

	// only go through this statement if pointDate and currentDate are defined otherwise we just go with opacity = 255
	if (pointDate && currentDate) { 
		opacity = (pointDate === currentDate) ? 255 : 0;
	}
	
	switch(type.toUpperCase()) {
		case "ASSAULT":
		case "BATTERY":
			return [65, 244, 113, opacity];
		case "THEFT":
			return [66, 244, 244, opacity];
		case "BURGLARY":
			return [66, 134, 244, opacity];
		case "SEX OFFENSE":
			return [255, 165, 0, opacity];
		case "OTHER OFFENSE":
			return [200, 200, 200, opacity];
		case "DOMESTIC VIOLENCE":
			return [69, 66, 244, opacity];
		case "NARCOTICS":
			return [244, 66, 244, opacity];
		case "CRIMINAL DAMAGE":
			return [188, 66, 244, opacity];
		case "HOMICIDE":
			return [244, 66, 66, opacity];
		case "GAMBLING":
			return [66, 244, 170, opacity];
		case "KIDNAPPING":
			return [247, 255, 114, opacity];
		case "NON-CRIMINAL":
			return [255, 205, 113, opacity];
		case "ALL":
			return [0, 0, 0, opacity];
		default:
			return [255, 255, 255, opacity];
	};
};

//Filters the map based on users parameters.
const filterMap = () => {	
	let query = {}

	if($('#type').val().toUpperCase() != "ALL") {
		query.Primary_Type = $('#type').val().toUpperCase();
	}

	if($('#limit').val() != "" && typeof parseInt($('#limit').val()) == 'number') {
		query.limit = $('#limit').val();
	}

	query.Year = $('#year').val();
	
	if($('#startDate').val() != "") {
		query.Date = {
			$gte: $('#startDate').val(), 
			$lt: $('#endDate').val()
		};
	}

	axios.post("/tweetMap", query)
	.then((res) => {
		loadData(res.data, "filter");
		renderLayers();
	});
};

//Sets up a timeline for trajecroties.
setupTimeline = () => {
	var ctx = document.querySelector("#crimeTrajectoriesTimeline").getContext("2d");
	timeline = new Chart(ctx, {
		type: "line",
		data: {
			labels: [],
			datasets: [{
				label: "",
				fill: false,
				borderColor: "rgb(0, 0, 0)",
				pointRadius: 7,
				data: []
			}]
		},
		options: {
			animation: false
		}
	});
};

/**
 * Update the timeline chart object with data from the global data objects
 */
updateTimeline = (currentDate) => {
	// the crime type currently selected by the input handles
	var selectedCrimeType = document.querySelector("#type").value;

	// the rgb value based on the selected crime type, in a format that chart.js likes
	var rgbString = `rgb(${getCrimeTypeColor(selectedCrimeType)[0]}, ${getCrimeTypeColor(selectedCrimeType)[1]}, ${getCrimeTypeColor(selectedCrimeType)[2]})`;

	// group the array of crime points by date
	var crimesByDate = _.groupBy(chiTrajectoryData.points, point => {
		return point.properties.date.substring(0, 10);
	});

	// array of total number of crimes per date, to be used for the chart's y values
	var crimeCountArray = Object.values(crimesByDate).map(crimeArray => (crimeArray.length));

	// set the timeline chart object values
	timeline.data.labels = dataDateRange;
	timeline.data.datasets[0].label = selectedCrimeType;
	timeline.data.datasets[0].borderColor = rgbString;
	timeline.data.datasets[0].data = crimeCountArray;

	var activeColorArray = []

	if (currentDate) {
		for (let i = 0; i < dataDateRange.length; i++) {
			if (dataDateRange[i] === currentDate) {
				activeColorArray.push(rgbString);
			} else {
				activeColorArray.push("rgba(0, 0, 0, 0)");
			}
		}
	}

	timeline.data.datasets[0].pointBackgroundColor = activeColorArray;

	// update the timeline chart object
	timeline.update();
};

/**
 * Just a basic timer
 * @param {int} ms: the number of milliseconds to wait (1s = 1000ms)
 */
sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Step through each day in the timeline and appropriately show/hide data points on the map
 */
stepThroughTimeline = async () => {

	// step through each date in dataDateRange
	for (let i = 0; i < dataDateRange.length; i++) {

		// dataDateRange[i] controls the visibility of points
		renderLayers(dataDateRange[i]);

		// wait a while
		await sleep(2000);

		// revert to the original configuration and show all points when we've gone through all the dates
		if (i === dataDateRange.length - 1) renderLayers();
	}
};

/**
 * Capitalises the first letter of each word...
 * ...So You End Up With Something Like This
 * @param {string} string 
 */
const toTitleCase = (string) => {
	string = string.toLowerCase().split(" ");
	for (let i = 0; i < string.length; i++) {
		string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
	}
	return string.join(" ");
};

//Toggles the panels when button is clicked.
const togglePanels = () =>
{
	dataPanel = document.querySelector("#control-panel");
	statsPanel = document.querySelector("#right-panel");
   
	dataPanel.style.display = dataPanel.style.display == "none" ? "block" : "none";
	statsPanel.style.display = statsPanel.style.display == "none" ? "block" : "none";
	document.getElementById("toggle-panels").innerText = document.getElementById("toggle-panels").innerText == "HIDE PANELS" ? "Show Panels" : "Hide Panels";
}

//Shows a crime type legend with each crime types colour.
const renderCrimeTypeLegend = () => {
	legendDiv = document.querySelector("#crime-type-legend");
	htmlString = ``;
	CRIME_TYPES.forEach(item => {
		colourArray = getCrimeTypeColor(item);
		colourString = `${colourArray[0]}, ${colourArray[1]}, ${colourArray[2]}`;
		htmlString += `
			<p>
				<span>
					<div 
						class="legend" 
						style="
							background: rgb(${colourString}) none repeat scroll 0% 0%;
							border-radius: 5px;
						"
					></div>
				</span>
				<label>
					${toTitleCase(item)}
				</label>
			</p>
		`;
	});
	legendDiv.innerHTML = htmlString;
};

/**
 * Update the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
renderLayers = (currentDate) => {

	// declare configurable options for each data layer

	let chiTweetOptions = {
		points: {},
	};

<<<<<<< HEAD
=======
	let chiMlOptions = {
		points: {},
	};

>>>>>>> 317fa2c... FEATURE: Make new machine learning data visible on map
	let chiTrajectOptions = {
		points: {},
		sameType: {},
		allType: {},
	};

	let chiCentroidOptions = {
		sameType: {},
		allType: {},
	};

	// retrieve values from html input fields in deckmap.pug

	// the value of the visualisation preset the user wants to see (tweet density or trajectories)
	selectedPresetValue = document.querySelector("input[name='preset-select']:checked").value;
	tweetDensityStatistics = document.querySelector("#statistics-tweet-density");
	crimeTrajectoriesStatistics = document.querySelector("#statistics-crime-trajectories");
	bothStatistics = document.querySelector("#statistics-both");


	crimeTrajectoriesVisible = document.getElementById("trajectories-visble").checked ;
	crimePointsVisble = document.getElementById("crimes-visble").checked;
	centroidsVisble = document.getElementById("centroids-visble").checked;
	tweetsVisble = document.getElementById("tweets-visble").checked;

	tweetDisplay = document.querySelector(".tweet-display"); 
	crimeDisplay = document.querySelector(".crime-display"); 

	selectedTrajectoryValue = document.querySelector("input[name='trajectory-crime-type']:checked").value;
	
	ATVisble = selectedTrajectoryValue == "all-trajectories" ? true : false;
	STVisble = selectedTrajectoryValue == "same-trajectories" ? true : false;


	// set the new values into the options objects so we can feed them into the data layers

	switch(selectedPresetValue) {
		case "tweet-density":
			tweetDensityStatistics.style.display = "block";
			tweetDisplay.style.display = "block";
			crimeDisplay.style.display = "none";
			crimeTrajectoriesStatistics.style.display = "none";
			chiTweetOptions.points.visible = tweetsVisble;
			chiTrajectOptions.points.visible = false;
			chiTrajectOptions.sameType.visible = false;
			chiTrajectOptions.allType.visible = false;
			chiCentroidOptions.sameType.visible = false;
			chiCentroidOptions.allType.visible = false;
			break;
		case "crime-trajectories":
			tweetDensityStatistics.style.display = "none";
			tweetDisplay.style.display = "none";
			crimeDisplay.style.display = "block";
			crimeTrajectoriesStatistics.style.display = "block";
			chiTweetOptions.points.visible = false;
<<<<<<< HEAD
			chiTrajectOptions.points.visible = crimePointsVisble;
			chiTrajectOptions.sameType.visible = STVisble ? crimeTrajectoriesVisible: false;
			chiTrajectOptions.allType.visible = ATVisble ? crimeTrajectoriesVisible : false;
			chiCentroidOptions.sameType.visible = STVisble ? centroidsVisble: false;
			chiCentroidOptions.allType.visible = ATVisble ? centroidsVisble : false;
			renderCrimeTypeLegend();
=======
			chiTrajectOptions.points.visible = crimePointsVisible;
			chiTrajectOptions.sameType.visible = STVisible ? crimeTrajectoriesVisible: false;
			chiTrajectOptions.allType.visible = ATVisible ? crimeTrajectoriesVisible : false;
			chiCentroidOptions.sameType.visible = STVisible ? centroidsVisible: false;
			chiCentroidOptions.allType.visible = ATVisible ? centroidsVisible : false;
			renderCrimeTypeLegend();
			break;
		case "machine-learning":
			tweetDensityStatistics.style.display = "block";
			tweetDisplay.style.display = "none";
			crimeDisplay.style.display = "none";
			crimeTrajectoriesStatistics.style.display = "none";
			chiTweetOptions.points.visible = false;
			chiTrajectOptions.points.visible = false;
			chiMlOptions.points.visible = true;
			chiTrajectOptions.sameType.visible = STVisible ? crimeTrajectoriesVisible: false;
			chiTrajectOptions.allType.visible = ATVisible ? crimeTrajectoriesVisible : false;
			chiCentroidOptions.sameType.visible = STVisible ? centroidsVisible: false;
			chiCentroidOptions.allType.visible = ATVisible ? centroidsVisible : false;
>>>>>>> 317fa2c... FEATURE: Make new machine learning data visible on map
			break;
		case "both":
			tweetDensityStatistics.style.display = "block";
			tweetDisplay.style.display = "block";
			crimeDisplay.style.display = "block";
			crimeTrajectoriesStatistics.style.display = "block";
			chiTweetOptions.points.visible = tweetsVisble;
			chiTrajectOptions.points.visible = crimePointsVisble;
			chiTrajectOptions.sameType.visible = STVisble ? crimeTrajectoriesVisible: false;
			chiTrajectOptions.allType.visible = ATVisble ? crimeTrajectoriesVisible : false;
			chiCentroidOptions.sameType.visible = STVisble ? centroidsVisble: false;
			chiCentroidOptions.allType.visible = ATVisble ? centroidsVisble : false;
			renderCrimeTypeLegend();
			break;
		default:
			crimeTypeValue = "ALL";
			break;
	};

	// render the timeline

	updateTimeline(currentDate);

	// declare data layers

	const tweetLayer = new deck.HexagonLayer({
		id: "tweet-layer",
		data: chiTweetData.points,
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
		onHover: updateTweetLayerTooltip,
		...chiTweetOptions.points,
	});
<<<<<<< HEAD
=======

	const mlLayer = new deck.HexagonLayer({
		id: "ml-layer",
		data: chiMlData.points,
		pickable: true,
		lightSettings: LIGHT_SETTINGS,
		radius: 150,
		elevationRange: [0, 800],
		elevationScale: 4,
		opacity: 0.6,
		coverage: 0.9,
		fp64: false,
		z: 1,
		extruded: true,
		getPosition: d => d.coordinates,
		onHover: updateMlLayerTooltip,
		...chiMlOptions.points,
	});	
>>>>>>> 317fa2c... FEATURE: Make new machine learning data visible on map
	
	var historicCrimeLayer = new deck.IconLayer({
		id: "historic-crime-layer",
		data: chiTrajectoryData.points,
		iconAtlas: "/images/icon-point.png",
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 64,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => getCrimeTypeColor(d.properties.primary_type, d.properties.date.substring(0, 10), currentDate),
		updateTriggers: {
			getColor: currentDate
		},
		onHover: updateHistoricCrimeLayerTooltip,
		...chiTrajectOptions.points,
	});
	
	var historicTrajectorySTLayer = new deck.GeoJsonLayer({
		id: "hitoric-trajectory-st-layer",
		data: chiTrajectoryData.sameType,
		pickable: true,
		stroked: false,
		lineWidthScale: 20,
		autoHighlight: true,
		highlightColor: DATA_COLOURS.trajectoryHighlight,
		lineWidthMinPixels: 2,
		lineWidthMaxPixels: 10,
		getLineColor: d =>getCrimeTypeColor(d.properties.primary_type, d.properties.date.substring(0, 10), currentDate),
		updateTriggers: {
			getLineColor: currentDate
		},
		onHover: updateTrajectoryLayerTooltip,
		...chiTrajectOptions.sameType,
	});

	var historicTrajectoryATLayer = new deck.GeoJsonLayer({
		id: "hitoric-trajectory-at-layer",
		data: chiTrajectoryData.allType,
		pickable: true,
		stroked: false,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		lineWidthMaxPixels: 10,
		autoHighlight: true,
		highlightColor: DATA_COLOURS.trajectoryHighlight,
		getLineColor: d => getCrimeTypeColor(d.properties.primary_type, d.properties.date.substring(0, 10), currentDate),
		updateTriggers: {
			getLineColor: currentDate
		},
		onHover: updateTrajectoryLayerTooltip,
		...chiTrajectOptions.allType,
	});

	var historicCentroidSTLayer = new deck.IconLayer({
		id: "historic-centroid-st-layer",
		data: chiCentroidData.sameType,
		iconAtlas: "/images/icon-centroid.png",
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 64,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		onHover: updateCentroidSameTypeLayerTooltip,
		updateTriggers: {
			getColor: currentDate
		},
		...chiCentroidOptions.sameType,
	});

	var historicCentroidATLayer = new deck.IconLayer({
		id: "historic-centroid-at-layer",
		data: chiCentroidData.allType,
		iconAtlas: "/images/icon-centroid.png",
		pickable: true,
		iconMapping: {
			marker: {
				x: 0,
				y: 0,
				width: 128,
				height: 128,
				anchorY: 64,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		onHover: updateCentroidSameTypeLayerTooltip,
		updateTriggers: {
			getColor: currentDate
		},
		...chiCentroidOptions.allType,
	});

	// add the data layers to the main deckgl object
	deckgl.setProps({
		layers: [tweetLayer, mlLayer, historicCrimeLayer, historicTrajectorySTLayer, historicCentroidSTLayer, historicTrajectoryATLayer, historicCentroidATLayer],
	});
};

/**
 * @param {object} data 
 * compute tweet data and load them into their appropriate data variables
 */
const loadData = (data, mode) => {
	try {
		if (mode === "default") {
			chiTweetData.points = data.tweets[0].features.map(tweet => (
				tweet.geometry.coordinates
			));
		}

		chiTrajectoryData.points = data.crime.crimeGeoPoints[0].features.map(point => ({
			coordinates: point.geometry.coordinates,
			properties: point.properties
		}));

		chiTrajectoryData.sameType = data.crime.trajectorySameTypeGeoJSON[0];

		chiTrajectoryData.allType = data.crime.trajectoryAllTypeGeoJSON[0];

		chiCentroidData.sameType = data.crime.centroidsSame.features.map(centroid => ({
			coordinates: centroid.geometry.coordinates
		}));

		chiCentroidData.allType = data.crime.centroidsAll.features.map(centroid => ({
			coordinates: centroid.geometry.coordinates
		}));

		// group the array of crime points by date
		var crimesByDate = _.groupBy(chiTrajectoryData.points, point => {
			return point.properties.date.substring(0, 10);
		});

		// array of dates represented in crimesByDate
		dataDateRange = Object.keys(crimesByDate);
	} catch(e) {
		console.log("Error: Could not load data: " + e);
	};
};

const loadMlData = (data) => {
	try {
		chiMlData.points = data.data.map(point => ({
			coordinates: point.geometry.coordinates,
			properties: point.properties
		}));
		console.log(chiMlData);
		
	} catch (e) {
		console.log(e);
	}
}

/**
 * Initialise the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	console.log("Loading data...");
	
	await fetch('/mlmap')
    .then(res => res.json())
	.then(data => loadMlData(data))
	.then(console.log("ML Map data loaded."))
	.catch((e) => console.log("Error in loading ML data. " + e));
	
	await fetch(DATA_URL.CHI_TRAJECTORY)
	.then(res => res.json())
	.then(data => loadData(data, "default"))
	.then(console.log("Chicago trajectory data loaded."))
	.catch(() => console.log("Error in loading Chicago trajectory data."));


	// statsBuilder();
	renderLayers();
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

	document.querySelector("#statistics-crime-trajectories").style.display = "none";

	setupTimeline();
};

<<<<<<< HEAD
/**
 * initialise everything
 */
const runScript = () => {
=======
const runScript = () => {
    console.log("Setting up DeckGL...");
    
>>>>>>> 317fa2c... FEATURE: Make new machine learning data visible on map
	setupInterface();
	initialiseData();
}

<<<<<<< HEAD
runScript();
=======
runScript();
>>>>>>> 317fa2c... FEATURE: Make new machine learning data visible on map
