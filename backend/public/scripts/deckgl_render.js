/**
 * TODO:
 * - Add crime legend on to stats panel ✅
 * - Fix timeline chart scaling ✅
 * - Fix CSS on data panel
 * - Create endpoint to get # of tweets
 * - Add display options to topright panel
 * - Data points highlighting on hover (and also add a brush?)
 * - Use more opaque icons (maybe just do a dot)
 */

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

// 	$("#stats-date-range").append("<p><strong>Range: " + crimeDateRange + "</strong>")
// 	$("#stats-total").append("<p><strong>Total Found:</strong> " + crimeCount)
	
// 	let ordered = {};
// 	Object.keys(crimeTypeObject).sort().forEach(function(key) {
// 	  ordered[key] = crimeTypeObject[key];
// 	});
// 	crimeTypeObject = ordered;
// 	Object.keys(crimeTypeObject).forEach(function(crime)
// 	{
// 		//This is really really bad, to be fixed
// 		let dotColour = function(dotCrime){
// 			switch(dotCrime) 
// 			{
// 				case "ASSAULT":
// 					return CRIME_COLOR_RANGE[0];
// 					break;
// 				case "THEFT":
// 					return CRIME_COLOR_RANGE[1];
// 					break;
// 				case "SEX OFFENSE":
// 					return CRIME_COLOR_RANGE[2];
// 					break;
// 				case "OTHER OFFENSE":
// 					return CRIME_COLOR_RANGE[3];
// 					break;
// 				case "DOMESTIC VIOLENCE":
// 					return CRIME_COLOR_RANGE[4];
// 					break;
// 				case "NARCOTICS":
// 					return CRIME_COLOR_RANGE[5];
// 					break;
// 				case "CRIMINAL DAMAGE":
// 					return CRIME_COLOR_RANGE[6];
// 					break;
// 				case "HOMICIDE":
// 					return CRIME_COLOR_RANGE[7];
// 					break;
// 				case "GAMBLING":
// 					return CRIME_COLOR_RANGE[8];
// 					break;
// 				case "KIDNAPPING":
// 					return CRIME_COLOR_RANGE[9];
// 					break;
// 				case "NON-CRIMINAL":
// 					return CRIME_COLOR_RANGE[10];
// 					break;
// 				default: 	
// 					return CRIME_COLOR_RANGE[10];
// 					break;
// 		}}(crime);
//     	$( "#stats-crimes" ).append( `<p><span class="dot" style="background-color: ${"rgba(" + dotColour.join(", ") + "1"}"></span><strong>${toTitleCase(crime) + ':</strong> ' + crimeTypeObject[crime]}</p>` );
// 	});

// 	$("#stats-tweets").append("<p><strong>Total Found:</strong> " + "30.0K")

// 	$("#stats-panel").show()
// }

