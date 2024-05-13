
// Interactividad formulario de solicitud de presupuesto de la página presupuesto.html

const btnSiguiente1 = document.querySelector("#btnSiguiente1");
const btnSiguiente2 = document.querySelector("#btnSiguiente2");
const btnSiguiente3 = document.querySelector("#btnSiguiente3");
const btnVolver1 = document.querySelector("#btnVolver1");
const btnVolver2 = document.querySelector("#btnVolver2");
const btnVolver3 = document.querySelector("#btnVolver3");
const btnEnviar = document.querySelector("#btnEnviar");

const datosRecopilados = document.querySelector("#datosRecopilados");
const formContacto = document.querySelector("#formDatosContacto");
const formArea = document.querySelector("#formAreaInterés");
const formDatos = document.querySelector("#formTipoDato");
const formVerificación = document.querySelector("#formVerificación");


// Inicializamos la vista del formulario ocultando los pasos posteriores.

formArea.style.display = "none";
formDatos.style.display = "none";
formVerificación.style.display = "none";


// Eventos click de los botones siguiente y volver de los formularios (botones con atributo type="button")

btnSiguiente1.addEventListener("click", function(){
    formContacto.style.display = "none";
    formArea.style.display = "block";
})

btnSiguiente2.addEventListener("click", function(){
    formArea.style.display = "none";
    formDatos.style.display = "block";
})

btnVolver1.addEventListener("click", function(){
    formArea.style.display = "none";
    formContacto.style.display = "block";
})

btnVolver2.addEventListener("click", function(){
    formDatos.style.display = "none";
    formArea.style.display = "block";
})

btnVolver3.addEventListener("click", function(){
    formVerificación.style.display = "none";
    formDatos.style.display = "block";
})


// Evento submit del formulario Tipo de Datos (cuando se hace click en el botón btnSiguiente3).

formDatos.addEventListener('submit', function(event) {

    event.preventDefault();

    formDatos.style.display = "none";
    formVerificación.style.display = "block";

  // Agregar aquí la lógica necesaria para validar los datos del formulario

    let nombre = document.querySelector("#inputNombre").value;
    let empresa = document.querySelector("#inputEmpresa").value;
    let teléfono = document.querySelector("#inputTeléfono").value;
    let email = document.querySelector("#inputEmail").value;
    
    let país = document.querySelector("#selectPaís").value;
    let tamaño = document.querySelector("#inputTamaño").value;
    let archivo = document.querySelector("#inputArchivo").value;

    let textoVerificación = `Datos de Contacto: <br> Nombre: ${nombre} <br> Empresa: ${empresa} <br> Teléfono: ${teléfono} <br> Email: ${email} <br> <br> Área de Interés: <br> País: ${país} <br> Tamaño: ${tamaño} <br> Archivo: ${archivo} <br> <br> Datos a Presupuestar: <br> `;

    const checkboxes = formDatos.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        textoVerificación = textoVerificación + checkbox.name + "<br>";
    });
    
    let textArea = document.querySelector("#textarea").value;

    textoVerificación = textoVerificación + "<br> Pedido especial o consulta: " + textArea + "<br><br><br>";

    datosRecopilados.innerHTML = `${textoVerificación}`;

});