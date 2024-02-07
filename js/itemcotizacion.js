/*$(document).ready(function(){
  $("#agregarcantidad").click(function(){
    cantidad();
  });
});

function cantidad(){
    $("#tablaproductos tr").each(function(){
    let cantidad = $(this).find('td').eq(5).text();
    let obtenerCantidad = $(this).find('#cantidad').val();
    console.log(obtenerCantidad);
});
}
*/

function calcular_costo(button) {
    let tr = button.closest('tr'),
      cantidad = tr.querySelector('input[name="cantidad"]').value || 0,
      precio = tr.querySelector('td[data-value="precio"]').innerText,
      total = tr.querySelector('td[data-value="total"]');
    
    total.innerText = (precio * cantidad).toFixed(2);
  }


/*let boton = document.getElementById("btncrearitemcotizacion");

boton.addEventListener("click", e =>{
      crearItemCotizacion();
});



let crearItemCotizacion = async()=>{

let campos = {};
campos.productoId = id;
campos.cantidad = document.getElementById("cantidad").value;



const peticion = await fetch("http://localhost:8080/api/item-cotizacion",
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
/*const formulariocantidad = document.getElementById('formulario');
const inputscantidad = document.querySelectorAll('#formulario input');*/


/*botoncantidad.addEventListener("click", e =>{
      agregarCantidad();
});


let agregarCantidad = async()=>{

let camposcantidad = {};

camposcantidad.nombre = document.getElementById("nombre")?.value || '';
camposcantidad.sku = document.getElementById("sku")?.value || '';
camposcantidad.precio = document.getElementById("precio")?.value || '';
camposcantidad.stock = document.getElementById("stock")?.value || '';
camposcantidad.cantidad = document.getElementById("cantidad")?.value || '';
camposcantidad.descripcion = document.getElementById("descripcion")?.value || '';
camposcantidad.categoria= document.getElementById("categoria")?.value || '';
camposcantidad.marca = document.getElementById("marca")?.value || '';
camposcantidad.modelo = document.getElementById("modelo")?.value || '';


const peticion = await fetch("http://localhost:8080/productos",
{
    method:'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(camposcantidad)
});
}

/*const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ0-9\s]{10,40}$/,
    sku: /^[a-zA-ZÀ-ÿ\s]{6}\d{3}$/,
	precio: /^\d{2,10}$/,
    stock: /^\d{1,3}$/,
    cantidad: /^\d{1,3}$/,
	descripcion: /^[a-zA-ZÀ-ÿ\s]{10,150}$/, 
    categoria: /^(Cardio|Fuerza|Fuerza parte alta|Fuerza parte baja|Accesorios)$/, 
    marca:  /^(Life fitness|Precor|Technogym|Matrix|Octane|Startrac|Nautilus|Cybex|Freemotion|StairMaster|Hammer Strength|Hoist)$/, 
    modelo:  /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/ 
}



const camposcantidad = {
	nombre: false,
	sku: false,
	precio: false,
    cantidad: false,
	descripcion: false,
    categoria: false,
    marca: false,
    modelo: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "sku":
			validarCampo(expresiones.sku, e.target, 'sku');
		break;
		case "precio":
			validarCampo(expresiones.precio, e.target, 'precio');
		break;
        case "stock":
			validarCampo(expresiones.stock, e.target, 'stock');
		break;
        case "cantidad":
			validarCampo(expresiones.cantidad, e.target, 'cantidad');
		break;
		case "descripcion":
			validarCampo(expresiones.descripcion, e.target, 'descripcion');
		break;
        case "categoria":
			validarCampo(expresiones.categoria, e.target, 'categoria');
		break;
        case "marca":
			validarCampo(expresiones.marca, e.target, 'marca');
		break;
        case "modelo":
			validarCampo(expresiones.modelo, e.target, 'modelo');
		break;
	}
}

const validarCampo = (expresion, input, campocantidad) => {
	if(expresion.test(input.value)){
		document.getElementById(`cambiar_${campocantidad}`).classList.remove('formulario_cambiar-incorrecto');
		document.getElementById(`cambiar_${campocantidad}`).classList.add('formulario_cambiar-correcto');
        document.querySelector(`#cambiar_${campocantidad} i`).classList.add('fa-check-circle');
		document.querySelector(`#cambiar_${campocantidad} i`).classList.remove('fa-times-circle');
		document.querySelector(`#cambiar_${campocantidad} .formulario_input-error`).classList.remove('formulario_input-error-activo');
		camposcantidad[campocantidad] = true;
	} else {
		document.getElementById(`cambiar_${campocantidad}`).classList.add('formulario_cambiar-incorrecto');
		document.getElementById(`cambiar_${campocantidad}`).classList.remove('formulario_cambiar-correcto');
        document.querySelector(`#cambiar_${campocantidad} i`).classList.add('fa-times-circle');
		document.querySelector(`#cambiar_${campocantidad} i`).classList.remove('fa-check-circle');
		document.querySelector(`#cambiar_${campocantidad} .formulario_input-error`).classList.add('formulario_input-error-activo');
		camposcantidad[campocantidad] = false;
	}
}



inputscantidad.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});



formulariocantidad.addEventListener('submit', (e) => {
	e.preventDefault();
    
	if(camposcantidad.nombre && camposcantidad.sku && camposcantidad.precio &&  camposcantidad.stock && camposcantidad.descripcion && camposcantidad.categoria && camposcantidad.marca && camposcantidad.modelo){
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario_cambiar-correcto').forEach((icono) => {
			icono.classList.remove('formulario_cambiar-correcto');
		});
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario_mensaje').classList.remove('formulario_mensaje-activo');
		}, 5000);
	}
});

*/

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

                    await listarProductos();

                    $(document).ready(function(){
                        $('.enviar').on('click', function() {
                        var hermano=$(this).parent();
                        $("#tablaproductos2").prepend(`<tr>\
                                            <td>${hermano.siblings("td:eq(0)").text()}</td>\
                                            <td>${hermano.siblings("td:eq(1)").text()}</td>\
                                            <td>${hermano.siblings("td:eq(2)").text()}</td>\
                                            <td>${hermano.siblings("td:eq(3)").text()}</td>\
                                            <td>${hermano.siblings("td:eq(4)").text()}</td>\
                                            <td>${hermano.cantidad}`+"</td>\
                                            <td>"+hermano.siblings("td:eq(6)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(7)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(8)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(9)").text()+"</td>\
                                            <td>"+hermano.siblings("td:eq(10)").text()+"</td>\
                                                            </tr>")
                      });
                    })


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
    <td>${producto.stock}</td>
    <td data-value="precio">${producto.precio}</td>
    <td data-value="cantidad"><input type="number" min="1" max="999" class="form-control formulario_input" id="cantidad" name="cantidad" required></td>
    <td data-value="total">0.00</td>
    <td>${producto.descripcion}</td>
    <td>${producto.categoria}</td>
    <td>${producto.marca}</td>
    <td>${producto.modelo}</td>
    <td><button type="button" onclick="calcular_costo(this)">SUBTOTAL</button></td>
    <td><input type="button" value="Cotizar" class="enviar"></td>
    <td>
    <i onClick="editarProducto(${producto.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${producto.id})" class="material-icons button delete">delete</i>
    <i onClick="agregarcantidadProducto(${producto.id})" class="material-icons button add_circle">add_circle</i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_productos.innerHTML = contenidoTabla;
}

























