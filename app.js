let input = document.querySelector(".input");
let addBtn = document.querySelector(".btn");
let task = document.querySelector(".main");

function onload() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((taskText) => {
    CreateTask(taskText);
  });
}

onload();

function CreateTask(inputValue) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const taskParagraph = document.createElement("p");
  taskParagraph.classList.add("addedTask");
  taskParagraph.innerText = inputValue;

  taskParagraph.addEventListener("click", () => {
    taskParagraph.style.textDecoration =
      taskParagraph.style.textDecoration === "line-through"
        ? ""
        : "line-through";
  });

  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px"
          viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>`;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("dlt-btn");
  deleteButton.innerHTML = svgIcon;

  task.appendChild(taskDiv);
  taskDiv.appendChild(taskParagraph);
  taskParagraph.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    deleteTaskFromLocalStorage(taskParagraph.innerText);
    taskDiv.remove();
  });
}

function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    CreateTask(input.value);
    saveTaskToLocalStorage(input.value);
    input.value = "";
  }
});
