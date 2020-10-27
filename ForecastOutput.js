var ForecastOutput = (function() {

  var mainWeatherOutputDiv = document.getElementById("main-weather-output");
  var sntWeatObj; // Shortened sentWeatherObject accessable by all functions

  return {

// This checks the forecast conditions and assigns a class to the day-div if 
//  "Clear" or a gray gradient if overcast or rainy
    addColorToDayDiv: function(sentSkyCondition) {
      var skyType = ["Snow", "Rain", "Clouds"]

      for (var i = 0; i < skyType.length; i++) {
        if (sentSkyCondition === skyType[i]){
          return "sky-color-gray";
        };
      };
      return "sky-color-blue"
    },

// This checks the forecast conditions and assigns an appropriate weather image to 
//  the day-div 
    addImageToDiv: function(sentSkyCondition) {
      var skyType = ["Snow", "Rain", "Clouds"]
      for (var i = 0; i < skyType.length; i++) {
        if (sentSkyCondition === skyType[i]){
          return skyType[i];
        };
      };
      return "Clear";
    },

// This function builds the container that holds all the weather day-div boxes
    addWeatherToDivs: function() {
      for (var i = 0; i < sntWeatObj.list.length; i++) {
        var currentDayDiv = document.getElementById(`day-${i}`);
        // Outputs the day of the forecast to the day-div
        var weatherString = `<p class="day-title">${ForecastOutput.timeToHuman(i)}</p>`;
        currentDayDiv.innerHTML += weatherString;

        // Creates a div to hold the picture, temps and forecast in the day-div
        var picTempConditionsDiv = document.createElement("div");
        picTempConditionsDiv.classList.add("img-temp-cond");
        currentDayDiv.appendChild(picTempConditionsDiv);

        // Creates the img tag to hold the picture in the day-div
        var weatherImg = document.createElement("img");
        weatherImg.setAttribute("src", `img/${ForecastOutput.addImageToDiv(sntWeatObj.list[i].weather[0].main)}.png`);
        picTempConditionsDiv.appendChild(weatherImg);

        // Creates a div and inserts the temps and weather conditions into the day-div
        var dayTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.day);
        var nightTemp = ForecastOutput.tempToFahrenheit(sntWeatObj.list[i].temp.night);
        weatherString = `<div class="temps-weather"><p class="temps">Hi: ${dayTemp}&degF / Low: ${nightTemp}&degF</p>`;
        weatherString += `<p class="description">${ForecastOutput.formatSkyConditions(sntWeatObj.list[i].weather[0].description)}</p></div>`;
        picTempConditionsDiv.innerHTML += weatherString;

        // Adds the color to each individual day divs
        currentDayDiv.classList.add(ForecastOutput.addColorToDayDiv(sntWeatObj.list[i].weather[0].main));
      };
    },

// This capitalizes the first letter in the detailed conditions report
    formatSkyConditions: function(sentDetailedSkyCondition) {
      var capitalizedSkyConditions = sentDetailedSkyCondition.split(" ").map(function(arrayItem) {
        return (arrayItem.charAt(0).toUpperCase() + arrayItem.substring(1));
      }).join(" ");
      return capitalizedSkyConditions;
    },

// This builds the generic holders for the weather outputs on the DOM
    generalContentDisplay: function(sentParsedWeatherObject) {

      sntWeatObj = sentParsedWeatherObject;

      // The main title of the whole forecast
      mainWeatherOutputDiv.innerHTML = `<p class=headline>Here's your ${sntWeatObj.cnt} day forecast for ${sntWeatObj.city.name}, ${sntWeatObj.city.country}</p>`;

      // The main div that holds all the individual day-div's from the forecast
      var dayBoxHolder = document.createElement("div");
      dayBoxHolder.id = "day-box-holder";
      dayBoxHolder.classList.add("day-box-holder");
      mainWeatherOutputDiv.appendChild(dayBoxHolder);

      // Builds each day-div depending on how many forecast days were requested
      //  It inserts them into the DOM as well
      for (var i = 0; i < sntWeatObj.list.length; i++) {
        var dayDiv = document.createElement("div");
        dayDiv.id = "day-" + i;
        dayDiv.classList.add("day-div");
        dayBoxHolder.appendChild(dayDiv);
      }

      // Calls the function to add the weather forecast info into the newly created divs
      ForecastOutput.addWeatherToDivs();
    },

// This converts the openweather temp (in K) to fahrenheit (F)
    tempToFahrenheit: function(sentKelvinTemp) {
      var fahrenheitTemp = Math.round((sentKelvinTemp - 273.15) * 1.8 + 32);
      return fahrenheitTemp;
    },

// This converts the openweather UNIX time into human readable time
    timeToHuman: function(sentCurrentDay) {
      var humanDate = new Date(sntWeatObj.list[sentCurrentDay].dt * 1000);
      var dateArray = humanDate.toGMTString().split(" ");

      // This object is used to convert the three char day into the full name
      var dayAbbrObject = 
        { 
          "Mon": "Monday",
          "Tue": "Tuesday",
          "Wed": "Wednesday",
          "Thu": "Thursday",
          "Fri": "Friday",
          "Sat": "Saturday",
          "Sun": "Sunday"
        };

      // This performs the substitution of the three char days with the full name.
      var tempDateAbriv = dateArray[0].substring(0, 3);
      for (day in dayAbbrObject) {
        if (day === tempDateAbriv) {
          dateArray[0] = dayAbbrObject[day];
        };
      };

      // This builds the string to be inserted into the DOM
      var monthDay = `${dateArray[0]}, ${dateArray[2]} ${dateArray[1]}`;

      return monthDay;
    }
  };

})(ForecastOutput || {});