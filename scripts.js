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
      console.log(weatherAPI);
      console.log(googleAPI);

      $.ajax({
        url: googleAPI,
        dataType: "json",
        success: function(location) {
          let city = location.results[0].address_components[1].long_name;
          $(".city").html(city);
        }
      }); //location api ajax request end

      $.ajax({
        url: weatherAPI,
        dataType: "json",
        success: function(weatherData) {
          let cTemp;
          let temSwap= true;
          let icon = weatherData.currently.icon;
          // icon = 'wind';
          let decsription = weatherData.currently.summary;
          let temp = weatherData.currently.temperature;
          console.log(icon);
          $(".decsription").text(decsription);
          $(".temperature").html(temp + "&#8457;");


          cTemp = ((temp-32)*0.5556).toFixed(2) ;
          console.log(cTemp);
          $(".temperature").click(function(){
            console.log('button pressed');
              if(temSwap===false){
                $('.temperature').html(temp + "&#8457;");
                temSwap=true;
              }
              else{
                $('.temperature').html(cTemp + "&#8451;");
                temSwap=false;
              }
          })

                if (icon == 'rain')$('#icon').css('background-image','url(animated/rainy-1.svg)');
            else if (icon == 'snow')$('#icon').css('background-image','url(animated/snowy-1.svg)');
            else if (icon == 'clear-day')$('#icon').css('background-image','url(animated/day.svg)');
            else if (icon == 'partly-cloudy-day')$('#icon').css('background-image','url(animated/cloudy-day-3.svg)');
            else if (icon == 'partly-cloudy-night')$('#icon').css('background-image','url(animated/cloudy-night-3.svg)');
            else if (icon == 'clear-night')$('#icon').css('background-image','url(animated/night.svg)');
            else if (icon == 'fog')$('#icon').css('background-image','url(icons-svg/wind-1.svg)');
            else if (icon == 'cloudy')$('#icon').css('background-image','url(animated/cloudy.svg)');
            else if (icon == 'wind')$('#icon').css('background-image','url(icons-svg/wind.svg)');
            else $('#icon').css('background-image','url(animated/cloudy-day-1.svg)');
          
      


        }
      });// weather api ajax request end 

    });  
  } // if statement end
  else {
    console.log("browser not getting location");
  }
});//document ready function end 

