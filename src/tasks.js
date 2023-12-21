
const inputTask = document.querySelector("#input-new-task");
const inputTaskDefinition = document.querySelector("#input-new-task__definition")
const btnInputTask = document.querySelector("#btn-input");
const tasksContainer = document.querySelector("#task-container");

const tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];
    


function resetInput() {
    inputTask.value = "";
    inputTaskDefinition.value = "";
}

btnInputTask.onclick = () => {
    const task = inputTask.value;
    const description = inputTaskDefinition.value;
    let newtask;
    let newDescription;
    newtask = document.createElement("li");
    newDescription = document.createElement("p");
    newtask.textContent = task;
    newDescription.textContent = description;
    newtask.appendChild(newDescription);
    tasksContainer.appendChild(newtask);

    if (task === "") {
        alert("Escribe una tarea");
    }

    tasksArray.push(task);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

   // saveTask();
    resetInput();
};
