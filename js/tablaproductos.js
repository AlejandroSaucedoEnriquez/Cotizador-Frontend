let dataTableproductos;
let dataTableproductosIsInitialized = false;
const tableproductos = document.getElementById("tablaproductos");
const modalproducto = document.getElementById("modalproducto");
const inputsproductos = document.querySelectorAll("input");
let countproductos = 0;


const initDataTableproductos = async () => {
    if (dataTableproductosIsInitialized) {
        dataTableproductos.destroy();
    }

    await listarProductos();

    dataTableproductos = $("#tablaproductos").DataTable({
        "destroy": true,
        "select": true,
        /*"columnDefs": [
           {
            "orderable": false,
            "className": "select-checkbox",
            "targets": 0
            }
       ],
        "select": {
            "style": "os",
            "selector": "td:first-child"
        },*/
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
    dataTableproductosIsInitialized = true;

}




window.addEventListener("load", async () => {
    await initDataTableproductos();
})

/*window.onload = function(){
    listarProductos();
}*/

function refrescar() {
    location.reload();
}

let listarProductos = async () => {
    const peticion = await fetch("http://localhost:8080/productos",
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    const productos = await peticion.json();

    let contenidoTabla = "";

    for (let producto of productos) {
        let contenidoFila = `
    <tr>
    <td>${producto.id}</td>
    <td>${producto.nombre}</td>
    <td>${producto.sku}</td>
    <td>${producto.precio}</td>
    <td>${producto.stock}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.categoria}</td>
    <td>${producto.marca}</td>
    <td>${producto.modelo}</td>
    <td>
    <i onClick="editarProducto(${producto.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${producto.id})" class="material-icons button delete">delete</i>
    <i class="material-icons button add_circle"><a href="itemcotizacion.html">add_circle</a></i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_productos.innerHTML = contenidoTabla;
}


let idEditarproducto;

 let editarProducto = async (id) => {

    mostrarProducto();

    idEditarproducto = id;

    const peticion = await fetch("http://localhost:8080/productos/" + id,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    const producto = await peticion.json();

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("sku").value = producto.sku;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("descripcion").value = producto.descripcion;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("modelo").value = producto.modelo;


    let btnModificar = document.getElementById("btnModificar");
}


btnModificar.addEventListener("click", e => {
    aplicarActualizacionProductos(idEditarproducto);
    let producto = document.getElementById("producto").style.visibility = "hidden";
    modalproducto.classList.toggle("translate");

    if (e.target.matches(".btnModificar")) {
        modalproducto.classList.toggle("translate").hide();
    }
   
        
})

let aplicarActualizacionProductos = async (id) => {
    let campos = {};
    campos.id = id;
    campos.nombre = document.getElementById("nombre").value;
    campos.sku = document.getElementById("sku").value;
    campos.precio = document.getElementById("precio").value;
    campos.stock = document.getElementById("stock").value;
    campos.descripcion = document.getElementById("descripcion").value;
    campos.categoria = document.getElementById("categoria").value;
    campos.marca = document.getElementById("marca").value;
    campos.modelo = document.getElementById("modelo").value;

    const peticion = await fetch("http://localhost:8080/productos/" + id,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campos)
        });

    listarProductos();
}


let borrarProducto = async (id) => {
    const peticion = await fetch("http://localhost:8080/productos/" + id,
        {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

    listarProductos();

}

function mostrarProducto() {
    let producto = document.getElementById("producto").style.visibility = "visible"; 
}


window.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    let data = e.target.parentElement.parentElement.children;
    fillDataproductos(data);
    modalproducto.classList.toggle("translate");
    $(".page-item:not(:first-child) .page-link").hide();
  }else{
    $(".page-item:not(:first-child) .page-link").show();
  }

  if (e.target.matches(".btn-danger")) {
  modalproducto.classList.toggle("translate");
  countproductos=0
  }
});

const fillDataproductos = (data) => {
    for (let index of inputsproductos) {
      index.value = data[countproductos].textContent;
      countproductos += 1; 
   }   
  };


let valoresCheck = [];
$("#tabla").DataTable().rows().every(function () {
    var data = this.data();
    if (data[0] == true) { // data[0] corresponde a la columna del checkbox
        valoresCheck.push(data[1]); // data[1] correspondería a la columna 'id'
    }
    
    //console.log(valoresCheck);
});

