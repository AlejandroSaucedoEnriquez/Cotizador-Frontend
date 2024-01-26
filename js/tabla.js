let dataTable;
let dataTableIsInitialized = false;

const initDataTable = async() =>{
   if(dataTableIsInitialized){
      dataTable.destroy();
   }

   await listarClientes();

   dataTable=$("#tabla").DataTable({
    lengthMenu: [3,5,10,25,50,100,200,500],
    width: "50%", targets:[0],
            pageLength: 3,
            destroy: true,
			"language":{
				"lengthMenu": "Mostrar _MENU_ registros por pagina",
				"info": "Mostrando pagina _PAGE_ de _PAGES_",
				"infoEmpty": "No hay registros disponibles",
				"infoFiltered": "(filtrada de _MAX_ registros)",
				"loadingRecords": "Cargando...",
				"processing":     "Procesando...",
				"search": "Buscar:",
				"zeroRecords":    "No se encontraron registros coincidentes",
				"paginate": {
					"next":       "Siguiente",
					"previous":   "Anterior"
				},					
			}
		});	
   dataTableIsInitialized = true;
}





window.addEventListener("load", async () =>{
    await initDataTable();
})
   
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
        let contenidoFila = `
    <tr>
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

    tabla_clientes.outerHTML = contenidoTabla;
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
let cliente = document.getElementById("cliente").style.visibility = "hidden";
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

   