// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Guitarra Electrica',
        precio: 14000,
        imagen: '/MusicPro/img/guitarra-electrica-ibanez-grx70qa.jpg',
        descripcion:'producto de calidad en precio de contenido y bla bla bla',
        cantidad:30
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1,
        imagen: 'cebolla.jpg',
        descripcion:'',
        cantidad:5
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2,
        imagen: 'calabacin.jpg',
        descripcion:'',
        cantidad:5
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 9,
        imagen: 'fresas.jpg',
        descripcion:'jjj',
        cantidad:5
    },

    {
        id: 1,
        nombre: 'Guitarra Electrica',
        precio: 14000,
        imagen: '/MusicPro/img/guitarra-electrica-ibanez-grx70qa.jpg',
        descripcion:'producto de calidad en precio de contenido y bla bla bla',
        cantidad:30
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1,
        imagen: 'cebolla.jpg',
        descripcion:'',
        cantidad:5
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2,
        imagen: 'calabacin.jpg',
        descripcion:'',
        cantidad:5
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 9,
        imagen: 'fresas.jpg',
        descripcion:'jjj',
        cantidad:5
    }

];

let carrito = [];
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#list_carr');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('tarjeta');
 
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('cuerpoT');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('tituloT');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img_product');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('h2');
        miNodoPrecio.classList.add('priceT');
        miNodoPrecio.textContent = `$ ${info.precio}`;
        // Descripcion
        const miNodoDescr = document.createElement('p');
        miNodoDescr.classList.add('descriptionT');
        miNodoDescr.textContent = info.descripcion;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
    
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoDescr);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('listado');
        miNodo.textContent = `${numeroUnidadesItem} x $ ${miItem[0].precio}  ${miItem[0].nombre}  `;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn_borrar');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();