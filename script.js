const taskInput = document.getElementById("input-box");
const taskList = document.getElementById("task-list");
const buttonTask = document.getElementById("todo-button");

//add task when click on the add button
buttonTask.addEventListener("click", function addtask(event) {
    event.preventDefault(); //prevent the form from submitting
    //check if the input is empty, or else will add the task that is inputted
    if (taskInput.value === "") {
        alert("Please enter a task");
    } else {
        const li = document.createElement("li"); //create a list element
        li.innerHTML = `<p class="truncate">${taskInput.value}</p>`; //add the input value to the list element using string interpolation
        taskList.appendChild(li); //append the list element to the task list (ul)
        let span = document.createElement("span"); // create a span element for delete task icon
        span.textContent = "\uF5DD"; //use booststrap icon for delete task
        li.appendChild(span); //append the span element to the list element
        taskInput.value = ""; //clear the input box after adding the task
        storeTask(); //call the storeTask function to store the task
    }
});

// function click to check completed task and delete task
taskList.addEventListener("click", function (event) {
    //check if the target element is a span, then remove the parent element, or if click on the list or p element, then toggle the class check
    if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        storeTask(); //call the storeTask function to store the empty status after deleting
    } else if (event.target.tagName === "LI") {
        event.target.classList.toggle("check");
        storeTask(); //call the storeTask function to store the check status
    }
    else if (event.target.tagName === "P") {
        event.target.parentElement.classList.toggle("check");
        storeTask();
    }
}, false);

// function to store task in local storage so it won't disappear when the page is refreshed
function storeTask() {
    localStorage.setItem("data", taskList.innerHTML);
}

// function to display the stored tasks when the page is refreshed
function displayStoreTask(){
    if(localStorage.getItem("data")){
        taskList.innerHTML = localStorage.getItem("data");
    }
}
displayStoreTask();