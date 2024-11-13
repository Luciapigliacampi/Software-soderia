if(!localStorage.getItem("usuario")) {
    location.href = "login.html"
}


// LISTADO DE CLIENTES
const listaClientes = document.getElementById("listaClientes")
listaClientes.addEventListener("change", (event) => {
    event.preventDefault();
    let valorSeleccionado = listaClientes.value

    nuevoPedido.cliente = valorSeleccionado

});

const defaultOptionCliente = document.createElement('option');
const defaultOptionProducto = document.createElement('option');
defaultOptionCliente.value = ""
defaultOptionProducto.value = ""

function obtenerClientes() {
    listaClientes.innerHTML = "";
    defaultOptionCliente.textContent = "Seleccione cliente"
    listaClientes.appendChild(defaultOptionCliente)

    axios.get('http://localhost:3000/clientes/')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_cliente
                option.textContent = `${registro.numero_documento} - ${registro.nombre} ${registro.apellido}`

                listaClientes.appendChild(option)
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

obtenerClientes()


// LISTADO DE PRODUCTOS
const campoCantidad = document.getElementById("campoCantidad");
const listaProductos = document.getElementById("listaProductos")
listaProductos.addEventListener("change", (event) => {
    event.preventDefault();
    const selectedOption = listaProductos.options[listaProductos.selectedIndex];
    const dataMax = selectedOption.getAttribute('data-max');
    
    campoCantidad.max = dataMax

});

function obtenerProductos() {
    listaProductos.innerHTML = "";
    defaultOptionProducto.textContent = "Seleccione producto"
    listaProductos.appendChild(defaultOptionProducto)

    axios.get('http://localhost:3000/productos')
        .then(respuesta => {

            let datos = respuesta.data;

            console.log(datos);

            for (let indice = 0; indice < datos.length; indice++) {
                let registro = datos[indice];

                const option = document.createElement('option');

                option.value = registro.id_producto
                option.textContent = `${registro.nombre} - ${registro.volumen}`
                option.setAttribute("data-max", registro.stock)
                option.setAttribute("data-importe", registro.importe_unitario)

                listaProductos.appendChild(option)
            }

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

obtenerProductos()


// AGREGAR PRODUCTO A PEDIDO
const botonAgregar = document.getElementById("botonAgregar");
const bodyProductosPedido = document.getElementById("bodyProductosPedido");
const subtotalMonto = document.getElementById("subtotalMonto")
const ivaMonto = document.getElementById("ivaMonto")
const totalMonto = document.getElementById("totalMonto")
const campoFechaEntrega = document.getElementById("campoFechaEntrega")

let idDetallePedido = 0;
botonAgregar.addEventListener('click', (event) => {
    event.preventDefault();
    if(listaProductos.value != "") {
        if(campoCantidad.value == 0) {
            alert("la cantidad debe ser mayor a 0")
            return
        }
        idDetallePedido++
        const selectedOption = listaProductos.options[listaProductos.selectedIndex];

        let producto = {
            id_detalle: idDetallePedido,
            codigo: listaProductos.value,
            nombre: selectedOption.text,
            cantidad: campoCantidad.value,
            valor_unitario: selectedOption.getAttribute('data-importe'),
            total_producto: parseFloat(selectedOption.getAttribute('data-importe') * campoCantidad.value).toFixed(2)
        }
        
        
        const tableRow = document.createElement('tr');
        tableRow.id = `producto-${producto.id_detalle}`

        const datoCodigo = document.createElement('td');
        datoCodigo.textContent = producto.codigo;
        
        const datoProducto = document.createElement('td');
        datoProducto.textContent = producto.nombre;
        
        const datoCantidad = document.createElement('td');
        datoCantidad.textContent = producto.cantidad;

        const datoValorUnitario = document.createElement('td');
        
        datoValorUnitario.textContent = producto.valor_unitario;

        const datoTotalProducto = document.createElement('td');
        datoTotalProducto.textContent = producto.total_producto
        
        const datoAcciones = document.createElement('td');
        let botonQuitar = document.createElement('button');
        botonQuitar.classList.add('btn', 'btn-sm', 'ms-2', 'me-2');
        botonQuitar.innerHTML = '<i class="fas fa-trash text-danger"></i>'

        datoAcciones.appendChild(botonQuitar)

        
        botonQuitar.addEventListener('click', function (event) {
            const fila = document.getElementById(`producto-${producto.id_detalle}`); // Obtiene el <tr> por su id
            if (fila) {
                nuevoPedido.detalle = nuevoPedido.detalle.filter(objeto => objeto.id_detalle !== producto.id_detalle);

                nuevoPedido.subtotal -= parseFloat(producto.total_producto)
                nuevoPedido.iva = nuevoPedido.subtotal * 0.21
                nuevoPedido.total = nuevoPedido.subtotal + nuevoPedido.iva

                ivaMonto.textContent = nuevoPedido.iva.toFixed(2)
                subtotalMonto.textContent = nuevoPedido.subtotal.toFixed(2)
                totalMonto.textContent = nuevoPedido.total.toFixed(2)
                fila.remove(); // Elimina la fila del DOM
            } else {
                console.log('La fila no existe.');
            }
        })
        
        tableRow.appendChild(datoCodigo)
        tableRow.appendChild(datoProducto)
        tableRow.appendChild(datoCantidad)
        tableRow.appendChild(datoValorUnitario)
        tableRow.appendChild(datoTotalProducto)
        tableRow.appendChild(datoAcciones)

        bodyProductosPedido.appendChild(tableRow)

        nuevoPedido.detalle.push(producto);
        nuevoPedido.subtotal += parseFloat(producto.total_producto)
        nuevoPedido.iva = nuevoPedido.subtotal * 0.21
        nuevoPedido.total = nuevoPedido.subtotal + nuevoPedido.iva
                
        ivaMonto.textContent = nuevoPedido.iva.toFixed(2)
        subtotalMonto.textContent = nuevoPedido.subtotal.toFixed(2)
        totalMonto.textContent = nuevoPedido.total.toFixed(2)
    } else {
        alert("debe seleccionar un producto")
    }
});

// GUARDAR DE PEDIDO
let nuevoPedido = {
    cliente: null,
    detalle: [],
    subtotal: 0,
    total: 0,
    iva: 0,
    fecha_entrega: null,
    estado: 1
}
const formPedido = document.getElementById("formPedido")
formPedido.addEventListener("submit", (event) => {
    event.preventDefault();
    if(!nuevoPedido.cliente) {
        alert("Debe seleccionar un cliente")
        return;
    }
    if(nuevoPedido.detalle.length == 0) {
        alert("Debe agregar productos al pedido")
        return;
    }
    if(campoFechaEntrega.value == "") {
        alert("Debe seleccionar una fecha de entrega")
        return;
    }

    nuevoPedido.fecha_entrega = campoFechaEntrega.value

    axios.post("http://localhost:3000/pedidos", nuevoPedido)
    .then(respuesta => {
        if (respuesta.data.error) {
            alert(respuesta.data.error)
        } else {
            alert(respuesta.data.message)
            location.reload()
        }
    })
    .catch(error => {
        if(error.response.data.error) {
            alert(error.response.data.error)
        } else {
            alert(error.message)
        }
    })
})

const botonCerrarSesion = document.getElementById("botonCerrarSesion");
    botonCerrarSesion.addEventListener("click", (event) => {
      event.preventDefault();
      localStorage.removeItem("usuario");
      location.href = "login.html"
    })

