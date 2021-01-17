const city = document.querySelector('#city-name');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('#temperature');
const weatherDescription = document.querySelector('.weather-description');
const speedWind = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const openWeatherBtn = document.querySelector('.open-weather');
const weather = document.querySelector('.container-weather');
const closeIconWeather = document.querySelector('.close-icon-weather');


openWeatherBtn.addEventListener('click', function (e) {
    weather.classList.add('show-container-weather');
});
closeIconWeather.addEventListener('click', (e) => {
    weather.classList.remove('show-container-weather')
})
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=6b927d86de68c0b3f2e963ce6ccad2f8&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    speedWind.textContent = 'Скорость ветра: ' + data.wind.speed + ' м/с'
    humidity.textContent = 'Влажность воздуха: ' + data.main.humidity + ' %'
}
getWeather().catch(e => {
    console.log(`Error! ${e}`)
})
function getCity() {
    if (localStorage.getItem('city-name') === null || localStorage.getItem('city-name') === '') {
        city.textContent = '[Введите название города на латинице]';
    } else {
        city.textContent = localStorage.getItem('city-name');
    }
}
function setCity(e) {
    if (e.type === 'keypress') {

        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            getWeather();
            localStorage.setItem('city-name', e.target.innerText);
            city.blur(focus);
        }
    } else {
        localStorage.setItem('city-name', e.target.innerText);
        if (city.textContent === '' || city.textContent === '[]') {
            city.textContent = '[Введите название города на латинице]';
        }
    }
}

getCity();
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', () => {
    city.textContent = '';
})

document.addEventListener('DOMContentLoaded', getWeather);









