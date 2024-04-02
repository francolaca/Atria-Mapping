// Evento click del burger-menu del header

const btnBurger = document.querySelector(".burger-menu");
const navOuterMenu = document.querySelector(".nav-outerList");
const navButtons = document.querySelector(".nav-buttons");

btnBurger.addEventListener("click", function(){
    navOuterMenu.classList.toggle("nav-outerList--visible");    // Si la clase existe entonces toggle la elimina, caso contrario la agrega
    navButtons.classList.toggle("nav-buttons--visible");
})