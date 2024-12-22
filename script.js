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
    const productos = [
      {
        id: 5,
        nombre: "Termo Termolar R-evolution",
        precio: "$64.792",
        imagen: "/img/termo " + 5 + ".webp",
        descripcion_corta:
            "Los termos Termolar son creados bajo el concepto de calidad e innovación, buscando atender a las más diversas necesidades. Acompañan la vida de las personas, su rutina, sumándole un plus de calidad a sus actividades diarias.",
        descripcion_larga:
            "R-Evolution es un termo 100% acero inoxidable, irrompible y de gran resistencia. Su estilo compacto y versátil es ideal para su uso en varios entornos.Con la calidad de los productos Termolar, presenta una conservación térmica diferenciada, que garantizará líquidos calientes o fríos por mucho más tiempo.",
        },
        {
          id: 6,
          nombre: "Termo Stanley Classic",
          precio: "$125.998",
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
const mostrarListadoProductos = () => {
  const contenedor = document.querySelector(".contenedor-flex");
  const items = contenedor.querySelectorAll(".item");

  items.forEach((item) => {
      const id = item.querySelector("button").id;
      const producto = {
          id: id,
          nombre: item.querySelector("h2").textContent,
          imagen: item.querySelector("img").src,
          descripcion_corta: item.querySelector("p").textContent,
          descripcion_larga: document.querySelector(`#descripcion-larga-${id}`).textContent
      };

      console.log(producto);

      // Agregar evento de clic al botón para cambiar la descripción
      item.querySelector("button").addEventListener("click", () => {
        item.querySelector("p").textContent = producto.descripcion_larga;
      });
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

          const descripcionCorta = document.createElement("p");
          descripcionCorta.textContent = producto.descripcion_corta;
  
          const descripcionLarga = document.createElement("p");
          descripcionLarga.id = `descripcion-larga-${producto.id}`;
          descripcionLarga.style.display = "none";
          descripcionLarga.textContent = producto.descripcion_larga;
  
          const precio = document.createElement("h3");
          precio.textContent = producto.precio;
  
          const boton = document.createElement("button");
          boton.textContent = "Ver descripcion completa";
          boton.id = producto.id;
  
          item.appendChild(titulo);
          item.appendChild(imagen);
          item.appendChild(descripcionCorta);
          item.appendChild(descripcionLarga);
          item.appendChild(precio);
          item.appendChild(boton);

          contenedor.appendChild(item);

          // Cambia la clase del contenedor para ajustar el diseño
          contenedor.classList.add("verMas");

          //borro el boton para que no generen de nuevo
          verMas.remove();

          // Agregar evento de clic al botón para cambiar la descripción
          boton.addEventListener("click", () => {
            descripcionCorta.textContent = producto.descripcion_larga;
          });
      });
  });
}


