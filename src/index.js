function searchResults(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityInput = document.querySelector("#current-city");
  cityInput.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#search-bar");
searchElement.addEventListener("submit", searchResults);
