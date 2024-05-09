import { getHours, format, addDays } from 'date-fns';
import { loadPage } from './index.js';
import { populateAutoComplete } from './autocomplete.js';



const mainContainer = document.querySelector('.main-container');
const createDomElements = () => {
  
  const button = document.createElement('button');
  const input = document.createElement('input');
  const para = document.createElement('para');
  const img = document.createElement('img');
  const mainContainer = document.querySelector('.main-container');

  return {
    div: document.createElement('div'), 
    button: button,
    input: input,
    para: para,
    img: img,
    mainContainer: mainContainer
  };
}

export const searchDiv = () => {
  const outerDiv = document.createElement('div');
  const innerDiv = document.createElement('div');
  const para = document.createElement('p');
  const input = document.createElement('input');
  const searchButton = document.createElement('button');
  const ul = document.createElement('ul');

  outerDiv.className = 'outer-search';
  innerDiv.className = 'inner-search';
  para.textContent = 'City:';
  input.type = 'text';
  searchButton.textContent = 'Search';

  input.classList.add('search-input');
  ul.classList.add('search-results');

  searchButton.addEventListener('click', () => {
    const location = input.value;
    mainContainer.innerHTML = '';
    loadPage(location);
  });

  input.addEventListener('input', () => {
    console.log(input.value)
    populateAutoComplete(input.value);
  });

  innerDiv.appendChild(para);
  innerDiv.appendChild(input);
  innerDiv.appendChild(searchButton);
  
  outerDiv.appendChild(innerDiv);
  outerDiv.appendChild(ul);
  mainContainer.appendChild(outerDiv);
}

//add country and city to this on left
//if country is US, use city and State
export const currentWeather = async (weatherObj) => { 

  const currentDiv = document.createElement('div');
  const leftDiv = document.createElement('div');
  const rightDiv = document.createElement('div');
  const leftTopDiv = document.createElement('div');
  const leftBottomDiv = document.createElement('div');
  const rightTopDiv = document.createElement('div');
  const rightMiddleDiv = document.createElement('div');
  const rightBottomDiv = document.createElement('div');
  const feelsLikeDiv = document.createElement('div');
  const cloudCoverageDiv = document.createElement('div');
  const humidityDiv = document.createElement('div');
  const windDiv = document.createElement('div');
  const uvDiv = document.createElement('div');

  const icon = document.createElement('img');
  const cityPara = document.createElement('p');
  const countryPara = document.createElement('p');
  const tempPara = document.createElement('p');
  const conditionPara = document.createElement('p');
  const feelsLikeParaOne = document.createElement('p');
  const feelsLikeParaTwo = document.createElement('p');
  const cloudCoverageParaOne = document.createElement('p');
  const cloudCoverageParaTwo = document.createElement('p');
  const humidityParaOne = document.createElement('p');
  const humidityParaTwo = document.createElement('p');
  const windParaOne = document.createElement('p');
  const windParaTwo = document.createElement('p');
  const uvParaOne = document.createElement('p');
  const uvParaTwo = document.createElement('p');

  
  icon.setAttribute('src',`https://${weatherObj.conditionIcon}`);
  
  const locationObj = weatherObj.location; 

  cityPara.textContent = `${locationObj.name},`;
  if (locationObj.country === 'United States of America') {
    countryPara.textContent = locationObj.region;
  } else {
    countryPara.textContent = locationObj.country;
  };
  tempPara.textContent = `${weatherObj.tempF} °`;
  conditionPara.textContent = weatherObj.conditionText;
  feelsLikeParaOne.textContent = 'FEELS LIKE';
  feelsLikeParaTwo.textContent = `${weatherObj.feelsLikeTempF} °`;
  cloudCoverageParaOne.textContent = 'CLOUD COVERAGE';
  cloudCoverageParaTwo.textContent = `${weatherObj.cloudCoverage} %`;
  humidityParaOne.textContent = 'HUMIDITY';
  humidityParaTwo.textContent = `${weatherObj.humidity} %`;
  windParaOne.textContent = 'WIND';
  windParaTwo.textContent = `${weatherObj.windMPH} mph`;
  uvParaOne.textContent = 'UV INDEtime';
  uvParaTwo.textContent = weatherObj.UV;

  currentDiv.classList.add('current-weather');
  leftDiv.classList.add('current-left');
  rightDiv.classList.add('current-right');
  leftTopDiv.classList.add('current-left-top');
  leftBottomDiv.classList.add('current-left-bottom');
  rightTopDiv.classList.add('current-right-top');
  rightMiddleDiv.classList.add('current-right-middle');
  rightBottomDiv.classList.add('current-right-bottom');



  currentDiv.appendChild(leftDiv);
  currentDiv.appendChild(rightDiv);
  leftDiv.appendChild(leftTopDiv);
  leftDiv.appendChild(leftBottomDiv);
  rightDiv.appendChild(rightTopDiv);
  rightDiv.appendChild(rightMiddleDiv);
  rightDiv.appendChild(rightBottomDiv);

  leftTopDiv.appendChild(cityPara);
  leftTopDiv.appendChild(countryPara);
  leftBottomDiv.appendChild(icon);
  leftBottomDiv.appendChild(tempPara);
  leftBottomDiv.appendChild(conditionPara);
  rightTopDiv.appendChild(feelsLikeDiv);
  rightMiddleDiv.appendChild(cloudCoverageDiv);
  rightMiddleDiv.appendChild(humidityDiv);
  rightBottomDiv.appendChild(windDiv);
  rightBottomDiv.appendChild(uvDiv);

  feelsLikeDiv.appendChild(feelsLikeParaOne);
  feelsLikeDiv.appendChild(feelsLikeParaTwo);
  cloudCoverageDiv.appendChild(cloudCoverageParaOne);
  cloudCoverageDiv.appendChild(cloudCoverageParaTwo);
  humidityDiv.appendChild(humidityParaOne);
  humidityDiv.appendChild(humidityParaTwo);
  windDiv.appendChild(windParaOne);
  windDiv.appendChild(windParaTwo);
  uvDiv.appendChild(uvParaOne);
  uvDiv.appendChild(uvParaTwo);



  mainContainer.appendChild(currentDiv);

}

