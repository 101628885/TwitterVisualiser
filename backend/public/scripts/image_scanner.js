async function scanImage() {
  var input = document.querySelector('input[type="file"]');
  var data = new FormData();
  data.append("file", input.files[0]);

  console.log("first!");

  await fetch("/scan", {
    method: "POST",
    body: data
  }).then(function(res) {
    res.json().then(async function(json) {
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
    });
  });

  displayImage(document.querySelector("input[type=file]").files[0]);
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