/*let dataTableproductoscantidad;
let dataTableproductosIsInitializedcantidad = false;
const tableproductoscantidad = document.getElementById("tablaproductoscantidad");
const modalproductocantidad = document.getElementById("modalproducto");
const inputsproductoscantidad = document.querySelectorAll("input");
let countproductoscantidad = 0;


const initDataTableproductoscantidad = async () => {
    if (dataTableproductosIsInitialized) {
        dataTableproductoscantidad.destroy();
    }

    await listarProductosCantidad();

    dataTableproductoscantidad = $("#tablaproductoscantidad").DataTable({
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
       /* "lengthMenu": [ [2, 4, 8, 16, 32, 100, 200, 500 -1], [2, 4, 8, 16, 32, 100, 200, 500, "All"] ],
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

/*function refrescar() {
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

    const productoscantidad = await peticion.json();

    let contenidoTabla = "";

    for (let productocantidad of productoscantidad) {
        let contenidoFila = `
    <tr>
    <td>
    <input type="checkbox" name="customersSelecteds" class="chkCheckBoxId"/>
    </td>
    <td>${productocantidad.id}</td>
    <td>${productocantidad.nombre}</td>
    <td>${productocantidad.sku}</td>
    <td>${productocantidad.precio}</td>
    <td>${productocantidad.stock}</td>
    <td>${productocantidad.cantidad}</td>
    <td>${productocantidad.descripcion}</td>
    <td>${productocantidad.categoria}</td>
    <td>${productocantidad.marca}</td>
    <td>${productocantidad.modelo}</td>
    <td><input type="button" value="Cotizar" class="enviar"></td>
    <td>
    <i onClick="editarProducto(${productocantidad.id})" class="material-icons button edit">edit</i>
    <i onClick="borrarProducto(${productocantidad.id})" class="material-icons button delete">delete</i>
    <i onClick="editarProducto(${productocantidad.id})" class="material-icons button edit">add_circle</i>
    </td>
    </tr>
    `   
        
        contenidoTabla += contenidoFila;
    }

    tabla_productoscantidad.innerHTML = contenidoTabla;
}


*/








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





















