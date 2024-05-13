
// --------------------------------------------------- Variables ---------------------------------------------------------------------


// Array de tarjetas (las tarjetas se almacenan como objetos dentro de un array, nuestra base de datos)
const tarjetasGalería = tarjetas_sm;

// Contenedor de las tarjetas (las tarjetas se renderizaran dentro del elemento con id="contenedorTarjetas")
const contenedorTarjetas = document.querySelector("#contenedorTarjetas");

// Array que contendrá las imágenes seleccionadas por el usuario para descargar (funciona similar a un carrito de compras)
const imágenesSeleccionadas = [];

// Array de cantidades de productos en el carrito  
const cantidadImágenes = [];

// ------------------------------------------------- Funciones ---------------------------------------------------------------------


// Función que inserta tarjetas en un archivo .html. La función recibe dos parámetros. Uno para el array de tarjetas y el otro para el elemento contenedor
// Técnica utilizando una plantilla en html y un elemento fragment en js y que tambien requiere el uso del método cloneNode (SEGUIR INVESTIGANDO). 
function insertCard(cardsArray, htmlNode){

    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#template-tarjeta").content;

    const imgTemplate = template.querySelector("img");
    const h3Template = template.querySelector("h3");
    const p1Template = template.querySelector("#p1");
    const p2Template = template.querySelector("#p2");
    const btnSeleccionarTemplate = template.querySelectorAll("button")[0];
    const btnDescargarTemplate = template.querySelectorAll("button")[1];

    cardsArray.forEach(function(card){

        // Asignamos los valores correspondientes a cada elemento de la plantilla
        imgTemplate.src = card.src;
        imgTemplate.alt = card.alt;
        h3Template.textContent = card.nombre;
        p1Template.textContent = card.fecha + " | " + card.ubicación;
        p2Template.textContent = card.fuente;
        btnSeleccionarTemplate.id = "btnSeleccionar-" + card.id;
        btnDescargarTemplate.id = "btnDescargar-" + card.id;

        // Clonamos la plantilla. CloneNode es útil se desea crear copias de nodos existentes en el DOM sin afectar al nodo original
        const clone = template.cloneNode(true);
        
        // NOTA: cloneNode no copia los manejadores de eventos ni la asociación con los mismos. Es decir, si el nodo original tiene eventos asociados, la copia no los tendrá. 
        // Para que los botones funcionen correctamente se deben asignar los eventos después de clonar la plantilla pero antes de agregarla al fragmento.
        const botonSeleccionarClonado = clone.getElementById(`btnSeleccionar-${card.id}`);        
        const botonDescargarClonado = clone.getElementById(`btnDescargar-${card.id}`);

        // Llamamos a la función agregar al carrito (esta función le agrega un evento al botón)
        addToCart(botonSeleccionarClonado, tarjetasGalería, imágenesSeleccionadas, cantidadImágenes);
        
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
        const productoSeleccionado = productos.find(product => product.id == idProductoSeleccionado);
    
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


// Insertamos (pintamos) las tarjetas llamando a la función insertCard. Le pasamos como argumentos el array de tarjetas y el elemento html contenedor  
insertCard(tarjetasGalería, contenedorTarjetas);







