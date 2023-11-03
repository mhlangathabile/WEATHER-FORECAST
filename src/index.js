function updateWeather(response) {
  let temperatureElement = document.querySelector(
    "#weather-current-temperature"
  );
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apiKey = "433a5o3a664107b44c950b5f395e6bta";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(updateWeather);
}

function searchResults(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-bar");
searchElement.addEventListener("submit", searchResults);

searchCity("Thailand");
