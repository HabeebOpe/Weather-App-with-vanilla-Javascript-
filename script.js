const minutes = document.getElementById("minutes");
const hour = document.getElementById("hour");
const pmAm = document.getElementById("pm-am");
const day = document.getElementById("day");
const month = document.getElementById("month");
let dateValue = document.getElementById("date");
const body = document.querySelector("body");
const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country");
const temp = document.querySelector("#temp")
const tempRange = document.querySelector("#temp-range")
const feels = document.querySelector("#feels")
const humid = document.querySelector("#humidity")
const windSpeedVal = document.querySelector("#wind-speed")
const weatherDes = document.getElementById("weather-description")

function getDateAndTime() {
  const date = new Date();
  dateValue.textContent = date.getDate();
  let monthValue = date.getMonth();
  const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
   ];
  month.textContent = months[monthValue];

  let hourVal = date.getHours();
  hour.textContent = hourVal;

  minutes.textContent = date.getMinutes();

  if (hourVal > 12) {
    pmAm.textContent = "pm";
  } else {
    pmAm.textContent = "am";
  }

  let dayValue = date.getDay();
  const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
   ];
  day.textContent = days[dayValue];
}
getDateAndTime()

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Replace 'YOUR_OPENCAGE_API_KEY' with your actual OpenCage API key
        getLocationInfo('9e4a6e07f8634500b3e9178f90fd43a6', latitude, longitude);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

getLocation();

async function getLocationInfo(apiKey, latitude, longitude) {
  // Get location information using OpenCage Geocoding API
  const locationUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  const locationResponse = await fetch(locationUrl);
  const locationData = await locationResponse.json();

  // Extract local government or administrative area information
  let localGovernment;

  if (locationData.results.length > 0) {
    const components = locationData.results[0].components;
    localGovernment = components.county || components.state || components.region || components.province;
  }

  // Extract country information
  const country = locationData.results[0].components.country;

  // Display location information
  cityValue.textContent = localGovernment
  countryValue.textContent = country

  // Call the function to get weather information after obtaining location
  getWeather('3dffd36178f9c1ceeedc4d65201e1055', latitude, longitude);
}


async function getWeather(apiKey, latitude, longitude) {
  // Get weather data using OpenWeatherMap API
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  // Extract relevant information
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  const feelsLike = weatherData.main.feels_like;
  const temperature = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;

  temp.textContent = Math.round(temperature)
  tempRange.textContent = temperature
  feels.textContent = Math.round(feelsLike)
  humid.textContent = Math.round(humidity)
  windSpeedVal.textContent = Math.round(windSpeed)
  weatherDes.textContent = Math.round(weatherDescription)
}