fetchTasks();

document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.querySelector('.create-todo');
    const addTaskInput = addTaskForm.querySelector('.input-text');
    const addTaskButton = addTaskForm.querySelector('.checkbox-1');
    const taskList = document.getElementById('tasks-ul');
    const activeFilterButton = Array.from(document.querySelectorAll('.active-filter'));
    const allFilterButton = Array.from(document.querySelectorAll('.all-filter'));
    const completedFilterButton = Array.from(document.querySelectorAll('.completed-filter'));
    const clearCompletedButton = document.querySelector('.clear-completed');

    const defaultFilterButton = document.querySelector('.default-filter');
    defaultFilterButton.classList.add('filter-selected');

    addTaskInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const task = {
                title: addTaskInput.value,
                completed: addTaskButton.checked,
            };

            try {
                await createTask(task);
                fetchTasks({ page: currentPage });
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
            fetchTasks({ page: currentPage });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
    
    async function handleToggleCheckbox(taskId) {
        try {
            const task = await fetchTask(taskId);
            await updateTask(taskId, { ...task, completed: !task.completed });
            fetchTasks({ page: currentPage });
        } catch (error) {
            console.error('Error toggling checkbox:', error);
        }
    }

    function addFilterButtonListeners(filterButtons, filter) {
        filterButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                currentPage = 1;
                currentFilter = filter;
                await fetchTasks({ ...currentFilter, page: currentPage });
                updateCurrentPageText();

                clearFilterButtonStyles();
                button.classList.add('filter-selected');
            });
        });
    }

    addFilterButtonListeners(allFilterButton, {});
    addFilterButtonListeners(activeFilterButton, { completed: false });
    addFilterButtonListeners(completedFilterButton, { completed: true });

    clearCompletedButton.addEventListener('click', async () => {
        try {
            await deleteCompletedTasks();
        } catch (error) {
            console.error('Error clearing completed tasks:', error);
        }
    });

    function clearFilterButtonStyles() {
        allFilterButton.forEach((button) => button.classList.remove('filter-selected'));
        activeFilterButton.forEach((button) => button.classList.remove('filter-selected'));
        completedFilterButton.forEach((button) => button.classList.remove('filter-selected'));
    }


    taskList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('update-task')) {
            const listItem = e.target.closest('li');
            if (listItem) {
                const existingInput = listItem.querySelector('.edit-task-input');
                if (existingInput) {
                    return;
                }

                const taskText = listItem.querySelector('.main-text');
                const originalText = taskText.textContent;
                
                const inputField = document.createElement('input');
                inputField.value = originalText;
                inputField.classList.add('edit-task-input');
                inputField.maxLength = 30;
                
                taskText.parentElement.appendChild(inputField);
                taskText.style.display = 'none';

                inputField.focus();

                inputField.addEventListener('keypress', async (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const updatedText = inputField.value;
                        const taskIdToUpdate = listItem.getAttribute('data-task-id');

                        if (taskIdToUpdate) {
                            try {
                                const task = await fetchTask(taskIdToUpdate);
                                await updateTask(taskIdToUpdate, {
                                    ...task,
                                    title: updatedText,
                                });
                                fetchTasks({ page: currentPage });
                            } catch (error) {
                                console.error('Error updating task:', error);
                            }
                        }
                    }
                });
                inputField.addEventListener('input', () => {
                    const maxLength = 35;
                    if (inputField.value.length > maxLength) {
                        inputField.value = inputField.value.slice(0, maxLength);
                    }
                });
            }
        }
    });
});    