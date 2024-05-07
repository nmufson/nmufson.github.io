const createDomElements = () => {
  const div = document.createElement('div');
  const button = document.createElement('button');
  const input = document.createElement('input');
  const para = document.createElement('para');
  const img = document.createElement('img');
  const mainContainer = document.querySelector('.main-container');

  return {
    div: div, 
    button: button,
    input: input,
    para: para,
    img: img,
    mainContainer: mainContainer
  };
}

export const searchDiv = () => {
  const {div, input, para, img, mainContainer} = createDomElements();

  div.className = 'search';
  input.type = 'text';

  para.textContent = 'Search City:';

  mainContainer.appendChild(div);
  div.appendChild(para);
  div.appendChild(input);
  div.appendChild(img);
}

export const currentWeather = () => {
  const {div, input, para, img, mainContainer} = createDomElements(); 

  const containerDiv = div;
  containerDiv.classList.add('current-weather');

  mainContainer.appendChild(containerDiv);

  const infoDiv = div;
}

export const hourlyForecast = () => {
  const {div, input, para, img, mainContainer} = createDomElements(); 

  const containerDiv = div;
  containerDiv.classList.add('hourly-forecast');

  mainContainer.appendChild(containerDiv);

  const infoDiv = div;
}

export const dailyForecast = () => {
  const {div, input, para, img, mainContainer} = createDomElements(); 

  const containerDiv = div;
  containerDiv.classList.add('daily-forecast');

  mainContainer.appendChild(containerDiv);

  const infoDiv = div;
}


