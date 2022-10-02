function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${day} ${hours}:${minutes}`;
  return formattedDate;
}

let dateInput = document.querySelector("#date");
dateInput.innerHTML = formatDate(new Date());

function searchCity(city) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputSearch").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Barcelona");

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentPositionBtn = document.querySelector("#current-position-btn");
currentPositionBtn.addEventListener("click", getCurrentPosition);

function showWeather(response) {
  document.querySelector(
    "#current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );

  if (response.data.weather[0].description.includes("rain")) {
    let tip = document.querySelector("#tip");
    tip.innerHTML = `Don't forget to take an umbrella ☔️`;
  } else if (Math.round(response.data.main.temp) < 15) {
    let tip = document.querySelector("#tip");
    tip.innerHTML = `Don't forget to take a jacket 🧥`;
  } else {
    let tip = document.querySelector("#tip");
    tip.innerHTML = `Enjoy your day! 🙂`;
  }

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

// bonus feature week 4
function showCelsius(event) {
  event.preventDefault();
  let link = document.querySelector("#current-degree");
  link.innerHTML = "20";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let link = document.querySelector("#current-degree");
  link.innerHTML = "76";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
