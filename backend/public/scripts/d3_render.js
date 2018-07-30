function getVisualisationData()
{
	let request = new XMLHttpRequest();
	request.open("GET", "http://144.6.226.34:3000/visualisationData", false);
	request.setRequestHeader("Content-type", "application/json");
	request.send();
	return JSON.parse(request.responseText);
};

function getNLPStats()
{
	let request = new XMLHttpRequest();
	request.open("GET", "http://144.6.226.34:3000/getPredictedData", false);
	request.setRequestHeader("Content-type", "application/json");
	request.send();
	return JSON.stringify(request.responseText);
}

function drawGraphs(visualisationData, svgContainerName, titleText, percent)
{
	d3.select("d3Div").attr("float", "left");

	let svg = d3.select("#" + svgContainerName);

	let width = svg.attr("width");

	let height = svg.attr("height");

	let radius = Math.min(width, height) / 2;

	let group = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	let color = d3.scaleOrdinal(["#2AA3EF", "red"]);

	let pie = d3.pie().value(function(data) {return data.count;});

	let path = d3.arc().outerRadius(radius - 10).innerRadius(100);

	let label = d3.arc().outerRadius(radius).innerRadius(radius - 80);

	let arc = group.selectAll(".arc").data(pie(visualisationData)).enter().append("g").attr("class", "arc");

	arc.append("path").attr("d", path).attr("fill", function(data) { return color(data.data.type); });


	arc.append("text").attr("transform", function(data) {return "translate(" + label.centroid(data) + ")";}).text(function(data) { return data.data.type; });

	svg.append("g").attr("transform", "translate(" + (width / 2 - 50) + "," + 20 + ")").append("text").text(titleText).attr("class", "title").style("fill", 'black');

	svg.append("g").attr("transform", "translate(" + (width / 2 - 20) + "," + 250 + ")").append("text").text(percent + "%").attr("class", "title").style("fill", 'black');


}

let visData = getVisualisationData();

let nlpData = [{type: "nlpTrue", count: 5}, {type: "nlpFalse", count: 95}]; //lol hard code, fix

drawGraphs(visData, "c1", "Crime Tweets", (visData[0].count / (visData[0].count + visData[1].count) * 100).toFixed(2));

drawGraphs(nlpData, "c2", "NLP Accuracy", (nlpData[0].count / (nlpData[0].count + nlpData[1].count) * 100).toFixed(2));




