// Evento click del burger-menu 

const btnBurger = document.querySelector(".burger-menu")
const navOuterMenu = document.querySelector(".nav-outerList")

btnBurger.addEventListener("click", function(){
    navOuterMenu.classList.toggle("nav-outerList--visible");    // Si la clase existe entonces toggle la elimina, caso contrario la agrega
})