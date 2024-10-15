obtenerClientes();

// function eliminarUsuario(codigo) {
//     console.log(typeof codigo);

//     axios.delete('http://localhost:3000/data/' + codigo)
//         .then(respuesta => {
//             alert("Usuario Eliminado");
//             obtenerUsuarios();
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud:', error);
//         });
// }

// function agregarUsuario(id, nombre, apellido, edad, ciudad) {
//     axios.post('http://localhost:3000/data/', {
//         "id": Number(id),
//         "nombre": nombre,
//         "apellido": apellido,
//         "edad": edad,
//         "ciudad": ciudad
//     })
//         .then(respuesta => {
//             console.log('Usuario agregado con éxito:', respuesta.data);
//             obtenerUsuarios();
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud:', error);
//         });
// }

// let id = document.getElementById("idPersona");
// let idActual = document.getElementById("idActual");
// let nombre = document.getElementById("nombre");
// let apellido = document.getElementById("apellido");
// let edad = document.getElementById("edad");
// let ciudad = document.getElementById("ciudad");

// function datosFormulario(registroConsultado) {
//     nombre.value = registroConsultado.nombre
//     id.value = registroConsultado.id;
//     idActual.value = registroConsultado.id;
//     apellido.value = registroConsultado.apellido;
//     edad.value = registroConsultado.edad;
//     ciudad.value = registroConsultado.ciudad;
// }

// function habilitarFormulario() {
//     nombre.disabled = false;
//     id.disabled = true;
//     apellido.disabled = false;
//     edad.disabled = false;
//     ciudad.disabled = false;
// }

// function consultarDatos(registroConsultado) {
//     datosFormulario(registroConsultado)
//     nombre.disabled = true;
//     id.disabled = true;
//     apellido.disabled = true;
//     edad.disabled = true;
//     ciudad.disabled = true;
// }

// function modificarDatos(registroConsultado) {
//     datosFormulario(registroConsultado)
//     habilitarFormulario()

// }

function obtenerClientes() {
    axios.get(`http://localhost:3000/clientes`)
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);


            let tablaClientes = document.getElementById("tablaClientes");
            tablaClientes.innerHTML = "";

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                let filaTabla = document.createElement('tr');

                let datoNombre = document.createElement('td');
                datoNombre.textContent = `${registro.nombre} ${registro.apellido}`;
                let datoTelefono = document.createElement('td');
                datoTelefono.textContent = registro.telefono;

                let datoPiso
                let datoDepartamento

                if (registro.piso !== null) {
                    console.log(registro.piso)
                    datoPiso = ` ${registro.piso}`
                } else {
                    datoPiso = ""
                }

                if (registro.departamento !== null) {
                    console.log(registro.departamento)
                    datoDepartamento = registro.departamento
                } else {
                    datoDepartamento = ""
                }

                let datoDireccion = document.createElement('td');
                datoDireccion.textContent = `${registro.calle} ${registro.numero_dir}${datoPiso}${datoDepartamento}`;
                let datoBarrio = document.createElement('td');
                datoBarrio.textContent = registro.nombre_barrio;
                let datoLocalidad = document.createElement('td');
                datoLocalidad.textContent = registro.nombre_localidad;
                let datoEmail = document.createElement('td');
                datoEmail.textContent = registro.correo_electronico;
                let datoTipoCliente = document.createElement('td');
                datoTipoCliente.textContent = registro.nombre_tipo_cliente;
                let acciones = document.createElement('td');
                let botonEliminar = document.createElement('button');
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2', 'me-2');
                botonEliminar.addEventListener('click', function () {
                    if (window.confirm("¿Desea eliminar el registro?")) {

                        eliminarCliente(registro.id_cliente);
                    }
                    // window.location.href = '#titulo'
                });

                let botonModificar = document.createElement('button');
                botonModificar.textContent = "Modificar";
                botonModificar.classList.add('btn', 'btn-secondary', 'btn-sm', 'ms-2', 'me-2');
                botonModificar.setAttribute("data-toggle", "modal")
                botonModificar.setAttribute("data-target", "#modal-default")

                botonModificar.addEventListener('click', function (event) {
                    obtenerCliente(registro.id_cliente)

                })

                acciones.appendChild(botonEliminar);
                acciones.appendChild(botonModificar);

                filaTabla.appendChild(datoNombre);
                filaTabla.appendChild(datoTelefono);
                filaTabla.appendChild(datoDireccion);
                filaTabla.appendChild(datoBarrio);
                filaTabla.appendChild(datoLocalidad);
                filaTabla.appendChild(datoEmail);
                filaTabla.appendChild(datoTipoCliente);
                filaTabla.appendChild(acciones);

                tablaClientes.appendChild(filaTabla);
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

