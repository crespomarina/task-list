//define UI variables
const form = document.getElementById('task-form');
//<ul>
const taskList = document.querySelector('.collection');
//boton para limpiar tareas
const clearBtn = document.querySelector('.clear-tasks');
//cuadro para filtrar tareas
const filter = document.getElementById('filter');
//cuadro para ingresar la tarea
const taskInput = document.getElementById('task');

//load all event listeners
function loadEventListeners(){
  //add task event 
  form.addEventListener('submit', addTask);
  //remove task
  taskList.addEventListener('click',deleteTask);
  //remove all tasks
  clearBtn.addEventListener('click',clearAll);
  //filter tasks
  filter.addEventListener('keyup',filterTasks);
  //show the tasks saved on local when the dom is charged
  document.addEventListener('DOMContentLoaded', getTasks);
}

loadEventListeners();

//get tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //por cada function en el array guardado en local
  //creo un elemento li y lo anido en el <ul>
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  })
}

function addTask(e){
  if(taskInput.value === ''){
    alert('add a task');
  } 

  //create <li> elemento
  const li = document.createElement('li');
  //add a class
  li.className = 'collection-item';
  //create text note and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link 
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);

 //append li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//remove an element from the list
//aun no borra de local
function deleteTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are u sure to delete?')){
        e.target.parentElement.parentElement.remove();
        //remove from local
        removeTaskFromLS(e.target.parentElement.parentElement);
      }
    }
}

function removeTaskFromLS(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAll(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  }

  //clear from local storage
  clearTasksFromLS();
}

function clearTasksFromLS(){
  localStorage.clear();
}

function filterTasks(e){
  //esto es lo que escribe el user
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    //esto es lo que esta escrito en mi lista
    //es firstChild porque task es <li> 
    //y yo quiero lo que esta escrito, que esta anidado
    const item = task.firstChild.textContent;
    //paso todo a lower case. indexOf porque va por letras
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else { 
      task.style.display = 'none';
    }
  });
}
