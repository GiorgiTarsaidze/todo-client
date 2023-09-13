function renderTaskTemplate(task) {
    return `
        <li>
            <div class="flex-cross">
            <div class="checkbox-item dark">
              <input class="checkbox-1" type="checkbox">
              <div class="input-div"></div>
            </div>
            <h3 class="main-text">${task.title}</h3>
            </div>
            <img src="./images/icon-cross.svg">
          </li>
    `;
}