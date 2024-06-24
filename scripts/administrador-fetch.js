
// ---------------------------------------------------Variables a utilizar----------------------------------------------------------

const BASEURL = "http://127.0.0.1:5000"; 

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

// "alt_img": "Plateau of Chasms",
// "destacado": 0,
// "fecha_img": "2022-11-10",
// "id_muestra": 2,
// "id_plataforma": "PLÉIADES 1",
// "muestra_activa": 1,
// "nombre_img": "Plateau of Chasms",
// "nombre_plat": "WORLDVIEW-2"
// "ubicación": "Tassili N'ajjer National Park, Algeria",
// "url_img": "./multimedia/imagenes/Imágenes-galería/imagenes-md/md-imagen-2.jpg"


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


/**
 * Función para traer todas las muestras activas de la base de datos y mostrarlas en el cuepo de la tabla
 */
async function mostrarMuestras(){

    let muestras_sm = await fetchData(BASEURL + '/api/muestras/', 'GET');

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
                                <button class="smallButton--light_table" onclick="eliminarMuestra(${muestra.id_muestra})"><i class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>`;

    });

    tbody.insertAdjacentHTML("beforeend",textTemplate);
};





























    // -----------------------------------------------------eventos ---------------------------------------------------------------------


    // Evento click del btnAgregar para agregar muestras a la tabla   
    btnAgregar.addEventListener("click",function(){
        guardarMuestra();
    });


// ----------------------------------------------------- sentencias ---------------------------------------------------------------------


    mostrarMuestras();