const settingsBox = document.querySelector('.menu-box');
const turnOffStartWeek = document.querySelector('.menu-box__turn-off-start-week');
const turnOffToDoList: HTMLInputElement = <HTMLInputElement>document.querySelector('.menu-box__turn-off-todo');
const toDoList: HTMLElement = <HTMLElement>document.querySelector(".todo");
const turnOffPrevDays: HTMLInputElement = <HTMLInputElement>document.querySelector('.menu-box__turn-off-prev-day');

turnOffToDoList.addEventListener('click', function (e: MouseEvent): void {
    if (turnOffToDoList.checked) {
        toDoList.classList.toggle("turn-off");
        localStorage.setItem('checkedToDo', String(turnOffToDoList.checked));
    } else {
        toDoList.classList.remove("turn-off")
        toDoList.classList.remove("show")
        localStorage.removeItem('checkedToDo');
    }
    //e.stopImmediatePropagation()
})

function loadCheckedToDo() {
    if (localStorage.getItem('checkedToDo')) {
        turnOffToDoList.setAttribute('checked', 'true');
        if (turnOffToDoList.checked) {
            toDoList.classList.toggle("turn-off");
        }
    }
}

loadCheckedToDo()

turnOffPrevDays.addEventListener('click', function (e: MouseEvent): void {
    if (turnOffPrevDays.checked) {
        localStorage.setItem('checkedPrevDays', String(turnOffPrevDays.checked));
        location.reload()
    } else {
        localStorage.removeItem('checkedPrevDays');
        location.reload()
    }
})
function loadCheckedPrevDays() {
    if (localStorage.getItem('checkedPrevDays')) {
        turnOffPrevDays.setAttribute('checked', 'true');
        // if (turnOffToDoList.checked) {
        //     toDoList.classList.toggle("turn-off");
        // }
    }
}
loadCheckedPrevDays()
// if (localStorage.getItem('checkedPrevDays')) {
//     if(allDays.classList.contains('days__prev-date') || day.classList.contains('days__next-date')){
//         day.classList.toggle('days__prev-date-invisible')
//     }
// }



