
// --------------------------------------------------- Variables ---------------------------------------------------------------------


// Apuntamos al servidor de desarrollo de Flask
// const BASEURL = "http://127.0.0.1:5000"; 

// Apuntamos al servidor de producción de python anywhere
const BASEURL = "https://francolaca.pythonanywhere.com/";

// Contenedor de las tarjetas (las tarjetas se renderizaran dentro del elemento con id="contenedorTarjetas")
const contenedorTarjetas = document.querySelector("#contenedorTarjetas");

// Array que contendrá las imágenes seleccionadas por el usuario para descargar (funciona similar a un carrito de compras)
const imágenesSeleccionadas = [];

// Array de cantidades de productos en el carrito  
const cantidadImágenes = [];


// ------------------------------------------------- Funciones ---------------------------------------------------------------------


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


// Función que inserta tarjetas en un archivo .html. La función recibe dos parámetros. Uno para el array de tarjetas y el otro para el elemento contenedor
// Técnica utilizando una plantilla en html y un elemento fragment en js y que tambien requiere el uso del método cloneNode (SEGUIR INVESTIGANDO). 
async function insertCard(htmlNode){

    // Array de muestras (las muestras se almacenan como objetos dentro de un array)
    let muestras_sm = await fetchData(BASEURL + '/api/muestras/', 'GET');

    // Seleccionar solamente las muestras activas
    muestras_sm = muestras_sm = muestras_sm.filter(muestra => muestra.muestra_activa == 1);

    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-tarjeta").content;

    const imgTemplate = template.querySelector("img");
    const h3Template = template.querySelector("h3");
    const p1Template = template.querySelector("#p1");
    const p2Template = template.querySelector("#p2");
    const btnSeleccionarTemplate = template.querySelectorAll("button")[0];
    const btnDescargarTemplate = template.querySelectorAll("button")[1];

    muestras_sm.forEach(function(muestra){

        // Asignamos los valores correspondientes a cada elemento de la plantilla
        imgTemplate.src = muestra.url_img;
        imgTemplate.alt = muestra.alt_img;
        h3Template.textContent = muestra.nombre_img;
        p1Template.textContent = muestra.fecha_img + " | " + muestra.ubicación;
        p2Template.textContent = muestra.nombre_plat;
        btnSeleccionarTemplate.id = "btnSeleccionar-" + muestra.id_muestra;
        btnDescargarTemplate.id = "btnDescargar-" + muestra.id_muestra;

        // Clonamos la plantilla. CloneNode es útil se desea crear copias de nodos existentes en el DOM sin afectar al nodo original
        const clone = template.cloneNode(true);
        
        // NOTA: cloneNode no copia los manejadores de eventos ni la asociación con los mismos. Es decir, si el nodo original tiene eventos asociados, la copia no los tendrá. 
        // Para que los botones funcionen correctamente se deben asignar los eventos después de clonar la plantilla pero antes de agregarla al fragmento.
        const botonSeleccionarClonado = clone.getElementById(`btnSeleccionar-${muestra.id_muestra}`);        
        const botonDescargarClonado = clone.getElementById(`btnDescargar-${muestra.id_muestra}`);

        // Llamamos a la función agregar al carrito (esta función le agrega un evento al botón)
        addToCart(botonSeleccionarClonado, muestras_sm, imágenesSeleccionadas, cantidadImágenes);
        
        // Agregamos el nodo clonado al fragmento creado anteriormente
        fragment.appendChild(clone);

    });

    // Por último, agregamos el fragmento con todas las tarjetas al nodo HTML especificado
htmlNode.appendChild(fragment);

};


// Función que agrega productos al carrito de compras. Le pasamos como argumento el botón para agregar productos, la base de datos con nuestros productos, el carrito y un array con las cantidades de cada producto en el carrito 
function addToCart (boton, productos, carrito, cantidades){

    boton.addEventListener("click", function(){

        // Buscamos el producto seleccionado por el usuario en nuestra base de datos.
        const idProductoSeleccionado = boton.id.replace("btnSeleccionar-","");    
        const productoSeleccionado = productos.find(product => product.id_muestra == idProductoSeleccionado);
    
        if (productoSeleccionado) {        
            // Si el producto existe en nuestra base de datos, y aún no a sido agregado al carrito, entonces lo agregamos 
            if (!carrito.includes(productoSeleccionado)){
                carrito.push(productoSeleccionado);
                cantidades.push(1);
            } else {
                // Si el producto ya a sido seleccionado previamente, entonces aumentamos su cantidad en una unidad, pero no agregamos nada al carrito
                const index = carrito.indexOf(productoSeleccionado);
                cantidades[index] += 1;
            };
            console.log(carrito, cantidades);
        } else {
            // Si no se encuentra el producto se muestra el siguiente mensaje
            alert("Producto no encontrado");
        };

    });

};


// ------------------------------------------------- Sentencias ---------------------------------------------------------------------


// Insertamos (pintamos) las tarjetas llamando a la función insertCard. Le pasamos como argumento el elemento html contenedor  
insertCard(contenedorTarjetas);