//required data
//feels like c, feels likef, wind kph, wind mph, condition.text, humidity,
//temp c, temp f, uv, 
import { searchDiv, currentWeather, hourlyForecast, dailyForecast } from "./dom-manipulation";

searchDiv();
currentWeather();
hourlyForecast();
dailyForecast();

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

const processWeatherData = async (city) => {
  const weatherData = await fetchWeather(city);

  const current = weatherData.current;
  const forecastDayZero = weatherData.forecast.forecastday[0];
  const forecastDayOne = weatherData.forecast.forecastday[1];
  const forecastDayTwo = weatherData.forecast.forecastday[2];


  const currentWeatherObject = {
    condition: current.condition.text,
    tempF: current.temp_f,
    tempC: current.temp_c,
    feelsLikeTempF: current.feelslike_f,
    feelsLikeTempC: current.feelslike_c,
    windMPH: current.wind_mph,
    windKPH: current.wind_kph,
    humidity: current.humidity,
    UV: current.uv
  };

  const forecastedWeatherObject = {

  }

  console.log(weatherData)
  console.log(currentWeatherObject);
};

    

    

processWeatherData('miami');
