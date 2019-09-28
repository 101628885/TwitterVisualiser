async function scanImage(){
	await fetch('/scan', {method: 'POST'}).then(function(res){
		res.json().then(async function(json){
			document.getElementById('result').innerHTML = JSON.stringify(json, undefined, 4);
		})
	})
}