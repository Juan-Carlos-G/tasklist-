const $header=document.querySelector('header');



const $body=document.querySelector('body');
const $btnHeader=document.querySelector('.btn-header');

/* Lista de tareas */
const $tasklistForm=document.querySelector('.tasklist-form');
const $tasklistInput=document.querySelector('.tasklist-input');
const $tasklist=document.querySelector('.tasklist');

/* Saludo de usuario */
const $headerTitle=document.querySelector('.header-title');

/* Boton de borrar lista de tareas */
const $btnclean=document.querySelector('.tasklist-clean');

/* Boton logout */
const $btnLogout=document.querySelector('.button-logout');




/* Saludo */
const searchUsername=localStorage.getItem('username',);

const userName=searchUsername? JSON.parse(searchUsername): prompt('¿Cual es tu nombre?');


const saveUsername=(name)=>{
    localStorage.setItem('username', JSON.stringify(name))
}

const greetUser=()=>{
    if(!userName){
        return
    }
    $headerTitle.innerHTML=`Hola ${userName}`
}


/* opciones del boton */
const toggleMode=()=>{
    if($body.classList.contains('light-mode')){
        $body.classList.remove('light-mode');
        $body.classList.add('dark-mode');
        $btnHeader.innerHTML='<i class="fa-solid fa-moon"></i>';
        $btnHeader.style.color='white';
    }else{
        $body.classList.remove('dark-mode');
        $body.classList.add('light-mode');
        $btnHeader.innerHTML='<i class="fa-solid fa-sun"></i>';
        $btnHeader.style.color='black';
    }
}


/* Boton clean */

const Logout=()=>{
    localStorage.clear();
    location.reload();

}

/* Lista de tareas */
const searchTasklist=localStorage.getItem('tasklist');

let listadeTareas=searchTasklist? JSON.parse(searchTasklist): [];

const validateTask=(task)=>{
    if(task.length===0){
        alert('Por favor, escriba una tarea');
        return true
    }
    else if(listadeTareas.some(tarea=>tarea===createNewTask(task))){
        alert('Esta tarea esta repetida');
        return true
    }
    else{
        return false
    }


}

const renderTasklist=()=>{
    $tasklist.innerHTML=listadeTareas.join(' ');

}

/* Taduce y guarda en local storage */
const saveTasklist=()=>{
    localStorage.setItem('tasklist', JSON.stringify(listadeTareas));
}

/* Esconder boton de limpiar tarea */
/* El display-none es una clase de CSS */
const toggleDeleteAll=()=>{
    if(listadeTareas.length===0){
        $btnclean.classList.add('display-none');
    }
    else{
        $btnclean.classList.remove('display-none');
    }
}

/* Evita que se recarge la pagina cuando se escribe una nueva tarea */
const handleSumit=(e)=>{
    e.preventDefault();
    if(validateTask($tasklistInput.value.trim())){
        return
    }


    let newTask=createNewTask($tasklistInput.value);
    
    listadeTareas.push(newTask);
    saveTasklist();
    cleanInput();
    renderTasklist();
    toggleDeleteAll();

    console.log(listadeTareas);

}

/* Se borra la barra cuando terminamos de escribir una tarea para dar espacio a la siguente */
const cleanInput=()=>{
    $tasklistInput.value=' ';

}
/* Como se presenta la tarea en el array */
const createNewTask=(task)=>{
    return task=`<li>${task}</li>`


}

/* Boton para limpiar lista de tareas */
const clearTasklist=()=>{
    listadeTareas=[];
    saveTasklist();
    renderTasklist();
    toggleDeleteAll();
}















/* Funcion inicializadora */

const init=()=>{
    saveUsername(userName);
    greetUser();
    $btnHeader.addEventListener('click',toggleMode);
    $btnLogout.addEventListener('click',Logout);
    $btnclean.addEventListener('click', clearTasklist);
    $tasklistForm.addEventListener('submit', handleSumit);
    toggleDeleteAll();
    renderTasklist();

}

init();