const listContainer = document.getElementById("todoList");
const inputBox = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodoButton");
const saveBtn = document.getElementById("saveButton");

addTodo.addEventListener("click", () => {
  if (inputBox.value.trim() === "") {
    inputBox.value = "";
    return;
  } else {
    let li = document.createElement("li");

    // create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("cssCheck");
    //   console.log(checkbox);
    // add checkbox inside list
    li.appendChild(checkbox);
    // add text inside list
    li.appendChild(document.createTextNode(inputBox.value));
    // create icon
    let icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-trash", "delete");
    // add icon inside list
    li.appendChild(icon);
    listContainer.appendChild(li);
    console.log(li);
    inputBox.value = "";
  }
});

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    e.target.parentElement.classList.toggle("checked", e.target.checked);
  } else if (e.target.tagName === "I") {
    e.target.parentElement.remove();
  }
});

saveBtn.addEventListener("click", saveList);

function saveList() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach((item) => {
    const taskText = item.childNodes[1].nodeValue;
    const isChecked = item.querySelector("input[type='checkbox']").checked;
    tasks.push({ text: taskText, checked: isChecked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showList() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((item) => {
      let li = document.createElement("li");

      // create checkbox
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("cssCheck");
      checkbox.checked = item.checked;

      // add checkbox inside list
      li.appendChild(checkbox);
      // add text inside list
      li.appendChild(document.createTextNode(item.text));
      // create icon

      let icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-trash", "delete");
      // add icon inside list
      li.appendChild(icon);

      if (checkbox.checked) {
        li.classList.add("checked");
      }

      listContainer.appendChild(li);
    });
  }
}

showList();
