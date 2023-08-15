// !TODAY DATA
let todayDay = document.getElementById("todayDay");
let todayDateDay = document.getElementById("todayDateDay");
let dateMonth = document.getElementById("dateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayDegree = document.getElementById("todayDegree");
let todayImgDegree = document.getElementById("todayImgDegree");
let todayCustom = document.getElementById("todayCustom");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("windDirection");
let search=document.getElementById('search')
// !TOMORROW DATA
let nextDay = document.getElementsByClassName("nextDay");
let minNextTemp = document.getElementsByClassName("minNextTemp");
let maxNextTemp = document.getElementsByClassName("maxNextTemp");
let nextImg = document.getElementsByClassName("nextImg");
let nextCustom = document.getElementsByClassName("nextCustom");

// http://api.weatherapi.com/v1/search.json?key=852b27ae26ca4a8eb00113413231208&q=lond
// https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=bbc79583e52a418a917fff4f115b6973
async function getData(country) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=f5dfb24a80f04626874192610231208&q=${country}&days=3`
  );
  let weatherData = await response.json();
  // console.log(weatherData);
  return weatherData;
}
function displayWeather(data) {
  let date=new Date()
  todayDay.innerHTML=date.toLocaleDateString("en-us",{weekday:"long"})
  todayDateDay.innerHTML=date.getDate()
  dateMonth.innerHTML=date.toLocaleDateString("en-us",{month:"long"})
  todayLocation.innerHTML = data.location.name;
  todayDegree.innerHTML = data.current.temp_c;
  todayImgDegree.setAttribute("src", data.current.condition.icon);
  todayCustom.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
}
function getNextData(data) {
  let nextData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate=new Date(nextData[i+1].date)
    nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
    minNextTemp[i].innerHTML = nextData[i + 1].day.mintemp_c;
    maxNextTemp[i].innerHTML = nextData[i + 1].day.mintemp_c;
    nextCustom[i].innerHTML = nextData[i + 1].day.condition.text;
    nextImg[i].setAttribute("src", nextData[i + 1].day.condition.icon);
  }
}
async function start(country="london") {
  let weatherInfoData = await getData(country);
  displayWeather(weatherInfoData);
  getNextData(weatherInfoData);
}
start();
search.addEventListener("input",searchWeather)
function searchWeather(){
  start(search.value)
// console.log();
// alert('okinn')
}