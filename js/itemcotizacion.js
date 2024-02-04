let boton = document.getElementById("btncrearitemcotizacion");

boton.addEventListener("click", evento=>{
      crearItemCotizacion();
});



let crearItemCotizacion = async()=>{

let campos = {};
campos.productoId = id;
campos.cantidad = document.getElementById("cantidad").value;



const peticion = await fetch("http://localhost:8080/api/item-cotizacion/agregar",
{
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(campos)
});
}





let botoncantidad = document.getElementById("agregarcantidad");
const formulario = document.getElementById('formulario');
const inputscantidad = document.querySelectorAll('#formulario input');

botoncantidad.addEventListener("click", evento=>{
      agregarCantidad();
});



let agregarCantidad = async()=>{

let camposcantidad = {};

camposcantidad.nombre = document.getElementById("nombre").value;
camposcantidad.sku = document.getElementById("sku").value;
camposcantidad.precio = document.getElementById("precio").value;
camposcantidad.stock = document.getElementById("stock").value;
camposcantidad.cantidad = document.getElementById("cantidad").value;
camposcantidad.descripcion = document.getElementById("descripcion").value;
camposcantidad.categoria= document.getElementById("categoria").value;
camposcantidad.marca = document.getElementById("marca").value;
camposcantidad.modelo = document.getElementById("modelo").value;


const peticion = await fetch("http://localhost:8080/productos",
{
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(campos)
});
}











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
        /*"select": true,
        "columnDefs": [{
            "orderable": false,
            "className": "select-checkbox",
            "targets": 0
        }],
        "select": {
            "style": "os",
            "selector": "td:first-child",
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

    $("#cotizar").click(function() {
        dataTable.$("input:checkbox:checked").each(function(){
                    $(this).closest('td').siblings().each(function(){
                    console.log($(this).text());
                    });
                    });
                    })

                    $(document).ready(function(){
                        $('.envio').on('click', function() {
                        var hermano=$(this).parent();
                        $("#tabla2").prepend("<tr>\
                                            <td>"+hermano.siblings("td:eq(1)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(2)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(3)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(4)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(5)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(6)").text()+"</td>\
                                                            </tr>")
                      });
                    })
    
    dataTableIsInitialized = true;

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
    <td> 
    <input type="checkbox" name="customersSelecteds" class="chkCheckBoxId"/>
    </td>
    <td>${cliente.id}</td>
    <td>${cliente.nombre}</td>
    <td>${cliente.apellido}</td>
    <td>${cliente.email}</td>
    <td>${cliente.telefono}</td>
    <td>${cliente.direccion}</td>
    <td><input type="button" value="Cotizar" class="envio"></td>
    <td>
    <i onClick="editarProducto(${cliente.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${cliente.id})" class="material-icons button delete">delete</i>
    <i onClick="editarProducto(${cliente.id})" class="material-icons button edit">add_circle</i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_clientes.innerHTML = contenidoTabla;
}








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
        /*"select": true,
        "columnDefs": [
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

    $("#cotizar").click(function() {
        dataTableproductos.$("input:checkbox:checked").each(function(){
                    $(this).closest('td').siblings().each(function(){
                    console.log($(this).text());
                    });
                    });
                    })

                    /*$(document).ready(function(){
                        $('.enviar').on('click', function() {
                        var hermano=$(this).parent();
                        $("#tablaproductos2").prepend("<tr>\
                                            <td>"+hermano.siblings("td:eq(1)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(6)").text()+"</td>\
                                                            </tr>")
                      });
                    })*/


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
    <td><input type="number" min="1" max="999" class="form-control formulario_input" id="cantidad" name="cantidad" required></td>
    <td>${producto.descripcion}</td>
    <td>${producto.categoria}</td>
    <td>${producto.marca}</td>
    <td>${producto.modelo}</td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_productos.innerHTML = contenidoTabla;
}












let dataTableproductoscantidad;
let dataTableproductosIsInitializedcantidad = false;
const tableproductoscantidad = document.getElementById("tablaproductos");
const modalproductocantidad = document.getElementById("modalproducto");
const inputsproductoscantidad = document.querySelectorAll("input");
let countproductoscantidad = 0;


const initDataTableproductoscantidad = async () => {
    if (dataTableproductosIsInitialized) {
        dataTableproductos.destroy();
    }

    await listarProductosCantidad();

    dataTableproductoscantidad = $("#tablaproductos").DataTable({
        "destroy": true,
        /*"select": true,
        "columnDefs": [
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

    $("#cotizar").click(function() {
        dataTableproductos.$("input:checkbox:checked").each(function(){
                    $(this).closest('td').siblings().each(function(){
                    console.log($(this).text());
                    });
                    });
                    })

                    $(document).ready(function(){
                        $('.enviar').on('click', function() {
                        var hermano=$(this).parent();
                        $("#tablaproductos2").prepend("<tr>\
                                            <td>"+hermano.siblings("td:eq(1)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(6)").text()+"</td>\
                                                            </tr>")
                      });
                    })


    dataTableproductosIsInitializedcantidad = true;

}


window.addEventListener("load", async () => {
    await initDataTableproductoscantidad();
})

/*window.onload = function(){
    listarProductos();
}*/

function refrescar() {
    location.reload();
}

let listarProductosCantidad = async () => {
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
    <td>
    <input type="checkbox" name="customersSelecteds" class="chkCheckBoxId"/>
    </td>
    <td>${producto.id}</td>
    <td>${producto.nombre}</td>
    <td>${producto.sku}</td>
    <td>${producto.precio}</td>
    <td>${producto.stock}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.descripcion}</td>
    <td>${producto.categoria}</td>
    <td>${producto.marca}</td>
    <td>${producto.modelo}</td>
    <td><input type="button" value="Cotizar" class="enviar"></td>
    <td>
    <i onClick="editarProducto(${producto.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${producto.id})" class="material-icons button delete">delete</i>
    <i onClick="editarProducto(${producto.id})" class="material-icons button edit">add_circle</i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_productoscantidad.innerHTML = contenidoTabla;
}



