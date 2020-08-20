//select the html elements by their class name
const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-text");
const todoList = document.querySelector(".todo-items");
const completedTasks = document.querySelector(".complete");
const unCompletedTasks = document.querySelector(".uncomplete");
const clearList = document.querySelector(".clear");
const clearComp = document.querySelector(".clear-completed");

//array for holding todo list items
let todos = JSON.parse(localStorage.getItem("todos")) || [];

//add eventlistener on form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodoItem(input.value);
});

//function to add todo items
function addTodoItem(todo) {
  if (todo !== "") {
    const data = {
      text: todo,
      completed: false,
      id: Date.now(),
    };
    todos.push(data);
    addToLocalStorage(todos);
    input.value = "";
  }
}

//function to render todo list
function renderTodoItems(todos) {
  todoList.innerHTML = "";
  todos.forEach((e) => {
    const checked = e.completed ? "checked" : null;
    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", e.id);
    if (e.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `<input type="checkbox" class="checkbox" ${checked}>
                    <p class="todo-content">${e.text}</p>
                    <button class="delete-button"></button>`;
    todoList.append(li);
  });
}

//function to get count for comleted and uncomplete tasks
function renderCount(todos) {
  completedTasks.innerHTML = "Completed tasks: ";
  unCompletedTasks.innerHTML = "Uncomplete: ";
  let count = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed == true) {
      count++;
    }
  }
  completedTasks.append(count);
  unCompletedTasks.append(todos.length - count);
  console.log(count);
}

//function to add todos to local storage
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoItems(todos);
  renderCount(todos);
  console.log(todos);
}
addToLocalStorage(todos);

//function to get todos from local storage
function getFromLocalStorage() {
  const ref = localStorage.getItem("todos");
  if (ref) {
    todos = JSON.parse(ref);
    renderTodoItems(todos);
  }
  console.log(todos);
}

getFromLocalStorage();

//add event listener on checkbox and delete button
todoList.addEventListener("click", function (e) {
  if (e.target.type === "checkbox") {
    toggle(e.target.parentElement.getAttribute("data-key"));
  }
  if (e.target.classList.contains("delete-button")) {
    deleteItem(e.target.parentElement.getAttribute("data-key"));
  }
});

//add event listener to clear all items
clearList.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear")) {
    deleteList(todos);
  }
});

//add event listener to clear completed items
clearComp.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear-completed")) {
    clearCompleted(todos);
  }
});

//function to toggle task after checking and unchecking the box
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

//function to delete item
function deleteItem(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

//function to delete whole list
function deleteList(todos) {
  todos.length = 0;
  addToLocalStorage(todos);
}

//function to clear completed tasks
function clearCompleted(todos) {
  let i = 0;
  while (i < todos.length) {
    if (todos[i].completed == true) {
      todos.splice(i, 1);
    } else {
      ++i;
    }
  }
  console.log(todos);
  addToLocalStorage(todos);
}
