function calcular_costo(button) {
    let tr = button.closest('tr'),
        cantidad = tr.querySelector('input[name="cantidad"]').value || 0,
        precio = tr.querySelector('td[data-value="precio"]').innerText,
        subtotal = tr.querySelector('td[data-value="subtotal"]');

    subtotal.innerText = (precio * cantidad).toFixed(2);
}

function traer_cantidad(button) {
    let tr = button.closest('tr'),
        cantidad = tr.querySelector('input[name="cantidad"]').value || 0,
        traercantidad = tr.querySelector('td[data-value="traercantidad"]');
        traercantidad.innerText = cantidad;
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
        "lengthMenu": [[2, 4, 8, 16, 32, 100, 200, 500 - 1], [2, 4, 8, 16, 32, 100, 200, 500, "All"]],
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

    $("#cotizar").click(function () {
        dataTableproductos.$("input:checkbox:checked").each(function () {
            $(this).closest('td').siblings().each(function () {
                console.log($(this).text());
            });
        });
    })

    await listarProductos();

    $(document).ready(function () {
        $('.enviar').on('click', function () {
            var hermano = $(this).parent();
            $("#tablaproductos2").prepend("<tr>\
                                            <td>"+ hermano.siblings("td:eq(0)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(1)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(2)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(3)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(4)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(13)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(6)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(7)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(8)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(9)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(10)").text() + "</td>\
                                                            </tr>")
            listarCotizacion();
        });
    })


    dataTableproductosIsInitialized = true;

}


window.addEventListener("load", async () => {
    await initDataTableproductos();
})


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
    <td>${producto.stock}</td>
    <td data-value="precio">${producto.precio}</td>
    <td data-value="cantidad"><input type="number" min="1" max="999" class="form-control formulario_input" id="cantidad" name="cantidad" required></td>
    <td data-value="subtotal" name="subtotal">0.00</td>
    <td>${producto.descripcion}</td>
    <td>${producto.categoria}</td>
    <td>${producto.marca}</td>
    <td>${producto.modelo}</td>
    <td><button type="button" onclick="calcular_costo(this)">Subtotal</button></td>
    <td><button type="button" onclick="traer_cantidad(this)">Cantidad</button></td>
    <td data-value="traercantidad">0</td>
    <td><input type="button" value="Cotizar" class="enviar"></td> 
    <td>
    <i onClick="editarProducto(${producto.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${producto.id})" class="material-icons button delete">delete</i>
    </td>
    </tr>
    `
    


        contenidoTabla += contenidoFila;
    }

    tabla_productos.innerHTML = contenidoTabla;
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
        "lengthMenu": [[2, 4, 8, 16, 32, 100, 200, 500 - 1], [2, 4, 8, 16, 32, 100, 200, 500, "All"]],
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

    $("#cotizar").click(function () {
        dataTable.$("input:checkbox:checked").each(function () {
            $(this).closest('td').siblings().each(function () {
                console.log($(this).text());
            });
        });
    })

    $(document).ready(function () {
        $('.envio').on('click', function () {
            var hermano = $(this).parent();
            $("#tabla2").prepend("<tr id='cliente-hermano-" + hermano.siblings("td:eq(1)").text() + "'>\
                                            <td>"+ hermano.siblings("td:eq(1)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(2)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(3)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(4)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(5)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(6)").text() + "</td>\
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
    </td>
    </tr>
    `

        contenidoTabla += contenidoFila;
    }

    tabla_clientes.innerHTML = contenidoTabla;
}










function cotizacion(button) {
    let tr = button.closest('tr'),
        id = tr.querySelector('input[name="#"]')
    cantidad = tr.querySelector('input[name="cantidad"]').value || 0,
        precio = tr.querySelector('td[data-value="precio"]').innerText,
        subtotal = tr.querySelector('td[data-value="subtotal"]');

    subtotal.innerText = (precio * cantidad).toFixed(2);
}


let dataTableCotizacion;
let dataTableIsInitializedCotizacion = false;
const tableCotizacion = document.getElementById("tablacotizaciones");
const modalCotizacion = document.getElementById("modal");
const inputsCotizacion = document.querySelectorAll("input");
let countCotizacion = 0;

const initDataTableCotizacion = async () => {
    if (dataTableIsInitializedCotizacion) {
        dataTableCotizacion.destroy();
    }


    dataTableCotizacion = $("#tablacotizaciones").DataTable({
        "destroy": true,
        "lengthMenu": [[2, 4, 8, 16, 32, 100, 200, 500 - 1], [2, 4, 8, 16, 32, 100, 200, 500, "All"]],
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

    $("#cotizar").click(function () {
        dataTableCotizacion.$("input:checkbox:checked").each(function () {
            $(this).closest('td').siblings().each(function () {
                console.log($(this).text());
            });
        });
    })

    $(document).ready(function () {
        $('.envio').on('click', function () {
            var hermano = $(this).parent();
            $("#tabla2").prepend("<tr>\
                                            <td>"+ hermano.siblings("td:eq(1)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(0)").text() + "</td>\
                                            <td>"+ hermano.siblings("td:eq(13)").text() + "</td>\
                                                            </tr>")
        });
    })

    dataTableIsInitializedCotizacion = true;

}




window.addEventListener("load", async () => {
    await initDataTableCotizacion();
})

function refrescar() {
    location.reload();
}

let listarCotizacion = async () => {

    const clientes = Array.from(document.querySelectorAll("#tabla2 tbody tr"));
    const productos = Array.from(document.querySelectorAll("#tablaproductos2 tbody tr"))

    let contenidoTabla1 = "";

    for (const rawCliente of clientes) {
        const cliente = {
            id: rawCliente.children[0].firstChild.data
        }
        for (const rawProducto of productos) {

            const producto = {
                id: rawProducto.children[0].firstChild.data,
                cantidad: rawProducto.children[5].firstChild.data,
            }

            const contenidoFila1 = `
                <tr>
                <td>${cliente.id}</td>
                <td></td>
                <td>${producto.id}</td>
                <td>${producto.cantidad}</td>
                </tr>
                `

            contenidoTabla1 += contenidoFila1;
        }
    }

    tabla_cotizaciones.innerHTML = contenidoTabla1;
}







const btnCrearCotizacion = document.getElementById("btnCrearCotizacion");

btnCrearCotizacion.addEventListener("click", async function (event) {

    const cotizaciones = Array.from(document.querySelectorAll("#tabla_cotizaciones tr"));

    if (cotizaciones[0].classList.contains("odd")) {
        return;
    }
    const cotizacion = {
        "clienteId":parseInt( cotizaciones[0].children[0].firstChild.data),
        "items": []
    }
    for (const rawCotizacion of cotizaciones) {
        cotizacion.items.push(
            {
                "productoId": parseInt(  rawCotizacion.children[2].firstChild.data),
                "cantidad": parseInt(rawCotizacion.children[3].firstChild.data)
            }
        );
    }


    
    const peticion = await fetch("http://localhost:8080/cotizaciones",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cotizacion)
        })
        const response = await peticion.json();
     //alert("El envio fue:" + (peticion.status == 201 ? "Exitoso" : "Fallido"));
     if(peticion.status == 201){
        Swal.fire({
            title: "!Bien hecho",
            text: "Cotizacion Exitosa!",
            icon: "success"
          });
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
          });
        } 
})



    





















