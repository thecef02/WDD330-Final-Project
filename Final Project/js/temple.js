const btnGridview = document.getElementById('gridview');
const btnListview = document.getElementById('listview');
const display = document.querySelector("#mainDiv");
const likedTemple = window.localStorage.getItem("liked-temple");
const requestFile = 'data/data.json';
const cards = document.querySelector('.cards');

fetch(requestFile)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const businessList = jsonObject;
    businessList.forEach(displayBusiness);




  });

function displayBusiness(businessList) {
  
    // Create elements to add to the document
    let card = document.createElement('section');
    let div = document.createElement('div')
      let name = document.createElement('h4');
      let logo = document.createElement('img');
      let det = document.createElement('details');
        let sum = document.createElement('summary');
        let detPara = document.createElement('p');
        det.appendChild(sum);
        
    let address = document.createElement('p'); //address
    let phone = document.createElement('p'); //phone
    let website = document.createElement('a'); // web site
    let like = document.createElement('img');
    // Change the textContent property of the h2 element to contain the prophet's full name
    name.textContent = `${businessList.name}`;
    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    logo.setAttribute('src', businessList.imageUrl);
    logo.setAttribute('alt', `Logo of ${businessList.name}`);
    logo.setAttribute('class', `imglogo`);
    logo.setAttribute('loading', 'lazy');
    
      if (businessList.name == likedTemple){
        like.setAttribute('src', 'images/like-on50.png');
      }else{   
        like.setAttribute('src', 'images/like-off50.png');
      }  
    like.setAttribute('alt', `Like this Temple`);
    like.setAttribute('class', 'imglike');
    like.setAttribute('id',`${businessList.name}`)
    like.addEventListener('click',likeThisTemple)


    address.textContent = `${businessList.address}, ${businessList.location}, UT ${businessList.zip}`;
    phone.textContent = `${businessList.phone}`;
    if (businessList.website != null){
      website.textContent = `${businessList.name} website`;
      website.setAttribute('href',businessList.website);
    }else {
      website.textContent = `No website`;
    }



    // Add/append the section(card) with the h2 element
    card.appendChild(div);

      div.appendChild(logo);
      div.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(like);
    card.appendChild(det);
    sum.textContent="See close dates."
  
    const floatingInfo = businessList.closures.forEach(dayClosed =>{
        detPara.innerHTML=`${detPara.innerHTML}<br>${dayClosed}`
    } )
    det.appendChild(detPara);

  document.querySelector('div.grid').appendChild(card);
}

function likeThisTemple(a){
  //
  const el = document.querySelectorAll(".imglike");
  const ell = el.forEach(e =>{
    e.attributes[0].nodeValue = "images/like-off50.png";
  });

  if(a.target.src.substr(-14) == "like-off50.png"){
    a.target.src = "images/like-on50.png"
    localStorage.setItem("liked-temple", a.target.id);
  }else{
    a.target.src = "images/like-off50.png"
    //localStorage.setItem("liked-temple", "None");
  }
  // a.target.src = "images/like-on50.png";

}
//footer show last modified.
const lastModDate = new Date(document.lastModified);
let strLMD = 'Last updated on: ' + lastModDate.getMonth() + "/" + lastModDate.getDate() + "/" 
           + lastModDate.getFullYear() + " " + lastModDate.getHours() + ":" 
           + lastModDate.getMinutes() + ":" + lastModDate.getSeconds();
document.getElementById("last-update").textContent = strLMD;









