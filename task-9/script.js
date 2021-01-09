'use strict'
const date = new Date();


const renderCalendar = () => {
    date.setDate(1);

    console.log(date.getDay())
    const monthDays = document.querySelector(".days");


    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
    console.log(lastDay)

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();
    console.log(prevLastDay)

    const firstDayIndex = date.getDay();
    console.log(firstDayIndex)

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();
    console.log(lastDayIndex)

    const nextDays = 7 - lastDayIndex;


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

    // to do variable
    const toDoList = document.querySelector(".todo");
    const closeIcon = document.querySelector('.close-icon');



    // color month
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


    // generate days
    monthDays.innerHTML = '';
    for (let x = firstDayIndex; x > 1; x--) {
        monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - x + 2, 'prev-date', x));
    }
    if (firstDayIndex === 0) {
        for (let z = 5; z >= 0; z--) {
            monthDays.insertAdjacentElement("beforeend", addDay(prevLastDay - z, 'prev-date', z));
        }
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'today', new Date().getDay()));
        } else {
            let newDate = new Date(date)
            newDate.setDate(i)
            monthDays.insertAdjacentElement("beforeend", addDay(i, 'now-month', newDate.getDay()));
        }
    }
    for (let j = 1; j <= nextDays; j++) {
        monthDays.insertAdjacentElement("beforeend", addDay(j, 'next-date',));
    }

    // open to do list

    monthDays.addEventListener('click', (e) => {
        if (!e.target.classList.contains('day')) {
            return;
        }
        //console.log(e.target.textContent)
        toDoList.classList.toggle("show")
    })

    // close to do list
    closeIcon.addEventListener('click', (e) => {
        toDoList.classList.remove("show")
    })



};

function addDay(data, newClass, numDay) {
    let day = document.createElement('div');
    day.classList.add('day');
    day.classList.add(newClass);
    day.innerText = data;
    if (numDay === 0 || numDay === 6) {
        day.classList.add('holiday');
    }
    return day;
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
