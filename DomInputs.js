// States the input elements from the DOM
var zipInput = document.getElementById("zip-data");
var weatherForcast = document.getElementById("weather-forecast");
var buttonForcast = document.getElementById("submit-weather");

// This function contains the code to pull and manipulate information
//  from the DOM.
var DomInputs = (function() {

  return {

    // This checks to see if the zipcode is valid against a RegEx that looks for 5 digits 
    checkZip: function() {
      if (/^[0-9]{5}$/.test(zipInput.value)) {
        zipInput.style.backgroundColor = "lightgreen";
        DomInputs.checkForecast();
      } else {
        zipInput.style.backgroundColor = "#B25148";
      };
    },

    // Checks to see if a forecast is selected
    checkForecast: function() {
      if (weatherForcast.value !== "") {
        WeatherInputs.XHRWeather(zipInput.value, weatherForcast.value);
      } else {
        alert("Please select a weather forecast");
      };
    }
  };

})( DomInputs || {});


// Allows the user to press the enter key while the input box is active to get the weather 
//  forecast.
zipInput.addEventListener("keypress", function() {
  if (event.code === "Enter") {
    DomInputs.checkZip();
  };
});

buttonForcast.addEventListener("click", DomInputs.checkZip);

