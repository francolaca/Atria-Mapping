// ---------------------------------------------------Variables a utilizar----------------------------------------------------------


    const tbody = document.querySelector("#tbody-table-muestras");
    const btnAgregar = document.querySelector("#btn-save-tarjeta");
    const inputNombre = document.querySelector("#inputNombre");
    const inputMuestra = document.querySelector("#inputMuestra");
    const inputFecha = document.querySelector("#inputFecha");
    const inputUbicación = document.querySelector("#inputUbicación");
    const selectFuente = document.querySelector("#selectFuente");
    const inputDestacado = document.querySelector("#inputDestacado");
    const inputId = document.querySelector('#inputId');
    const form = document.querySelector('#form-muestra');


// --------------------------------------------------- POO ---------------------------------------------------------------------


class Tarjeta{
    constructor(id, src, nombre, fecha, ubicación, fuente, destacado, alt){
        this.id=id;
        this.src=src;
        this.nombre=nombre;
        this.fecha=fecha;
        this.ubicación=ubicación;
        this.fuente=fuente;
        this.destacado=destacado;
        this.alt=alt;
    }
}


// --------------------------------------------------- Funciones ---------------------------------------------------------------------


// Función para buscar en el localstorage el array de tarjetas y mostrarlas en el cuepo de la tabla.
function mostrarTarjetas(){

    let tarjetas_sm = JSON.parse(localStorage.getItem("tarjetas_sm")) || [];

    tbody.innerHTML="";

    // Se crea una variable que contendá la cadena de texto que a continuación se pasa a insertAdjasentHTML
    let textTemplate = "";
    tarjetas_sm.forEach( tarjeta => {

        // Se cambia el valor booleano de tarjeta.destacado por el ícono de check
        if (tarjeta.destacado) {
            tarjeta.destacado=`<i class="fa-solid fa-check"></i>`;      
        } else {
            tarjeta.destacado=``; 
        }

        textTemplate += `<tr>
                            <td><img src="${tarjeta.src}" alt="${tarjeta.nombre}" height="100px" width="auto"></td>
                            <td>${tarjeta.nombre}</td>
                            <td class="th_lg">${tarjeta.fecha}</td>
                            <td class="th_lg">${tarjeta.ubicación}</td>
                            <td class="th_lg">${tarjeta.fuente}</td>
                            <td>${tarjeta.destacado}</td>
                            <td>
                                <button class="smallButton--light_table" onclick="editarTarjeta(${tarjeta.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="smallButton--light_table" onclick="eliminarTarjeta(${tarjeta.id})"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;

    });

    tbody.insertAdjacentHTML("beforeend",textTemplate);
}


// Función para agregar una nueva tarjeta al array de tarjetas
function guardarTarjeta(){

    // Validación de los input
    if (inputNombre.value.trim()!=="") {

        // Se obtiene el array que contiene las tarjetas (en este caso del local storage)
        let tarjetas_sm = JSON.parse(localStorage.getItem("tarjetas_sm")) || [];

        //Si el inputId es distinto de vacío, es porque se trata de una acción de edición

        if(inputId.value!==""){

             //Buscamos la tarjeta a editar con el método find
            const tarjetaParaEditar = tarjetas_sm.find(tarjeta => tarjeta.id==inputId.value);

            //Si existe actualizo el objeto
            if (tarjetaParaEditar) {

                tarjetaParaEditar.nombre = inputNombre.value;
                tarjetaParaEditar.src = inputMuestra.value;
                tarjetaParaEditar.fecha = inputFecha.value;
                tarjetaParaEditar.ubicación = inputUbicación.value;
                tarjetaParaEditar.fuente = selectFuente.value;
                tarjetaParaEditar.destacado = inputDestacado.value;

                alert("la tarjeta fue editada");

            }

        }else{

            // Se crea un nuevo objeto de la clase Tarjeta con los valores ingresados por el usuario y se lo agrega al array de tarjetas
            let nuevaTarjeta = new Tarjeta(
            tarjetas_sm.length + 1,
            inputMuestra.value,
            inputNombre.value,
            inputFecha.value,
            inputUbicación.value,
            selectFuente.value,
            inputDestacado.checked,
            inputNombre.value);

            tarjetas_sm.push(nuevaTarjeta);

            alert("la tarjeta fue agregada");

        }

        // Se envían las modificaciones del array de tarjetas (en este caso al local storage)
        localStorage.setItem("tarjetas_sm",JSON.stringify(tarjetas_sm));

        mostrarTarjetas();

        //Se limpian los inputs del formulario
        form.reset();

    } else {
        alert("complete el campo nombre")
    }

}


/**
 * Función para eliminar una tarjeta al array de tarjetas del local storage de acuerdo al indice del mismo
 * @param {number} idTarjeta id de la tarjeta que se va a eliminar
 */
function eliminarTarjeta(idTarjeta){

    // Se obtiene el array que contiene las tarjetas (en este caso del local storage)
    let tarjetas_sm = JSON.parse(localStorage.getItem("tarjetas_sm"));

    //Buscamos la tarjeta a eliminar con el método find
    let tarjetaParaEliminar = tarjetas_sm.find(tarjeta => tarjeta.id===idTarjeta);

    // Si se encontró la tarjeta a eliminar, entonces procedemos a eliminarla
    if (tarjetaParaEliminar) {

        //Se utiliza el metodo filter para actualizar el array de tarjetas (todas las tarjetas menos la tarjeta eliminada)
        tarjetas_sm = tarjetas_sm.filter(tarjeta => tarjeta.id !== tarjetaParaEliminar.id);

        // Se envían las modificaciones del array de tarjetas (en este caso al local storage)
        localStorage.setItem("tarjetas_sm",JSON.stringify(tarjetas_sm));

        mostrarTarjetas()

        alert("la tarjeta fue eliminada");
    }

}


/**
 * Function para cargar el formulario con los datos de la tarjeta a editar
 * @param {number} idTarjeta id de la tarjeta que se va a editar
 */
function editarTarjeta(idTarjeta){

    //Se obtiene el array que contiene las tarjetas (en este caso del local storage)
    let tarjetas_sm = JSON.parse(localStorage.getItem("tarjetas_sm"));

    //Buscamos la tarjeta a editar con el método find
    let tarjetaParaEditar = tarjetas_sm.find(tarjeta => tarjeta.id===idTarjeta);

    // Si se encontró la tarjeta a ser editada, entonces procedemos proceder
    if (tarjetaParaEditar) {

        //Se cargan los inputs del HTML con los valores de la tarjeta a editar
        inputNombre.value = tarjetaParaEditar.nombre;
        inputMuestra.value = tarjetaParaEditar.src;
        inputFecha.value = tarjetaParaEditar.fecha;
        inputUbicación.value = tarjetaParaEditar.ubicación;
        selectFuente.value = tarjetaParaEditar.fuente;
        inputDestacado.value = tarjetaParaEditar.destacado;
        inputId.value = tarjetaParaEditar.id;

    }

}


// -----------------------------------------------------eventos ---------------------------------------------------------------------


    // Evento click del btnAgregar para agregar tarjetas a la tabla   
    btnAgregar.addEventListener("click",function(){
        guardarTarjeta();
    });


// ----------------------------------------------------- sentencias ---------------------------------------------------------------------


    mostrarTarjetas();