const BASE_URL = "http://localhost:8000/api/tasks/";


async function createTask(task) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error);
    }
}

const taskLengthElement = document.querySelector('.task-length');
const taskslist = document.getElementById("tasks-ul");
async function fetchTasks(filter = {}) {
    const queryParams = new URLSearchParams(filter);
    const response = await fetch(`${BASE_URL}?${queryParams}`);
    const data = await response.json();
    const tasks = data.results
    const length = data.count

    let tasksListRenderString = "";
    for (let task of tasks) {
        console.log(task)
        tasksListRenderString = tasksListRenderString + renderTaskTemplate(task);
    }

    taskslist.innerHTML = tasksListRenderString;

    taskLengthElement.textContent = `${length} ${length === 1 ? 'item' : 'items'} left`;
}

async function deleteTask(task_id){
    try {
        const response = await fetch(`${BASE_URL}${task_id}`, {
            method: 'DELETE',
        });

        return true;
    } catch (error) {
        throw new Error(error);
    }
}

async function updateTask(task_id, task) {
    try {
        const response = await fetch(`${BASE_URL}${task_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error);
    }
}

async function fetchTask(task_id) {
    const response = await fetch(`${BASE_URL}${task_id}/`);
    return await response.json();
}