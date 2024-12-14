function Producto(id, nombre,descripcion, precio, rutaImagen, cantidadEnCarrito) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.rutaImagen = rutaImagen;
    this.cantidadEnCarrito = cantidadEnCarrito;
    this.sumarCantidad = function(){
        cantidadEnCarrito  +1;
    }
}
producto1 = new Producto(1, "Xiaomi Redmi Note 13 8/256GB Azul Libre", "Smartphone con cámara de 108 MP, pantalla de 6.7' y almacenamiento de 256 GB.", 390, "images/movil.jpg", 0);
producto2 = new Producto(2, "PcCom Ready Intel Core i5-12400F", "PC gaming de alto rendimiento con procesador Intel i5, 32 GB de RAM y tarjeta gráfica RTX 4060 Ti.", 900, "images/pc.jpg", 0);
producto3 = new Producto(3, "Nintendo Switch OLED Blanca + Mario Kart 8 Deluxe", "Consola híbrida Nintendo Switch OLED con pantalla de 7' y el juego Mario Kart 8 Deluxe.", 290, "images/nintendo.jpg", 0);
producto4 = new Producto(4, 'Monitor LG UltraGear 24GS50F-B 23.7" LED VA FullHD 180Hz FreeSync', "Monitor gamer con resolución Full HD y tasa de refresco de 180Hz, ideal para juegos rápidos.", 345, "images/pantalla.jpg", 0);
producto5 = new Producto(5, "Microsoft Xbox Series S 512GB Blanca", "Consola de videojuegos compacta con 512 GB de almacenamiento, ideal para juegos de última generación.", 249, "images/xBox.jpg", 0);
producto6 = new Producto(6, "Logitech G PRO X SUPERLIGHT 2", "Ratón gaming ultraligero de alto rendimiento con sensor preciso, diseñado para jugadores profesionales.", 180, "images/raton.jpg", 0);

let listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6];
var carrito = []

localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
if (localStorage.getItem("carrito") == null) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}else{
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

function añadirProductoAlCarrito(idProducto){
    for (let index = 0; index < listaProductos.length; index++) {
        if(listaProductos[index].id == idProducto){
            if(listaProductos[index].cantidadEnCarrito == 0){
                listaProductos[index].cantidadEnCarrito ++;
                carrito.push(listaProductos[index]);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                break; 
            }else{
                carrito[carrito.indexOf(listaProductos[index])].cantidadEnCarrito ++;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                break; 
            }
            
        }
    }
    console.log(JSON.parse(localStorage.getItem("carrito")))
}
window.addEventListener("load", cargarProductos);

function cargarProductos(){
    for (let index = 0; index < listaProductos.length; index++) {
        const div = document.createElement("div");
        div.className = "product-card";
        const imagen = document.createElement("img");
        imagen.src = listaProductos[index].rutaImagen;
        imagen.alt = listaProductos[index].nombre;
        div.appendChild(imagen);
        const nombre = document.createElement("h3");
        const contenidoNombre = document.createTextNode(listaProductos[index].nombre);
        nombre.appendChild(contenidoNombre);
        div.appendChild(nombre);

        const descripcion = document.createElement("p");
        const contenidoDescripcion = document.createTextNode(listaProductos[index].descripcion);
        descripcion.appendChild(contenidoDescripcion);
        div.appendChild(descripcion);

        const precio = document.createElement("p");
        const contenidoPrecio = document.createTextNode(listaProductos[index].precio +"€");
        

        precio.appendChild(contenidoPrecio);
        precio.className= "price";
        div.appendChild(precio);

        const boton = document.createElement("button");
        const contenidoBoton = document.createTextNode("Añadir al carrito");
        boton.appendChild(contenidoBoton);
        boton.className = "boton-añadir"
        boton.addEventListener('click', () => añadirProductoAlCarrito(listaProductos[index].id));
        div.appendChild(boton)
        

        document.getElementById("product-grid").appendChild(div);
        
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedorCarrusel = document.querySelector('.carousel-container');
    const elementosCarrusel = document.querySelectorAll('.carousel-item');
    const botonAnterior = document.querySelector('.carousel-button.prev');
    const botonSiguiente = document.querySelector('.carousel-button.next');

    let indiceActual = 0;

    // Función para actualizar la posición del carrusel
    function actualizarCarrusel() {
        const desplazamiento = -indiceActual * 100; // Calculamos el desplazamiento en porcentaje
        contenedorCarrusel.style.transform = `translateX(${desplazamiento}%)`;
    }

    // Evento para el botón "anterior"
    botonAnterior.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + elementosCarrusel.length) % elementosCarrusel.length; // Ajustamos el índice
        actualizarCarrusel();
    });

    // Evento para el botón "siguiente"
    botonSiguiente.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % elementosCarrusel.length; // Ajustamos el índice
        actualizarCarrusel();
    });
});