export const hourlyForecast = (weatherObj) => {

  const hourlyDiv = document.createElement('div');
  hourlyDiv.classList.add('hourly-forecast');

  const now = new Date();
  const nextimetHour = getHours(now) + 1;
  

  const fragment = document.createDocumentFragment();

  for (let i = nextimetHour; i < nextimetHour + 24; i++) {

    const dayZero = weatherObj.forecast.forecastday[0]
    const dayOne = weatherObj.forecast.forecastday[1]

    if (i < 24) {
      hourlyForecastDiv(i,dayZero,fragment);
    } else {
      const iNextDay = i - 24;
      hourlyForecastDiv(iNextDay,dayOne,fragment);
    }
  }

  hourlyDiv.appendChild(fragment);
  mainContainer.appendChild(hourlyDiv);
}

const hourlyForecastDiv = (i,day,fragment) => {
  const div = document.createElement('div');
  const timePara = document.createElement('p');
  const conditionImg = document.createElement('img');
  const tempPara = document.createElement('p');
  const rainDiv = document.createElement('div');
  const rainImg = document.createElement('img');
  const rainChance = document.createElement('p');

  const time = day.hour[i].time;
  const hour = time.slice((time.search(' ')-time.length)+1);

  timePara.textContent = hour; 
  conditionImg.setAttribute('src',`https://${day.hour[i].condition.icon}`);

  tempPara.textContent = `${day.hour[i].temp_f} °`;

  rainImg.setAttribute('src','../src/icons/rain.svg');
  rainChance.textContent = `${day.hour[i].chance_of_rain} %`;

  rainDiv.appendChild(rainImg);
  rainDiv.appendChild(rainChance);

  div.appendChild(timePara);
  div.appendChild(conditionImg);
  div.appendChild(tempPara);
  div.appendChild(rainDiv);

  div.classList.add('hourly-div');
  fragment.appendChild(div);
}

const createDailyForecastDiv = (day,dayName,parentDiv) => {

  const div = document.createElement('div');
  div.classList.add('daily-div');
  const conditionImg = document.createElement('img');

  const lowerDiv = document.createElement('div');
  const tempDiv =  document.createElement('div');
  const tempParaDiv = document.createElement('div');
  const rainDiv =  document.createElement('div');
  

  const dayPara = document.createElement('p');
  const topTempPara = document.createElement('p');
  const bottomTempPara = document.createElement('p');
  const rainPara = document.createElement('p');
  

  const tempImg = document.createElement('img');
  const rainImg = document.createElement('img');
  

  div.appendChild(dayPara);
  div.appendChild(conditionImg);
  div.appendChild(lowerDiv);

  lowerDiv.appendChild(tempDiv);
  lowerDiv.appendChild(rainDiv);

  tempDiv.appendChild(tempImg);
  tempDiv.appendChild(tempParaDiv);
  tempParaDiv.appendChild(topTempPara);
  tempParaDiv.appendChild(bottomTempPara);

  rainDiv.appendChild(rainImg);
  rainDiv.appendChild(rainPara);
 

  dayPara.textContent = dayName;
  conditionImg.src = `https://${day.condition.icon}`;
  tempImg.src = '../src/icons/thermometer.svg'
  topTempPara.textContent = 'High/Low'
  bottomTempPara.textContent = `${day.maxtemp_f}°/${day.mintemp_f}°`;

  rainImg.src = '../src/icons/rain.svg';
  rainPara.textContent = `${day.daily_chance_of_rain} %`;

  parentDiv.appendChild(div);

}


export const dailyForecast = (weatherObj) => {

  const dailyForecastDiv = document.createElement('div');
  dailyForecastDiv.classList.add('daily-forecast');

  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextDay = addDays(today, 2);
  const tomorrowName = format(tomorrow, 'EEEE');
  const nextDayName = format(nextDay, 'EEEE');

  
  const dayOne = weatherObj.forecast.forecastday[1].day;
  const dayTwo = weatherObj.forecast.forecastday[2].day;

  createDailyForecastDiv(dayOne,tomorrowName,dailyForecastDiv);
  createDailyForecastDiv(dayTwo,nextDayName,dailyForecastDiv);

  mainContainer.appendChild(dailyForecastDiv);

}


