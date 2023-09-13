fetchTasks();

document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.querySelector('.create-todo');
    const addTaskInput = addTaskForm.querySelector('.input-text');
    const addTaskButton = addTaskForm.querySelector('.checkbox-1');
    const taskList = document.getElementById('tasks-ul');

    addTaskInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const task = {
                title: addTaskInput.value,
                completed: addTaskButton.checked,
            };

            try {
                await createTask(task);
                fetchTasks();
                addTaskInput.value = '';
            } catch (error) {
                console.error('Error creating task:', error);
            }
        }
    });

    taskList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-task')) {
            const listItem = e.target.closest('li');
            
            if (listItem) {
                const taskIdToDelete = listItem.getAttribute('data-task-id');
                
                if (taskIdToDelete) {
                    await handleDeleteTask(taskIdToDelete);
                }
            }
        }
        if (e.target.classList.contains('checkbox-1')) {
            const li = e.target.closest('li');
            const task_id = li.getAttribute("data-task-id");
            handleToggleCheckbox(task_id);
        }
    });
    
    async function handleDeleteTask(taskId) {
        try {
            await deleteTask(taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
    
    async function handleToggleCheckbox(taskId) {
        try {
            const task = await fetchTask(taskId);
            await updateTask(taskId, { ...task, completed: !task.completed });
            fetchTasks();
        } catch (error) {
            console.error('Error toggling checkbox:', error);
        }
    }
});    