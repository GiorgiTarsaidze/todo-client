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
                    await deleteTask(taskIdToDelete);
                    fetchTasks();
                }
            }
        }
    });
    
});

