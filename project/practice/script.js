document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message"); 

    const API_KEY = "cc336368d1f98cb6519df5fc19f91b96";

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();

        if(city === "") {
            alert("please enter a city name");
            return;
        }

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);

        }catch(error) {
            console.error("Error fetching weather data:", error);
            showError();
        }
    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if(!response.ok) {
            throw new Error(`city not found ${response.statusText}`);
        }
        return response.json();
    }

    function displayWeatherData(data) {
        const {name, main, weather} = data;

        cityNameDisplay.textContent = `city: ${name}`;
        temperatureDisplay.textContent = `temperature: ${main.temp}C`;
        descriptionDisplay.textContent = `weather: ${weather[0].description}`;


        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");

    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        errorMessage.textContent =   "Unable to fetch weather data. Please try again.";

    }
});