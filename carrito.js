let carritoDOM = document.getElementById("cart-items");
function Producto(id, nombre, descripcion, precio, rutaImagen, cantidadEnCarrito) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.rutaImagen = rutaImagen;
    this.cantidadEnCarrito = cantidadEnCarrito;
}

function ListarProductos() {
    let listaProductos = RecibirProductos();
    for(let producto of listaProductos){
        CrearProducto(producto);
    }
    CalcularTotal();
}

function RecibirProductos(){
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    return carrito;    
}

function CrearProducto(producto){
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
    divCantidad.innerHTML = producto.cantidadEnCarrito;
    let divTotal = document.createElement("div");
    divTotal.classList.add("cart-item-total");
    precioTotal += (producto.precio * producto.cantidadEnCarrito);
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("remove-btn");
    botonEliminar.addEventListener("click", () => {
        EliminarProducto(producto, divProducto);
    });
    divTotal.innerHTML = `<p>${precioTotal}€</p>`;
    divProducto.appendChild(imgProducto);
    divProducto.appendChild(divProductoInfo);
    divProducto.appendChild(divPrecio);
    divProducto.appendChild(divCantidad);
    divProducto.appendChild(divTotal);
    divProducto.appendChild(botonEliminar);
    carritoDOM.appendChild(divProducto);
}

function EliminarProducto(producto, divProducto) {
    let productos = RecibirProductos();
    productos = productos.filter(item => item.id !== producto.id);
    localStorage.setItem('carrito', JSON.stringify(productos));
    carritoDOM.removeChild(divProducto);
    CalcularTotal();
}
function CalcularTotal(){
    let total_carrito = 0;
    let totales_carrito = document.querySelectorAll('.cart-item-total');
    for(let total of totales_carrito){
        let precio_txt = total.textContent;
        let precio = parseFloat(precio_txt.replace('€', ''));
        total_carrito += precio;
    }
    document.getElementById('total-price').innerHTML = total_carrito + "€";
}

function BorrarCarrito(){
    localStorage.removeItem('carrito');
    let carritoDOM = document.getElementById("cart-items");
    while(carritoDOM.firstChild){
        carritoDOM.removeChild(carritoDOM.firstChild);
    }
    document.getElementById('total-price').innerHTML = "0€";
}

ListarProductos();
