


let hotelData = {};
let allHotelInfo = {};
let compareRndnum = 0;
const rndNum = Math.floor(Math.random() * 14) + 1; // to get a random number of temples.
/*  humburger menu  */
// function toggleMenu() {
//     document.getElementById("primaryNav").classList.toggle("open");
//     document.getElementById("hamburgerBtn").classList.toggle("open");
// }
// const x = document.getElementById("hamburgerBtn");
// x.onclick = toggleMenu;


//footer show last modified.
// const lastModDate = new Date(document.lastModified);
// let strLMD = 'Last updated on: ' + lastModDate.getMonth() + "/" + lastModDate.getDate() + "/" 
//            + lastModDate.getFullYear() + " " + lastModDate.getHours() + ":" 
//            + lastModDate.getMinutes() + ":" + lastModDate.getSeconds();
// document.getElementById("last-update").textContent = strLMD;

/* load the options for the destination select */
let destiantionSelect = document.querySelector('#destiantion');
let makeReservation = document.querySelector('.bed-button');
makeReservation.addEventListener("click",redirectToReservation);

let checkIn = document.querySelector('#checkIn');
let checkOut = document.querySelector('#checkOut');

function redirectToReservation(){
  console.log(destiantionSelect.value)
  console.log(roomCombo.value)
  console.log(checkIn.innerHTML)
    console.log(checkOut.innerText)
  window.location.href = './reservations.html';





};


function getHotelDetailInfo(hotelID){
  //'https://hotels4.p.rapidapi.com/locations/v3/search?q=new%20york&locale=en_US&langid=1033&siteid=300000001'
  let hName = '';
  //debugger;
  const options = {
    method: 'GET',
    headers: {
        //'X-RapidAPI-Key': '5c80726bacmsha4026533a6e64d3p14eef0jsn0eb1adbcc357',
        //'X-RapidAPI-Key': '6931d989ffmsh118bed85a85a6c4p176f43jsn2b460f96d581',
        //'X-RapidAPI-Key': '04f2322d57msh40214398878f730p1baf7bjsnba45fd962457',
        //mia
        'X-RapidAPI-Key': '7dc985f0bemsh074067a14f3282bp131014jsn8d3feb7f0864',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'}
};
  const a = fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${hotelID}&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options)
    .then(response => response.json())
    .then(function(response){
      hName = response.data.body.propertyDescription.name
      allHotelInfo[hotelID] = response;
      if ((document.URL.includes("index.html") ||  document.URL.includes("reservations.html")) && hotelID == hotelData[0].hotelID[0]){
        
        const html = `<option  value="${hotelID}">${hName}</option>\n`;
        destiantionSelect.innerHTML += html;
        // updateWeather(response.data.body.propertyDescription.address.cityName)  //update the Weather section by passing the city.
        // destiantionSelect_onChange ()
      }else{
        const html = `<option value="${hotelID}">${hName}</option>\n`;
        destiantionSelect.innerHTML += html;
      };
      
    })
    
    .catch(err => console.error(err));
    //add all from function addHotelCity

  console.log(allHotelInfo);
};

function loadCombo(){
  const requestFile = 'data/hotels.json';
  if ( document.URL.includes("index.html") ||  document.URL.includes("reservations.html") ){
    fetch(requestFile)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonObject) {
        hotelData = jsonObject;
        hotelData[0].hotelID.forEach(getHotelDetailInfo)//send to getHotelDetailInfo
      });
  };

  destiantionSelect.addEventListener("change",destiantionSelect_onChange);
};


function destiantionSelect_onChange (){
  let h = [];
  let roomCombo = document.querySelector("#roomCombo");
  let hotelInfo = document.querySelector(".hotel-info");
  roomCombo.innerHTML = "";
  if (destiantionSelect.value != ""){ //it enters if a hotel has been selected

    //all options of rooms
    h= allHotelInfo[destiantionSelect.value].data.body.propertyDescription.roomTypeNames;
      const html = `<option  selected="selected" value="">--Select  Room--</option>\n`;
      roomCombo.innerHTML += html;
    let a = h.forEach(roomType => {
        const html = `<option  selected="selected" value="${h.indexOf(roomType)}">${roomType}</option>\n`;
        roomCombo.innerHTML += html;
    });

    //amenities = allHotelInfo[destiantionSelect.value].data.body...a..
    
    
    //hotel address
    let fAddress = allHotelInfo[destiantionSelect.value].data.body.propertyDescription.address.fullAddress.replace(', United States of America','');  
    let name = document.querySelector("#hotel-name");
    name.textContent = destiantionSelect.selectedOptions[0].innerText;
    let address = document.querySelector("#hotel-address");
    address.textContent = fAddress;
    let phone = document.querySelector("#hotel-phone");
    phone.textContent = '1-800-159-4657'; //no phone number on API.
    //let image = document.querySelector("#hotel-img");
        //image.setAttribute('src', allHotelInfo[destiantionSelect.value].data.body.propertyDescription.mapWidget.staticMapUrl);
        //image.setAttribute('alt', `Image of ${destiantionSelect.text}`);
        hotelInfo.style.visibility = "visible"
        updateWeather(allHotelInfo[destiantionSelect.value].data.body.propertyDescription.address.cityName)

  }else{     
    const html = `<option  value="">--Select Room--</option>\n`;
    roomCombo.innerHTML += html;

     
    hotelInfo.style.visibility = 'hidden';
  };
} ;




async function apiFetch(url) {
  let data="";
  try {
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
      displayResults(data);
    } else {
        throw Error(await response.text());
    };
  } catch (error) {
      alert(error);
      
  };
};
function updateWeather(hotelLocation){
    let url="";
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${hotelLocation.replace(" ","%20")},US&appid=a1cdf4d637caf46a9288686067728afa&units=imperial`;
    const cityWeather = document.querySelector("#city-weather");
    cityWeather.innerHTML = hotelLocation; 
    apiFetch(url);
 }

 function displayResults(weatherData){
    //86400
    //currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
    let dataWeather = weatherData.list;
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
 };




 loadCombo();
