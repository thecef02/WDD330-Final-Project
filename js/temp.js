

// select HTML elements in the document
const currentTemp = document.querySelector('#temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

const cf = document.querySelector("#tempType");
const url = ""
let data = {}
async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        data = await response.json();
        updatePage()
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
function displayResults(weatherData){
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');;
}

function fahrenheitToCelsius(fahrenheitTemp){
  return (fahrenheitTemp - 32) * (5/9)
}

function updatePage(){
  displayResults(data);
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${}`

}

apiFetch();


