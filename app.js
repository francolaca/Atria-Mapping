
// ---------------------------------------------------Variables a utilizar----------------------------------------------------------


// Array de tarjetas de tamaño pequeño para pc, tablets y cel (las tarjetas se almacenan como objetos dentro de un array).
tarjetas_sm;

// Array que contiene solamente las tarjetas destacadas de tamaño pequeño
const tarjetasDestacadas_sm = tarjetas_sm.filter(tarjeta => tarjeta.destacado == "si");


// Array de tarjetas destacadas de tamaño grande para pc.
const tarjetasDestacadas_lg = changeImgSize(tarjetasDestacadas_sm,"lg");


// Array de tarjetas destacadas de tamaño medio para tablets y cel.
const tarjetasDestacadas_md = changeImgSize(tarjetasDestacadas_sm,"md");


// Contenedor de las tarjetas (las tarjetas se renderizaran dentro del elemento con id="contenedorTarjetas"). En este caso será el carrousel de imágenes
const contenedorTarjetas = document.querySelector("#contenedorTarjetas");


const btnPresupuesto = document.querySelector("#btnPresupuesto");
const btnPresupuestoSmall = document.querySelector("#btnPresupuestoSmall");
const btnGalería = document.querySelector("#btnGalería");
const btnGaleríaSmall = document.querySelector("#btnGaleríaSmall");
const botonesPagConst = document.querySelectorAll(".paginaConst");


// --------------------------------------------------- Funciones ---------------------------------------------------------------------

// La etiqueta picture de html nos permite mostrar una imagen guardada con diferentes tamaños según el tamaño del dispositivo de visualización.

// Suponiendo que:

// 0) Tenemos múltiples imágenes para mostrar
// 1) Las imagenes más grandes tienen un nombre con prefijo "lg-" y se guardan en una carpeta con sufijo "-lg"
// 2) Las imagenes de tamaño medio tienen un nombre con prefijo "md-" y se guardan en una carpeta con sufijo "-md"
// 3) Las imagenes de tamaño pequeño tienenn un nombre con prefijo "sm-" y se guardan en una carpeta con sufijo "-sm"
// 4) Las tres carpetas de imágenes deben estar guardadas en el mismo URL
// 4) Las imágenes para mostrar se guardadan como objetos en un Array
// 5) Los objetos del array tienen una propiedad "src" que contiene el url de la imagen a mostrar

// La siguiente función es útil para modificar el valor de la propiedad "src", es decir, el url de la imagen a mostrar. 
// Como parámetros se le debe pasar el array de terjetas, cuyo tamaño de imagen debe ser modificado y el nuevo tamaño en formato de texto ("md", "sm" o "lg")
// La función retorna un nuevo array de tarjetas con el tamaño de imagen ya modificado

function changeImgSize(cardsArray,newSize){

    const resizedCardsArray = cardsArray.map(card => {

        const src = card.src;

        // Utilizamos expresiones regulares para hacer el reemplazo
        const newSrc = src.replace(/(-sm|-md|-lg)/g, "-" + newSize).replace(/(sm-|md-|lg-)/g, newSize + "-");

        // Se crea un nuevo objeto utilizando el operador de propagación ...card para copiar las demás propiedades del objeto original, y se reemplaza la propiedad src con la nueva URL modificada.
        return { ...card, src: newSrc };
        
    });

    return resizedCardsArray;

}


// Encapsulamos el codigo suelto en funciones anónimas autoinvocada. Las razones por las que son útiles es porque permiten ejecutar código encapsulando variables al 
// entorno de la función ahorrando posibles errores.
(function (){

    // Como las imágenes del carrusel se crearán dinámicamente, tambien debemos crear dinámicamente los botones indicadores
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < tarjetasDestacadas_sm.length; index++) {
        
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


// Función que inserta tarjetas en un carrusel de bootstrap. La función recibe dos parámetros. Uno con el array de tarjetas y otro con el elemento contenedor
// Utilizamos una plantilla en html y un elemento fragment en js. Esta técnica tambien requiere el uso del método cloneNode. 
function insertCard(cardsArray, htmlNode){

    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-carousel-item").content;

    cardsArray.forEach(function(card,index){

        // Asignamos los valores correspondientes a cada elemento de la plantilla
        template.querySelector("img").src = card.src;
        template.querySelector("img").alt = card.alt;
        template.querySelector("h4").textContent = card.nombre;
        template.querySelector("#p1").textContent = card.fecha + " | " + card.ubicación;
        template.querySelector("#p2").textContent = card.fuente;
        // Esta es el url de la imagen alternativa que se mostrará cuando el ancho de pantalla sea menor a 992px. Para disminuir tiempos de carga pasar tarjetasDestacadas_sm en lugar de tarjetasDestacadas_md 
        template.querySelector("source").srcset = tarjetasDestacadas_md[index].src;

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

// Insertamos (pintamos) las tarjetas llamando a la función insertCard. Le pasamos como argumentos el array de tarjetas y el elemento html contenedor
// Para disminuir tiempos de carga pasar tarjetasDestacadas_md o tarjetasDestacadas_sm en lugar de tarjetasDestacadas_lg   
insertCard(tarjetasDestacadas_lg, contenedorTarjetas);


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
