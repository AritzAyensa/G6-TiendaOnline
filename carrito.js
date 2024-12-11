let carritoDOM = document.getElementById("cart");
let producto1 = new Producto(1, "producto1", "hola", 10, ruta1);
let producto2 = new Producto(1, "producto2", "hola", 100, ruta2);
let producto3 = new Producto(1, "producto3", "hola", 790, ruta3);
let producto4 = new Producto(1, "producto4", "hola", 550, ruta4);

let carrito = [producto1, producto2, producto3, producto4];
localStorage.setItem("carrito", JSON.stringify(carrito));
function Producto(id, nombre, descripcion, precio, rutaImagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.rutaImagen = rutaImagen;
}
function ListarProductos() {
    let listaProductos = RecibirProductos();
    for(let producto in  listaProductos){
        // let id = producto.id
        let cantidad = listaProductos.filter(producto => producto.id === producto.id).length;
        CrearProducto(producto, cantidad);
    }
    CalcularTotal();
}

function RecibirProductos(){
    let carrito = JSON.part(localStorage.getItem('Carrito'));
    return carrito;    
}

function CrearProducto(producto, cantidad){
    let precioTotal = 0;
    let divProducto = document.createElement("div");
    divProducto.classList.add("cart-item");
    let imgProducto = document.createElement("img");
    imgProducto.src = producto.rutaImagen;
    let divProductoInfo = document.createElement("div");
    divProductoInfo.classList.add("cart-item-info");
    divProductoInfo.innerHTML = `<strong>${producto.nombre}</strong><p>${producto.descripcion}</p>`;
    let divPrecio = document.createElement("div");
    divPrecio.classList.add("cart-item-price");
    divPrecio.innerHTML = `<p>${producto.precio}€</p>`;
    let divCantidad = document.createElement("div");
    divCantidad.classList.add("cart-item-quantity");
    divCantidad.innerHTML = cantidad;
    let divTotal = document.createElement("div");
    divTotal.classList.add("cart-item-total");
    precioTotal += (producto.precio * cantidad);
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("remove-btn");
    botonEliminar.addEventListener("click", () => {
        EliminarProducto(producto, cantidad, divProducto);
    });
    divTotal.innerHTML = `<p>${precioTotal}€</p>`;
    divProducto.appendChild(imgProducto);
    divProducto.appendChild(divProductoInfo);
    divProducto.appendChild(divPrecio);
    divProducto.appendChild(divCantidad);
    divProducto.appendChild(divTotal);
    carritoDOM.appendChild(divProducto);
}

function EliminarProducto(producto, cantidad, divProducto){
    let productos = RecibirProductos();
    let precioTotal = 0;
    if(cantidad < 1){
        carritoDOM.removeChild(divProducto);
        let indice = productos.findIndex(prod => prod.id === producto.id);
        carrito.splice(indice, 1);
        localStorage.setItem('Carrito', JSON.stringify(productos));
        CalcularTotal();
    }else{
        cantidad --;
        precioTotal = producto.precio*cantidad;
        divCantidad.textContent = cantidad;
        divTotal.textContent = precioTotal + "€";
    }
    CalcularTotal();
}
function CalcularTotal(){
    let total_carrito = 0;
    let totales_carrito = document.querySelectorAll('.cart-item-total');
    for(let total in totales_carrito){
        let precio_txt = total.textContent;
        let precio = parseFloat(precio_txt.replace('€', ''));
        total_carrito += precio;
    }
    document.getElementById('total-price').innerHTML = total + "€";
}

ListarProductos();