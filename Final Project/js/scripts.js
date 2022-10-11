/*   place date on top right corner of the page */
const datefield = document.querySelector("aside");
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
const rndNum = Math.floor(Math.random() * 14) + 1;
let compareRndnum = 0
datefield.innerHTML = `<em>${fulldate}</em>`;
let templeData = {}

/*  humburger menu  */
function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
}
const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;


//footer show last modified.
const lastModDate = new Date(document.lastModified);
let strLMD = 'Last updated on: ' + lastModDate.getMonth() + "/" + lastModDate.getDate() + "/" 
           + lastModDate.getFullYear() + " " + lastModDate.getHours() + ":" 
           + lastModDate.getMinutes() + ":" + lastModDate.getSeconds();
document.getElementById("last-update").textContent = strLMD;






/* load the options for the destination select */
let destiantionSelect = document.querySelector('#destiantion');
const requestFile = 'data/data.json';
if ( document.URL.includes("index.html") ||  document.URL.includes("reservations.html") ){
  fetch(requestFile)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      templeData = jsonObject;
      templeData.forEach(addTemple)
      
    });

  function addTemple(temple){
    compareRndnum+=1
      if (compareRndnum == rndNum && document.URL.includes("index.html")){
        const html = `<option  selected="selected" value="${temple.name}">${temple.name}</option>\n`;
        destiantionSelect.innerHTML += html;
        updateWeather(temple.location)
      }else{
        const html = `<option value="${temple.name}">${temple.name}</option>\n`;
        destiantionSelect.innerHTML += html;
      }
      
  }


  destiantionSelect.addEventListener("change",destiantionSelect_onChange);
};

function destiantionSelect_onChange (){
  if (destiantionSelect.value != ""){
    let name = document.querySelector("#temple-name");
    let address = document.querySelector("#temple-address");
    let phone = document.querySelector("#temple-phone");
    let image = document.querySelector("#temple-img");
    let templeInfo = document.querySelector(".temple-info");
    let t = templeData.forEach(temple => {
      if (temple.name == destiantionSelect.value){
        name.textContent = temple.name;
        address.textContent = temple.address;
        phone.textContent = temple.phone;
        image.setAttribute('src', temple.imageUrl);
        image.setAttribute('src', temple.imageUrl);
        image.setAttribute('alt', `Image of ${temple.name}`);
        templeInfo.style.visibility = "visible"
        updateWeather(temple.location)
      }
        })

  }else{     
    let templeInfo = document.querySelector(".temple-info"); 
    templeInfo.style.visibility = 'hidden';
  }
} 




async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      alert(error);
  }
}
function updateWeather(templeLocation){
   url = `https://api.openweathermap.org/data/2.5/forecast?q=${templeLocation.replace(" ","%20")},US&appid=a1cdf4d637caf46a9288686067728afa&units=imperial`
   const cityWeather = document.querySelector("#city-weather")
   cityWeather.innerHTML = templeLocation 
   apiFetch();
 }

 function displayResults(weatherData){
    //86400
    //currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
    let dataWeather = weatherData.list
    let startHour = 0;
      //create the holder of all weathers per day
      const father = document.querySelector("#five-days-weather");
      father.innerHTML = "";
  // this will return 5 days of weather information.
  const fiveDaysWeatherInfo = dataWeather.filter(forHourTimeFrame => {
    if (startHour + 86400 == forHourTimeFrame.dt || startHour == 0){
      startHour = forHourTimeFrame.dt;
      

      //holder for temp of a day
      const oneDayHolder = document.createElement("div");
      oneDayHolder.setAttribute('class','weather-day');
      //get the day name
      const header5  = document.createElement("h5");
      let theDay = new Date(forHourTimeFrame.dt*1000);
      header5.textContent = theDay.toLocaleDateString("en-EN", { weekday: 'long' });
      
      //get temp
      const header4  = document.createElement("h4");
      header4.textContent = `${parseFloat(forHourTimeFrame.main.temp).toFixed(1)} °F` ;

      const image  = document.createElement("img");
      image.setAttribute('src',`https://openweathermap.org/img/w/${forHourTimeFrame.weather[0].icon}.png`);
      image.setAttribute('alt','icon weather');

      const para  = document.createElement("p");
      para.textContent = forHourTimeFrame.weather[0].description;
      
      const headerh4_2 = document.createElement("h4");
      headerh4_2.textContent = `${forHourTimeFrame.main.humidity}%` ;
      
      const para2 = document.createElement("p");
      para2.textContent = "Humidity";
      
      oneDayHolder.appendChild(header5);
      oneDayHolder.appendChild(header4);
      oneDayHolder.appendChild(image);
      oneDayHolder.appendChild(para);
      oneDayHolder.appendChild(headerh4_2);
      oneDayHolder.appendChild(para2);
      father.appendChild(oneDayHolder);
      return forHourTimeFrame;
    };
  });
 }










