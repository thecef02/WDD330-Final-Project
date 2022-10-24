import { getParam } from "./utils.js";
// import {allHotelInfo } from "./scripts";
debugger;


console.log(allHotelInfo);
function preLoadInfo(){
    const dest = getParam("destination");
    let hName =''
    const destination = document.querySelector("#destination")
    allHotelInfo.foreach(hotelID =>{
        const html = `<option  value="${hotelID}">${allHotelInfo[hotelID].data.body.propertyDescription.name}</option>\n`;
        destination.innerHTML += html;
    })
    destination.selectedIdex = dest
    const h = allHotelInfo[destination.value].data.body.propertyDescription.roomTypeNames
    h.forEach(roomType => {
        const html = `<option  selected="selected" value="${h.indexOf(roomType)}">${roomType}</option>\n`;
        roomCombo.innerHTML += html;
    });

    const checkIn = document.querySelector("#checkIn")
    checkIn.value = getParam("checkIn");
    const checkOut = document.querySelector("#checkOut");
    checkOut.value = getParam("checkOut");
    const room = document.querySelector("#roomCombo");
    room.selectedIndex = getParam("room");

};



preLoadInfo()


