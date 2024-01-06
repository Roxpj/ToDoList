const inputTask = document.querySelector("#input-new-task");
const inputTaskDefinition = document.querySelector("#input-new-task__definition");
const tasksContainer = document.querySelector("#task-container");

let tasks = [];
loadTasks();

  console.log(tasks);
tasksContainer.addEventListener("input", (e) => {
    const taskId = e.target.closest(".new-task");
    updateTask(taskId, e.target);
});
tasksContainer.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });        


function addTask() {
    const taskText = inputTask.value.trim();
   // const taskDescriptionText = inputTaskDefinition.value.trim();

    if (taskText !== ''){
        let task = {
            id: Date.now(),
            name: taskText,
            //definition: taskDescriptionText,
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
  taskElement.setAttribute("id", task.id);
  taskElement.innerHTML = `
  <li class="new-task" id="${task.name}-${task.id}">
  <input type="checkbox" class="checkbox" name="tasks" ${task.isCompleted ? "checked" : ""} onclick="completeTask(this)">
  <span class="task-name" ${!task.isCompleted ? "contenteditable" : ""}>
      ${task.name}
  </span>
  <button class="delete" title="Remove ${task.name} task" onclick="deleteTask(this)">
      <i>\u00D7</i>
  </button>
  </li>
  `;

  tasksContainer.appendChild(taskElement);
  const inputCheckbox = taskElement.querySelector(".checkbox");
  updateTask(task, inputCheckbox);
}

function completeTask(element){
    const task = element.parentElement;
    task.classList.toggle('completed');
}

function deleteTask(element){
    const task = element.parentElement.parentElement;
    tasksContainer.removeChild(task);

   const taskId = element.parentElement.id;
   const filteredTasks = tasks.filter((task) => task.id !== parseInt(taskId));
    tasks.splice(filteredTasks, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function resetInput(){
    inputTask.value = '';
   // inputTaskDefinition.value = '';
    inputTask.focus();
}


function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);
}

function updateTask(task, inputCheckbox) {
    //const task = tasks.find((task) => task.id === parseInt(taskId));
    if (inputCheckbox.hasAttribute("contentEditable")) {
      task.name = inputCheckbox.textContent;
    }
    else {
      const span = inputCheckbox.nextElementSibling.nextElementSibling;
      task.isCompleted = !task.isCompleted;

      if (task.isCompleted) {
        span.removeAttribute("contenteditable");
        inputCheckbox.setAttribute("checked", "");
      } 
      else {
        inputCheckbox.removeAttribute("checked");
        span.setAttribute("contenteditable", "");
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  function loadTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (Array.isArray(tasks)) {
        tasks.forEach((task) => {
            viewTask(task);
          });
    }
    //comprobar problemas
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

/* function loadTasks(){
    const tasksload = JSON.parse(localStorage.getItem('tasks'));
    if (tasksload) {
        tasksload.forEach((task) => {
            viewTask(task);
          });
    }
    
console.log(tasks);
console.log('hola, estoy funcionando');
} */