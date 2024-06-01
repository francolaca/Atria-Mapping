// --------------------------------------------------- Variables ---------------------------------------------------------------------

const formIngresoRegistro = document.querySelector("#form_ingresoRegistro");

const btnInicio = document.querySelector("#btn_inicioSesión");
const btnAnterior = document.querySelector("#btn_anterior");
const btnRegistro = document.querySelector("#btn_registro");
const btnSiguiente = document.querySelector("#btn_siguiente"); 

const hiddenElements = document.querySelectorAll(".control_hidden, .form_links, #btn_inicioSesión, #btn_anterior, #btn_registro, form a, h2");


const inputNombre = document.querySelector("#inputNombre");
const inputApellido = document.querySelector("#inputApellido");
const inputEmail = document.querySelector("#inputEmail");
const inputPassword = document.querySelector("#inputPassword");
const inputNacimiento = document.querySelector("#inputNacimiento");
const selectPaís = document.querySelector("#selectPaís");
const inputTérminos = document.querySelector("#inputTérminos");


// ------------------------------------------------- Funciones ---------------------------------------------------------------------


// Función que agrega la clase control_hidden a los elementos que no la tienen y se la quita a los elementos que si la tienen. 
// Se pasa como argumento del método addEventlistener de los botones btnSiguiente y btnAnterior  
function toggleHiddenElements() {

    // LLamamos a la función limpiar
    limpiarErrores();
    hiddenElements.forEach(item => item.classList.toggle("control_hidden"));

}


// Función para limpiar los errores
const limpiarErrores = () => {

    // Seleccionar todos los campos de entrada y elementos de error
    const inputs = document.querySelectorAll("input");
    const errorElements = document.querySelectorAll(".error");

    // Iterar sobre los campos de entrada y elementos de error y limpiarlos
    inputs.forEach(input => {
        input.classList.remove('error');
        // Verificar si el elemento hermano siguiente existe antes de acceder a su propiedad textContent
        // No todos los inputs tienen a continuacion un div class error.
        const nextSibling = input.nextElementSibling;
        if (nextSibling !== null) {
            nextSibling.textContent = '';
        }
    });

    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });
    
}


// Función para validar el formulario
const validarFormulario = (evento) => {

    evento.preventDefault();

    const target = document.activeElement;

    // LLamamos a la función limpiar
    limpiarErrores();

    let válido = true;

    // Si no hay errores en los campos inputEmail e inputPassword y el usuario intenta enviar el formulario haciendo click en btnInicio, se envía el formulario
    if(target === btnInicio){

        // Validación inputEmail
        if(!inputEmail.value.trim()){
            inputEmail.classList.add("error")
            document.querySelector("#error-email").textContent="Debe completar el campo Email";
            válido=false;
        }

        // Validar inputPassword
        if(!inputPassword.value.trim()){
            inputPassword.classList.add("error")
            document.querySelector("#error-password").textContent="Debe completar el campo contraseña";
            válido=false;
        }else if(inputPassword.value.length < 6 || inputPassword.value.length > 12){
            inputPassword.classList.add("error")
            document.querySelector("#error-password").textContent ="La contraseña debe contener entre 6 y 12 caracteres";
            válido=false;
        }

        if(válido){
            formIngresoRegistro.submit();
            window.location.href = "../index.html";
        }

    }

    // Si no hay errores en ninguno de los campos y el usuario intenta enviar el formulario haciendo click en btnRegistro, se envía el formulario
    if(target === btnRegistro){

        // Validación inputEmail
        if(!inputEmail.value.trim()){
            inputEmail.classList.add("error")
            document.querySelector("#error-email").textContent="Debe completar el campo Email";
            válido=false;
        }

        // Validar inputPassword
        if(!inputPassword.value.trim()){
            inputPassword.classList.add("error")
            document.querySelector("#error-password").textContent="Debe completar el campo contraseña";
            válido=false;
        }else if(inputPassword.value.length < 6 || inputPassword.value.length > 12){
            inputPassword.classList.add("error")
            document.querySelector("#error-password").textContent ="La contraseña debe contener entre 6 y 12 caracteres";
            válido=false;
        }

        // Validación inputNombre
        if(!inputNombre.value.trim()){
            inputNombre.classList.add("error");
            document.querySelector("#error-nombre").textContent="Debe completar el campo Nombre";
            válido=false;
        }

        // Validación inpuApellido
        if(!inputApellido.value.trim()){
            inputApellido.classList.add("error")
            document.querySelector("#error-apellido").textContent="Debe completar el campo Apellido";
            válido=false;
        }

        // Validación checkTérminos
        if(!inputTérminos.checked){
            document.querySelector("#error-términos").textContent="Debe aceptar los términos y condiciones";
            válido=false;
        }

        if(válido){
            formIngresoRegistro.submit();
            window.location.href = "../index.html";
        }

    }

}


// -----------------------------------------------------eventos ---------------------------------------------------------------------


btnSiguiente.addEventListener("click", toggleHiddenElements);

btnAnterior.addEventListener("click", toggleHiddenElements);

formIngresoRegistro.addEventListener("submit", validarFormulario);