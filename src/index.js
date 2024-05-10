//required data
//feels like c, feels likef, wind kph, wind mph, condition.text, humidity,
//temp c, temp f, uv, 
import { searchDiv, currentWeather, hourlyForecast, dailyForecast } from "./dom-manipulation";
import { fetchAutoComplete } from "./autocomplete";

fetchAutoComplete('Atla');

const fetchWeather = async (city) => {
  try {
    const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=51da3bac1aef4a96b1e194755240205&q=${city}&days=3&aqi=no&alerts=no`, {
      mode: 'cors'
    });
    const weatherData = await weatherResponse.json();
    return weatherData;
  } catch (error) {
    console.log(error)
  };
};

export const processWeatherData = async (city) => {
  const weatherData = await fetchWeather(city);
  

  const current = weatherData.current;

  const weatherObj = {
    conditionText: current.condition.text,
    conditionIcon: current.condition.icon,
    tempF: current.temp_f,
    tempC: current.temp_c,
    feelsLikeTempF: current.feelslike_f,
    feelsLikeTempC: current.feelslike_c,
    windMPH: current.wind_mph,
    windKPH: current.wind_kph,
    humidity: current.humidity,
    UV: current.uv,
    cloudCoverage: current.cloud,
    isDay : current.is_day,
    forecast: weatherData.forecast,
    location: weatherData.location
  };

  return weatherObj;
};


export const loadPage = async (city) => {

  
  const loadingDiv = document.querySelector('.loading');
  const loadingPara = loadingDiv.children[0];
  console.log(loadingDiv);
  loadingDiv.style.display = 'grid';
  console.log(loadingDiv);
  
  const mainContainer = document.querySelector('.main-container');

  try {
    const weatherObj = await processWeatherData(city);
    mainContainer.innerHTML = '';
    searchDiv();
    currentWeather(weatherObj);
    hourlyForecast(weatherObj);
    dailyForecast(weatherObj);
    loadingDiv.style.display = 'none';
  } catch(error) {
    loadingPara.textContent = 'Invalid Location. Try Again!';
    setTimeout(() => loadingDiv.style.display = 'none', 1000)
  };
  
}
  


loadPage('Toronto');
