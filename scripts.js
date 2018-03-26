$(document).ready(function() {
  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      console.log(lat, long);
      let URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyD7C2h8efa41XexO9l6LczUTDNYnmLzY2A`;
      let api = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88d42b58ee77d647c40b6c38d90bba7b/${lat},${long}`;
      console.log(api);
      console.log(URL);

      $.getJSON(URL, function(data) {
        let city = data.results[0].address_components[3].long_name;
        $(".city").html(city);
      });

      $.getJSON(api, function(data) {
        // let city = data.timezone;
        let summary = data.currently.summary;
        let temperature = data.currently.temperature;
        let humidity = data.currently.humidity;

        // $(".timezone").html(city);
        $(".summary").html(summary);
        $(".temperature").html(temperature);
        $("humidity").html(humidity);

        $("#temp-toggle").on("click", function() {
          let f = temperature;
          let c = (f - 32) * 0.5556;
          c = c.toFixed(2);
          if (c !== temperature){
            $('.temperature').html(c+' C');
          }
         
        });
      });
    });
  } else {
    console.log("browser not getting location");
  }
});
