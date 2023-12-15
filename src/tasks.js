let tasksArray = [];

btnInputTarea.onclick = () => { 
    var task = inputTarea.value;
        newtask = document.createElement("li");
        newtask.appendChild(task);
        tasksContainer.appendChild(newtask);

    if (task === "") {
        
    }
    tasksArray.push (task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    saveTask();
    resetInput();
}