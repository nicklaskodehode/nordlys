// API Documentation http://auroraslive.io/#/api/v1

// tz (timezone) changes the timezone. -60 gives our timezone

//Current
const lat = 62.197089;
const long = 6.126711;

// ALL MODULE:
// let url = `https://api.auroras.live/v1/?type=all&lat=62.197089&long=6.126711&forecast=false&threeday=true`;

// ACE MODULE:
// let url = `https://api.auroras.live/v1/?type=ace&data=all&lat=62.197089&long=6.126711&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=ace&lat=62.197089&long=6.126711&data=probability&tz=-60`;

// ARCHIVE MODULE:
// let url = `https://api.auroras.live/v1/?type=archive&action=stats&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=archive&action=search&start=1am&end=2:00am&tz=-60`;

// EMBEDED MODULE: 
// let url = `https://api.auroras.live/v1/?type=embed&image=weather&lat=62.197089&long=6.126711&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=embed&image=current&tz=-60`;

// IMAGE MODULE
// let url = `https://api.auroras.live/v1/?type=images&action=list&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=images&image=yellowknife&tz=-60`;

// LOCATION MODULE:
let url = `https://api.auroras.live/v1/?type=locations&tz=-60`;

// WEATHER MODULE: 
// WHY YOU NO WORK
// let url = `https://api.auroras.live/v1/?type=weather&lat=40.7813913&long=-73.976902&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=weather&lat=40.7813913&long=-73.976902&forecast=true&tz=-60`;

const header = document.querySelector("#headerText");
const info = document.querySelector("#auroraInfo");
const infoImg = document.querySelector("#infoImg");

fetch(url)
.then(response => response.json())
.then((data) => { 
  console.log(data[0]); // get all data
  // console.log(data.ace.kp); // get KP data
    // console.log(data.ace.colour.kp); // get KP colourÅÅ
  
    header.textContent = data[0].name
    const lat = data[0].lat;
    const long = data[0].long;
  fetchKPData(lat, long);
  fetchWeatherImg(lat, long);
  // for(let key in data){
  //   console.log(data[key].ace);
  //   console.log(data[key].threeday);
  //   console.log(data[key]);
  // }
}).catch(error => console.error(error));

function fetchKPData(lat, long){
  let url = `https://api.auroras.live/v1/?type=ace&data=all&lat=${lat}&long=${long}&tz=-60`;
  fetch(url)
.then(response => response.json())
.then((data) => { console.log(data);
  info.textContent = "Current KP: " + data.kp + " " + "Bz: "+data.bz + " " + "Density: "+data.density;
}).catch(error => console.error(error));
}

function fetchWeatherImg(lat, long){
  let url = `https://api.auroras.live/v1/?type=weather&lat=40.7813913&long=-73.976902&tz=-60`;
  fetch(url)
  .then(response => response.json())
  .then((data) => { console.log(data)
  }).catch(error => console.error(error));
  }

