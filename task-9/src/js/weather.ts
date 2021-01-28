const city:HTMLElement = document.querySelector('#city-name');
const temperature:HTMLElement = document.querySelector('#temperature');
const weatherDescription:HTMLElement = document.querySelector('.weather__description');
const speedWind:HTMLElement = document.querySelector('.weather__wind-speed');
const humidity:HTMLElement = document.querySelector('.weather__humidity');
const openWeatherBtn:HTMLElement = document.querySelector('.open-weather');
const weather:HTMLElement = document.querySelector('.container-weather');
const closeIconWeather:HTMLElement = document.querySelector('.close-icon-weather');


openWeatherBtn.addEventListener('click', function (e):void {
    weather.classList.add('show-container-weather');
});
closeIconWeather.addEventListener('click', (e):void => {
    weather.classList.remove('show-container-weather')
})

async function getWeather():Promise<any> {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=6b927d86de68c0b3f2e963ce6ccad2f8&units=metric`;
        const res = await fetch(url);
        const data = await res.json();
        renderWeather(data)
    } catch (e) {
        temperature.textContent = `Error! ${e}`;
    }

}

// getWeather().catch(e => {
//     console.log(`Error! ${e}`)
// })

function renderWeather(data):void {
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    speedWind.textContent = 'Скорость ветра: ' + data.wind.speed + ' м/с'
    humidity.textContent = 'Влажность воздуха: ' + data.main.humidity + ' %'
}

function getCity():void {
    if (localStorage.getItem('city-name') === null || localStorage.getItem('city-name') === '') {
        city.textContent = '[Введите название города на латинице]';
    } else {
        city.textContent = localStorage.getItem('city-name');
    }
}

function setCity(e):void {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which === 13 || e.keyCode === 13) {
            getWeather();
            localStorage.setItem('city-name', e.target.innerText);
            if (city instanceof HTMLElement) {
                city.blur();
            }

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









