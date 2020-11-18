// DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Events Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e) {
  // Prevent Natural behavious (refresh upon submit)
  e.preventDefault();
  //Create a div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create List
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  //Save to local storage
  saveLocalTodos(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  //Completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  // Attach ToDo
  todoList.appendChild(todoDiv);
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    // New div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // New list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    // Completed button.
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("complete");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
