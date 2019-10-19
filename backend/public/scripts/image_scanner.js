const spinner = document.getElementById("predSpinner"); //loading spinner

async function scanImage() {
  var input = document.querySelector('input[type="file"]');
  if (input.files.length == 0) {
    document.getElementById("pred").innerHTML = "Please upload an image";
    return;
  }
  var data = new FormData();
  data.append("file", input.files[0]);

  showSpinner(); //showing loading spinner

  await fetch("/scan", {
    method: "POST",
    body: data
  }).then(function(res) {
    hideSpinner(); //hide spinner
    res.json().then(async function(json) {
      if ("error" in json) {
        console.log(json);

        document.getElementById("pred").innerHTML = json.error;
        return;
      }
      document.getElementById("pred").innerHTML = json.result.prediction;
      document.getElementById("highC").innerHTML = parseFloat(
        (json.result.probability[0] * 100).toFixed(4)
      );
      document.getElementById("lowC").innerHTML = parseFloat(
        (json.result.probability[1] * 100).toFixed(4)
      );
      document.getElementById("noC").innerHTML = parseFloat(
        (json.result.probability[2] * 100).toFixed(4)
      );
      //unhide tale after result
      const el = document.querySelector("#predTable");
      if (el.classList.contains("hide")) {
        el.classList.remove("hide");
      }
      // reset footer styling
      $(document).ready(function() {
        document.querySelector("footer").style = "";
      });
      displayImage(document.querySelector("input[type=file]").files[0]);
    });
  });
}

function displayImage(input) {
  const reader = new FileReader();
  reader.readAsDataURL(input);
  reader.onload = function(e) {
    const image = document.getElementById("imageDisplay");
    image.src = e.target.result;
    image.hidden = false;
  };
}

function showSpinner() {
  spinner.className = "show";
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

// sticky footer styling - specific to this page
$(document).ready(function() {
  document.querySelector("footer").style =
    "bottom: 0; position: absolute; width: 100%;";
});
