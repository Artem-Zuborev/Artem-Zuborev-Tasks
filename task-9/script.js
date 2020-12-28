const date = new Date();


const renderCalendar = () => {
    date.setDate(1);


    const monthDays = document.querySelector(".days");


    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();


    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();


    const firstDayIndex = date.getDay();


    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();


    const nextDays = 7 - lastDayIndex - 1;


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
    console.log(new Date().toDateString());

    let days = "";


    for (let x = firstDayIndex; x > 1; x--) {

        days += `<div class="prev-date">${prevLastDay - x + 2}</div>`;
    }
    if (firstDayIndex === 0) {
        for (let z = 5; z >= 0; z--) {
            days += `<div class="prev-date">${prevLastDay - z}</div>`;
        }
    }

    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth()
        ) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }


    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
};


document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});


document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});


renderCalendar();
