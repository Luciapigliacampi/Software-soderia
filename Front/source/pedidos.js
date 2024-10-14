obtenerPedidos()

function obtenerPedidos() {
    axios.get('http://localhost:3000/pedidos')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);


            let tablaPedidos = document.getElementById("tablaPedidos");
            tablaPedidos.innerHTML = "";

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                let filaTabla = document.createElement('tr');

                let datoNumeroPedido = document.createElement('td');
                let enlacePedido = document.createElement('a');
                enlacePedido.href = "#";
                enlacePedido.setAttribute("data-toggle", "modal")
                enlacePedido.setAttribute("data-target", "#modal-default")
                enlacePedido.textContent = `#${registro.id_pedido}`;
                datoNumeroPedido.appendChild(enlacePedido)

                let datoFecha = document.createElement('td');
                datoFecha.textContent = new Date(registro.fecha).toLocaleDateString('es-ES', { year:"numeric", month:"short", day:"numeric"});
                
                let datoCliente = document.createElement('td');
                datoCliente.textContent = registro.nombre_cliente;

                let datoTotal = document.createElement('td');
                datoTotal.textContent = registro.total;
                

            //     let datoFecha = document.createElement('td');
            //     datoFecha.textContent = registro.fecha;

            //     let datoPiso
            //     let datoDepartamento

            //     if (registro.piso !== null) {
            //         console.log(registro.piso)
            //         datoPiso = ` ${registro.piso}`
            //     } else {
            //         datoPiso = ""
            //     }

            //     if (registro.departamento !== null) {
            //         console.log(registro.departamento)
            //         datoDepartamento = registro.departamento
            //     } else {
            //         datoDepartamento = ""
            //     }

            //     let datoDireccion = document.createElement('td');
            //     datoDireccion.textContent = `${registro.calle} ${registro.numero_dir}${datoPiso}${datoDepartamento}`;
            //     let datoBarrio = document.createElement('td');
            //     datoBarrio.textContent = registro.nombre_barrio;
            //     let datoLocalidad = document.createElement('td');
            //     datoLocalidad.textContent = registro.nombre_localidad;
            //     let datoEmail = document.createElement('td');
            //     datoEmail.textContent = registro.correo_electronico;
            //     let datoTipoCliente = document.createElement('td');
            //     datoTipoCliente.textContent = registro.nombre_tipo_cliente;
            //     let acciones = document.createElement('td');
            //     let botonEliminar = document.createElement('button');
            //     botonEliminar.textContent = "Eliminar";
            //     botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2', 'me-2');
            //     botonEliminar.addEventListener('click', function () {
            //         if (window.confirm("¿Desea eliminar el registro?")) {

            //             eliminarCliente(registro.id_cliente);
            //         }
            //         // window.location.href = '#titulo'
            //     });

            //     let botonModificar = document.createElement('button');
            //     botonModificar.textContent = "Modificar";
            //     botonModificar.classList.add('btn', 'btn-secondary', 'btn-sm', 'ms-2', 'me-2');
            //     botonModificar.setAttribute("data-toggle", "modal")
            //     botonModificar.setAttribute("data-target", "#modal-default")

            //     botonModificar.addEventListener('click', function (event) {
            //         obtenerCliente(registro.id_cliente)

            //     })

            //     acciones.appendChild(botonEliminar);
            //     acciones.appendChild(botonModificar);

                filaTabla.appendChild(datoNumeroPedido);
                filaTabla.appendChild(datoFecha);
                filaTabla.appendChild(datoCliente);
                filaTabla.appendChild(datoTotal);
               
                // filaTabla.appendChild(datoLocalidad);
                // filaTabla.appendChild(datoEmail);
                // filaTabla.appendChild(datoTipoCliente);
                // filaTabla.appendChild(acciones);

                tablaPedidos.appendChild(filaTabla);
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}