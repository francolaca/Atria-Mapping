// ---------------------------------------------------Variables a utilizar----------------------------------------------------------


    const tbody = document.querySelector("#tbody-table-muestras");
    const btnAgregar = document.querySelector("#btn-save-muestra");
    const inputNombre = document.querySelector("#inputNombre");
    const inputMuestra = document.querySelector("#inputMuestra");
    const inputFecha = document.querySelector("#inputFecha");
    const inputUbicación = document.querySelector("#inputUbicación");
    const selectFuente = document.querySelector("#selectFuente");
    const inputDestacado = document.querySelector("#inputDestacado");
    const inputId = document.querySelector('#inputId');
    const form = document.querySelector('#form-muestra');


// --------------------------------------------------- POO ---------------------------------------------------------------------


class Muestra{
    constructor(id, src, nombre, fecha, ubicación, fuente, destacado, alt){
        this.id=id;
        this.src=src;
        this.nombre=nombre;
        this.fecha=fecha;
        this.ubicación=ubicación;
        this.fuente=fuente;
        this.destacado=destacado;
        this.alt=alt;
    };
};


// --------------------------------------------------- Funciones ---------------------------------------------------------------------


// Función para buscar en el localstorage el array de muestras y mostrarlas en el cuepo de la tabla.
function mostrarMuestras(){

    let muestras_sm = JSON.parse(localStorage.getItem("muestras_sm")) || [];

    tbody.innerHTML="";

    // Se crea una variable que contendá la cadena de texto que a continuación se pasa a insertAdjasentHTML
    let textTemplate = "";
    muestras_sm.forEach( muestra => {

        // Se cambia el valor booleano de muestra.destacado por el ícono de check
        if (muestra.destacado) {
            muestra.destacado=`<i class="fa-solid fa-check"></i>`;      
        } else {
            muestra.destacado=``; 
        }

        textTemplate += `<tr>
                            <td><img src="${muestra.src}" alt="${muestra.nombre}" height="100px" width="auto"></td>
                            <td>${muestra.nombre}</td>
                            <td class="th_lg">${muestra.fecha}</td>
                            <td class="th_lg">${muestra.ubicación}</td>
                            <td class="th_lg">${muestra.fuente}</td>
                            <td>${muestra.destacado}</td>
                            <td>
                                <button class="smallButton--light_table" onclick="editarMuestra(${muestra.id})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="smallButton--light_table" onclick="eliminarMuestra(${muestra.id})"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;

    });

    tbody.insertAdjacentHTML("beforeend",textTemplate);
}


// Función para agregar una nueva muestra al array de muestras
function guardarMuestra(){

    // Validación de los input
    if (inputNombre.value.trim()!=="") {

        // Se obtiene el array que contiene las muestras (en este caso del local storage)
        let muestras_sm = JSON.parse(localStorage.getItem("muestras_sm")) || [];

        //Si el inputId es distinto de vacío, es porque se trata de una acción de edición

        if(inputId.value!==""){

             //Buscamos la muestra a editar con el método find
            const muestraParaEditar = muestras_sm.find(muestra => muestra.id==inputId.value);

            //Si existe actualizo el objeto
            if (muestraParaEditar) {

                muestraParaEditar.nombre = inputNombre.value;
                muestraParaEditar.src = inputMuestra.value;
                muestraParaEditar.fecha = inputFecha.value;
                muestraParaEditar.ubicación = inputUbicación.value;
                muestraParaEditar.fuente = selectFuente.value;
                muestraParaEditar.destacado = inputDestacado.value;

                alert("la muestra fue editada");

            }

        }else{

            // Se crea un nuevo objeto de la clase Muestra con los valores ingresados por el usuario y se lo agrega al array de muestras
            let nuevaMuestra = new Muestra(
            muestras_sm.length + 1,
            inputMuestra.value,
            inputNombre.value,
            inputFecha.value,
            inputUbicación.value,
            selectFuente.value,
            inputDestacado.checked,
            inputNombre.value);

            muestras_sm.push(nuevaMuestra);

            alert("la muestra fue agregada");

        }

        // Se envían las modificaciones del array de muestras (en este caso al local storage)
        localStorage.setItem("muestras_sm",JSON.stringify(muestras_sm));

        mostrarMuestras();

        //Se limpian los inputs del formulario
        form.reset();

    } else {
        alert("complete el campo nombre")
    }

}


/**
 * Función para eliminar una muestra al array de muestras del local storage de acuerdo al indice del mismo
 * @param {number} idMuestra id de la muestra que se va a eliminar
 */
function eliminarMuestra(idMuestra){

    // Se obtiene el array que contiene las muestras (en este caso del local storage)
    let muestras_sm = JSON.parse(localStorage.getItem("muestras_sm"));

    //Buscamos la muestra a eliminar con el método find
    let muestraParaEliminar = muestras_sm.find(muestra => muestra.id===idMuestra);

    // Si se encontró la muestra a eliminar, entonces procedemos a eliminarla
    if (muestraParaEliminar) {

        //Se utiliza el metodo filter para actualizar el array de muestras (todas las muestras menos la muestra eliminada)
        muestras_sm = muestras_sm.filter(muestra => muestra.id !== muestraParaEliminar.id);

        // Se envían las modificaciones del array de muestras (en este caso al local storage)
        localStorage.setItem("muestras_sm",JSON.stringify(muestras_sm));

        mostrarMuestras()

        alert("la muestra fue eliminada");
    }

}


/**
 * Function para cargar el formulario con los datos de la muestra a editar
 * @param {number} idMuestra id de la muestra que se va a editar
 */
function editarMuestra(idMuestra){

    //Se obtiene el array que contiene las muestras (en este caso del local storage)
    let muestras_sm = JSON.parse(localStorage.getItem("muestras_sm"));

    //Buscamos la muestra a editar con el método find
    let muestraParaEditar = muestras_sm.find(muestra => muestra.id===idMuestra);

    // Si se encontró la muestra a ser editada, entonces procedemos proceder
    if (muestraParaEditar) {

        //Se cargan los inputs del HTML con los valores de la muestra a editar
        inputNombre.value = muestraParaEditar.nombre;
        inputMuestra.value = muestraParaEditar.src;
        inputFecha.value = muestraParaEditar.fecha;
        inputUbicación.value = muestraParaEditar.ubicación;
        selectFuente.value = muestraParaEditar.fuente;
        inputDestacado.value = muestraParaEditar.destacado;
        inputId.value = muestraParaEditar.id;

    }

}


// -----------------------------------------------------eventos ---------------------------------------------------------------------


    // Evento click del btnAgregar para agregar muestras a la tabla   
    btnAgregar.addEventListener("click",function(){
        guardarMuestra();
    });


// ----------------------------------------------------- sentencias ---------------------------------------------------------------------


    mostrarMuestras();