//DOM
const inputTask = document.querySelector("#input-new-task");
const inputTaskDescription = document.querySelector("#input-new-task__description");
const tasksContainer = document.querySelector("#task-container");
//carga tasks de la memoria
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
document.addEventListener("DOMContentLoaded", loadTasks);
console.log(tasks);
//eventos para modificar tasks
tasksContainer.addEventListener("input", (e) => {
  if (e.target.matches(".task-name, .task-description")) {
    const taskId = e.target.closest(".new-task").dataset.taskId;
    const task = tasks.find((task) => task.id === taskId);
    updateTask(task);
  }
});
tasksContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });   
//funciones       
function addTask() {
    const taskText = inputTask.value.trim();
    const taskDescriptionText = inputTaskDescription.value.trim();
    if (taskText !== ''){
        const taskId = Date.now().toString();
        const task = {
            id: taskId,
            name: taskText,
            Description: taskDescriptionText,
            isCompleted: false
            };
        tasks.push(task);
        viewTask(task);
        saveTasks();
        resetInput();
    }
    else{
        alert("escribe una tarea");
    } 
}
function viewTask(task){
  const taskElement = document.createElement("li");
  taskElement.dataset.taskId = task.id;
  taskElement.classList.add("new-task");
  if (task.isCompleted) {
    taskElement.classList.add("completed");
  }
  taskElement.innerHTML = `
  <input type="checkbox" class="checkbox" ${task.isCompleted ? "checked" : ""} onchange="completeTask(this)">
  <span class="task-name" contenteditable>
      ${task.name}
  </span>
  <button class="delete" title="Remove ${task.name} task" onclick="deleteTask(this.parentElement)">
  <i>\u00D7</i>
  </button>
  <span class="task-description" contenteditable>
      ${task.Description}
  </span>
  `;
  tasksContainer.appendChild(taskElement);
}

function completeTask(checkbox) {
  const taskElement = checkbox.closest(".new-task");
  const taskId = taskElement.dataset.taskId;
  const task = tasks.find((task) => task.id === taskId);

  task.isCompleted = checkbox.checked;
  taskElement.classList.toggle('completed');

  const taskName = taskElement.querySelector(".task-name");
  const taskDescription = taskElement.querySelector(".task-description");
  if (task.isCompleted) {
    taskName.removeAttribute("contenteditable");
    taskDescription.removeAttribute("contenteditable");
  } else {
    taskName.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
  }
  saveTasks();
}
function deleteTask(taskElement){
  const taskId = taskElement.dataset.taskId;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  tasks.splice(taskIndex, 1);
  tasksContainer.removeChild(taskElement);
  saveTasks();
}
function updateTask(task) {
  const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
  const taskName = taskElement.querySelector(".task-name");
  const taskDescription = taskElement.querySelector(".task-description");
  task.name = taskName.textContent;
  task.Description = taskDescription.textContent;
  saveTasks();
}
function resetInput() {
  inputTask.value = '';
  inputTaskDescription.value = '';
  inputTask.focus();
}
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log(tasks);
}
function loadTasks() {
  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      viewTask(task);
    });
  }
  //para comprobar problemas
  else if (typeof tasks === "string") {
    try {
      tasks = JSON.parse(tasks);
      tasks.forEach((task) => {
        viewTask(task);
      });
    }
    catch (error) {
      console.error("El valor de tasks no es un array válido");
    }
  }
  else {
    console.error("El tipo de tasks es desconocido");
  }
}

//dark mode
const darkModeToggleButton = document.querySelector('.toggle');

function toggleDarkMode(ev){
  let tasks = document.querySelectorAll(".new-task");
  let checkboxes = document.querySelectorAll(".checkbox");
  let deleteButtons = document.querySelectorAll(".delete");

 
  if(ev.target.checked){
      document.body.classList.remove('dark-mode');
      document.querySelector('#input-new-task').classList.remove('dark-mode');
      document.querySelector('#input-new-task__description').classList.remove('dark-mode');
      document.querySelector('#button-input').classList.remove('dark-mode');
      document.querySelector("#task-container").classList.remove('dark-mode');
     tasks.forEach((task) => task.classList.remove('dark-mode'));
     checkboxes.forEach((checkbox) => checkbox.classList.remove('dark-mode'));
     deleteButtons.forEach((deleteButton) => deleteButton.classList.remove('dark-mode'));

  } else {
    document.body.setAttribute('class', 'dark-mode');
    document.querySelector('#input-new-task').classList.add('dark-mode');
    document.querySelector('#input-new-task__description').classList.add('dark-mode');
    document.querySelector('#button-input').classList.add('dark-mode');
    document.querySelector("#task-container").classList.add('dark-mode');
    tasks.forEach((task) => task.classList.add('dark-mode'));
    checkboxes.forEach((checkbox) => checkbox.classList.add('dark-mode'));
    deleteButtons.forEach((deleteButton) => deleteButton.classList.add('dark-mode'));
  }
}
darkModeToggleButton.addEventListener('click', toggleDarkMode);