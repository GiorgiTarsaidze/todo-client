const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageText = document.getElementById("currentPage");

let currentPage = 1;

function enablePaginationButtons(previous, next) {
  prevPageButton.disabled = !previous;
  nextPageButton.disabled = !next;
}

function updatePaginationButtons(data) {
  enablePaginationButtons(data.previous, data.next);
}

function updateCurrentPageText() {
  currentPageText.textContent = `Page ${currentPage}`;
}

function handlePaginationClick(event) {
  const button = event.target;
  if (button === prevPageButton) {
    if (currentPage > 1) {
      currentPage--;
      updateCurrentPageText();
      fetchTasks({ page: currentPage });
    }
  } else if (button === nextPageButton) {
    currentPage++;
    updateCurrentPageText();
    fetchTasks({ page: currentPage });
  }
}

prevPageButton.addEventListener("click", handlePaginationClick);
nextPageButton.addEventListener("click", handlePaginationClick);

function initializePagination() {
  enablePaginationButtons(false, false);
  updateCurrentPageText();
}