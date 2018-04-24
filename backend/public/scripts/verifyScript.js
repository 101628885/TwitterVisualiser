function sendData(bool, tweetid)
{
	var http = new XMLHttpRequest();
	if(bool == "true")
	{
		var location = document.getElementById('pac-input').value;
		var type = document.getElementById('crime-type').value
		var url = `/temp/${tweetid}/${bool}/${location}/${type}`
	} else {
		var url = `/temp/${tweetid}/${bool}`;
	}
	console.log(url);
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status == 200) 
	    {
	    	let response = JSON.parse(http.response).data[0];
			$("#tweetHead").html(`<h5>${response.user_name} -  ${response.created_at} - ${response.geo}</h5>`);
			$("#tweetImg").attr("src",`${response.user_profile_image_url}`)
			$("#tweetText").text(`${response.full_text}`);
			$("#pac-input").val("");
			$("#crime-type").val("");
			$("#tweetTrue").attr("onclick", `sendData('true', ${response.id})`)
			$("#tweetFalse").attr("onclick", `sendData('false', ${response.id})`)
			$('#counter').html(function(i, val) { return +val+1 });

	    }
	}
	http.send();
}

function initAutocomplete() 
{
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var input = document.getElementById('pac-input');
    console.log("hello")
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() 
{
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