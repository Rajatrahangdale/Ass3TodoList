const todoInput = document.getElementById("todoInput");
const addTodoButton = document.getElementById("addTodoButton");
const saveButton = document.getElementById("saveButton");
const todoList = document.getElementById("todoList");

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    addTodoToList(todo.text, todo.completed);
  });
}

function addTodoToList(text, completed = false) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });
  const span = document.createElement("span");
  span.textContent = text;
  if (completed) {
    span.style.textDecoration = "line-through";
  }
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

function saveTodos() {
  const todos = [];
  const items = todoList.getElementsByTagName("li");
  for (let item of items) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const text = item.querySelector("span").textContent;
    todos.push({ text, completed: checkbox.checked });
  }

  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodoButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  addTodoToList(todoText);

  todoInput.value = "";
});

saveButton.addEventListener("click", saveTodos);

loadTodos();
