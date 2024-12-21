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
});

//PRODUCTOS
//creo los productos en json y los guardo en la lista para retornarla
function listaProductos() {
    const productos = [];
    for (let i = 5; i <= 6; i++) {
        const producto = {
        id: i,
        nombre: "Producto " + i,
        precio: Math.round(Math.random() * 55000),
        imagen: "/img/termo " + i + ".webp",
        descripcion_corta:
            "Termo de acero inoxidable de 1 litro, ideal para mantener tus bebidas a la temperatura ideal por más tiempo. Diseño elegante y duradero. Perfecto para llevar a cualquier lugar",
        descripcion_larga:
            "Nuestro termo de acero inoxidable de 1 litro es el compañero perfecto para tu día a día. Fabricado con materiales de alta calidad, este termo cuenta con una doble pared de acero inoxidable que proporciona un aislamiento superior, manteniendo tus bebidas calientes por hasta 24 horas y frías por hasta 24 horas. Su diseño elegante y moderno lo hace ideal para cualquier ocasión, ya sea en la oficina, en el gimnasio o durante una aventura al aire libre. Además, su tamaño compacto y ligero lo hacen fácil de transportar.",
        };
        productos.push(producto);
    }
    return productos;
}

//PRODUCTOS NUEVOS EN CONSOLA
listaProductos().forEach((producto) => {
  console.log(producto);
});

// MOSTRAR LISTADO PRODUCTOS YA CREADOS
const mostrarListadoProductos = () => {
  const contenedor = document.querySelector(".contenedor-flex");
  const items = contenedor.querySelectorAll(".item");

  items.forEach((item) => {
      const producto = {
          id: item.querySelector("button").id,
          nombre: item.querySelector("h2").textContent,
          imagen: item.querySelector("img").src
      };

      console.log(producto);
  });
};

//GENERAR PRODUCTOS EN PAGINA
function generarProductosNuevos(){
    const verMas = document.querySelector("#verMas")
    verMas.addEventListener('click', () => {
      const contenedor = document.querySelector(".contenedor-flex");

      //itero cada producto y creo un item para cada uno.
      listaProductos().forEach((producto) => {
          const item = document.createElement("div");
          item.classList.add("item");

          const titulo = document.createElement("h2");
          titulo.textContent = producto.nombre;

          const imagen = document.createElement("img");
          imagen.src = producto.imagen;
          imagen.alt = producto.nombre;

          const boton = document.createElement("button");
          boton.textContent = "Ver descripcion";
          boton.id = producto.id;

          item.appendChild(titulo);
          item.appendChild(imagen);
          item.appendChild(boton);

          contenedor.appendChild(item);

          // Cambia la clase del contenedor para ajustar el diseño
          contenedor.classList.add("verMas");

          //borro el boton para que no generen de nuevo
          verMas.remove();
      });
  });
}


