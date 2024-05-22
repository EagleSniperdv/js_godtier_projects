const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const locationBtn = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardDiv = document.querySelector(".weather-cards");
const API_KEY = "e886f35ad8356eef1f9e9c93b6dd8c0c";

const createWeatherCard = ( cityName, weatherItem, index) => {
    if (index === 0) {
        return `<div class="details">
        <h2> ${cityName} (${weatherItem.dt_txt.split( " " )[0]})</h2>
        <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}</h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.main.humidity}</h4>
    </div>
    <div class="icon">
    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    }else{

        return `
        <li class="card">
        <h3>(${weatherItem.dt_txt.split( " " )[0]})</h3>
        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="">
        <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}</h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.main.humidity}</h4>
        </li>
        `;
    }
}

const getWeatherDetails = (cityName, lat, lon) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then( data => {
        // console.log(data);

        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardDiv.innerHTML = "";

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach((weatherItem, index) => {
            if (index === 0) {

                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName,weatherItem,index))
            } else {

                weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName,weatherItem,index))
            }
        });
    }).catch(() =>  alert("1"));
}


const getCityCordinates =  () => {
    const cityName = cityInput.value.trim();

    if (!cityName) return;
    // console.log(cityName);

    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
    
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (!data.length) return alert(`Try Again. No cordinates for ${cityName}`);
        const { name, lat , lon} = data[0];
        getWeatherDetails(name, lat, lon);
        
        // console.log(data);

    }).catch(e => alert("Try Again."));
    
    // console.log(GEOCODING_API_URL);
}

const getUserCordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude} = position.coords;
            const REVERSE_GEOCODING_URL =  `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
                const { name } = data[0];
                getWeatherDetails(name, latitude, longitude);
        
            }).catch(e => alert("Try Again."));
        },
        e => {
            if (e.code === e.PERMISSION_DENIED) {
                alert("Geolocation req denied");
            }
        }
    )
}

searchBtn.addEventListener("click",getCityCordinates);
locationBtn.addEventListener("click",getUserCordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCordinates());