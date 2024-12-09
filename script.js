const startDate = '2021-09-01';
const endDate = '2021-09-30';

// let url = `https://api.auroras.live/v1/?type=locations`
// let url = `https://api.auroras.live/v1/?type=ace&data=kp`;
// let url = `https://api.auroras.live/v1/?type=all&lat=62.197089&long=6.126711&forecast=false&threeday=true`

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));



  