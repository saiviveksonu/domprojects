// Define UI Vars
// selecting the  form of input field one
const form = document.querySelector('#task-form');
// selecting the ul to add items 
const taskList = document.querySelector('.collection');
// selecting the button to clear tasks
const clearBtn = document.querySelector('.clear-tasks');
// selecting the input field of filter
const filter = document.querySelector('#filter');
// selecting the input field to add the task
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();


// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}



// Get Tasks from LS
function getTasks() {
  let tasks;
//   if local storage contains zero items then turn tasks into an empty array
  if(localStorage.getItem('tasks') === null){
    tasks = [];
    
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
  }
  tasks.forEach(function(task){
     
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}


// Add Task when the given input is null
function addTask(e) {
  // sending a alert when the user doesnot give any input
  if(taskInput.value === '') {
    alert('Add a task');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  // if the local storage is null then create an empty array 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    // parse usually return an object,it converts string to an object
    // this returns the json derived array instead of object
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // if the items are in the  local storage ior not push the input task into array
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task
function removeTask(e) {
  // here we want to delete the li containg the "a" classname='delete-item'
  // we are targeting 'i' -parent of i is 'a' so it contains class names 
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      // here we want to delete the complete "li"
      e.target.parentElement.parentElement.remove();
      // Remove from LS
    //   passing the element which we want to delete from localstorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    // if the text in localstorage is equal to the content of "li" we passed then remove that 
    if(taskItem.textContent === task){
      // remove the elements from the array at the index
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear all the task from the ui
function clearTasks() {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}
// Clear Tasks from Local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}


// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // loop through the array of elements having class ".collection-item"
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}