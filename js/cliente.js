
let boton = document.getElementById("btnRegistrar");

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

