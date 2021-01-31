import {renderCalendar} from "./script";

const settingsBox = document.querySelector('.menu-box');
const turnOffStartWeek = document.querySelector('.menu-box__turn-off-start-week');
const turnOffToDoList: HTMLInputElement = <HTMLInputElement>document.querySelector('.menu-box__turn-off-todo');
const toDoList: HTMLElement = <HTMLElement>document.querySelector(".todo");
const turnOffPrevDays: HTMLInputElement = <HTMLInputElement>document.querySelector('.menu-box__turn-off-prev-day');
const chooseDayOff = document.forms['menu-box__choose-day']
export let weekendDays:number[]=[0,6]


chooseDayOff.addEventListener('click', (e): void => {
    let elem = e.target;
    if (!elem.classList.contains('menu-box__choose-day-off')) {
        return
    }
    if (elem.checked) {
        weekendDays.push(Number(elem.value));
        localStorage.setItem('chooseDayOff', JSON.stringify(weekendDays))
        renderCalendar()
    } else {
        weekendDays.splice(weekendDays.indexOf(Number(elem.value)),1)
        localStorage.setItem('chooseDayOff', JSON.stringify(weekendDays))
        renderCalendar()
    }
})
function loadLocalWeekEnd():void{
    const days:NodeListOf<HTMLInputElement>=document.querySelectorAll('.menu-box__choose-day-off')
    let strJson:string=localStorage.getItem('chooseDayOff')
    weekendDays=JSON.parse(strJson)
    days.forEach((item:HTMLInputElement)=>{
        if(weekendDays === null){
            weekendDays = [0,6]
        }
        if (weekendDays.includes(Number(item.value))){
            item.checked=true;
        }
    })
}
loadLocalWeekEnd()


turnOffToDoList.addEventListener('click', function (e: MouseEvent): void {
    if (turnOffToDoList.checked) {
        toDoList.classList.toggle("turn-off");
        localStorage.setItem('checkedToDo', String(turnOffToDoList.checked));
    } else {
        toDoList.classList.remove("turn-off")
        toDoList.classList.remove("show")
        localStorage.removeItem('checkedToDo');
    }
})

function loadCheckedToDo(): void {
    if (localStorage.getItem('checkedToDo')) {
        turnOffToDoList.setAttribute('checked', 'true');
        if (turnOffToDoList.checked) {
            toDoList.classList.toggle("turn-off");
        }
    }
}

turnOffPrevDays.addEventListener('click', function (e: MouseEvent): void {
    if (turnOffPrevDays.checked) {
        localStorage.setItem('checkedPrevDays', String(turnOffPrevDays.checked));
        renderCalendar()
    } else {
        localStorage.removeItem('checkedPrevDays');
        renderCalendar()
    }
})

function loadCheckedPrevDays(): void {
    if (localStorage.getItem('checkedPrevDays')) {
        turnOffPrevDays.setAttribute('checked', 'true');
    }
}

loadCheckedToDo()
loadCheckedPrevDays()




