import { domManipulation } from './dom-manipulation'
import { getWeather } from './fetch-weather'

export const loadPage = async (city) => {
  const loadingDiv = document.querySelector('.loading')
  const loadingPara = loadingDiv.children[0]

  loadingDiv.style.display = 'grid'

  const mainContainer = document.querySelector('.main-container')

  try {
    const weatherObj = await getWeather(city).processWeatherData(city)
    mainContainer.innerHTML = ''
    domManipulation().searchDiv()
    domManipulation().currentWeather(weatherObj)
    domManipulation().hourlyForecast(weatherObj)
    domManipulation().dailyForecast(weatherObj)
    loadingDiv.style.display = 'none'
  } catch (error) {
    loadingPara.textContent = 'Invalid Location. Try Again!'
    setTimeout(() => (loadingDiv.style.display = 'none'), 1000)
  }
}

loadPage('New York City')
