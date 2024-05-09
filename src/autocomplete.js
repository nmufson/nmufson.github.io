import { loadPage } from "./index.js";

const mainContainer = document.querySelector('.main-container');
export const fetchAutoComplete = async (string) => {
  try {
    const autoCompleteResponse = await fetch(`http://api.weatherapi.com/v1/search.json?key=51da3bac1aef4a96b1e194755240205&q=${string}`);
    const autoCompleteData = await autoCompleteResponse.json();
    return autoCompleteData;
  } catch (error) {
    console.log(error);
  }
};

export const populateAutoComplete = async (string) => {
  const autoCompleteData = await fetchAutoComplete(string);
  const outerSearch = document.querySelector('.outer-search');
  
  const ul = document.querySelector('.search-results');
  ul.innerHTML = '';


  for (let i = 0; i < 5; i++) {
    if (!autoCompleteData[i]) return;

    const city = autoCompleteData[i].name;
    const region = autoCompleteData[i].region;
    const country = autoCompleteData[i].country;

    const newListItem = createListItem(city,region,country);

    newListItem.addEventListener('click', () => {
      const location = newListItem.textContent;
      mainContainer.innerHTML = '';
      loadPage(location);
    });

    ul.appendChild(newListItem);
  };
  
  outerSearch.appendChild(ul);
}

export const createListItem = (city,region,country) => {
  const listItem = document.createElement('li');
  const listPara = document.createElement('p');

  listPara.textContent = `${city}, ${region}, ${country}`;

  listItem.appendChild(listPara);

  return listItem;
}

