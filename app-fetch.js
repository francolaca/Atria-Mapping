
// ---------------------------------------------------Variables a utilizar----------------------------------------------------------


const BASEURL = "http://127.0.0.1:5000";

// Contenedor de las tarjetas (las tarjetas se renderizaran dentro del elemento con id="contenedorTarjetas"). En este caso será el carrousel de imágenes
const contenedorTarjetas = document.querySelector("#contenedorTarjetas");

const btnPresupuesto = document.querySelector("#btnPresupuesto");
const btnPresupuestoSmall = document.querySelector("#btnPresupuestoSmall");
const btnGalería = document.querySelector("#btnGalería");
const btnGaleríaSmall = document.querySelector("#btnGaleríaSmall");
const botonesPagConst = document.querySelectorAll(".paginaConst");


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


// La etiqueta picture de html nos permite mostrar una imagen guardada con diferentes tamaños según el tamaño del dispositivo de visualización.

// Suponiendo que:

// 0) Tenemos múltiples imágenes para mostrar
// 1) Las imagenes más grandes tienen un nombre con prefijo "lg-" y se guardan en una carpeta con sufijo "-lg"
// 2) Las imagenes de tamaño medio tienen un nombre con prefijo "md-" y se guardan en una carpeta con sufijo "-md"
// 3) Las imagenes de tamaño pequeño tienenn un nombre con prefijo "sm-" y se guardan en una carpeta con sufijo "-sm"
// 4) Las tres carpetas de imágenes deben estar guardadas en el mismo URL
// 4) Las imágenes para mostrar se guardadan como objetos en un Array
// 5) Los objetos del array tienen una propiedad "url_img" que contiene el url de la imagen a mostrar

// La siguiente función es útil para modificar el valor de la propiedad "url_img", es decir, el url de la imagen a mostrar. 
// Como parámetros se le debe pasar el array de terjetas, cuyo tamaño de imagen debe ser modificado y el nuevo tamaño en formato de texto ("md", "sm" o "lg")
// La función retorna un nuevo array de tarjetas con el tamaño de imagen ya modificado

function changeImgSize(cardsArray,newSize){

    const resizedCardsArray = cardsArray.map(card => {

        const src = card.url_img;

        // Utilizamos expresiones regulares para hacer el reemplazo
        const newSrc = src.replace(/(-sm|-md|-lg)/g, "-" + newSize).replace(/(sm-|md-|lg-)/g, newSize + "-");

        // Se crea un nuevo objeto utilizando el operador de propagación ...card para copiar las demás propiedades del objeto original, y se reemplaza la propiedad src con la nueva URL modificada.
        return { ...card, url_img: newSrc };
        
    });

    return resizedCardsArray;

}


// Encapsulamos el codigo suelto en funciones anónimas autoinvocada. Las razones por las que son útiles es porque permiten ejecutar código encapsulando variables al 
// entorno de la función ahorrando posibles errores.
(async function (){

    // Array de muestras de tamaño pequeño para pc, tablets y cel (las tarjetas se almacenan como objetos dentro de un array).
    let muestras_sm = await fetchData(BASEURL + '/api/muestras/', 'GET');

    // Array que contiene solamente las muestras destacadas de tamaño pequeño
    const muestrasDestacadas_sm = muestras_sm.filter(muestra => muestra.destacado == 1);

    // Como las imágenes del carrusel se crearán dinámicamente, tambien debemos crear dinámicamente los botones indicadores
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < muestrasDestacadas_sm.length; index++) {
        
            const button = document.createElement("button");
            button.type = "button";
            button.setAttribute("data-bs-target","#carouselExampleCaptions1");
            button.setAttribute("data-bs-slide-to",`${index}`);
            button.setAttribute("aria-label",`slide ${index + 1}`);

            fragment.appendChild(button);
    }

    // Agregamos la clase "active" al primer elemento creado dinámicamente. Caso contrario el carrusel no funcionará adecuadamente!!!
    const firstButton = fragment.querySelector("button");
    firstButton.classList.add("active");
    firstButton.setAttribute("aria-current","true");

    // Insertamos (pintamos) los botones indicadores en el elemento div con clase ".carousel-indicators" del carrusel  
    document.querySelector(".carousel-indicators").appendChild(fragment);

})();


