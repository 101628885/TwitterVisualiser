var apiFormElement = document.querySelector("#apiform");
var dbFormElement = document.querySelector("#dbform");

document.addEventListener("DOMContentLoaded", function() {
	var elements = document.querySelectorAll("select");
	var instances = M.FormSelect.init(elements);
});

dbFormElement.style.display = "none";

const toggleForm = element => {
	if (element.value === "twitterapi") {
		apiFormElement.style.display = "block";
		dbFormElement.style.display = "none";
	} else {
		apiFormElement.style.display = "none";
		dbFormElement.style.display = "block";
	}
};
