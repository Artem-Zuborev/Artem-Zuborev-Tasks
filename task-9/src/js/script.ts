import './vanilla-tilt';
import '../css/style.scss';
import './weather';
import './get-quote';
import './show-time';
import './settings';
import {deleteTodo, todoDates} from "./todo-list";
import { weekendDays } from './settings';

'use strict'
const date: Date = new Date();

let dateContainer: string;
const toDoList: HTMLElement = <HTMLElement>document.querySelector(".todo");
const closeIcon: HTMLElement = <HTMLElement>document.querySelector('.close-icon');
const monthDays: HTMLElement = <HTMLElement>document.querySelector(".days");
const jsonHoliday = require("./holiday.JSON")


export const renderCalendar = (): void => {
    renderDays();
    renderMonth();
};

function renderDays(): void {
    // generate days
    date.setDate(1);
    const lastDay: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay: number = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex: number = date.getDay();
    const lastDayIndex: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays: number = 7 - lastDayIndex;


    monthDays.innerHTML = '';
    for (let x = firstDayIndex; x > 1; x--) {
        dateContainer = `${normalizeMonth(date.getMonth() - 1, date.getFullYear()).year}/${normalizeMonth(date.getMonth() - 1, date.getFullYear()).month}/${prevLastDay - x + 2}`
        monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - x + 2, 'days__prev-date', (new Date(dateContainer).getDay())));
    }
    if (firstDayIndex === 0) {
        for (let z = 5; z >= 0; z--) {
            dateContainer = `${normalizeMonth(date.getMonth() - 1, date.getFullYear()).year}/${normalizeMonth(date.getMonth() - 1, date.getFullYear()).month}/${prevLastDay - z}`
            monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - z, 'days__prev-date', (new Date(dateContainer).getDay())));
        }
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth(), date.getFullYear()).month}/${i}`
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'days__today', new Date().getDay()));
        } else {
            let newDate: Date = new Date(date)
            newDate.setDate(i)
            dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth(), date.getFullYear()).month}/${i}`
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'days__now-month', newDate.getDay()));
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        dateContainer = `${normalizeMonth(date.getMonth(), date.getFullYear()).year}/${normalizeMonth(date.getMonth() + 1, date.getFullYear()).month}/${j}`
        monthDays.insertAdjacentElement("beforeend", addDay(j, 'days__next-date', (new Date(dateContainer).getDay())));
    }

}

function renderMonth(): void {
    const months: string[] = [
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
    const colorMonth: HTMLElement = <HTMLElement>document.querySelector(".month")
    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    if (months[date.getMonth()] === months[0] || months[date.getMonth()] === months[1] || months[date.getMonth()] === months[11]) {
        colorMonth.style.background = 'rgba(0,153,255,0.4)';
    } else if (months[date.getMonth()] === months[2] || months[date.getMonth()] === months[3] || months[date.getMonth()] === months[4]) {
        colorMonth.style.background = 'rgba(102,204,153,0.4)';
    } else if (months[date.getMonth()] === months[5] || months[date.getMonth()] === months[6] || months[date.getMonth()] === months[7]) {
        colorMonth.style.background = 'rgba(102,0,0,0.4)';
    } else {
        colorMonth.style.background = 'rgba(255, 165, 0, 0.4)';
    }
    document.querySelector(".date p").innerHTML = new Date().toDateString();
}

// open to do list
monthDays.addEventListener('click', (e): void => {
    let containerTasks = document.getElementById('allTasks');
    containerTasks.innerHTML = '';
    let elem: HTMLElement = <HTMLElement>e.target;
    if (!elem.classList.contains('days__day')) {
        return;
    }
    let elemDate: string = elem.dataset.date;
    toDoList.dataset.date = elemDate;
    toDoList.classList.add("show");
    addTasksToContainerTasks(elemDate, 'completedToDo');
    addTasksToContainerTasks(elemDate, 'actualToDo');
    deleteTodo();
})

// close to do list
closeIcon.addEventListener('click', (e): void => {
    toDoList.classList.remove("show")
    renderCalendar()
})

/**
 * Добавляет задачи в ToDoList при выборе даты
 * @param date Текущая дата
 * @param category Категория записи (актуальность) actualToDo/complitedToDo
 */
function addTasksToContainerTasks(date: string, category: string): void {
    let containerTasks = document.getElementById('allTasks')
    let basketHTML: string = `<span><i class="fas fa-trash-alt"></i></span>`
    if (todoDates[date] !== undefined) {
        if (todoDates[date][category] !== undefined) {
            todoDates[date][category].forEach(item => {
                let li: HTMLElement = <HTMLElement>document.createElement('li')
                li.innerText = item
                li.insertAdjacentHTML('afterbegin', basketHTML);
                if (category === 'completedToDo') {
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

function normalizeMonth(month: number, year: number): { month: number; year: number } {
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

function addDay(data: number, newClass: string, numDay?: number): HTMLElement {
    let day = document.createElement('div');
    day.classList.add('days__day');
    day.classList.add(newClass);
    day.innerText = String(data);
    if (isTask(dateContainer)) {
        day.classList.add('days__style')
    } else {
        day.classList.remove('days__style')
    }
    day.dataset.date = dateContainer;
    for (let i = 0; i < Object.values(jsonHoliday).length; i++) {
        if (Object.values(jsonHoliday)[i] === dateContainer) {
            day.classList.add('days__holiday');
        }
    }



    if (weekendDays.includes(numDay)) {
        day.classList.add('days__holiday');
    }
    if (localStorage.getItem('checkedPrevDays')) {
        if (day.classList.contains('days__prev-date') || day.classList.contains('days__next-date')) {
            day.classList.toggle('days__prev-date-invisible')
        }
    } else {
        day.classList.remove('days__prev-date-invisible')
    }
    return day;
}


function isTask(date): boolean {
    let task: boolean = false;
    if (todoDates[date] !== undefined) {
        task = true
    }
    return task
}

document.querySelector(".prev").addEventListener("click", (): void => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});
document.querySelector(".next").addEventListener("click", (): void => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});


renderCalendar();
