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
    axios.get('http://localhost:3000/clientes')
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
                botonModificar.setAttribute("data-toggle","modal")
                botonModificar.setAttribute("data-target","#modal-default")
                
                botonModificar.addEventListener('click', function (event) {

                // modificarDatos(registro)
                //     botonGuardar.disabled = true;
                //     botonActualizar.disabled = false;
                //     window.location.href = '#contenedorCarga'
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