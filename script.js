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