// Función que inserta tarjetas en un carrusel de bootstrap. La función recibe como parámetro el elemento contenedor
// Utilizamos una plantilla en html y un elemento fragment en js. Esta técnica tambien requiere el uso del método cloneNode. 
async function insertCard(htmlNode){

    // Array de muestras de tamaño pequeño para pc, tablets y cel (las tarjetas se almacenan como objetos dentro de un array).
    let muestras_sm = await fetchData(BASEURL + '/api/muestras/', 'GET');

    // Array que contiene solamente las muestras destacadas de tamaño pequeño
    const muestrasDestacadas_sm = muestras_sm.filter(muestra => muestra.destacado == 1);

    // Adecuamos las url de las imágenes (borramos el punto inicial)
    muestrasDestacadas_sm.forEach(muestra => {
        muestra.url_img = muestra.url_img.slice(1);
    });

    // Array de muestras destacadas de tamaño grande para pc.
    const muestrasDestacadas_lg = changeImgSize(muestrasDestacadas_sm,"lg");

    // Array de muestras destacadas de tamaño medio para tablets y cel.
    const muestrasDestacadas_md = changeImgSize(muestrasDestacadas_sm,"md");

    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-carousel-item").content;

    // Para disminuir tiempos de carga pasar muestrasDestacadas_md o muestrasDestacadas_sm en lugar de muestrasDestacadas_lg  
    muestrasDestacadas_lg.forEach(function(muestra,index){

        // Asignamos los valores correspondientes a cada elemento de la plantilla
        template.querySelector("img").src = muestra.url_img;
        template.querySelector("img").alt = muestra.alt_img;
        template.querySelector("h4").textContent = muestra.nombre_img;
        template.querySelector("#p1").textContent = muestra.fecha_img + " | " + muestra.ubicación;
        template.querySelector("#p2").textContent = muestra.nombre_plat;
        // Esta es el url de la imagen alternativa que se mostrará cuando el ancho de pantalla sea menor a 992px. Para disminuir tiempos de carga pasar muestrasDestacadas_sm en lugar de muestrasDestacadas_md 
        template.querySelector("source").srcset = muestrasDestacadas_md[index].url_img;

        // Clonamos la plantilla. CloneNode es útil se desea crear copias de nodos existentes en el DOM sin afectar al nodo original
        const clone = template.cloneNode(true);
        
        // Agregamos el nodo clonado al fragmento creado anteriormente
        fragment.appendChild(clone);

    });

    // Agregamos la clase "active" al primer elemento creado dinámicamente. Caso contrario el carrusel no funcionará adecuadamente!!!
    fragment.querySelector("div").classList.add("active");

    // Por último, agregamos el fragmento con todas las tarjetas al nodo HTML especificado
    htmlNode.appendChild(fragment);

};

// Insertamos (pintamos) las tarjetas llamando a la función insertCard. Le pasamos como argumento el elemento html contenedor
insertCard(contenedorTarjetas);


// ------------------------------------------------- Eventos ---------------------------------------------------------------------


btnPresupuesto.addEventListener("click", function() {
    window.location.href = "paginas/presupuesto.html";
});


btnPresupuestoSmall.addEventListener("click", function() {
    window.location.href = "paginas/presupuesto.html";
});


btnGalería.addEventListener("click", function() {
    window.location.href = "paginas/galería.html";
});


btnGaleríaSmall.addEventListener("click", function() {
    window.location.href = "paginas/galería.html";
});


for (let i = 0; i < botonesPagConst.length; i++) {
    botonesPagConst[i].addEventListener("click", function() {
        window.location.href = "paginas/construcción.html";
    });
}
