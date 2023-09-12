let image=document.querySelector(".img");
let background=document.querySelector(".background");
let darkElement=document.querySelectorAll(".dark")

let num=0;

image.addEventListener("click",()=>{
    if(num==0){

    
    document.body.style.backgroundColor="#171823"
    background.style.backgroundImage="url('/images/bg-desktop-dark.jpg')"
    image.src="./images/icon-sun.svg"

    for(let i=0;i<darkElement.length;i++){
        darkElement[i].classList.add("darkElement");
    }
    num=1
    }else{
    document.body.style.backgroundColor="rgba(250,250,250,1)"
    background.style.backgroundImage="url('/images/bg-desktop-light.jpg')"
    image.src="./images/icon-moon.svg"

    for(let i=0;i<darkElement.length;i++){
        darkElement[i].classList.remove("darkElement");
    }
    num=0
    }
})