import { getParam } from "./utils.js";


let hotelData = {};
let allHotelInfo = {};


/* load the options for the destination select */
let destinationSelect = document.querySelector('#destination');
let checkIn = document.querySelector('#checkIn');
let checkOut = document.querySelector('#checkOut');
let room = document.querySelector('#roomCombo');

if ( document.URL.includes("index.html")){
  let makeReservation = document.querySelectorAll('.bed-button');
  makeReservation.forEach(button =>{
    button.addEventListener("click",redirectToReservation);
  })
}
else if( document.URL.includes("reservations.html")) {
  let savedHotel = getLocalStorage('lastHotel');
  let lastH = document.querySelector("#last-hotel");
  if (savedHotel != null){
    lastH.textContent = `Last hotel selected: ${savedHotel}`;
    lastH.style.visibility = 'visible';
  }
  else{
    lastH.style.visibility = 'hidden';  
  }
  destinationSelect.selectedIndex = getParam("destination");
  room.selectedIndex = getParam('room');
  checkIn.value = getParam("checkIn");
  checkOut.value = getParam("checkOut");

};

function redirectToReservation(){
  let d = destinationSelect.value;
  let r = roomCombo.value;
  let i = checkIn.value;
  let o = checkOut.value;
  window.location.href = `./reservations.html?destination=${d}&room=${r}&checkIn=${i}&checkOut=${o}`;

};


