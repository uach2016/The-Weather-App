$(document).ready(function(){
  $.get("http://ipinfo.io", function(response) {
    var city = JSON.stringify(response.city).slice(1); 
    city = city.slice(0, 8);
    var country = JSON.stringify(response.country).slice(1);
    country = country.slice(0, 2);
    $(".localication").html(city+", "+country);
    
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "http://api.openweathermap.org/data/2.5/weather?q="+city+",uk&appid=fdd8080861e53a80500472420b920290",
      crossDomain: true,
      async:false,
      success: function(response){
        var centigrades = JSON.stringify(Math.round(response.main.temp- 273.15));
        var falsius = JSON.stringify(Math.round(centigrades*1.8+32));
        var wind = JSON.stringify(response.wind.speed);  
        $(".wind").html("wind speed "+wind+"mph");
        $(".weather").html(centigrades+"°C/ "+falsius+"°F");
        if (response.weather[0].icon === "01d"){    
          $('body').addClass('sun');
        }
        if (response.weather[0].icon === "01n"){    
          $('body').addClass('night');
        }
        if ((response.weather[0].icon === "02d")||(response.weather[0].icon === "03d")||(response.weather[0].icon === "04d")||(response.weather[0].icon === "50d")){    
          $('body').addClass('cloud');
        }
        if ((response.weather[0].icon === "02n")||(response.weather[0].icon === "03n")||(response.weather[0].icon === "04n")||(response.weather[0].icon === "50n")){    
          $('body').addClass('cloudNight');
        }
        if ((response.weather[0].icon === "09d")||(response.weather[0].icon === "10d")||(response.weather[0].icon === "11d")||(response.weather[0].icon === "13d")){    
          $('body').addClass('rain');
        }
        if ((response.weather[0].icon === "09n")||(response.weather[0].icon === "10n")||(response.weather[0].icon === "11n")||(response.weather[0].icon === "13n")){    
          $('body').addClass('rainNight');
        }
      }
    });
  }, "jsonp");
});


