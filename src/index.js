function updateWeather(response) {
  let temperatureElement = document.querySelector(
    "#weather-current-temperature"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  cityElement.innerHTML = response.data.city;

  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  updateForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "433a5o3a664107b44c950b5f395e6bta";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}$units=metic`;

  axios.get(apiUrl).then(updateWeather);
}

function searchResults(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function updateForecast(city) {
  let apiKey = "433a5o3a664107b44c950b5f395e6bta";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}$units=metric`;

  axios.get(apiUrl).then(weatherForecast);
}

function weatherForecast(response) {
  console.log(response.data);

  let weekDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  weekDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast">
    <div class="forecast-date">${day}</div>
    <div class="forecast-icon">🌧️</div>
    <div class="forecast-temperature">
      <span class="forecast-max">32°</span>
      <span class="forecast-min">26°</span>
    </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#search-bar");
searchElement.addEventListener("submit", searchResults);

searchCity("Thailand");
