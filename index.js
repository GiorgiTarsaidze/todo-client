let isDarkMode = false;

document.addEventListener("DOMContentLoaded", function () {
    const image = document.querySelector(".img");
    const background = document.querySelector(".background");
    const container = document.querySelector(".todo-container");
    const darkElements = document.querySelectorAll(".dark");
    const mainTextElements = document.querySelectorAll(".main-text");
    const paginationButtons = document.querySelectorAll(".pagination button");
    const currentPageText = document.getElementById("currentPage");
    const mobileFooter = document.querySelector(".mobile-footer");

    function toggleMobileFooter() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 768) {
            mobileFooter.style.display = "flex";
        } else {
            mobileFooter.style.display = "none";
        }
    }

    toggleMobileFooter();
    window.addEventListener("resize", toggleMobileFooter);

    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            container.classList.add("dark-mode");

            for (let i = 0; i < darkElements.length; i++) {
                darkElements[i].classList.add("darkElement");
            }

            for (let z = 0; z < mainTextElements.length; z++) {
                mainTextElements[z].style.color = "#C8CBE7";
            }
            document.body.style.backgroundColor = "#171823";
            background.style.backgroundImage = "url('/images/bg-desktop-dark.jpg')";
            image.src = "./images/icon-sun.svg";

            for (let button of paginationButtons) {
                button.classList.add("dark-mode");
            }
            currentPageText.classList.add("dark-mode");

            applyDarkModeStyles();
        } else {
            container.classList.remove("dark-mode");

            for (let i = 0; i < darkElements.length; i++) {
                darkElements[i].classList.remove("darkElement");
            }

            for (let z = 0; z < mainTextElements.length; z++) {
                mainTextElements[z].style.color = "#494C6B";
            }
            document.body.style.backgroundColor = "rgba(250,250,250,1)";
            background.style.backgroundImage = "url('/images/bg-desktop-light.jpg')";
            image.src = "./images/icon-moon.svg";

            for (let button of paginationButtons) {
                button.classList.remove("dark-mode");
            }
            currentPageText.classList.remove("dark-mode");

            applyDarkModeStyles();
        }
    }
    
    image.addEventListener("click", toggleDarkMode);
});
