var apiFormElement = document.querySelector("#apiform");
var dbFormElement = document.querySelector("#dbform");

document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elements);
});

dbFormElement.style.display = "none";

const toggleForm = element => {
  if (element.value === "twitterapi") {
    enableFormElement = apiFormElement;
    disableFormElement = dbFormElement;
  } else {
    enableFormElement = dbFormElement;
    disableFormElement = apiFormElement;
  }
  enableFormElement.style.display = "block";
  disableFormElement.style.display = "none";
};
