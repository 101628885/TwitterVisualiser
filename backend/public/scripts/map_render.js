function initMap() {
  var defaultRegion = new google.maps.LatLng(-37.81361, 144.96305);

  var dataMap = new google.maps.Map(
    document.getElementById('map'), 
    {
      zoom: 5, 
      center: defaultRegion,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  );
  
  fetch("http://144.6.226.34:3000/nlpTrainingEndpoint/100/true")
  .then(res => res.json())
  .then(tweetData => {
    var infoWin = new google.maps.InfoWindow();
    var markers = tweetData.map(function(tweet) {
      var latLong = {lat: tweet.location[0].latitude, lng: tweet.location[0].longitude};
      var marker = new google.maps.Marker({
        position: latLong
      });
      google.maps.event.addListener(marker, 'click', function(evt) {
        infoWin.setContent(tweet.full_text);
        infoWin.open(dataMap, marker);
      })
      return marker;
    });

    var markerCluster = new MarkerClusterer(dataMap, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  })
  .catch((error) => {
    console.error(error); 
  });
}