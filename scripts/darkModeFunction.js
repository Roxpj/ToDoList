const darkModeToggleButton = document.querySelector('.toggle');

function toggleDarkMode(ev) {
  let tasks = document.querySelectorAll(".new-task");
  let checkboxes = document.querySelectorAll(".checkbox");
  let deleteButtons = document.querySelectorAll(".delete");

  if (ev.target.checked) {
    document.body.classList.remove('dark-mode');
    document.querySelector('#input-new-task').classList.remove('dark-mode');
    document.querySelector('#input-new-task__description').classList.remove('dark-mode');
    document.querySelector('#button-input').classList.remove('dark-mode');
    document.querySelector("#task-container").classList.remove('dark-mode');
    document.querySelector('#credit-dark-mode').style.display = 'none';
    document.querySelector('#credit-light-mode').style.display = 'block';
    tasks.forEach((task) => task.classList.remove('dark-mode'));
    checkboxes.forEach((checkbox) => checkbox.classList.remove('dark-mode'));
    deleteButtons.forEach((deleteButton) => deleteButton.classList.remove('dark-mode'));

  } else {
    document.body.setAttribute('class', 'dark-mode');
    document.querySelector('#input-new-task').classList.add('dark-mode');
    document.querySelector('#input-new-task__description').classList.add('dark-mode');
    document.querySelector('#button-input').classList.add('dark-mode');
    document.querySelector("#task-container").classList.add('dark-mode');
    document.querySelector('#credit-light-mode').style.display = 'none';
    document.querySelector('#credit-dark-mode').style.display = 'block';
    tasks.forEach((task) => task.classList.add('dark-mode'));
    checkboxes.forEach((checkbox) => checkbox.classList.add('dark-mode'));
    deleteButtons.forEach((deleteButton) => deleteButton.classList.add('dark-mode'));
  }
}
darkModeToggleButton.addEventListener('click', toggleDarkMode);