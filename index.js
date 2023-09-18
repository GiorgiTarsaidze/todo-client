let isDarkMode = false;

document.addEventListener("DOMContentLoaded", function () {
    const image = document.querySelector(".img");
    const background = document.querySelector(".background");
    const container = document.querySelector(".todo-container");
    const darkElements = document.querySelectorAll(".dark");
    const mainTextElements = document.querySelectorAll(".main-text");

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

            applyDarkModeStyles();
        }
    }
    
    image.addEventListener("click", toggleDarkMode);
});
