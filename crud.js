const BASE_URL = "http://localhost:8000/api/tasks/";


const taskslist = document.getElementById("tasks-ul");
console.log(taskslist)
async function fetchTasks() {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    const tasks = data.results
    let tasksListRenderString = "";
    for (let task of tasks) {
        console.log(task)
        tasksListRenderString = tasksListRenderString + renderTaskTemplate(task);
    }

    taskslist.innerHTML = tasksListRenderString;
}


async function fetchTask(task_id) {
    const response = await fetch(`${BASE_URL}${task_id}/`);
    return await response.json();
}

fetchTasks()