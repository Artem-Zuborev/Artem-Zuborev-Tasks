// Show Time
const time = document.getElementById('time');
const dateNow = document.getElementById('date');
const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];
const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'

]
const showAmPm = true;

function showTime() {
    let today = new Date(),
        month_ = today.getMonth(),
        date_ = today.getUTCDate(),
        day_ = today.getUTCDay(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';


    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
        sec
    )} ${showAmPm ? amPm : ''}`;
    dateNow.innerHTML = `${days[day_]}, ${date_} ${months[month_]}`;
    //console.log(time.innerHTML)

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
    if (parseInt(n, 10) < 10) {
        return '0' + n;
    } else {
        return '' + n;
    }
}

showTime();