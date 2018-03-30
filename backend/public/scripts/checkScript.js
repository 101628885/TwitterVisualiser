function sendData(bool, tweetid)
{
	var http = new XMLHttpRequest();
	var url = `/check/${tweetid}/${bool}`;
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
			$("#tweetTrue").attr("onclick", `sendData('true', ${response.id})`)
			$("#tweetFalse").attr("onclick", `sendData('false', ${response.id})`)
			$('#counter').html(function(i, val) { return +val+1 });

	    }
	}
	http.send();
}