// define UI vars
const form =document.querySelector('#task-form');
const taskList =document.querySelector('.collection');
const clearbtn =document.querySelector('.clear-tasks');
const filter =document.querySelector('#filter');
const taskInput =document.querySelector('#task');


// load all event listner
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    //DOM Load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //add task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click',removeTask);
    // clear task event
    clearbtn.addEventListener('click',clearTasks);
    // filter task event
    filter.addEventListener('keyup',filterTasks);
}
// Get tasks form LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
         // create li element
    const li=document.createElement('li');
    //add class
    li.className='collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create new link element
    const link=document.createElement('a');
    //add class
    link.className='delete-item secondary-content';
    // add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
    });

}
// Add Task
function addTask(e){
    if (taskInput.value ===''){
        alert('Add a Task');
    }
    // create li element
    const li=document.createElement('li');
    //add class
    li.className='collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link=document.createElement('a');
    //add class
    link.className='delete-item secondary-content';
    // add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    // store in local stroagfe
       storeTaskInLocalStorage(taskInput.value);

    // clear input
    taskInput.value='';
    e.preventDefault();
}
// store Tasks
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure')){
        e.target.parentElement.parentElement.remove();
        // Remove from Ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }

    }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    }); 
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// clear tasks
function clearTasks(){
//    taskList.innerHTML='';
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }
   // clear from Ls
   clearTasksFromLocalStorage()
      
   }
   // clear tasks from ls 
   function clearTasksFromLocalStorage(){
       localStorage.clear();
   }
// filter tasks
function filterTasks(e){
    const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text)!=-1){
           task.style.display="block";
        }else{
            task.style.display="none";
        }

    });

}