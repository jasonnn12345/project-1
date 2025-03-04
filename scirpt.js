const apiKey = "f38d63ee8a5dc07a3351bc19005ac49e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(city) {
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "ºC";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " Km/H";

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
  } catch (error) {
    errorDiv.style.display = "block";
    weatherDiv.style.display = "block";

    cityElement.innerHTML = "-";
    tempElement.innerHTML = "-";
    humidityElement.innerHTML = "-";
    windElement.innerHTML = "-";
  }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});
