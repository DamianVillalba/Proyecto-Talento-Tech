//VALIDACION DE FORMULARIO
//Creo la funcion para validar el formulario
function validarFormulario() {
  const entrada = document.querySelectorAll("input");

  let completos = true;
  entrada.forEach((input) => {
    if (!input.value.trim()) {
      //si el valor es vacio quitando los espacios, cambia el valor de la bandera
      completos = false;
    }
  });

  if (completos) {
    console.log("El formulario esta completo");
  } else {
    console.log("El formulario esta incompleto");
  }
}

//Genero el evento para que valide el formulario cada vez que se envie
document.addEventListener("DOMContentLoaded", () => {
  //formulario
  const formulario = document.querySelector("#contact");
  formulario.addEventListener("submit", validarFormulario);

  //productos nuevos
  generarProductosNuevos()

  //mostrar productos agregados
  mostrarListadoProductos();

  // carga el contador del carrito al cargar la página
  actualizarContador();
});

//PRODUCTOS
//creo los productos en json y los guardo en la lista para retornarla
function listaProductos() {
    const productos = [
      {
        id: 5,
        nombre: "Termo Termolar R-evolution",
        precio: 64792,
        imagen: "/img/termo " + 5 + ".webp",
        descripcion_corta:
            "Los termos Termolar son creados bajo el concepto de calidad e innovación, buscando atender a las más diversas necesidades. Acompañan la vida de las personas, su rutina, sumándole un plus de calidad a sus actividades diarias.",
        descripcion_larga:
            "R-Evolution es un termo 100% acero inoxidable, irrompible y de gran resistencia. Su estilo compacto y versátil es ideal para su uso en varios entornos.Con la calidad de los productos Termolar, presenta una conservación térmica diferenciada, que garantizará líquidos calientes o fríos por mucho más tiempo.",
        },
        {
          id: 6,
          nombre: "Termo Stanley Classic",
          precio: 125998,
          imagen: "/img/termo " + 6 + ".webp",
          descripcion_corta:
              "El termo Stanley destaca por su diseño elegante y durabilidad, manteniendo las bebidas calientes por 40 horas y frías por 45. Su robustez garantiza un rendimiento térmico prolongado",
          descripcion_larga:
              "La palabra que viene a la mente es icónico: diseño elegante, construcción robusta y una actitud indescriptible. Totalmente a prueba de fugas y capaz de mantener las bebidas calientes durante 40 horas, frías durante 45 horas o con hielo durante 6 días. Con el termo Stanley nunca tendrás que preocuparte de que el agua se enfríe o que tu bebida se caliente. Gracias a su pared externa de acero grueso obtendrás un rendimiento térmico que te durará a través de los años.",
        }
    ];
    return productos;
}

//PRODUCTOS NUEVOS EN CONSOLA
listaProductos().forEach((producto) => {
  console.log(producto);
});

// MOSTRAR LISTADO PRODUCTOS YA CREADOS
function mostrarListadoProductos() {
  const contenedor = document.querySelector(".contenedor-flex");
  const items = contenedor.querySelectorAll(".item");

  items.forEach((item) => {
      const id = item.querySelector("button").id;
      const producto = {
          id: id,
          nombre: item.querySelector("h2").textContent,
          imagen: item.querySelector("img").src,
          descripcion_corta: item.querySelector("p").textContent,
          descripcion_larga: item.querySelector(`#descripcion-larga-${id}`).textContent,
          precio: item.querySelector(".precio").textContent
      };

      console.log(producto);

      // Agregar evento de clic al botón para cambiar la descripción
      item.querySelector(".ver-descripcion").addEventListener("click", () => {
        item.querySelector("p").textContent = producto.descripcion_larga;
      });
  });
};

//GENERAR PRODUCTOS EN PAGINA
function generarProductosNuevos(){
    const verMas = document.querySelector("#verMas")
    verMas.addEventListener('click', () => {
      const contenedor = document.querySelector(".contenedor-flex");

      //itero cada producto y creo un "item" para cada uno.
      listaProductos().forEach((producto) => {
          const item = document.createElement("div");
          item.classList.add("item");

          const titulo = document.createElement("h2");
          titulo.textContent = producto.nombre;

          const imagen = document.createElement("img");
          imagen.src = producto.imagen;
          imagen.alt = producto.nombre;

          const descripcionCorta = document.createElement("p");
          descripcionCorta.textContent = producto.descripcion_corta;
  
          const descripcionLarga = document.createElement("p");
          descripcionLarga.id = `descripcion-larga-${producto.id}`;
          descripcionLarga.style.display = "none";
          descripcionLarga.textContent = producto.descripcion_larga;
  
          const precio = document.createElement("h3");
          precio.className = "precio";
          precio.textContent = `$${producto.precio}`;

          const divBotones = document.createElement("div");
          divBotones.className = "productos-botones";
  
          const descripcionB = document.createElement("button");
          descripcionB.textContent = "Ver descripcion completa";
          descripcionB.id = producto.id;
          descripcionB.className = "ver-descripcion";

          const carritoB = document.createElement("button");
          carritoB.textContent = "Agregar al carrito";
          carritoB.className = "agregar-carrito"
          carritoB.onclick = () => agregarAlCarrito(producto.nombre,producto.precio,producto.imagen) //agrego funcionalidad boton carrito

          //agrego los elementos al producto
          item.appendChild(titulo);
          item.appendChild(imagen);
          item.appendChild(descripcionCorta);
          item.appendChild(descripcionLarga);
          item.appendChild(precio);

          //agrego el div de botones al producto junto sus botones
          item.appendChild(divBotones);
          divBotones.appendChild(descripcionB);
          divBotones.appendChild(carritoB);

          //agrego el producto al contenedor de los productos
          contenedor.appendChild(item);

          // Cambia la clase del contenedor para ajustar el diseño
          contenedor.classList.add("verMas");

          //borro el boton para que no generen de nuevo
          verMas.remove();

          // Agregar evento de clic al botón para cambiar la descripción
          descripcionB.addEventListener("click", () => {
            descripcionCorta.textContent = producto.descripcion_larga;
          });
      });
  });
}

//CARRITO
// Recupera el carrito del localStorage o inicializa uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre,precio,imagen){
    const productoExistente = carrito.find(producto => producto.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
    }
    actualizarContador()
    alert(`Agregaste: ${nombre} al carrito`)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

//actualizar el contador del carrito
function actualizarContador(){
  document.getElementById("contador-carrito").textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
}

// Guarda el contenido del carrito antes de que la página se recargue o se cierre
window.addEventListener("beforeunload",()=>{
  localStorage.setItem("carrito",JSON.stringify(carrito))
});