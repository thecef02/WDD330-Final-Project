
//5c80726bacmsha4026533a6e64d3p14eef0jsn0eb1adbcc357

// select HTML elements in the document
const currentTemp = document.querySelector('#temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

const cf = document.querySelector("#tempType");
// const btnCF = document.querySelector("#cf");
// btnCF.addEventListener("click",apiFetch);
// const url = "https://api.openweathermap.org/data/2.5/weather?q=american%20fork,UT,US&appid=a1cdf4d637caf46a9288686067728afa&units=imperial"

const url = ""
let data = {}
// https://api.openweathermap.org/data/2.5/forecast?q=Orem,UT,US&appid=a1cdf4d637caf46a9288686067728afa&units=imperial


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
    
    //currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' ');;
    // if (cf.textContent == "°C" | cf.textContent == ""){
    //   windSpeed.textContent = weatherData.wind.speed.toFixed(1);
    //   speedType.textContent = "mph"
    // } else{
    //   speedType.textContent = "km/h"
    //   windSpeed.textContent = (weatherData.wind.speed * 1.60934).toFixed(1);
    // };
}
// function setTempType(weatherData){
//   //weatherData.main.temp = weatherData.main.temp - 30; test to see if it works in case the temp > 50
//   if (cf.textContent == "°C" | cf.textContent == ""){
//     currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
//     cf.textContent = "°F"
//     displayWindChill(false);
//   } else{
//     currentTemp.innerHTML = `${fahrenheitToCelsius(weatherData.main.temp).toFixed(0)}`;
//     cf.textContent = "°C"
//     displayWindChill(true);
//   }
// }
function fahrenheitToCelsius(fahrenheitTemp){
  return (fahrenheitTemp - 32) * (5/9)
}

function updatePage(){
 // console.log(data);
  displayResults(data);
  // setTempType(data);
  url = `https://api.openweathermap.org/data/2.5/forecast?q=${}`

}

apiFetch();


