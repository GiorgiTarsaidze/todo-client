let image=document.querySelector(".img");
let background=document.querySelector(".background");
let darkElement=document.querySelectorAll(".dark")


image.addEventListener("click",()=>{
    document.body.style.backgroundColor="#171823"
    background.style.backgroundImage="url('/images/bg-desktop-dark.jpg')"
    image.src="./images/icon-sun.svg"

    for(let i=0;i<darkElement.length;i++){
        darkElement[i].classList.add("darkElement");
    }
})