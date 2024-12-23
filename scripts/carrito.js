// Recuperar el carrito del almacenamiento local
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});

// Muestra los productos en el carrito
const mostrarCarrito = () => {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = '<p>Tu carrito está vacio</p>';
        actualizarResumen();
        return;
    }

    carrito.forEach((item, indice) => {
        const producto = document.createElement("article");
        producto.classList.add("producto");
        producto.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen-producto">
            <h2>${item.nombre}</h2>
            <div class="cantidad">
                <button onclick="cambiarCantidad(${indice}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${indice}, 1)">+</button>
            </div>
            <p class="precio">$${item.precio * item.cantidad}</p>
            <button onclick="eliminarDelCarrito(${indice})">Eliminar</button>
        `;
        lista.appendChild(producto);
    });
    actualizarResumen();
};

// Cambia la cantidad de un producto en el carrito
const cambiarCantidad = (indice, cambio) => {
    carrito[indice].cantidad += cambio;
    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

// Actualiza el resumen del carrito
const actualizarResumen = () => {
    const totalProductos = document.getElementById("total-productos");
    const importeTotal = document.getElementById("importe-total");

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    totalProductos.textContent = totalCantidad;
    importeTotal.textContent = total;

    const botonCompra = document.querySelector("button[onclick='realizarCompra()']");
    const resumenCarrito = document.getElementById("resumen-carrito");
    resumenCarrito.appendChild(botonCompra);
};

// Elimina un producto del carrito
const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
};

// Simula la compra
const realizarCompra = () => {
    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
};