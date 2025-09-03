import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      return readWeatherData(data);
    });
}

function readWeatherData(data) {
  const readData = { temp: {} };
  readData.city = data.name;
  readData.temp.F = Math.round(data.main.temp);
  readData.temp.C = Math.round(((data.main.temp - 32) * 5) / 9);
  readData.tempCondition = getWeatherCondition(readData.temp.F);
  readData.weatherType = data.weather[0].main;
  readData.sunrise = data.sys.sunrise;
  readData.sunset = data.sys.sunset;
  return readData;
}

function getWeatherCondition(tempF) {
  if (tempF >= 86) {
    return "hot";
  } else if (tempF >= 66 && tempF < 86) {
    return "warm";
  } else {
    return "cold";
  }
}
