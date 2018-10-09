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

// options available to the user
const OPTIONS = {
	TWEET: ["radius", "visible", "extruded"],
	TRAJECTORY: ["visible"],
	CENTROID: ["visible"],
};

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
	trajectoryHighlight: [51, 187, 255, 255],
};

// data objects
let chiTweetData = {
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

// statsBuilder = () =>
// {
// 	let crimeCount = CHI_crime_data.features.length;
// 	let crimeDateRange = `${CHI_crime_data.features[0].properties.date_stats_text} - ${CHI_crime_data.features[crimeCount - 1].properties.date_stats_text}`
// 	let crimeTypeObject = {}
// 	CHI_crime_data.features.forEach((crime) => 
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
// 			$( "#stats-crimes" ).append( `<p><strong>${toTitleCase(crime) + ":</strong> " + crimeTypeObject[crime]}</p>` );
// 	});

// 	$("#stats-tweets").append("<p><strong>Total Found:</strong> " + "30.0K")

// 	$("#stats-panel").show()
// }

// toTitleCase = (str) => {
// 	str = str.toLowerCase().split(" ");
// 	for (var i = 0; i < str.length; i++) {
// 		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
// 	}
// 	return str.join(" ");
// };

const updateTrajectoryLayerTooltip = ({x, y, object, layer}) => {
	try {
		const tooltip = document.getElementById("tooltip");

		if (object) {
			tooltip.style.visibility = "visible";
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
				tooltip.innerHTML = "<div>Trajectory Points -></div>";
				object.geometry.coordinates[0].forEach(item => {
				tooltip.innerHTML += `
					<div>Point ${object.geometry.coordinates[0].indexOf(item) + 1}: ${item}</div>
				`;
				});
				renderLayers();
			}
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// kaksoispite dededede
	}
};

const updatecentroidSameTypeLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.getElementById("tooltip");
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
		// kaksoispite dededede
	}
};

const updateTweetLayerTooltip = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>latitude: ${object.centroid[0]}</div>
				<div>longitude: ${object.centroid[0]}</div>
				<div>${object.points.length} tweet${(object.points.length === 1) ? "" : "s"}</div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// kaksoispite dededede
	}
};

const updateHistoricCrimeLayerTooltip  = ({x, y, object}) => {
	try {
		const tooltip = document.querySelector("#tooltip");
		if (object) {
			tooltip.style.visibility = "visible";
			tooltip.style.top = `${y}px`;
			tooltip.style.left = `${x}px`;
			tooltip.innerHTML = `
				<div>latitude: ${object.coordinates[0]}</div>
				<div>longitude: ${object.coordinates[1]}</div>
				<div>date: ${object.properties.date_text}</div>
				<div>description: ${object.properties.description}</div>
				<div>type: ${object.properties.primary_type}</div>`;
		} else {
			tooltip.innerHTML = "";
			tooltip.style.visibility = "hidden";
		}
	} catch(e) {
		// kaksoispiste dededede
	}
};

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

