
import '../js/vanilla-tilt';
import '../css/style.css';
import '../js/weather';
import '../js/get-quote';
import '../js/show-time';
import {deleteTodo, todoDates} from "./todo-list";

'use strict'
const date = new Date();
let dateContainer;
const toDoList = document.querySelector(".todo");
const closeIcon = document.querySelector('.close-icon');
const monthDays = document.querySelector(".days");


export const renderCalendar = () => {
    renderDay();
    renderMonth();
};

function renderDay() {
    // generate days
    date.setDate(1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    console.log(lastDay)
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    console.log(prevLastDay)
    const firstDayIndex = date.getDay();
    console.log(firstDayIndex)
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    console.log(lastDayIndex)
    const nextDays = 7 - lastDayIndex;


    monthDays.innerHTML = '';
    for (let x = firstDayIndex; x > 1; x--) {
        dateContainer = `${normalizeMonth(date.getMonth() - 1, date.getFullYear()).year}/${normalizeMonth(date.getMonth() - 1, date.getFullYear()).month}/${prevLastDay - x + 2}`
        monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - x + 2, 'prev-date', x));
    }
    if (firstDayIndex === 0) {
        for (let z = 5; z >= 0; z--) {
            dateContainer = `${normalizeMonth(date.getMonth() - 1, date.getFullYear()).year}/${normalizeMonth(date.getMonth() - 1, date.getFullYear()).month}/${prevLastDay - z}`
            monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - z, 'prev-date', z));
        }
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth(), date.getFullYear()).month}/${i}`
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'today', new Date().getDay()));
        } else {
            let newDate = new Date(date)
            newDate.setDate(i)
            dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth(), date.getFullYear()).month}/${i}`
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'now-month', newDate.getDay()));
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth() + 1, date.getFullYear()).month}/${j}`
        monthDays.insertAdjacentElement("beforeend", addDay(j, 'next-date',));
    }
}
function renderMonth() {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    if (months[date.getMonth()] === months[0] || months[date.getMonth()] === months[1] || months[date.getMonth()] === months[11]) {
        document.querySelector(".month").style.background = 'rgba(0,153,255,0.4)';
    } else if (months[date.getMonth()] === months[2] || months[date.getMonth()] === months[3] || months[date.getMonth()] === months[4]) {
        document.querySelector(".month").style.background = 'rgba(102,204,153,0.4)';
    } else if (months[date.getMonth()] === months[5] || months[date.getMonth()] === months[6] || months[date.getMonth()] === months[7]) {
        document.querySelector(".month").style.background = 'rgba(102,0,0,0.4)';
    } else {
        document.querySelector(".month").style.background = 'rgba(255, 165, 0, 0.4)';
    }
    document.querySelector(".date p").innerHTML = new Date().toDateString();
}

// open to do list
monthDays.addEventListener('click', (e) => {
    let containerTasks = document.getElementById('allTasks')
    containerTasks.innerHTML = '';
    let elem = e.target;
    if (!elem.classList.contains('day')) {
        return;
    }
    //console.log(e.target.textContent)
    let elemDate = elem.dataset.date
    toDoList.dataset.date = elemDate
    toDoList.classList.add("show")
    addTasksToContainerTasks(elemDate, 'complitedToDo')
    addTasksToContainerTasks(elemDate, 'actualToDo')
    deleteTodo();
})

// close to do list
closeIcon.addEventListener('click', (e) => {
    toDoList.classList.remove("show")
    renderCalendar()
})

/**
 * Добавляет задачи в ToDoList при выборе даты
 * @param date Текущая дата
 * @param category Категория записи (актуальность) actualToDo/complitedToDo
 */
function addTasksToContainerTasks(date, category) {
    let containerTasks = document.getElementById('allTasks')
    let basketHTML = `<span><i class="fas fa-trash-alt"></i></span>`
    if (todoDates[date] !== undefined) {
        if (todoDates[date][category] !== undefined) {
            todoDates[date][category].forEach(item => {
                let li = document.createElement('li')
                li.innerText = item
                li.insertAdjacentHTML('afterbegin', basketHTML);
                if (category === 'complitedToDo') {
                    li.classList.add('checked')
                }
                containerTasks.insertAdjacentElement('afterbegin', li)
            })

        }
    }
}

/**
 * Позволяет возвратить текущий месяц (формат 1..12) и год в виде объекта
 * @param month Передаваемый месяца из диапазона 0..11
 * @param year Передаваемый год
 * @returns {object} Месяц и год в виде обекта
 */
function normalizeMonth(month, year) {
    if (month <= -1) {
        return {
            month: 12,
            year: year - 1
        };
    } else {
        return month >= 12 ? {
            month: 1,
            year: year + 1
        } : {
            month: month + 1,
            year: year
        };
    }
}
function addDay(data, newClass, numDay) {
    let day = document.createElement('div');
    day.classList.add('day');
    day.classList.add(newClass);
    day.innerText = data;
    if(isTask(dateContainer)){
        day.classList.add('toDoStyle')
    }else {
        day.classList.remove('toDoStyle')
    }
    day.dataset.date = dateContainer;
    if (numDay === 0 || numDay === 6) {
        day.classList.add('holiday');
    }
    return day;
}


function isTask(date) {
    let task = false;
    if (todoDates[date] !== undefined) {
        task = true
    }
    return task
}

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});
document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});


renderCalendar();
