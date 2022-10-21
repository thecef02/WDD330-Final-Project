
function toggleMenu() {
  document.getElementById("primaryNav").classList.toggle("open");
  document.getElementById("hamburgerBtn").classList.toggle("open");
}

function setDayAndTime(){
  /*   place date on top right corner of the page */
  const datefield = document.querySelector("aside");
  const now = new Date();
  const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
  datefield.innerHTML = `<em>${fulldate}</em>`;
}
function convertToText(res) {
    if (res.ok) {
      return res.text();
    } else {
      throw new Error("Bad Response");
    }
  }

export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement("template");
    template.innerHTML = html;
    return template;
  }

// load the header and footer
export async function loadHeaderFooter() {
    const header = await loadTemplate("../Final Project/partials/header.html");
    const footer = await loadTemplate("../Final Project/partials/footer.html");
    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");
    renderWithTemplate(header, headerElement);
    //Finish rendireing the header, now we add the time and the hamburger menu
    setDayAndTime()
    const x = document.getElementById("hamburgerBtn");
    x.onclick = toggleMenu;
    renderWithTemplate(footer, footerElement);
  }


export function renderWithTemplate(template, parent, data, callback) {
    let clone = template.content.cloneNode(true);
    if (callback) {
      clone = callback(clone, data);
    }
    parent.appendChild(clone);
  }


  export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }