// Evento click del burger-menu del header

const btnBurger = document.querySelector(".burger-menu");
const navOuterMenu = document.querySelector(".nav-outerList");
const navButtons = document.querySelector(".nav-buttons");
const btnLogin = document.querySelector("#btnLogin");

btnBurger.addEventListener("click", function(){
    navOuterMenu.classList.toggle("nav-outerList--visible");    // Si la clase existe entonces toggle la elimina, caso contrario la agrega
    navButtons.classList.toggle("nav-buttons--visible");
})


// Evento click del boton Login
btnLogin.addEventListener("click", function(){

    const rutaArchivo = window.location.pathname;
    const partesRuta = rutaArchivo.split('/');
    const nombreArchivo = partesRuta.pop();
    let rutaLogin;

    if (nombreArchivo == "index.html"){
        rutaLogin = "paginas/ingreso.html";
    }
    else{
        rutaLogin = "./ingreso.html";
    }
    
    window.location.href = rutaLogin;
});


