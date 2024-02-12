let dataTable;
let dataTableIsInitialized = false;
const table = document.getElementById("tabla");
const modal = document.getElementById("modal");
const inputs = document.querySelectorAll("input");
let count = 0;




const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listarClientes();

    dataTable = $("#tabla").DataTable({
        "destroy": true,
        "select": true,
        "lengthMenu": [ [2, 4, 8, 16, 32, 100, 200, 500 -1], [2, 4, 8, 16, 32, 100, 200, 500, "All"] ],
        "pageLength": 2,
        "language": {
            "select": {
                "rows": {
                    "_": "Usted selecciono %d filas",
                    "0": "Haga click en una fila para seleccionarla",
                    "1": "Solo 1 fila seleccionada"
                },
            },
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "info": "Mostrando pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrada de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros coincidentes",
            "paginate": {
                "next": "Siguiente",
                "previous": "Anterior"
            },
        }
    });

    dataTableIsInitialized = true;

    $("#submit").click(function() {
        table.$("input:checkbox:checked").each(function(){
                    $(this).closest('td').siblings().each(function(){
                      console.log($(this).text());
                    });
                    });
                    })
}




window.addEventListener("load", async () => {
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
    <i class="material-icons button add_circle"><a href="producto.html">add_circle</a></i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_clientes.innerHTML = contenidoTabla;
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


btnModificar.addEventListener("click", e => {
    aplicarActualizacion(idEditar);
    let cliente = document.getElementById("cliente").style.visibility = "hidden";
    modal.classList.toggle("translate");

    if (e.target.matches(".btnModificar")) {
        modal.classList.toggle("translate");
    } 
    
   
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

function mostrarCliente() {
    let cliente = document.getElementById("cliente").style.visibility = "visible"; 
}


window.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    let data = e.target.parentElement.parentElement.children;
    fillData(data);
    modal.classList.toggle("translate");
    $(".page-item:not(:first-child) .page-link").hide();
  }else{
    $(".page-item:not(:first-child) .page-link").show();
  }

  if (e.target.matches(".btn-danger")) {
  modal.classList.toggle("translate");
  count=0
  }
});

const fillData = (data) => {
    for (let index of inputs) {
      index.value = data[count].textContent;
      count += 1; 
   }   
  };




