function createElementButton(text, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', clickHandler);
  return button;
}

function createElementCheckbox(changeHandler) {
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', changeHandler);

  checkboxContainer.appendChild(checkbox);

  return checkboxContainer;
}

const root = document.getElementById('root');
const header = document.createElement('header');
header.classList.add('header');

const addTaskButton = createElementButton('Add Task', addTask);

const input = document.createElement('input');
input.placeholder = 'Enter todo';

const deleteAllButton = createElementButton('Delete All', deleteAllTasks);

const taskContainer = document.createElement('div');
taskContainer.classList.add('task-container');

header.append(deleteAllButton, input, addTaskButton);

root.appendChild(header);
root.appendChild(taskContainer);

function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

  const checkboxContainer = createElementCheckbox(() => toggleTaskCompletion(task.id, taskElement));

  const textDiv = document.createElement('div');
  textDiv.classList.add('task-text');
  textDiv.textContent = task.text;

  const deleteButton = createElementButton('X', () => removeTask(task.id));

  const dateDiv = document.createElement('div');
  dateDiv.textContent = task.date;

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('actions');
  actionsContainer.appendChild(deleteButton);
  actionsContainer.appendChild(dateDiv);

  taskElement.appendChild(checkboxContainer);
  taskElement.appendChild(textDiv);
  taskElement.appendChild(actionsContainer);

  return taskElement;
}

  function createTaskObject(value) {
    return {
      id: self.crypto.randomUUID(),
      text: value,
      date: new Date().toLocaleDateString(),
      isCompleted: false
    };
  }
  
  function addTask() {
    const taskInput = input.value.trim();
    if (taskInput !== '') {
      const taskObject = createTaskObject(taskInput);
      tasks.push(taskObject);
      saveTasksToLocalStorage(tasks);
      renderTasks();
      clearInput();
    } else {
      alert('Please enter a task');
    }
  }
  
  function renderTasks() {
    taskContainer.innerHTML = '';
    if (tasks.length > 0) {
      tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskContainer.appendChild(taskElement);
      });
    } else {
      const noTasks = document.createElement('p');
      noTasks.className = 'no-tasks';
      noTasks.textContent = 'No tasks';
      taskContainer.appendChild(noTasks);
    }
  }
  
  
  
  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToLocalStorage(tasks);
    renderTasks();
  }
  
  function updateTaskAppearance(taskElement, isCompleted) {
    taskElement.classList.toggle('completed', isCompleted);
    const textDiv = taskElement.querySelector('.task-text');
    textDiv.classList.toggle('completed', isCompleted);
  }

    function toggleTaskCompletion(id, taskElement) {
      tasks = tasks.map(task => {
        if (task.id === id) {
          task.isCompleted = !task.isCompleted;
          updateTaskAppearance(taskElement, task.isCompleted);
        }
        return task;
      });

      saveTasksToLocalStorage(tasks);
    }

  
  function deleteAllTasks() {
    tasks = [];
    saveTasksToLocalStorage(tasks);
    renderTasks();
  }
  
  function clearInput() {
    input.value = '';
  }
  
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function getTasksFromLocalStorage() {
  const storedData = localStorage.getItem('tasks');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return [];
  }
}

  
  let tasks = getTasksFromLocalStorage();
  renderTasks();
  