import {renderCalendar} from "./script";

const input: HTMLInputElement = <HTMLInputElement> document.querySelector("input[type = 'text']");
const ul: HTMLElement = <HTMLElement> document.querySelector("ul");
const spans: HTMLCollectionOf<any> =  document.getElementsByTagName("span");
const pencil: HTMLElement = <HTMLElement> document.querySelector("#pencil");
const saveBtn: HTMLElement = <HTMLElement> document.querySelector(".todo__save");
const clearBtn: HTMLElement = <HTMLElement> document.querySelector(".todo__clear");

interface todo {
    [options: string]: tasks
}

interface tasks {
    actualToDo?: string[],
    completedToDo?: string[]
}

export let todoDates: todo = {}

//function to delete toDoList if delete span is clicked.
export function deleteTodo(): void {
    for (let span of Array.from(spans)) {
        span.addEventListener("click", function (event) {
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
}

//function to load to do if list is found in local storage.
function loadTodo(): void {
    if (localStorage.getItem('todoList')) {
        todoDates = Object.assign(todoDates, JSON.parse(localStorage.getItem('todoList')))
        deleteTodo();
    }
}

//event listener for input to add new to do to the list.
input.addEventListener("keypress", function (keyPressed: KeyboardEvent):void {
    if (keyPressed.which === 13) {
//creating lists and span when enter is clicked
        let li:HTMLElement = document.createElement("li");
        let spanElement:HTMLElement = document.createElement("span");
        let icon:HTMLElement = document.createElement("i");
        let newTodo:string = this.value;
        if (!newTodo) {
            return null;
        }
        this.value = " ";

        icon.classList.add('fas', 'fa-trash-alt');
        spanElement.append(icon);
        ul.appendChild(li).append(spanElement, newTodo);

        deleteTodo();

    }

});


ul.addEventListener('click', function (e: MouseEvent):void {
        let elem: HTMLElement = <HTMLElement>e.target
        if (elem.tagName === 'LI') {
            elem.classList.toggle('checked');
        }
    }, false
);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function ():void {
    input.classList.toggle('display');
});


//save todolist state so user can access it later
saveBtn.addEventListener('click', function (e):void {
    let containerTasks:HTMLElement = document.getElementById('allTasks')
    let tasks = Array.from(containerTasks.querySelectorAll('li'))
    let todo:HTMLElement = document.getElementById('todo')
    let todoDate:string = todo.dataset.date
    if (todoDates[todoDate] === undefined) {
        todoDates[todoDate] = {}
    }
    todoDates[todoDate].actualToDo = [];
    todoDates[todoDate].completedToDo = [];

    tasks.forEach(item => {
        if (item.classList.contains('checked')) {
            //Для неактульных
            todoDates[todoDate].completedToDo.unshift(item.innerText)
        } else {
            //Для актуальных записей
            todoDates[todoDate].actualToDo.unshift(item.innerText)
        }
    })
    localStorage.setItem('todoList', JSON.stringify(todoDates));
    renderCalendar()
});

//clear all to do when clear button is clicked
clearBtn.addEventListener('click', function ():void {
    ul.innerHTML = "";
    localStorage.removeItem('todoList');
});


//delete to do
deleteTodo();

//load to do
loadTodo();