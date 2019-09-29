async function scanImage(){
	await fetch('/scan', {method: 'POST'}).then(function(res){
		res.json().then(async function(json){
			document.getElementById('result').innerHTML = JSON.stringify(json, undefined, 4);
		})
	})
	displayImage(document.querySelector('input[type=file]').files[0]);
}

function displayImage(input){
	const reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function(e) {
    	const image = document.getElementById('imageDisplay');
    	image.src = e.target.result;
    	image.hidden = false;
    };
}