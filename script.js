const dager = document.getElementById("7dager");

dager.addEventListener("click", function () {
  alert("Skal vise nordlyset som var de siste 7 dagene");
});

const timer = document.getElementById("24neste");

timer.addEventListener("click", function () {
  let timeNow;
  let timeTomorrow;

  let url = `https://api.auroras.live/v1/?type=all&lat=62.197089&long=6.126711&forecast=false&threeday=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= data.threeday.values[i].length; j++) {
          if (data.threeday.values[i][j].now === true) {
            if (i > 0) {
              timeTomorrow = data.threeday.values[i].splice(0, j + 1);
            } else {
              timeNow = data.threeday.values[i].splice(j);
            }
           
          }
        }
      }
      console.log(data);
    })
    .catch((error) => console.error(error));
});

const favoritter = document.getElementById("favouriteBtn");

favoritter.addEventListener("click", function () {
  alert("Lagt til i favoritter");
});
