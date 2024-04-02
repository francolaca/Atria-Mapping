
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
function insertCard1(cardsArray, htmlNode){

    // Recorremos el array de tarjetas con un ciclo forEach
    cardsArray.forEach(function(card){

        // Tenemos varias opciones:
        // 1) Técnica utilizando innerHtml - Opción menos eficiente (requiere más recursos por parte del navegador para interpretar el texto y a partir de allí crear los elementos) pero más cómoda (requiere menos líneas de código, basicamente es un copy and paste de una prción del html)

        htmlNode.innerHTML += `<div class="tarjeta-imagen col-sm-12 col-md-6 col-lg-4 p-3 d-flex flex-column">
                                    <img src=${card.src} height=300 alt="` + card.alt + `" class="w-100 rounded"> 
                                    <h3 class="fw-semibold m-2">${card.nombre}</h3>
                                    <p class="fs-6 mx-2 mb-1">${card.fecha} | ${card.ubicación}</p>
                                    <p class="fs-6 mx-2 mb-1">${card.fuente}</p>
                                </div>`;

        // 2) Método utilizando createElemet, appendChild, classList.add, etc - Opción más eficiente (requiere menos recursos por parte del navegador) pero más tediosa (requiere muchas más líneas de código)

        const div = document.createElement("div");
        div.classList.add("tarjeta-imagen", "col-sm-12", "col-md-6", "col-lg-4", "p-3", "d-flex", "flex-column");
        const img = document.createElement("img");
        img.src=card.src;
        img.height=300;
        img.alt=card.alt;
        img.classList.add("w-100", "rounded");
        const h3 = document.createElement("h3");
        h3.classList.add("fw-semibold", "m-2");
        h3.textContent = card.nombre;
        const p1 = document.createElement("p");
        p1.classList.add("fs-6", "mx-2", "mb-1");
        p1.textContent = card.fecha + " | " + card.ubicación;
        const p2 = document.createElement("p");
        p2.classList.add("fs-6", "mx-2", "mb-1");
        p2.textContent = card.fuente;

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p1);
        div.appendChild(p2);

        htmlNode.appendChild(div);

        // Estas técnicas son las menos eficientes de todas ya que por cada vuelta del ciclo for, el navegador procesa y renderiza la página web nuevamente, siendo este uno de los procesos más lentos (se generan problemas de "reflow")
        
    });

};


// Para evitar este "reflow" existen dos técnicas superadoras de las anteriores:
// 3) Técnica utilizando un string, el cual irá incorporando, con cada paso del ciclo for, el texto necesario. Una vez concluido el ciclo, se le pasa esta cadena de texto al método innerHtml del elemento contenedor. 
function insertCard2(cardsArray, htmlNode){

    let textTemplate = "";

    cardsArray.forEach(function(card){

        textTemplate += `<div class="tarjeta-imagen col-sm-12 col-md-6 col-lg-4 p-3 d-flex flex-column">
                            <img src=${card.src} height=300 alt="` + card.alt + `" class="w-100 rounded"> 
                            <h3 class="fw-semibold m-2">${card.nombre}</h3>
                            <p class="fs-6 mx-2 mb-1">${card.fecha} | ${card.ubicación}</p>
                            <p class="fs-6 mx-2 mb-1">${card.fuente}</p>
                            <div class="text-end mt-auto p-2">
                                <button type="button" id="btnSeleccionar-${card.id}" class="button--dark p-2" ><strong>AGREGAR</strong></button>
                                <button type="button" id="btnDescargar-${card.id}" class="button--dark p-2"><strong>DESCARGAR</strong></button>
                            </div>
                        </div>`;

    });

    htmlNode.innerHTML = textTemplate;

    // Una vez generado el nodo HTML en el documento podemos crear los eventos para los botones
    cardsArray.forEach(function(card){

        btn1 = document.getElementById(`btnSeleccionar-${card.id}`);

        // Llamamos a la función agregar al carrito
        addToCart(btn1, tarjetasGalería, imágenesSeleccionadas, cantidadImágenes);

    });

};


// 4) Técnica utilizando un fragmento (document.createDocumentfragment) para ir construyendo (createElemet, appendChild, classList.add, etc) con cada paso del ciclo for, la estructura necesaria del elemento html. Una vez concluido el ciclo, se le pasa este fragmento al método appenChild del elemento contenedor.
function insertCard3(cardsArray, htmlNode){

    const fragment = document.createDocumentFragment();

    cardsArray.forEach(function(card){

        const div = document.createElement("div");
        div.classList.add("tarjeta-imagen", "col-sm-12", "col-md-6", "col-lg-4", "p-3", "d-flex", "flex-column");
        const img = document.createElement("img");
        img.src=card.src;
        img.height=300;
        img.alt=card.alt;
        img.classList.add("w-100", "rounded");
        const h3 = document.createElement("h3");
        h3.classList.add("fw-semibold", "m-2");
        h3.textContent = card.nombre;
        const p1 = document.createElement("p");
        p1.classList.add("fs-6", "mx-2", "mb-1");
        p1.textContent = card.fecha + " | " + card.ubicación;
        const p2 = document.createElement("p");
        p2.classList.add("fs-6", "mx-2", "mb-1");
        p2.textContent = card.fuente;
        const divBtns = document.createElement("div");
        divBtns.classList.add("text-end", "mt-auto", "p-2");
        const btn1 = document.createElement("button");
        btn1.id = "btnSeleccionar-" + card.id;
        btn1.classList.add("button--dark", "p-2");
        const strong1 = document.createElement("strong");
        strong1.textContent = "AGREGAR";
        const btn2 = document.createElement("button");
        btn2.id = "btnDescargar-" + card.id;
        btn2.classList.add("button--dark", "p-2");
        const strong2 = document.createElement("strong");
        strong2.textContent = "DESCARGAR";

        btn1.appendChild(strong1);
        btn2.appendChild(strong2);
        divBtns.append(btn1, btn2);
        div.append(img, h3, p1, p2, divBtns);

        fragment.appendChild(div);

        // Llamamos a la función agregar al carrito
        addToCart(btn1, tarjetasGalería, imágenesSeleccionadas, cantidadImágenes);

    });

    htmlNode.appendChild(fragment);

};


// Al igual que antes, la técnica 4 es más eficiente pero a la vez más tediosa que la 3 (midiendo tiempos de ejecucion 3 es mas rapida que 4 asique no se si es tan así  ->  SEGUIR INVESTIGANDO).        

// 5) Técnica utilizando una plantilla en html y un elemento fragment en js. Esta técnica nos permite escribir menos codigo y se ejecuta más rápido que la 4 (pero no estoy seguro si más rápido que la 3 -> SEGUIR INVESTIGANDO) pero tambien requiere el uso del método cloneNode. 
function insertCard4(cardsArray, htmlNode){

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
insertCard4(tarjetasGalería, contenedorTarjetas);







