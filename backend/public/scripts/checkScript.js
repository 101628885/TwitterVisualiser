function sendData(bool, tweetid) {
	var http = new XMLHttpRequest();
	var geo = document.getElementById('location').value;
	if(bool == "true") {
		var location = document.getElementById('pac-input').value;
		var type = document.getElementById('crime-type').value;
		var url = `/check/${tweetid}/${bool}/${location}/${type}/${geo}`
	} else {
		var url = `/check/${tweetid}/${bool}/${geo}`;
	}
	console.log(url);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() { //Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			let response = JSON.parse(http.response).data[0];
			sendResponseToView(response);
			$('#counter').html(function(i, val) { return +val+1 });
		}
	};
	http.send();
}

function skip() {
	console.log("Skipping...");
	var http = new XMLHttpRequest();
	var geo = document.getElementById('location').value;
	var url = `/check/0/false/${geo}`;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");

	http.onreadystatechange = function() { //Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200)
		{
			let response = JSON.parse(http.response).data[0];
			sendResponseToView(response);
		}
	}
	http.send();
}

function sendResponseToView(response) {
	$("#tweetdp").attr("src", `${response.user_profile_image_url}`);
	$("#tweetusername").text(`${response.user_name} `);
	$("#tweetmetadata").text(`${response.created_at} - ${response.geo}`);
	$("#tweetbody").text(`${response.full_text}`);
	$("#tweetTrue").attr("onclick", `sendData('true', ${response.id})`);
	$("#tweetFalse").attr("onclick", `sendData('false', ${response.id})`);
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var input = document.getElementById('pac-input');
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
	var place = autocomplete.getPlace();
	for (var component in componentForm) {
		document.getElementById(component).value = '';
		document.getElementById(component).disabled = false;
	}
	// Get each component of the address from the place details
	// and fill the corresponding field on the form.
	for (var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if (componentForm[addressType]) {
			var val = place.address_components[i][componentForm[addressType]];
			document.getElementById(addressType).value = val;
		}
	}
}
