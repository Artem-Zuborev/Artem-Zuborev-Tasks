const input = document.querySelector("input[type = 'text']");
const ul = document.querySelector("ul");
const spans = document.getElementsByTagName("span");
const pencil = document.querySelector("#pencil");
const saveBtn = document.querySelector(".save");
const clearBtn = document.querySelector(".clear");
const monthDays = document.querySelector(".days");


monthDays.addEventListener('click', (e) => {
    if (!e.target.classList.contains('day')) {
        return;
    }
    //console.log(e.target.textContent)

})


//function to delete todo if delete span is clicked.
function deleteTodo() {
    for (let span of spans) {
        span.addEventListener("click", function () {
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
}

//function to load todo if list is found in local storage.
function loadTodo() {
    if (localStorage.getItem('todoList')) {
        ul.innerHTML = localStorage.getItem('todoList');
        deleteTodo();
    }
}

//event listener for input to add new todo to the list.
input.addEventListener("keypress", function (keyPressed) {
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

// event listener to linethrough list if clicked
ul.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
        }
    }, false
);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function () {
    input.classList.toggle('display');
});


//save todolist state so user can access it later
saveBtn.addEventListener('click', function () {
    localStorage.setItem('todoList', ul.innerHTML);

});

//clear all todo when clear button is clicked
clearBtn.addEventListener('click', function () {
    ul.innerHTML = "";
    localStorage.removeItem('todoList', ul.innerHTML);
});


//delete todo
deleteTodo();

//load todo
loadTodo();