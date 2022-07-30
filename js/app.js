//Variables
const campoTarea = document.querySelector("#tarea");
const formulario = document.querySelector("#formulario");
let arregloTarea = [];
const listaTarea = document.querySelector("#lista-tareas");


//Eventos
cargarEventos();
function cargarEventos() {
    formulario.addEventListener("submit", agregarTarea);

    document.addEventListener("DOMContentLoaded", () => {
        arregloTarea = JSON.parse(localStorage.getItem("tareas")) || [];
        mostrarTareasHTML();
    })

};


//Funciones
function agregarTarea(e) {
    e.preventDefault();

    const tarea = campoTarea.value;

    if (tarea == "") {
        mostrarMensaje("Introduce una Tarea", "error");
    } else {
        mostrarMensaje("Tarea agregado con exito", "correcto");
        formulario.reset();

        const newTarea = {
            nuevoTarea: tarea,
            id: Date.now()
        }

        arregloTarea = [...arregloTarea, newTarea];

        mostrarTareasHTML();
    }

}

//Funcion que muestra mensaje 
function mostrarMensaje(mensaje, tipoMensaje) {
    const mensajeHTML = document.createElement("p");
    mensajeHTML.textContent = mensaje;

    if (tipoMensaje == "error") {
        mensajeHTML.classList.add("error")
    } else {
        mensajeHTML.classList.add("correcto")
    }

    const errores = document.querySelectorAll(".error");
    const correcto = document.querySelectorAll(".correcto");

    if (errores.length == 0 && correcto.length == 0) {
        formulario.appendChild(mensajeHTML);
    }

    setTimeout(() => {
        mensajeHTML.remove();
    }, 3000);


}

function mostrarTareasHTML() {

    limpiarHTML();

    arregloTarea.forEach(tarea => {
        const nuveotareaHTML = document.createElement("li");
        nuveotareaHTML.textContent = tarea.nuevoTarea;

        const btnBorrar = document.createElement("a");
        btnBorrar.textContent = "BORRAR";
        btnBorrar.classList.add("borrar-tarea");

        //Le damos la funcion al boton
        btnBorrar.onclick = function () {
            borrarTarea(tarea.id);
        }

        nuveotareaHTML.appendChild(btnBorrar);
        listaTarea.appendChild(nuveotareaHTML);
    });

    //Sincronizar LocalStorage
    localStorage.setItem("tareas", JSON.stringify(arregloTarea));
}

function limpiarHTML() {
    while (listaTarea.firstChild) {
        listaTarea.removeChild(listaTarea.firstChild);
    }
}


function borrarTarea(tareaId) {

    arregloTarea = arregloTarea.filter((tarea) => {
        return tarea.id != tareaId;
    });

    mostrarTareasHTML();
}