$(document).ready(function() {
  let lat;
  let long;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const exclude = "?exclude=minutely,hourly,daily,alerts,flags";
      // console.log(lat, long);
      let googleAPI = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyD7C2h8efa41XexO9l6LczUTDNYnmLzY2A`;
      let weatherAPI = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/88d42b58ee77d647c40b6c38d90bba7b/${lat},${long}${exclude}`;
      // console.log(api);
      // console.log(googleAPI);

      $.ajax({
        url: googleAPI,
        dataType: "json",
        success: function(location) {
          let city = location.results[0].address_components[2].long_name;
          $(".city").html(city);
        }
      }); //location api ajax request end

      $.ajax({
        url: weatherAPI,
        dataType: "json",
        success: function(weatherData) {
          let icon = weatherData.currently.icon;
          let decsription = weatherData.currently.summary;
          let temperature = weatherData.currently.temperature;

          $(".decsription").text(decsription);
          $(".temperature").text(temperature);
        }
      });// weather api ajax request end 


      function toCelsius(f){
        return Math.round((5/9)*(f-32));
      }

      function toFarenheith(c){
        return Math.round(c*9/5+32);
      }



    });  
  } // if statement end
  else {
    console.log("browser not getting location");
  }
});//document ready function end 

