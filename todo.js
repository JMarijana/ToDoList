let inputELe = document.querySelector(".input");
let submitEle = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let containerDiv = document.querySelector(".container");
let deleteAll = document.querySelector(".delete-all");
let arrayOfTasks = [];

if(window.localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"))
}
getTaskFromLocalStorage();
submitEle.onclick = function(){
    if(inputELe.value !== ""){
        addTaskToArray(inputELe.value);
        inputELe.value ="";
    }
}

function addTaskToArray(taskText){
    const task = {
        id: Date.now(),
        title: taskText,
        complated: false,
    };
    arrayOfTasks.push(task);
    //console.log(arrayOfTasks);
    addTaskToPage(arrayOfTasks);
    addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToPage(arrayOfTasks){
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach((task) =>{
    let div = document.createElement("div");
    div.className = "task";
    if(task.complated){
        div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"))
    div.appendChild(span);
    tasksDiv.appendChild(div);
}
    );
}

function addTaskToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTaskFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data);
        //console.log(tasks);
        addTaskToPage(tasks);
    }
}

function addElementsToPageFrom(arrayOfTasks){
    //prazen Tasks Div
    tasksDiv.innerHTML = "";

    //ciklus na Array Of Tasks
    arrayOfTasks.forEach((task) => {
        //kreiranje Main Div
        let div = document.createElement("div");
        div.className = "task";

        //proverka dali Task(aktivnosta) e Done(zavrsena)
        if(task.completed){
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        //kreiranje na Delete button(kopce Izbrisi)
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));

        //append Button to Main Div
        div.appendChild(span);

        //dodadi Task Div to Task Container
        tasksDiv.appendChild(div);
    });
}
tasksDiv.onclick = ((e) => {
    if(e.target.classList.contains("del")){
        //e.target.parentElement.remove();
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        }
    if(e.target.classList.contains("task")){

        e.target.classList.toggle("done");
        updateStatusInLocalStorage(e.target.getAttribute("data-id"));
    }
})

function deleteTaskFromLocalStorage(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addTaskToLocalStorage(arrayOfTasks);
}

function updateStatusInLocalStorage(taskId){
    arrayOfTasks.forEach((task) =>{
        if(task.id == taskId)
        task.complated == false ? task.complated = true:task.complated = false;
    });
}

deleteAll.onclick = function(e){
    tasksDiv.innerHTML = "";
    window.localStorage.removeItem("tasks")
}