function getHotelDetailInfo(hotelID){
  //'https://hotels4.p.rapidapi.com/locations/v3/search?q=new%20york&locale=en_US&langid=1033&siteid=300000001'
  let hName = '';
  const options = {
    method: 'GET',
    headers: {
        //'X-RapidAPI-Key': '5c80726bacmsha4026533a6e64d3p14eef0jsn0eb1adbcc357',
        'X-RapidAPI-Key': '6931d989ffmsh118bed85a85a6c4p176f43jsn2b460f96d581',
        //'X-RapidAPI-Key': '04f2322d57msh40214398878f730p1baf7bjsnba45fd962457',
        //mia
        //'X-RapidAPI-Key': '7dc985f0bemsh074067a14f3282bp131014jsn8d3feb7f0864',
        //thecef02
        // 'X-RapidAPI-Key': 'b858a9d176mshec01cd990f51108p1c807bjsn757d73457e96',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'}
};
  const a = fetch(`https://hotels4.p.rapidapi.com/properties/get-details?id=${hotelID}&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1&currency=USD&locale=en_US`, options)
    .then(response => response.json())
    .then(function(response){
      hName = response.data.body.propertyDescription.name
      allHotelInfo[hotelID] = response;
      if ((document.URL.includes("index.html") ||  document.URL.includes("reservations.html")) && hotelID == hotelData[0].hotelID[0]){
        const html = `<option  value="${hotelID}">${hName}</option>\n`;
        destinationSelect.innerHTML += html;
      }else{
        const html = `<option value="${hotelID}">${hName}</option>\n`;
        destinationSelect.innerHTML += html;
      };
      
    })
    
    .catch(err => console.error(err));
    //add all from function addHotelCity
};

function loadCombo(){
  const requestFile = './data/hotels.json';
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

  destinationSelect.addEventListener("change",destinationSelect_onChange);
};


function destinationSelect_onChange (){
  let h = [];
  let roomCombo = document.querySelector("#roomCombo");
  let hotelInfo = document.querySelector(".hotel-info");
  roomCombo.innerHTML = "";
  if (destinationSelect.value != ""){ //it enters if a hotel has been selected
    //all options of rooms
    setLocalStorage('lastHotel',allHotelInfo[destinationSelect.value].data.body.propertyDescription.name)
    h= allHotelInfo[destinationSelect.value].data.body.propertyDescription.roomTypeNames;
      const html = `<option  selected="selected" value="">--Select  Room--</option>\n`;
      roomCombo.innerHTML += html;
    let a = h.forEach(roomType => {
        const html = `<option  selected="selected" value="${h.indexOf(roomType)}">${roomType}</option>\n`;
        roomCombo.innerHTML += html;
    });
    //amenities
    if (!document.URL.includes("reservations.html")){
      const ameniti1 = document.querySelector("#ameniti1");
      const ameniti2 = document.querySelector("#ameniti2");
      ameniti1.innerHTML = '';
      ameniti2.innerHTML = '';
      allHotelInfo[destinationSelect.value].data.body.amenities.forEach(amenity =>{
        amenity.listItems.forEach(section =>{
          let html = `<strong>${section.heading}</strong>: `
          section.listItems.forEach(item => {
            const subAmenities = `${item}, `;
            html += subAmenities;
          })
          html = html.substring(0,html.length -2);
          if (amenity.heading == 'In the hotel'){
            ameniti1.innerHTML += `<li>${html}.</li>`;
          }
          else {
            ameniti2.innerHTML += `<li>${html}.</li>`;
          }
        })
      })
    
      //hotel address
      let fAddress = allHotelInfo[destinationSelect.value].data.body.propertyDescription.address.fullAddress.replace(', United States of America','');  
      let name = document.querySelector("#hotel-name");
      name.textContent = destinationSelect.selectedOptions[0].innerText;
      let address = document.querySelector("#hotel-address");
      address.textContent = fAddress;
      let phone = document.querySelector("#hotel-phone");
      phone.textContent = '1-800-159-4657'; //no phone number on API.
      updateWeather(allHotelInfo[destinationSelect.value].data.body.propertyDescription.address.cityName)
    }
  }else{     
    const html = `<option  value="">--Select Room--</option>\n`;
    roomCombo.innerHTML += html;
    hotelInfo.style.visibility = 'hidden';
  };
} ;


//setting up fetch call
function updateWeather(hotelLocation){
    let url="";
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${hotelLocation.replace(" ","%20")},US&appid=a1cdf4d637caf46a9288686067728afa&units=imperial`;
    const cityWeather = document.querySelector("#city-weather");
    cityWeather.innerHTML = hotelLocation; 
    apiFetch(url);
 }
//fetch weather info
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
 //update html for weather conditions
 function displayResults(weatherData){
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


// retrieve data from localstorage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// CSS inplemented to enhance visivility.
let destination = document.getElementById("destination"),
    checkingIn = document.getElementById("checkIn"),
    checkingOut = document.getElementById("checkOut"),
    roomCombo = document.getElementById("roomCombo");
    
  function enlargeInputDestination() {
    destination.style.transform = "scale(1.3)";
    destination.style.transition = "all .5s";
  }

  function shrinkInputDestination() {
    destination.style.transform = "scale(1)";
    destination.style.transition = "all .5s";
  }

  function enlargeInputChekingIn() {
    checkingIn.style.transform = "scale(1.3)";
    checkingIn.style.transition = "all .5s";
  }

  function shrinkInputChekingIn() {
    checkingIn.style.transform = "scale(1)";
    checkingIn.style.transition = "all .5s";
  }

  function enlargeInputChekingOut() {
    checkingOut.style.transform = "scale(1.3)";
    checkingOut.style.transition = "all .5s";
  }

  function shrinkInputChekingOut() {
    checkingOut.style.transform = "scale(1)";
    checkingOut.style.transition = "all .5s";
  }

  function enlargeInputRoomCombo() {
    roomCombo.style.transform = "scale(1.3)";
    roomCombo.style.transition = "all .5s";
  }

  function shrinkInputRoomCombo() {
    roomCombo.style.transform = "scale(1)";
    roomCombo.style.transition = "all .5s";
  }

  destination.addEventListener("focus", enlargeInputDestination);
  destination.addEventListener("blur", shrinkInputDestination);

  checkingIn.addEventListener("focus", enlargeInputChekingIn);
  checkingIn.addEventListener("blur", shrinkInputChekingIn);

  checkingOut.addEventListener("focus", enlargeInputChekingOut);
  checkingOut.addEventListener("blur", shrinkInputChekingOut);

  roomCombo.addEventListener("focus", enlargeInputRoomCombo);
  roomCombo.addEventListener("blur", shrinkInputRoomCombo);



 loadCombo();
