obtenerUsuarios();

function eliminarUsuario(codigo) {
    console.log(typeof codigo);

    axios.delete('http://localhost:3000/data/' + codigo)
        .then(respuesta => {
            alert("Usuario Eliminado");
            obtenerUsuarios();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

function agregarUsuario(id, nombre, apellido, edad, ciudad) {
    axios.post('http://localhost:3000/data/', {
        "id": Number(id),
        "nombre": nombre,
        "apellido": apellido,
        "edad": edad,
        "ciudad": ciudad
    })
        .then(respuesta => {
            console.log('Usuario agregado con éxito:', respuesta.data);
            obtenerUsuarios();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let id = document.getElementById("idPersona");
let idActual = document.getElementById("idActual");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let edad = document.getElementById("edad");
let ciudad = document.getElementById("ciudad");

function datosFormulario(registroConsultado) {
    nombre.value = registroConsultado.nombre
    id.value = registroConsultado.id;
    idActual.value = registroConsultado.id;
    apellido.value = registroConsultado.apellido;
    edad.value = registroConsultado.edad;
    ciudad.value = registroConsultado.ciudad;
}

function habilitarFormulario() {
    nombre.disabled = false;
    id.disabled = true;
    apellido.disabled = false;
    edad.disabled = false;
    ciudad.disabled = false;
}

function consultarDatos(registroConsultado) {
    datosFormulario(registroConsultado)
    nombre.disabled = true;
    id.disabled = true;
    apellido.disabled = true;
    edad.disabled = true;
    ciudad.disabled = true;
}

function modificarDatos(registroConsultado) {
    datosFormulario(registroConsultado)
    habilitarFormulario()

}

function obtenerUsuarios() {
    axios.get('http://localhost:3000/data')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(respuesta);


            let table_usuario = document.getElementById("table_usuario");
            table_usuario.innerHTML = "";

            for (let indice = 0; indice < datos.length; indice++) {


                let registro = datos[indice];

                let filaTabla = document.createElement('tr');

                let datoCodigo = document.createElement('td');
                datoCodigo.textContent = registro.id;
                let datoNombre = document.createElement('td');
                datoNombre.textContent = registro.nombre;
                let datoApellido = document.createElement('td');
                datoApellido.textContent = registro.apellido;
                let datoEdad = document.createElement('td');
                datoEdad.textContent = registro.edad;
                let datoCiudad = document.createElement('td');
                datoCiudad.textContent = registro.ciudad;

                let celdaAcciones = document.createElement('td');

                let botonEliminar = document.createElement('button');
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2', 'me-2');
                botonEliminar.addEventListener('click', function () {
                    if (window.confirm("¿Desea eliminar el registro?")) {
                        eliminarUsuario(registro.id);
                    }
                    window.location.href = '#titulo'
                });

                let botonConsultar = document.createElement('button');
                botonConsultar.textContent = "Consultar";
                botonConsultar.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2', 'me-2');
                botonConsultar.addEventListener('click', function () {
                    consultarDatos(registro)
                    botonGuardar.disabled = true
                    botonActualizar.disabled = true
                    window.location.href = '#contenedorCarga'
                })

                let botonModificar = document.createElement('button');
                botonModificar.textContent = "Modificar";
                botonModificar.classList.add('btn', 'btn-secondary', 'btn-sm', 'ms-2', 'me-2');
                botonModificar.addEventListener('click', function () {
                    modificarDatos(registro)
                    botonGuardar.disabled = true;
                    botonActualizar.disabled = false;
                    window.location.href = '#contenedorCarga'
                })

                celdaAcciones.appendChild(botonEliminar);
                celdaAcciones.appendChild(botonConsultar);
                celdaAcciones.appendChild(botonModificar);

                filaTabla.appendChild(datoCodigo);
                filaTabla.appendChild(datoNombre);
                filaTabla.appendChild(datoApellido);
                filaTabla.appendChild(datoEdad);
                filaTabla.appendChild(datoCiudad);
                filaTabla.appendChild(celdaAcciones);

                table_usuario.appendChild(filaTabla);
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let botonGuardar = document.getElementById("botonGuardar");

botonGuardar.addEventListener('click', function (event) {
    event.preventDefault()

    axios.get('http://localhost:3000/data')
        .then(respuesta => {

            let datos = respuesta.data;

            let resultado = datos.find(Persona => Persona.id == id.value)

            if (resultado) {
                alert("El id ya fue ingresado")
            } else {
                agregarUsuario(id.value, nombre.value, apellido.value, edad.value, ciudad.value)
                alert("Usuario guardado con éxito")
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });

})

function modificarUsuario(idActual, id, nombre, apellido, edad, ciudad) {

    axios.put('http://localhost:3000/data/' + idActual, {
        "id": Number(id),
        "nombre": nombre,
        "apellido": apellido,
        "edad": edad,
        "ciudad": ciudad
    })
        .then(respuesta => {
            console.log('Usuario modificado con éxito:', respuesta.data);
            alert("Usuario modificado con éxito");
            obtenerUsuarios();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let botonActualizar = document.getElementById("botonActualizar");

botonActualizar.addEventListener('click', function (event) {
    event.preventDefault()

    if (idActual.value == id.value) {
        modificarUsuario(idActual.value, id.value, nombre.value, apellido.value, edad.value, ciudad.value)
    }
    else {
        axios.get('http://localhost:3000/data')
            .then(respuesta => {

                let datos = respuesta.data;

                let resultado = datos.find(Persona => Persona.id == id.value)

                if (resultado) {
                    alert("El id ya fue ingresado")
                } else {
                    modificarUsuario(idActual.value, id.value, nombre.value, apellido.value, edad.value, ciudad.value)
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
            });

    }
    window.location.href = '#titulo'

})

let botonLimpiar = document.getElementById('botonLimpiar');

botonLimpiar.addEventListener('click', function () {
    habilitarFormulario()
    botonGuardar.disabled = false;
    botonActualizar.disabled = true;
    id.disabled = false;
})