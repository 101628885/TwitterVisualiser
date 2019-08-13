//Sets up List for lookup page to load all content from database/Twitter API

var apiFormElement = document.querySelector("#apiform");
var dbFormElement = document.querySelector("#dbform");
var dbImagesFormElement = document.querySelector("#dbimagesform");

document.addEventListener("DOMContentLoaded", function() {
	var elements = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elements);
});

dbFormElement.style.display = "none";
dbImagesFormElement.style.display = "none";

const toggleForm = element => {
	if (element.value === "twitterapi") {
		apiFormElement.style.display = "block";
		dbFormElement.style.display = "none";
		dbImagesFormElement.style.display = "none";
	} else if (element.value === "database") {
		apiFormElement.style.display = "none";
		dbFormElement.style.display = "block";
		dbImagesFormElement.style.display = "none";
	} else{
		apiFormElement.style.display = "none";
		dbFormElement.style.display = "none";
		dbImagesFormElement.style.display = "block";
	}
};
