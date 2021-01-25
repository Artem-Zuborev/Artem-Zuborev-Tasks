import {renderCalendar} from "./script";

const input = document.querySelector("input[type = 'text']");
const ul = document.querySelector("ul");
const spans: any = document.getElementsByTagName("span");
const pencil = document.querySelector("#pencil");
const saveBtn = document.querySelector(".todo__save");
const clearBtn = document.querySelector(".todo__clear");

interface test {
    [options: string]: tasks
}

interface tasks {
    actualToDo?: string[],
    completedToDo?: string[]
}

export let todoDates: test = {}

//function to delete toDoList if delete span is clicked.
export function deleteTodo() {
    for (let span of spans) {
        span.addEventListener("click", function (event) {
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
}

//function to load to do if list is found in local storage.
function loadTodo() {
    if (localStorage.getItem('todoList')) {
        todoDates = Object.assign(todoDates, JSON.parse(localStorage.getItem('todoList')))
        deleteTodo();
    }
}

//event listener for input to add new to do to the list.
input.addEventListener("keypress", function (keyPressed: KeyboardEvent) {
    if (keyPressed.which === 13) {
//creating lists and span when enter is clicked
        let li = document.createElement("li");
        let spanElement = document.createElement("span");
        let icon = document.createElement("i");
        let newTodo = this.value;
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


ul.addEventListener('click', function (e: MouseEvent) {
        let elem: HTMLElement = <HTMLElement>e.target
        if (elem.tagName === 'LI') {
            elem.classList.toggle('checked');
        }
    }, false
);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function () {
    input.classList.toggle('display');
});


//save todolist state so user can access it later
saveBtn.addEventListener('click', function (e) {
    let containerTasks = document.getElementById('allTasks')
    let tasks = containerTasks.querySelectorAll('li')
    let todo = document.getElementById('todo')
    let todoDate = todo.dataset.date
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
clearBtn.addEventListener('click', function () {
    ul.innerHTML = "";
    localStorage.removeItem('todoList');
});


//delete to do
deleteTodo();

//load to do
loadTodo();