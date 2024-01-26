let boton = document.getElementById("btnRegistrar");
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

boton.addEventListener("click", evento=>{
      registrarCliente();
});



let registrarCliente = async()=>{

let campos = {};

campos.nombre = document.getElementById("nombre").value;
campos.apellido = document.getElementById("apellido").value;
campos.direccion = document.getElementById("direccion").value;
campos.email = document.getElementById("email").value;
campos.telefono = document.getElementById("telefono").value;

const peticion = await fetch("http://localhost:8080/clientes",
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
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    direccion: /^(Calle|Avenida|Privada)\s[a-zA-ZÀ-ÿ\s]+\s#\d{1,4}$/,
	telefono: /^\d{10}$/ //10 numeros.
}


const campos = {
	nombre: false,
	apellido: false,
	email: false,
    direccion: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
        case "direccion":
			validarCampo(expresiones.direccion, e.target, 'direccion');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
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

	if(campos.nombre && campos.apellido && campos.email &&  campos.direccion && campos.telefono){
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



 