function Producto(id, nombre,descripcion, precio, rutaImagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.rutaImagen = rutaImagen;
}
producto1 = new Producto(1, "Xiaomi Redmi Note 13 8/256GB Azul Libre", "descripcion1", 390, "movil.jpg");
producto2 = new Producto(2, "PcCom Ready Intel Core i5-12400F / 32GB / 1TB SSD / RTX 4060 Ti + Windows 11 Home", "descripcion2", 900, "pc.jpg");
producto3 = new Producto(3, "Nintendo Switch OLED Blanca + Mario Kart 8 Deluxe", "descripcion3", 290, "nintendo.jpg");
producto4 = new Producto(4, 'Monitor LG UltraGear 24GS50F-B 23.7" LED VA FullHD 180Hz FreeSync', "descripcion4", 345, "pantalla.jpg");
producto5 = new Producto(5, "Microsoft Xbox Series S 512GB Blanca", "descripcion5", 249, "xBox.jpg");
producto6 = new Producto(6, "Logitech G PRO X SUPERLIGHT 2", "descripcion6", 180, "raton.jpg");

let listaProductos = [producto1, producto2, producto3, producto4, producto5, producto6];
let carrito = [];

localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
if (localStorage.getItem("carrito") == null) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}else{
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

function añadirProductoAlCarrito(idProducto){
    for (const producto in listaProductos) {
        if(producto.id == idProducto){
            carrito.add(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            break;
        }
    }
}


function cargarProductos(){
    for (const producto in listaProductos) {
        
    }
}