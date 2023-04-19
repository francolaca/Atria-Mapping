// Evento click del burger-menu del header

const btnBurger = document.querySelector(".burger-menu");
const navOuterMenu = document.querySelector(".nav-outerList");

btnBurger.addEventListener("click", function(){
    navOuterMenu.classList.toggle("nav-outerList--visible");    // Si la clase existe entonces toggle la elimina, caso contrario la agrega
})


// Evento click del botón Solicitar Presupuesto de la página index.html

const btnPresupuesto = document.querySelector("#btnPresupuesto");

btnPresupuesto.addEventListener("click", function() {
    window.location.href = "páginas/presupuesto.html";
});


// Evento click de los demás botones de la página index.html


const botonesPagConst = document.querySelectorAll(".paginaConst");

for (let i = 0; i < botonesPagConst.length; i++) {
    botonesPagConst[i].addEventListener("click", function() {
        window.location.href = "páginas/construccion.html";
    });
}
