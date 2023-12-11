const minutes = document.getElementById("minutes");
const hour = document.getElementById("hour");
const pmAm = document.getElementById("pm-am");
const day = document.getElementById("day");
const month = document.getElementById("month");
let dateValue = document.getElementById("date");
const body = document.querySelector("body");



const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country");
const icon = document.querySelector("#icon");

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          try {
            const locationData = await reverseGeocode(latitude, longitude);
            console.log(`City: ${locationData.city}, State: ${locationData.state}`);

            // You can use locationData.city and locationData.state for further processing.
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        function(error) {
          handleGeolocationError(error);
        }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
async function reverseGeocode(latitude, longitude) {
  const locationApiKey = '9e4a6e07f8634500b3e9178f90fd43a6'; // Replace with your OpenCage API key
  const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=9e4a6e07f8634500b3e9178f90fd43a6`;

  const response = await fetch(reverseGeocodeUrl);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const result = data.results[0];
    const city = result.components.city || result.components.town;
    const state = result.components.state;
    console.log(resultconst cityValue = document.getElementById("city");
const countryValue = document.getElementById("country");
const icon = document.querySelector("#icon");
)
    return { city, state };
  } else {
    throw new Error("Unable to retrieve location data.");
  }
  let apiKey = "3dffd36178f9c1ceeedc4d65201e1055";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      document.querySelector("#temp").innerHTML = Math.round(weatherData.main.temp);
      document.querySelector("#temp-range").innerHTML = weatherData.main.temp;
      document.querySelector("#feels").innerHTML = Math.round(weatherData.main.feels_like);
      document.querySelector("#humidity").innerHTML = Math.round(weatherData.main.humidity);
      document.querySelector("#wind-speed").innerHTML = Math.round(weatherData.wind.speed);

      const climate = document.querySelector("#weather-description");
      climate.innerHTML = weatherData.weather[0].description;

      let cli = climate.innerHTML;

      if (cli === "Scattered clouds" || cli === "overcast clouds" || cli === "Broken clouds" || cli === "Few clouds") {
        body.classList.add("its-cloud");
        icon.innerHTML = "☁️";
      } else if (cli === "Light rain" || cli === "Moderate rain") {
        body.classList.add("slow-rain");
        icon.innerHTML = "🌧️";
      } else if (cli === "Smoke" || cli === "Fog" || cli === "mist") {
        body.classList.add("smoke");
        icon.innerHTML = "☁️";
      } else if (cli === "Thunderstorm") {
        body.classList.add("thunder");
        icon.innerHTML = "🌩️";
      } else if (cli === "Thunderstorm" || cli === "Heavy rain") {
        icon.innerHTML = "⛈️";
      } else if (cli === "Drizzle") {
        body.classList.add("drizzle");
      }
    });
}

/*
async function fetchLocation() {

}

fetchLocation();
*/