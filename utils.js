function renderTaskTemplate(task) {
    return `
        <li data-task-id="${task.id}">
            <div class="flex-cross">
            <div class="checkbox-item dark">
              <input class="checkbox-1" type="checkbox" ${task.completed ? 'checked' : ''}>
              <div class="input-div"></div>
            </div>
            <h3 class="main-text">${task.title}</h3>
            </div>
            <img class="update-task" src="./images/icon-pencil.svg">
            <img class="delete-task" src="./images/icon-cross.svg">
          </li>
    `;
}