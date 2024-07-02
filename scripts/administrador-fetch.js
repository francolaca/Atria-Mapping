
// ---------------------------------------------------Variables a utilizar----------------------------------------------------------

const BASEURL = "http://127.0.0.1:5000"; 

const tbody = document.querySelector("#tbody-table-muestras");
const btnAgregar = document.querySelector("#btn-save-muestra");
const btnReload = document.querySelector("#btn-reload-all");
const inputNombre = document.querySelector("#inputNombre");
const inputMuestra = document.querySelector("#inputMuestra");
const inputFecha = document.querySelector("#inputFecha");
const inputUbicación = document.querySelector("#inputUbicación");
const selectFuente = document.querySelector("#selectFuente");
const inputDestacado = document.querySelector("#inputDestacado");
const inputId = document.querySelector('#inputId');
const form = document.querySelector('#form-muestra');

let plataformas = [];   // Variable para almacenar los registros de la tabla plataformas


// --------------------------------------------------- POO ---------------------------------------------------------------------


class Muestra{
    constructor(id_muestra, id_plataforma, url_img, nombre_img, fecha_img, ubicación, nombre_plat, destacado, alt_img, muestra_activa){
        this.id_muestra=id_muestra;
        this.id_plataforma=id_plataforma;
        this.url_img=url_img;
        this.nombre_img=nombre_img;
        this.fecha_img=fecha_img;
        this.ubicación=ubicación;
        this.nombre_plat=nombre_plat;
        this.destacado=destacado;
        this.alt_img=alt_img;
        this.muestra_activa=muestra_activa;
    };
};


// --------------------------------------------------- Funciones ---------------------------------------------------------------------


/**
 * Función para realizar una petición fetch con JSON
 * @param {String} url - La URL a la que se realiza la petición
 * @param {String} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc)
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null){

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
    };

    try {
        const response = await fetch(url, options); // Realiza la petición fetch
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        };
        return await response.json(); // Devuelve la respuesta en formato JSON
    } catch (error) {
        console.error("Fetch error: " , error);
        alert("An error occurred while fetching data. Please try again");
    };
    
};


// Función para traer las plataformas de la base de datos y mostrarlas en el campo select del formulario
async function mostrarPlataformas() {
    try {
        plataformas = await fetchData(BASEURL + '/api/plataformas/', 'GET');

        let textTemplate = "";

        plataformas.forEach(plataforma => {
            textTemplate += `<option value="${plataforma.nombre_plat}">${plataforma.nombre_plat}</option>`;
        });

        selectFuente.insertAdjacentHTML("beforeend", textTemplate);

    } catch (error) {
        console.error('Error:', error);
    }
}


/**
 * Función para traer las muestras de la base de datos y mostrarlas en el cuepo de la tabla
 * @param {('todas'|'activas'|'destacadas')} [selección="todas"]  - El criterio de selección de las muestras.
 *                                                                - "todas": Traer todas las muestras.
 *                                                                - "activas": Traer solamente las muestras activas.
 *                                                                - "destacadas": Traer solamente las muestras destacadas.
 */
async function mostrarMuestras(selección = "todas"){

    let muestras_sm = await fetchData(BASEURL + '/api/muestras/', 'GET');

    tbody.innerHTML="";

    // Se crea una variable que contendá la cadena de texto que a continuación se pasa a insertAdjasentHTML
    let textTemplate = "";

    // Seleccionar el subgrupo de muestras adecuado
    if (selección == "activas"){
        muestras_sm = muestras_sm.filter(muestra => muestra.muestra_activa == 1);
    } 
    
    if(selección == "destacadas"){
        muestras_sm = muestras_sm.filter(muestra => muestra.destacado == 1);
    };
    
    muestras_sm.forEach( muestra => {

         // Se cambia el valor booleano de muestra.destacado por el ícono de check
        if (muestra.destacado) {
            muestra.destacado=`<i class="fa-solid fa-check"></i>`;      
        } else {
            muestra.destacado=``; 
        };

        textTemplate += `<tr>
                            <td><img src="${muestra.url_img}" alt="${muestra.alt_img}" height="100px" width="auto"></td>
                            <td>${muestra.nombre_img}</td>
                            <td class="th_lg">${muestra.fecha_img}</td>
                            <td class="th_lg">${muestra.ubicación}</td>
                            <td class="th_lg">${muestra.nombre_plat}</td>
                            <td>${muestra.destacado}</td>
                            <td>
                                <button class="smallButton--light_table" onclick="editarMuestra(${muestra.id_muestra})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="smallButton--light_table" onclick="eliminarMuestra(${muestra.id_muestra})" id="btn-delete-${muestra.id_muestra}"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;

    });

    tbody.insertAdjacentHTML("beforeend",textTemplate);

};


async function recargarMuestras(){

    let muestras_sm = await fetchData(BASEURL + '/api/muestras/reload', 'GET');

    tbody.innerHTML="";

    // Se crea una variable que contendá la cadena de texto que a continuación se pasa a insertAdjasentHTML
    let textTemplate = "";

    muestras_sm.forEach( muestra => {

         // Se cambia el valor booleano de muestra.destacado por el ícono de check
        if (muestra.destacado) {
            muestra.destacado=`<i class="fa-solid fa-check"></i>`;      
        } else {
            muestra.destacado=``; 
        };

        textTemplate += `<tr>
                            <td><img src="${muestra.url_img}" alt="${muestra.alt_img}" height="100px" width="auto"></td>
                            <td>${muestra.nombre_img}</td>
                            <td class="th_lg">${muestra.fecha_img}</td>
                            <td class="th_lg">${muestra.ubicación}</td>
                            <td class="th_lg">${muestra.nombre_plat}</td>
                            <td>${muestra.destacado}</td>
                            <td>
                                <button class="smallButton--light_table" onclick="editarMuestra(${muestra.id_muestra})"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button class="smallButton--light_table" onclick="eliminarMuestra(${muestra.id_muestra})" id="btn-delete-${muestra.id_muestra}"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;

    });

    tbody.insertAdjacentHTML("beforeend",textTemplate);

};


