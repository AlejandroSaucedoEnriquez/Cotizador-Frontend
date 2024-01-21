window.onload = function () {
    setTimeout(() => {

    }, 2000);
    listarClientes();
}

function refrescar() {
    location.reload();
}

let listarClientes = async () => {
    const peticion = await fetch("http://localhost:8080/clientes",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    const clientes = await peticion.json();

    let contenidoTabla = "";

    for (let cliente of clientes) {
        let contenidoFila = `<tr>
    <td>${cliente.id}</td>
    <td>${cliente.nombre}</td>
    <td>${cliente.apellido}</td>
    <td>${cliente.direccion}</td>
    <td>${cliente.email}</td>
    <td>${cliente.telefono}</td>
    <td>
    <i onClick="editarCliente(${cliente.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarCliente(${cliente.id})" class="material-icons button delete">delete</i>
    <i onClick="addCliente(${cliente.id})" class="material-icons button add_circle">add_circle</i>
    </td>
    </tr>
    `

        contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;
}

let borrarCliente = async (id) => {
    const peticion = await fetch("http://localhost:8080/clientes/" + id,
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    listarClientes();

}


let idEditar;

let editarCliente = async (id) => {


    mostrarCliente();

    idEditar = id;

    const peticion = await fetch("http://localhost:8080/clientes/" + id,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    const cliente = await peticion.json();

    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("apellido").value = cliente.apellido;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("email").value = cliente.email;
    document.getElementById("telefono").value = cliente.telefono;

    let btnModificar = document.getElementById("btnModificar");
}

btnModificar.addEventListener("click", evento => {
    aplicarActualizacion(idEditar);
})

let aplicarActualizacion = async (id) => {
    let campos = {};
    campos.id = id;
    campos.nombre = document.getElementById("nombre").value;
    campos.apellido = document.getElementById("apellido").value;
    campos.direccion = document.getElementById("direccion").value;
    campos.email = document.getElementById("email").value;
    campos.telefono = document.getElementById("telefono").value;

    const peticion = await fetch("http://localhost:8080/clientes/" + id,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

    listarClientes();
}

function mostrarCliente() {
    let cliente = document.getElementById("cliente").style.visibility = "visible";
}





