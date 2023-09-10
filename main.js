const minutes = document.getElementById("minutes")
const hour = document.getElementById("hour")
const pmAm = document.getElementById("pm-am")
const day = document.getElementById("day")
const month = document.getElementById("month")
let dateValue = document.getElementById("date")
const body = document.querySelector("body")

function getDateAndTime()  {
   const date = new Date()
   //Getting date
   dateValue.textContent = date.getDate()
   //Getting month
   monthValue = date.getMonth()
   if(monthValue == 0){
      month.textContent = "Jan"
   }else if(monthValue == 1)  {
      month.textContent = "Feb"
   }else if(monthValue == 2)  {
      month.textContent = "Mar"
   }else if (monthValue == 3) {
      month.textContent = "Apr"
   }else if (monthValue == 4) {
      month.textContent = "May"
   }else if (monthValue == 5) {
      month.textContent = "Jun"
   }else if (monthValue == 6) {
      month.textContent = "Jul"
   }else if (monthValue == 7) {
      month.textContent = "Aug"
   }else if (monthValue == 8) {
      month.textContent = "Sep"
   }else if (monthValue == 9) {
      month.textContent = "Oct"
   }else if (monthValue == 10) {
      month.textContent = "Nov"
   }else if (monthValue == 11) {
      month.textContent = "Dec"
   }
   //Getting Hour
   let hourVal = date.getHours()
   hour.textContent = hourVal
   //Getting Minutes
   minutes.textContent = date.getMinutes()
   //Getting pm or am
   if(hour.textContent > 12){
      pmAm.textContent = "pm"
   }else{
      pmAm.textContent = "am"
   }
   //Getting day
   dayValue = date.getDay()
   if(dayValue == 0){
      day.textContent = "Sunday"
   }else if(dayValue == 1){
      day.textContent = "Monday"
   }else if (dayValue == 2) {
      day.textContent = "Tuesday"
   }else if (dayValue == 3) {
      day.textContent = "Wednesday"
   }else if (dayValue == 4) {
      day.textContent = "Thursday"
   }else if (dayValue == 5) {
      day.textContent = "Friday"
   }else if (dayValue == 6) {
      day.textContent = "Saturday"
   }
   else if (hour.textContent <= 7 || hour.textContent >= 19){
      body.classList.add("night")
   }
   else if (hourVal == 10){
      body.classList.add("suny")
      console.log("aunny")
   }
}
getDateAndTime()

function animation(){
   for(var animate = 0; animate < 15; animate++){
      let animate = document.createElement("div")
      animate.classList.add("rainy")
      rainSeason.appendChild(animate)
   }
   console.log(animate)
} 
animation()


//Getting User Location
const cityValue = document.getElementById("city")
const countryValue = document.getElementById("country")
const icon = document.querySelector("#icon")
async function fetchLocation()   {
   let locationUrl = "https://ipinfo.io/json?token=93e5f64e7755db"
   let response = await fetch(locationUrl);
   let locationData = await response.json()
   cityValue.innerHTML = locationData.city
   countryValue.innerHTML = locationData.country
console.log(city)

//Getting weather info
   let apiKey = "3dffd36178f9c1ceeedc4d65201e1055"
   let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${apiKey}&units=metric`
   fetch(weatherUrl)
      .then ((response) => response.json())
      .then((weatherData) => {
         console.log(weatherData)
         document.querySelector("#temp").innerHTML = Math.round(weatherData.main.temp)
         document.querySelector("#temp-range").innerHTML = weatherData.main.temp
         document.querySelector("#feels").innerHTML = Math.round(weatherData.main.feels_like)
         document.querySelector("#humidity").innerHTML = Math.round(weatherData.main.humidity)
         document.querySelector("#wind-speed").innerHTML = Math.round(weatherData.wind.speed)
         const climate = document.querySelector("#weather-description");
         climate.innerHTML = weatherData.weather[0].description
         weatherData.weather[0],description = "Heavy rain"
         let cli = climate.innerHTML
         if(cli = "Scattered clouds" || "overcast clouds" || "Broken clouds" || "skyFew clouds"){
            body.classList.add("its-cloud")
            icon.innerHTML = "☁️"
         }
         else if(cli = "Light rain" || "Moderate rain"){
            body.classList.add("slow-rain")
            icon.innerHTML = "🌧️"
         }
         else if(cli = "Smoke" || "Fog" || "mist"){
            body.classList.add("smoke")
            icon.innerHTML = "☁️"
         }
         else if(cli = "Thunderstorm"){
            body.classList.add(thunder)
            icon.innerHTML = "🌩️"
         }
         else if(cli = "Thunderstorm" || "Heavy rain"){
            icon.innerHTML = "⛈️"
         }
         else if (cli = "Drizzle"){
            body.classList.add("drizzle")
         }
      })
  
}

fetchLocation()

/*
Clear skyFew clouds. Scattered clouds. Broken clouds. Overcast clouds. Light rainModerate rain Heavy rain.  Light snow.  Moderate snow   Heavy snow. Thunderstorm. Mist. Fog.  Haze Drizzle Smoke
*/