/**
* Función para hacer una eliminación lógica de una muestra en la base de datos
* @param {number} id_muestra posición del array que se va a eliminar
*/
function eliminarMuestra(id_muestra){
    Swal.fire({
        title: "Esta seguro de eliminar la muestra?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        icon: "warning"
    }).then(async (result) => {
        if (result.isConfirmed) {
            let response = await fetchData(`${BASEURL}/api/muestras/${id_muestra}`, 'DELETE');
            const btnDelete = document.querySelector(`#btn-delete-${id_muestra}`)
            fila = btnDelete.closest('tr');
            fila.remove();
            Swal.fire(response.message, "", "success");
        }
    });
}









/**
 * Function para cargar el formulario con los datos de la muestra a editar
 * @param {number} id_muestra - id de la muestra que se va a editar
 */
async function editarMuestra(id_muestra){

    //Buscamos en el servidor la muestra de acuerdo al id
    let muestraParaEditar = await fetchData(`${BASEURL}/api/muestras/${id_muestra}`, 'GET');

    //Se cargan los inputs del HTML con los valores de la muestra a editar
    inputNombre.value = muestraParaEditar.nombre_img;
    inputMuestra.value = muestraParaEditar.url_img;
    inputFecha.value = muestraParaEditar.fecha_img;
    inputUbicación.value = muestraParaEditar.ubicación;
    selectFuente.value = muestraParaEditar.nombre_plat;
    inputDestacado.value = muestraParaEditar.destacado;
    inputId.value = muestraParaEditar.id_muestra;
    inputDestacado.checked = muestraParaEditar.destacado == 1;
    
}


// Función para agregar una nueva muestra a la base de datos o actualizar una existente
async function guardarMuestra(){

    // Validación de los input
    if (!inputNombre.value || !inputMuestra.value || !inputFecha.value || !inputUbicación.value || !selectFuente.value) {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    // Capturamos la plataforma a partir de su nombre (valor del campo select del formulario)
    let plataforma = plataformas.find(plataforma => plataforma.nombre_plat === selectFuente.value);

    // Se crea un nuevo objeto de la clase Muestra con los valores ingresados por el usuario
    let muestraData = new Muestra(
    inputId.value,
    plataforma.id_plataforma,
    inputMuestra.value,
    inputNombre.value,
    inputFecha.value,
    inputUbicación.value,
    selectFuente.value,
    inputDestacado.checked ? 1 : 0,
    inputNombre.value,
    1);

    let respuesta = null;
    // Si hay un id_muestra, realiza una petición PUT para actualizar la muestra existente
    if(muestraData.id_muestra!==""){
        respuesta = await fetchData(`${BASEURL}/api/muestras/${muestraData.id_muestra}`, 'PUT', muestraData);
    }else{
        // Si no hay id_muestra, realiza una petición POST para crear una nueva muestra
        respuesta = await fetchData(`${BASEURL}/api/muestras/`, 'POST', muestraData);
        
    }

    form.reset();
    inputId.value=null;

    Swal.fire({
        title: 'Exito!',
        text: respuesta.message,
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })

    // Ingresar aquí código para evitar el llamado a mostrarMuestras("activas")

    mostrarMuestras("activas");

}


    // -----------------------------------------------------eventos ---------------------------------------------------------------------


    // Evento click del btnAgregar para agregar muestras a la tabla   
    btnAgregar.addEventListener("click",function(){
        guardarMuestra();
    });


        // Evento click del btnRecargar para activar y traer todas las muestras de la base de datos   
    btnReload.addEventListener("click",function(){
        recargarMuestras();
    });


// ----------------------------------------------------- sentencias ---------------------------------------------------------------------


mostrarPlataformas().then(() => {
    mostrarMuestras("activas");
});