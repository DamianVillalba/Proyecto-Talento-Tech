//VALIDACION DE FORMULARIO
//Creo la funcion para validar el formulario
function validarFormulario() {
    const entrada = document.querySelectorAll("input");

    let completos = true;
    entrada.forEach((input) => {
        if (!input.value.trim()) { //si el valor es vacio quitando los espacios, cambia el valor de la bandera
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
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector("#contact");
    formulario.addEventListener("submit", validarFormulario);
});


//PRODUCTOS EN CONSOLA
const productos = [];
for(let i = 0; i < 5; i++){
    const producto = {
        id: i+1,
        nombre: "Producto " + (i+1),
        precio: Math.round(Math.random()*55000),
        descripcion_corta: "Termo de acero inoxidable de 1 litro, ideal para mantener tus bebidas a la temperatura ideal por más tiempo. Diseño elegante y duradero. Perfecto para llevar a cualquier lugar",
        descripcion_larga: "Nuestro termo de acero inoxidable de 1 litro es el compañero perfecto para tu día a día. Fabricado con materiales de alta calidad, este termo cuenta con una doble pared de acero inoxidable que proporciona un aislamiento superior, manteniendo tus bebidas calientes por hasta 24 horas y frías por hasta 24 horas. Su diseño elegante y moderno lo hace ideal para cualquier ocasión, ya sea en la oficina, en el gimnasio o durante una aventura al aire libre. Además, su tamaño compacto y ligero lo hacen fácil de transportar."
    }
    productos.push(producto);
}

productos.forEach((producto) => {
    console.log(producto);
})

