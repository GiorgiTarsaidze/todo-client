const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");

let currentPage = 1;

function enablePaginationButtons(previous, next) {
  prevPageButton.disabled = !previous;
  nextPageButton.disabled = !next;
}

function updatePaginationButtons(data) {
  enablePaginationButtons(data.previous, data.next);
}

function handlePaginationClick(event) {
  const button = event.target;
  if (button === prevPageButton) {
    if (currentPage > 1) {
      currentPage--;
      fetchTasks({ page: currentPage });
    }
  } else if (button === nextPageButton) {
    currentPage++;
    fetchTasks({ page: currentPage });
  }
}

prevPageButton.addEventListener("click", handlePaginationClick);
nextPageButton.addEventListener("click", handlePaginationClick);

function initializePagination() {
  enablePaginationButtons(false, false);
}
