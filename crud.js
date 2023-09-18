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

function applyDarkModeStyles() {
    const darkElements = document.querySelectorAll(".checkbox-item");
    const mainTextElements = document.querySelectorAll(".main-text");

    if (isDarkMode) {
        for (let i = 0; i < darkElements.length; i++) {
            darkElements[i].classList.add("darkElement");
        }
        for (let z = 0; z < mainTextElements.length; z++) {
            mainTextElements[z].style.color = "#C8CBE7";
        }

    } else {
        for (let i = 0; i < darkElements.length; i++) {
            darkElements[i].classList.remove("darkElement");
        }
        for (let z = 0; z < mainTextElements.length; z++) {
            mainTextElements[z].style.color = "#494C6B";
        }
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

    applyDarkModeStyles();
}

async function deleteCompletedTasks() {
    try {
        const response = await fetch(`${BASE_URL}?completed=true`);
        const data = await response.json();
        const completedTasks = data.results.map(task => task.id);

        if (completedTasks.length === 0) {
            return;
        }

        const deleteResponse = await fetch(`${BASE_URL}delete_tasks/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskIds: completedTasks }),
        });

        if (deleteResponse.ok) {
            await fetchTasks();
        } else {
            console.error('Failed to clear completed tasks:', deleteResponse.status, deleteResponse.statusText);
        }

        await fetchTasks();
    } catch (error) {
        console.error('Error clearing completed tasks:', error);
    }
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