let boton = document.getElementById("btnRegistrarProducto");
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

boton.addEventListener("click", evento=>{
      registrarProducto();
});



let registrarProducto = async()=>{

let campos = {};

campos.nombre = document.getElementById("nombre").value;
campos.sku = document.getElementById("sku").value;
campos.precio = document.getElementById("precio").value;
campos.stock = document.getElementById("stock").value;
campos.descripcion = document.getElementById("descripcion").value;
campos.categoria= document.getElementById("categoria").value;
campos.marca = document.getElementById("marca").value;
campos.modelo = document.getElementById("modelo").value;


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



const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ0-9\s]{10,40}$/,
    sku: /^[a-zA-ZÀ-ÿ\s]{6}\d{3}$/,
	precio: /^\d{2,10}$/,
    stock: /^\d{1,3}$/,
	descripcion: /^[a-zA-ZÀ-ÿ\s]{10,150}$/, 
    categoria: /^(Cardio|Fuerza|Fuerza parte alta|Fuerza parte baja|Accesorios)$/, 
    marca:  /^(Life fitness|Precor|Technogym|Matrix|Octane|Startrac|Nautilus|Cybex|Freemotion|StairMaster|Hammer Strength|Hoist)$/, 
    modelo:  /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/ 
}



const campos = {
	nombre: false,
	sku: false,
	precio: false,
    stock: false,
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

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`cambiar_${campo}`).classList.remove('formulario_cambiar-incorrecto');
		document.getElementById(`cambiar_${campo}`).classList.add('formulario_cambiar-correcto');
        document.querySelector(`#cambiar_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#cambiar_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#cambiar_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`cambiar_${campo}`).classList.add('formulario_cambiar-incorrecto');
		document.getElementById(`cambiar_${campo}`).classList.remove('formulario_cambiar-correcto');
        document.querySelector(`#cambiar_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#cambiar_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#cambiar_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.sku && campos.precio &&  campos.stock && campos.descripcion && campos.categoria && campos.marca && campos.modelo){
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

