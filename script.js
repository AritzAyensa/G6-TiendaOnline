function Producto(id, nombre,descripcion, precio, rutaImagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.rutaImagen = rutaImagen;
}
producto1 = new Producto(1, "Xiaomi Redmi Note 13 8/256GB Azul Libre", "descripcion1", "390€", "images/movil.jpg");
producto2 = new Producto(2, "PcCom Ready Intel Core i5-12400F / 32GB / 1TB SSD / RTX 4060 Ti + Windows 11 Home", "descripcion2", "900€", "images/pc.jpg");
producto3 = new Producto(3, "Nintendo Switch OLED Blanca + Mario Kart 8 Deluxe", "descripcion3", "290€", "images/nintendo.jpg");
producto4 = new Producto(4, 'Monitor LG UltraGear 24GS50F-B 23.7" LED VA FullHD 180Hz FreeSync', "descripcion4", "345€", "images/pantalla.jpg");
producto5 = new Producto(5, "Microsoft Xbox Series S 512GB Blanca", "descripcion5", "249€", "images/xBox.jpg");
producto6 = new Producto(6, "Logitech G PRO X SUPERLIGHT 2", "descripcion6", "180€", "images/raton.jpg");

let listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6];
let carrito = [];

localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
if (localStorage.getItem("carrito") == null) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}else{
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

function añadirProductoAlCarrito(idProducto){
    for (let index = 0; index < listaProductos.length; index++) {
        if(listaProductos[index].id == idProducto){
            carrito.push(listaProductos[index]);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            break;
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
        const contenidoPrecio = document.createTextNode(listaProductos[index].precio);
        

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