
const inputTask = document.querySelector("#input-new-task");
const inputTaskDefinition = document.querySelector("#input-new-task__definition")
//const btnInputTask = document.querySelector("#btn-input");
const tasksContainer = document.querySelector("#task-container");

const tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];

//const deleteButton = document.querySelectorAll(".delete")


function resetInput() {
    inputTask.value = "";
    inputTaskDefinition.value = "";
}
function saveTask() {
    tasksArray.push(task);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
}

function createTask() {

    if (inputTask.value.length === 0) {
        alert("Escribe una tarea");
    }
    else {
        tasksContainer.innerHTML += `
            <li class="new-task">
                <span id="task-name">
                    ${inputTask.value}
                </span>
                <span id="task-description">
                    ${inputTaskDefinition.value}
                </span>
                <button class="edit">
                    <i>&#128394;</i>
                </button>
                <button class="delete">
                    <i>\u00D7</i>
                </button>
            </li>
        `;


        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();
            }
        }

        let items = document.querySelectorAll("li");
        for (let item of items) {
            item.addEventListener("click", function () {
                this.classList.toggle("completed");
            });
        }
        resetInput();
    };
}



function editTask() {

}

function deleteTask() {

}
editButton.onclick = editTask;
deleteButton.onclick = deleteTask;