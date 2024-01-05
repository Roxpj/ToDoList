
const inputTask = document.querySelector("#input-new-task");
const inputTaskDefinition = document.querySelector("#input-new-task__definition");
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

        //eliminar
        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                this.parentNode.remove();
            }
        }

        //completar
        let items = document.querySelectorAll("li");
        for (let item of items) {
            item.addEventListener("click", function () {
                this.classList.toggle("completed");
            });
        }

        //editar
        let editButton = tasksContainer.querySelector(".edit");
        editButton.addEventListener("click", function () {
            let taskItem = this.parentNode;

            let taskName = taskItem.querySelector("#task-name");
            let taskDescription = taskItem.querySelector("#task-description");

            let inputName = document.createElement("input");
            inputName.value = taskName.textContent;
            let inputDescription = document.createElement("input");
            inputDescription.value = taskDescription.textContent;

            taskItem.replaceChild(inputName, taskName);
            taskItem.replaceChild(inputDescription, taskDescription);

            this.innerHTML = "<i>\u2714</i>";

            let saveButton = this;
            saveButton.addEventListener("click", function () {

                let taskItem = this.parentNode;

                let inputName = taskItem.querySelector("input:nth-child(1)");
                let inputDescription = taskItem.querySelector("input:nth-child(2)");

                let taskName = document.createElement("span");
                taskName.id = "task-name";
                taskName.textContent = inputName.value;
                let taskDescription = document.createElement("span");
                taskDescription.id = "task-description";
                taskDescription.textContent = inputDescription.value;

                taskItem.replaceChild(taskName, inputName);
                taskItem.replaceChild(taskDescription, inputDescription);

                this.innerHTML = "<i>🖊</i>";
                // Actualizar el array de tareas y el localStorage con los nuevos valores de la tarea
                // Aquí debes escribir el código para encontrar la tarea correspondiente en el array y modificar sus propiedades
                // También debes actualizar el localStorage con el nuevo array de tareas
            });
        });


        resetInput();
    };
}



function editTask() {

}

function deleteTask() {

}
editButton.onclick = editTask;
deleteButton.onclick = deleteTask;