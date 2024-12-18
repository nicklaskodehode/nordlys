// API Documentation http://auroraslive.io/#/api/v1

// tz (timezone) changes the timezone. -60 gives our timezone

//Current location coords
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
// let url = `https://api.auroras.live/v1/?type=weather&lat=40.7813913&long=-73.976902&tz=-60`;
// let url = `https://api.auroras.live/v1/?type=weather&lat=40.7813913&long=-73.976902&forecast=true&tz=-60`;

//Array of random dummy values if data is not available for speed or density
const randomSpeed = [242.5, 353.6, 413.2, 98.8, 135.7];
const randomDensity = [2.18, 5.61, 3.32, 6.43, 10.65];

//Get HTML elements
const header = document.querySelector("#headerText");
const info = document.querySelector("#auroraInfo");
const infoImg = document.querySelector("#infoImg");
const searchInput = document.querySelector("#search");
const timer24Btn = document.querySelector("#timer24Btn");
const favoritter = document.querySelector("#favouriteBtn");
const favouriteIcon = document.querySelector("#favouriteIcon");
const toggle24Timer = document.querySelector("#timer24");

//Creates html elements
const chanceText = document.createElement("p");
const kp = document.createElement("p");
const bz = document.createElement("p");
const density = document.createElement("p");
const speed = document.createElement("p");

try {

//Fetch location URL and show a random locations data
fetch(url)
.then(response => response.json())
.then((data) => {
  const getRandomLocation = Object.keys(data); //Get the keys in the object
  const locationNum = Math.floor(Math.random(getRandomLocation)*getRandomLocation.length);   //Creates a random number from the getRandomLocation array
  header.textContent = data[locationNum].name;
  const lat = data[locationNum].lat; 
  const long = data[locationNum].long; 
  fetchKPData(lat, long);  
  fetchWeatherImg(lat, long); 
  next24Hours(lat, long);
}).catch(error => console.error(error));

//Fetch KP data from url and use lat and long to fetch specific location data
function fetchKPData(lat, long){
  let url = `https://api.auroras.live/v1/?type=ace&data=all&lat=${lat}&long=${long}&tz=-60`;
  fetch(url)
.then(response => response.json())
.then((data) => { 

  //Sets kp and bz data and color
  kp.textContent = "Current KP: "+ data.kp;
  kp.style.color = data.colour.kp;
  bz.textContent = "Magnetic field direction: "+data.bz;
  bz.style.color = data.colour.bz; 
  
  //Creates a random number from the randomSpeed array
  const getRandomSpeedIndex = Math.floor(Math.random(randomSpeed)*randomSpeed.length);
  
  //If theres no speed data, use randomSpeed data
  if (data.speed === "Speed") {
    speed.textContent = "Speed: "+randomSpeed[getRandomSpeedIndex];
    if(randomSpeed[getRandomSpeedIndex] < 350) {
      speed.style.color = "green";
    }else if (randomSpeed[getRandomSpeedIndex] 	>= 350 && randomSpeed[getRandomSpeed] < 500)
      speed.style.color = "yellow";
    else if(randomSpeed[getRandomSpeedIndex] 	>= 500 && randomSpeed[getRandomSpeed] < 700){
    speed.style.color = "orange";
    } else {
      speed.style.color = "red";
    }    
  } else { //Else use API data
    speed.textContent = "Speed: " +data.speed;
    speed.style.color = data.colour.speed;
  }
  //Creates a random number from the randomDensity array
  const getRandomDensity = Math.floor(Math.random(randomDensity)*randomDensity.length);
  //If theres no density data, use randomDensity data
  if (data.density === "Density") {
    density.textContent = "Density : "+randomDensity[getRandomDensity];
    if(randomDensity[getRandomDensity] < 4) {
      density.style.color = "green";
    }else if (randomDensity[getRandomDensity] >= 4 && randomDensity[getRandomDensity] < 10)
      density.style.color = "yellow";
    else if(randomDensity[getRandomDensity] >= 10 && randomDensity[getRandomDensity] <= 15) {
     density.style.color = "orange";
    } else {
      density.style.color = "red";
    }
  } else { //Else use API data
    density.textContent = "Density : " +data.density;
    density.style.color = data.colour.density;
  }

  //Set auroraPosibilty text depending on the KP data
  let auroraPosibility = "";
  if (data.kp < 3) {
    auroraPosibility = "There's low chance to see the aurora at this time";
  } else if(data.kp > 3 && data.kp < 5){
    auroraPosibility = "There's a moderate chance to see the aurora at this time";
  } else {
    auroraPosibility = "There's a high chance to see the aurora at this time";
  }
  chanceText.textContent = auroraPosibility;

  //Append all the data to the info container
  info.appendChild(chanceText);
  info.appendChild(kp);
  info.appendChild(bz);
  info.appendChild(speed);
  info.appendChild(density);
  
}).catch(error => console.error(error));
}


//Function to Fetch and show weather image
function fetchWeatherImg(lat, long){
  let url = `https://api.auroras.live/v1/?type=embed&image=weather&lat=${lat}&long=${long}&tz=-60`;
  infoImg.src = url;
  fetch(url).catch(error => console.error(error));
  }

//Function to fetch and show data for the next 24 hours
function next24Hours(lat, long) {
  let timeNow;
  let timeTomorrow;

    let url = `https://api.auroras.live/v1/?type=all&lat=${lat}&long=${long}&forecast=false&threeday=true`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i <= 1; i++) {
          for (let j = 0; j <= data.threeday.values[i].length - 1; j++) {
            if (data.threeday.values[i][j].now === true) { 
              if (i > 0) {
                timeTomorrow = data.threeday.values[i].splice(0, j + 1);
              } else {
                timeNow = data.threeday.values[i].splice(j); 
              }
            }
          }
        }

        for (let i in timeNow) {
          const timeNowData = document.createElement("p");
          timeNowData.textContent =
            timeNow[i].start.slice(11, 16) + "-" + timeNow[i].end.slice(11, 16) + " - KPI: " + timeNow[i].value;
          toggle24Timer.appendChild(timeNowData);
        }
        for (let i in timeTomorrow) {
          const timeTomorrowData = document.createElement("p");
          timeTomorrowData.textContent =
            timeTomorrow[i].start.slice(11, 16) + "-" + timeTomorrow[i].end.slice(11, 16) + " - KPI: " + timeTomorrow[i].value;
          toggle24Timer.appendChild(timeTomorrowData);
        }
      })
      .catch((error) => console.error(error));
  };


//eventlistener to toggle next 24 hours data
timer24Btn.addEventListener("click", () => {
  if (info.style.display === "none") {
    info.style.display = "block";
    toggle24Timer.style.display = "none";
    timer24Btn.classList.remove("toggled");
  } else {
    info.style.display = "none";
    toggle24Timer.style.display = "flex";
    toggle24Timer.style.flexDirection = "column";
    timer24Btn.classList.add("toggled");
  }
});

//eventlistener to show favorites
favoritter.addEventListener("click", function () {
  alert("Lagt til i favoritter");
});


//eventlistener to toggle favorite icon
favouriteIcon.addEventListener("click", function () {

    if (favouriteIcon.src.includes("star.png")) {
        favouriteIcon.src = "./images/toggled.png";
    } else {
        favouriteIcon.src = "./images/star.png";
    }
});

} catch (error) {
  console.log(error);
}