const updateTrajectoryLayerTooltip = ({x, y, object, layer}) => {
	try {
		const tooltip = document.getElementById("tooltip");

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
				<div>Crime Type: ${object.properties.primary_type}</div>
				<div>Description: ${object.properties.description}</div>
				<div>Location: ${object.properties.location_description}</div>`
			} else {
				// tooltip.innerHTML = "<div>Trajectory Points -></div>";
				// object.geometry.coordinates[0].forEach(item => {
				// tooltip.innerHTML += `
				// 	<div>Point ${object.geometry.coordinates[0].indexOf(item) + 1}: ${item}</div>
				// `;
				tooltip.innerHTML = `<div>${object.properties.trajectory_description.length} Crimes in Trajectory:</div>`;
				object.properties.trajectory_description.forEach((item, i, array) => {
				tooltip.innerHTML += `<div> ${item} ${i + 1 < array.length ? "then" : ""}</div>`;
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
	switch(type.toUpperCase()) {
		case "ASSAULT":
		case "BATTERY":
			return [65, 244, 113];
		case "THEFT":
			return [66, 244, 244];
		case "BURGLARY":
			return [66, 134, 244];
		case "SEX OFFENSE":
			return [255, 165, 0];
		case "OTHER OFFENSE":
			return [200, 200, 200];
		case "DOMESTIC VIOLENCE":
			return [69, 66, 244];
		case "NARCOTICS":
			return [244, 66, 244];
		case "CRIMINAL DAMAGE":
			return [188, 66, 244];
		case "HOMICIDE":
			return [244, 66, 66];
		case "GAMBLING":
			return [66, 244, 170];
		case "KIDNAPPING":
			return [247, 255, 114];
		case "NON-CRIMINAL":
			return [255, 205, 113];
		case "ALL":
			return [0, 0, 0];
		default:
			return [255, 255, 255];
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
	var selectedCrimeType = document.querySelector("#type").value;
	var rgbString = `rgb(${getCrimeTypeColor(selectedCrimeType)[0]}, ${getCrimeTypeColor(selectedCrimeType)[1]}, ${getCrimeTypeColor(selectedCrimeType)[2]})`;

	// group the array of crime points by date
	var crimesByDate = _.groupBy(chiTrajectoryData.points, point => {
		return point.properties.date.substring(0, 10);
	});

	// array of dates represented in crimesByDate, to be used for the chart's x values
	var crimeDateArray = Object.keys(crimesByDate);

	// array of total number of crimes per date, to be used for the chart's y values
	var crimeCountArray = Object.values(crimesByDate).map(crimeArray => (crimeArray.length));

	var ctx = document.querySelector("#crimeTrajectoriesTimeline").getContext("2d");
	var chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: crimeDateArray,
			datasets: [{
				label: selectedCrimeType,
				fill: false,
				borderColor: rgbString,
				data: crimeCountArray
			}]
		},
		options: {}
	});
};

const toTitleCase = (string) => {
	string = string.toLowerCase().split(" ");
	for (var i = 0; i < string.length; i++) {
		string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
	}
	return string.join(" ");
};

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
	bothStatistics = document.querySelector("#statistics-both");


	crimeTrajectoriesVisible = document.getElementById("trajectories-visble").checked ;
	crimePointsVisble = document.getElementById("crimes-visble").checked;
	centroidsVisble = document.getElementById("centroids-visble").checked;
	tweetsVisble = document.getElementById("tweets-visble").checked;

	tweetDisplay = document.querySelector(".tweet-display"); 
	crimeDisplay = document.querySelector(".crime-display"); 

	console.log(crimeTrajectoriesVisible)
	console.log(crimePointsVisble)

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
			chiTrajectOptions.points.visible = crimePointsVisble;
			chiTrajectOptions.sameType.visible = crimeTrajectoriesVisible;
			chiTrajectOptions.allType.visible = false;
			chiCentroidOptions.sameType.visible = centroidsVisble;
			chiCentroidOptions.allType.visible = false;
			renderCrimeTypeLegend();
			break;
		case "both":
			tweetDensityStatistics.style.display = "block";
			tweetDisplay.style.display = "block";
			crimeDisplay.style.display = "block";
			crimeTrajectoriesStatistics.style.display = "block";
			chiTweetOptions.points.visible = tweetsVisble;
			chiTrajectOptions.points.visible = crimePointsVisble;
			chiTrajectOptions.sameType.visible = crimeTrajectoriesVisible;
			chiTrajectOptions.allType.visible = false;
			chiCentroidOptions.sameType.visible = centroidsVisble;
			chiCentroidOptions.allType.visible = false;
			renderCrimeTypeLegend();
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
				anchorY: 64,
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
				anchorY: 64,
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
		// let idSuffix = "";
		// switch(options) {
		// 	case OPTIONS.TRAJECTORY: 
		// 		idSuffix = "-trajectory-handle";
		// 		break;
		// 	case OPTIONS.TWEET: 
		// 		idSuffix = "-tweet-handle";
		// 	default: 
		// 		break;
		// }

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
