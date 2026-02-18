const getweatherBtn = document.getElementById("get-weather-btn");
const cityselector = document.getElementById("city-selector");

getweatherBtn.addEventListener("click", () => {
  const selected = cityselector.value;
  if (selected === "") {
    return;
  }
  
  showWeather(selected);
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);
//sprawdzenie czy podczas fetchowania wystapil blad
  if (!data) {
    alert('Something went wrong, please try again later');
    return;
  }
  //uzupelnienie danych
  document.getElementById('location').textContent = data.name ?? "N/A";
  document.getElementById('main-temperature').textContent = data.main?.temp ?? "N/A";
  document.getElementById('feels-like').textContent = data.main?.feels_like ?? "N/A";
  document.getElementById('humidity').textContent = data.main?.humidity ?? "N/A";
  document.getElementById('wind').textContent = data.wind?.speed ?? "N/A";
  document.getElementById('wind-gust').textContent = data.wind?.gust ?? "N/A";
  document.getElementById('weather-main').textContent = data.weather?.[0]?.main ?? "N/A";

  const icon = document.getElementById('weather-icon');
  icon.src = data.weather?.[0]?.icon ?? "";
  
  //odkrywanie elementow
  const weatherElements = document.querySelectorAll('#weather-info [hidden]');
  weatherElements.forEach(el => el.hidden = false);
}