const filterMap = () => {
	// $(".loader").show()
	
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

const setupTimeline = () => {
	var crimesByDate = _.groupBy(chiTrajectoryData.points, point => {
		return point.properties.date.substring(0, 10);
	});

	var aggregatedCrimesByDate = Object.keys(crimesByDate).map(item => ({
		t: new Date(item),
		y: crimesByDate[item].length
	}));

	// console.log(aggregatedCrimesByDate);

	var ctx = document.querySelector("#crimeTrajectoriesTimeline").getContext("2d");
	var chart = new Chart(ctx, {
		type: "line",
		data: {
			datasets: [{
				label: "Data",
				fill: false,
				borderColor: "rgb(255, 99, 132)",
				data: aggregatedCrimesByDate
			}]
		},
		options: {
			// scales: {
			// 	xAxes: [{
			// 		type: 'time',
			// 		time: {
			// 			unit: 'day'
			// 		}
			// 	}],
			// 	yAxes: [{}]
			// }
		}
	});
};

/**
 * renderLayers() updates the data layer(s) according to changes in the options and updates
 * the DOM accordingly. The new layer(s) are then passed into the deckgl instance.
 */
const renderLayers = () => {

	// declare configurable options for each data layer

	let chiTweetOptions = {
		points: {},
	};

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

	// set the new values into the options objects so we can feed them into the data layers

	switch(selectedPresetValue) {
		case "tweet-density":
			tweetDensityStatistics.style.display = "block";
			crimeTrajectoriesStatistics.style.display = "none";
			chiTweetOptions.points.visible = true;
			chiTrajectOptions.points.visible = false;
			chiTrajectOptions.sameType.visible = false;
			chiTrajectOptions.allType.visible = false;
			chiCentroidOptions.sameType.visible = false;
			chiCentroidOptions.allType.visible = false;
			break;
		case "crime-trajectories":
			tweetDensityStatistics.style.display = "none";
			crimeTrajectoriesStatistics.style.display = "block";
			chiTweetOptions.points.visible = false;
			chiTrajectOptions.points.visible = true;
			chiTrajectOptions.sameType.visible = true;
			chiTrajectOptions.allType.visible = false;
			chiCentroidOptions.sameType.visible = true;
			chiCentroidOptions.allType.visible = false;
			break;
		default:
			crimeTypeValue = "ALL";
			break;
	};

	setupTimeline();

	// update display options and statistics panels

	// presetRadios.forEach(elem => {
	// 	elem.addEventListener("click", () => {
	// 		switch(elem.value) {
	// 			case "tweet-density":
	// 				tweetDensityMenu.style.display = "block";
	// 				crimeTrajectoriesMenu.style.display = "none";
	// 				break;
	// 			case "crime-trajectories":
	// 				tweetDensityMenu.style.display = "none";
	// 				crimeTrajectoriesMenu.style.display = "block";
	// 				break;
	// 			default:
	// 				break;
	// 		}
	// 	});
	// });

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

	const historicCrimeLayer = new deck.IconLayer({
		id: "historic-icon-layer",
		data: chiTrajectoryData.points,
		iconAtlas: "/images/icon-point.png",
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
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => getCrimeTypeColor(d.properties.primary_type),
		onHover: updateHistoricCrimeLayerTooltip,
		...chiTrajectOptions.points,
	});

	const historicTrajectorySTLayer = new deck.GeoJsonLayer({
		id: "hitoric-trajectory-st-layer",
		data: chiTrajectoryData.sameType,
		pickable: true,
		stroked: false,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		lineWidthMaxPixels: 10,
		getLineColor: d => getCrimeTypeColor(d.properties.primary_type),
		onHover: updateTrajectoryLayerTooltip,
		...chiTrajectOptions.sameType,
	});

	const historicTrajectoryATLayer = new deck.GeoJsonLayer({
		id: "hitoric-trajectory-at-layer",
		data: chiTrajectoryData.allType,
		pickable: true,
		stroked: false,
		lineWidthScale: 20,
		lineWidthMinPixels: 2,
		lineWidthMaxPixels: 10,
		getLineColor: d => getCrimeTypeColor(d.properties.primary_type),
		onHover: updateTrajectoryLayerTooltip,
		...chiTrajectOptions.allType,
	});

	const historicCentroidSTLayer = new deck.IconLayer({
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
				anchorY: 128,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		onHover: updatecentroidSameTypeLayerTooltip,
		...chiCentroidOptions.sameType,
	});

	const historicCentroidATLayer = new deck.IconLayer({
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
				anchorY: 128,
				mask: true,
			}
		},
		sizeScale: 15,
		getPosition: d => d.coordinates,
		getIcon: d => "marker",
		getSize: d => 4,
		getColor: d => [255, 255, 0],
		// onHover: (() => console.log("Got one!")),
		...chiCentroidOptions.allType,
	});

	// add the data layers to the main deckgl object
	deckgl.setProps({
		layers: [tweetLayer, historicCrimeLayer, historicTrajectorySTLayer, historicCentroidSTLayer],
		// layers: [tweetLayer],
	});
	// $(".loader").hide()
};

const filterData = async() => {
	return 0;
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

	} catch(e) {
		console.log("Error: Could not load data");
	};
};

/**
 * Initialise the global data variables by fetching data from the endpoints
 * specified in DATA_URL. Called once only.
 */
const initialiseData = async() => {
	await fetch(DATA_URL.CHI_TRAJECTORY)
	.then(res => res.json())
	.then(data => loadData(data, "default"))
	.catch(() => console.log("Error in loading data."));

	// statsBuilder();
	renderLayers();
};

/**
 * Assign the renderLayers() function as an event handler to each input control
 */
const registerEventHandlers = (options) => {
	// there"s probably a better way to do this
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

	document.querySelector("#statistics-crime-trajectories").style.display = "none";

	setupTimeline();

	// setup slider for radius of tweet hexes
	// var tweetRadiusSlider = document.querySelector("#radius-tweet-handle");
	// noUiSlider.create(tweetRadiusSlider, {
	// 	range: {
	// 		"min": 100,
	// 		"max": 800
	// 	},
	// 	step: 10,
	// 	start: [200],
	// 	tooltips: false,
	// 	format: wNumb({
	// 		decimals: 0
	// 	}),
	// });

	// tweetRadiusSlider.noUiSlider.on("update", function (values, handle) {
	//   dateValues[handle].innerHTML = formatDate(new Date(+values[handle]));
	// });

	// document.querySelector("#radius-tweet-value").innerHTML = radiusTweetValue;
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
