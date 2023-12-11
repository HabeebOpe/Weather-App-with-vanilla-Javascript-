const minutes = document.getElementById("minutes");
const hour = document.getElementById("hour");
const pmAm = document.getElementById("pm-am");
const day = document.getElementById("day");
const month = document.getElementById("month");
let dateValue = document.getElementById("date");
const body = document.querySelector("body");

function getDateAndTime() {
  const date = new Date();
  if (date.getHours() >= 9 && date.getHours() <= 18) {
    body.classList.add("suny");
  } else if (date.getHours() <= 7 || date.getHours() >= 19) {
    body.classList.add("night");
  }

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

getDateAndTime();






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
  const apiKey = '9e4a6e07f8634500b3e9178f90fd43a6'; // Replace with your OpenCage API key
  const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=9e4a6e07f8634500b3e9178f90fd43a6`;

  const response = await fetch(reverseGeocodeUrl);
  const data = await response.json();
  const cityValue = document.getElementById("city");
  const countryValue = document.getElementById("country");
  const icon = document.querySelector("#icon");

  if (data.results && data.results.length > 0) {
    const result = data.results[0];
    const city = result.components.city || result.components.town;
    console.log(city)
    const state = result.components.state;
  } else {
    throw new Error("Unable to retrieve location data.");
  }
}



function handleGeolocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.error("User denied the request for geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.error("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.error("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.error("An unknown error occurred.");
      break;
  }
}

// Call the function to get the current location
getCurrentLocation();






async function fetchLocation() {
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

fetchLocation();