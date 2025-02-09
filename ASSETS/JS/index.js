// const input = document.querySelector("input")
// const btn = document.querySelector ("button")
// const list = document.querySelector("ul")

// const invitados = []

// btn.addEventListener("click" , () => {
//     if(input.value === "")return
// invitados.push(input.value)
// input.value = ""
// mostrar()

// })

// const mostrar = () => {
//     let template = ""
//     for (const invitado of invitados){

//         template += `<li>${invitado}</li>`
//     }
//     list.innerHTML = template
// }

// actualizar();

const entradas = document.getElementById("entrada");
const listId = document.getElementById("lista1");
const listName = document.getElementById("lista2");
const btn = document.getElementById("agregar");
const cuenta = document.getElementById("contador");
const done = document.getElementById("realizadas");

// Define las tareas iniciales
let valores = [
    { id: Date.now(), nombre: "Trotar 30 min", completada: false },
    { id: Date.now() + 1, nombre: "tomar una siesta de 45 min", completada: true }, // Ejemplo completada
    { id: Date.now() + 2, nombre: "hacer mercado", completada: false }
];

function actualizar() {
    listName.innerHTML = valores.map(valor =>
        `<li>
            <label for="check-${valor.id}">${valor.nombre}</label>
            <input class="ele2" type="checkbox" id="check-${valor.id}" ${valor.completada ? 'checked' : ''} onchange="actualizarCompletada(${valor.id}, this.checked)">
            <button class='li2' onclick="eliminarTarea(${valor.id})">X</button>
        </li>`).join('');
    listId.innerHTML = valores.map(valor => `<li>${valor.id}</li>`).join('');

    cuenta.textContent = `Total: ${valores.length}`;
    actualizarContadorRealizadas();
}

function actualizarCompletada(id, completada) {
    const tarea = valores.find(t => t.id === id);
    if (tarea) {
        tarea.completada = completada;
        actualizarContadorRealizadas();
    }
}

function actualizarContadorRealizadas() {
    const realizadas = valores.filter(valor => valor.completada).length;
    done.textContent = `Realizadas: ${realizadas}`;
}

function eliminarTarea(id) {
    valores = valores.filter(tarea => tarea.id !== id);
    actualizar();
}

btn.addEventListener('click', () => {
    const tareaNombre = entradas.value.trim();

    if (tareaNombre === "") {
        alert("Por favor, ingresa una nueva Tarea");
        return;
    }

    const tarea = { id: Date.now(), nombre: tareaNombre, completada: false };
    valores.push(tarea);
    entradas.value = "";
    actualizar();
});

actualizar(); // Llama a actualizar para mostrar las tareas iniciales