function eliminarCliente(id) {
    axios.delete('http://localhost:3000/clientes/' + id)
        .then(respuesta => {
            alert("Cliente eliminado");
            obtenerClientes();
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let formulario = document.getElementById('formulario');
let nombre = document.getElementById('nombre');
let idCliente = document.getElementById('idCliente');
let apellido = document.getElementById('apellido');
let tipoDocumento = document.getElementById('tipoDocumento');
let numeroDoc = document.getElementById('numeroDoc');
let telefono = document.getElementById('telefono');
let email = document.getElementById('email');
let calle = document.getElementById('calle');
let numeroDir = document.getElementById('numeroDir');
let piso = document.getElementById('piso');
let departamento = document.getElementById('departamento');
let localidad = document.getElementById('localidad');
let barrio = document.getElementById('barrio');
let tipoCliente = document.getElementById('tipoCliente');

formulario.addEventListener("submit", validarDatos);

function obtenerCliente(id) {
    obtenerLocalidades()

    obtenerTipoDoc();

    obtenerCondicionIVA();

    obtenerTipoCliente();

    axios.get('http://localhost:3000/clientes/' + id)
        .then(respuesta => {
            console.log(respuesta.data);
            nombre.value = respuesta.data.nombre;
            apellido.value = respuesta.data.apellido;
            numeroDoc.value = respuesta.data.numero_documento;
            telefono.value = respuesta.data.telefono;
            email.value = respuesta.data.correo_electronico;
            calle.value = respuesta.data.calle;
            numeroDir.value = respuesta.data.numero_dir;
            piso.value = respuesta.data.piso;
            departamento.value = respuesta.data.departamento;
            tipoCliente.value = respuesta.data.id_tipo_cliente;
            localidad.value = respuesta.data.id_localidad;
            idCliente.value = respuesta.data.id_cliente 

            obtenerBarrios(respuesta.data.id_localidad,respuesta.data.id_barrio)

            tipoDocumento.value = respuesta.data.id_tipo_documento;
            condicionIVA.value = respuesta.data.id_condicion;
        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        })
}


let selectLocalides = document.getElementById("localidad");
function obtenerLocalidades() {
    selectLocalides.innerHTML = ""

    axios.get('http://localhost:3000/localidades')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);


            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_localidad
                option.textContent = registro.nombre

                selectLocalides.appendChild(option)



            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let selectBarrios = document.getElementById("barrio");

selectLocalides.addEventListener("change", function () {
    const id_localidad = this.value

    

    if (id_localidad == "") {
        return
    }

    obtenerBarrios(id_localidad)
})

function obtenerBarrios(id_localidad,id_barrio=0) {

    selectBarrios.innerHTML = "";
    axios.get('http://localhost:3000/barrios/' + id_localidad)
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);




            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_barrio
                option.textContent = registro.nombre

                selectBarrios.appendChild(option)
            }

            if(id_barrio != 0) {
                selectBarrios.value = id_barrio
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let selectTipoDoc = document.getElementById("tipoDocumento");

function obtenerTipoDoc() {
    selectTipoDoc.innerHTML = ""
    axios.get('http://localhost:3000/tipos_documento/')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_tipo_documento
                option.textContent = registro.nombre

                selectTipoDoc.appendChild(option)
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let selectCondIVA = document.getElementById("condicionIVA");

function obtenerCondicionIVA() {
    selectCondIVA.innerHTML = ""
    axios.get('http://localhost:3000/tipos_iva/')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_condicion
                option.textContent = registro.nombre

                selectCondIVA.appendChild(option)
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let selectTipoCliente = document.getElementById("tipoCliente");


function obtenerTipoCliente() {
    selectTipoCliente.innerHTML = ""
    axios.get('http://localhost:3000/tipos_cliente/')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_tipo_cliente
                option.textContent = registro.nombre

                selectTipoCliente.appendChild(option)
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

function validarDatos(event) {
    let errores = [];
    event.preventDefault()
    if (nombre.value == "") {
        console.log("nombre vacio")
        errores.push("*Nombre es requerido");
    }
    else if (nombre.value.length > 60) {
        errores.push("*Nombre debe tener como máximo 60 caracteres");
    };

    if (apellido.value.trim() == "") {
        console.log("apellido vacio")
        errores.push("*Apellido es requerido");
    }
    else if (apellido.value.length > 60) {
        errores.push("*Apellido debe tener como máximo 60 caracteres");
    };

    if (tipoDocumento.value == "" || isNaN(tipoDocumento.value)) {
        console.log("tipo de documento vacio")
        errores.push("*Tipo de documento es requerido");
    }

    console.log(numeroDoc.value);

    if (numeroDoc.value == "" || isNaN(numeroDoc.value)) {
        console.log("número documento vacio")
        errores.push("*Número documento es requerido, si desconoce el dato, ingrese 0");
    }

    if (telefono.value.trim() == "") {
        console.log("teléfono vacio")
        errores.push("*Teléfono es requerido");
    }
    else if (telefono.value.length > 12) {
        errores.push("*Teléfono debe tener como máximo 12 caracteres");
    };

    if (calle.value.trim() == "") {
        console.log("calle vacio")
        errores.push("*Calle es requerido");
    }
    else if (calle.value.length > 60) {
        errores.push("*Calle debe tener como máximo 60 caracteres");
    };

    if (numeroDir.value == "" || isNaN(numeroDir.value)) {
        console.log("número direccion vacio")
        errores.push("*Número en dirección es requerido, si desconoce el dato, ingrese 0");
    }

    if (localidad.value == "" || isNaN(localidad.value)) {
        console.log("localidad vacio")
        errores.push("*Localidad es requerida");
    }
    if (barrio.value == "" || isNaN(barrio.value)) {
        console.log("barrio vacio")
        errores.push("*Barrio es requerido");
    }



    // contenedorErrores.innerHTML = "";



    // if (errores.length > 0) {

    //     errores.forEach(function (item, index) {
    //         parrafo = document.createElement('p');
    //         contenedorErrores.appendChild(parrafo);
    //         parrafo.textContent = item;
    //         parrafo.classList.add("mb-1")
    //     });
    //     return
    // }


    let selectLocalides = document.getElementById("localidad");

    const cliente = crearObjeto()
    console.log(cliente);

    axios.put('http://localhost:3000/clientes/' + idCliente.value, cliente)
        .then(response => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                alert(response.data.message)
                location.reload()
            }
        })
        .catch(error => {
            if(error.response.data.error) {
                alert(error.response.data.error)
            } else {
                alert(error.message)
            }
        });
}

// let botonGuardar = document.getElementById("botonGuardar");

// botonGuardar.addEventListener('click', function (event) {
//     event.preventDefault()

//     axios.get('http://localhost:3000/data')
//         .then(respuesta => {

//             let datos = respuesta.data;

//             let resultado = datos.find(Persona => Persona.id == id.value)

//             if (resultado) {
//                 alert("El id ya fue ingresado")
//             } else {
//                 agregarUsuario(id.value, nombre.value, apellido.value, edad.value, ciudad.value)
//                 alert("Usuario guardado con éxito")
//             }
//         })
//         .catch(error => {
//             console.error('Error al obtener los datos:', error);
//         });

// })

// function modificarUsuario(idActual, id, nombre, apellido, edad, ciudad) {

//     axios.put('http://localhost:3000/data/' + idActual, {
//         "id": Number(id),
//         "nombre": nombre,
//         "apellido": apellido,
//         "edad": edad,
//         "ciudad": ciudad
//     })
//         .then(respuesta => {
//             console.log('Usuario modificado con éxito:', respuesta.data);
//             alert("Usuario modificado con éxito");
//             obtenerUsuarios();
//         })
//         .catch(error => {
//             console.error('Hubo un problema con la solicitud:', error);
//         });
// }

// let botonActualizar = document.getElementById("botonActualizar");

// botonActualizar.addEventListener('click', function (event) {
//     event.preventDefault()

//     if (idActual.value == id.value) {
//         modificarUsuario(idActual.value, id.value, nombre.value, apellido.value, edad.value, ciudad.value)
//     }
//     else {
//         axios.get('http://localhost:3000/data')
//             .then(respuesta => {

//                 let datos = respuesta.data;

//                 let resultado = datos.find(Persona => Persona.id == id.value)

//                 if (resultado) {
//                     alert("El id ya fue ingresado")
//                 } else {
//                     modificarUsuario(idActual.value, id.value, nombre.value, apellido.value, edad.value, ciudad.value)
//                 }
//             })
//             .catch(error => {
//                 console.error('Error al obtener los datos:', error);
//             });

//     }
//     window.location.href = '#titulo'

// })

// let botonLimpiar = document.getElementById('botonLimpiar');

// botonLimpiar.addEventListener('click', function () {
//     habilitarFormulario()
//     botonGuardar.disabled = false;
//     botonActualizar.disabled = true;
//     id.disabled = false;
// })

function crearObjeto() {
    let contenidoFormulario = {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        calle: calle.value,
        id_barrio: barrio.value,
        id_localidad: localidad.value,
        correo_electronico: email.value,
        id_tipo_cliente: tipoCliente.value,
        id_tipo_documento: tipoDocumento.value,
        numero_documento: numeroDoc.value,
        estado: 1,
        numero_dir: numeroDir.value,
        piso: piso.value == "" ? null:piso.value,
        departamento: departamento.value,
        id_condicion: condicionIVA.value == "" ? 1:condicionIVA.value
    }


    return contenidoFormulario

}