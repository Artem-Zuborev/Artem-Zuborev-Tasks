// Show Time
const time:HTMLElement = document.getElementById('time');
const dateNow:HTMLElement = document.getElementById('date');
const months:string[] = [
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
const days:string[] = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'

]
const showAmPm:boolean = true;

function showTime():void {
    let today: Date = new Date(),
        month_: number = today.getMonth(),
        date_: number = today.getUTCDate(),
        day_: number = today.getUTCDay(),
        hour: number = today.getHours(),
        min: number = today.getMinutes(),
        sec: number = today.getSeconds();

    // Set AM or PM
    const amPm:string = hour >= 12 ? 'PM' : 'AM';


    // Output Time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(
        sec
    )} ${showAmPm ? amPm : ''}`;
    dateNow.innerHTML = `${days[day_]}, ${date_} ${months[month_]}`;

    setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n):string {
    if (parseInt(n, 10) < 10) {
        return '0' + n;
    } else {
        return '' + n;
    }
}

showTime();