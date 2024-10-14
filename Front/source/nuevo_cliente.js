obtenerLocalidades()
let selectLocalides = document.getElementById("localidad");
function obtenerLocalidades() {
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

    selectBarrios.innerHTML = "";

    if (id_localidad == "") {
        return
    }

    obtenerBarrios(id_localidad)
})

function obtenerBarrios(id_localidad) {
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

        })
        .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
        });
}

let selectTipoDoc = document.getElementById("tipoDocumento");

obtenerTipoDoc();

function obtenerTipoDoc() {
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

obtenerCondicionIVA();

function obtenerCondicionIVA() {
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

obtenerTipoCliente();

function obtenerTipoCliente() {
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

let formulario = document.getElementById('formulario');
let nombre = document.getElementById('nombre');
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
let contenedorErrores = document.getElementById("contenedorErrores");

formulario.addEventListener("submit", validarDatos);


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



    contenedorErrores.innerHTML = "";



    if (errores.length > 0) {

        errores.forEach(function (item, index) {
            parrafo = document.createElement('p');
            contenedorErrores.appendChild(parrafo);
            parrafo.textContent = item;
            parrafo.classList.add("mb-1")
        });
        return
    }


    let selectLocalides = document.getElementById("localidad");

    const cliente = crearObjeto()
    console.log(cliente);

    axios.post('http://localhost:3000/clientes', cliente)
        .then(response => {
            console.log('Cliente creado con éxito:', response.data);
        })
        .catch(error => {
            console.error('Hubo un error al crear el cliente:', error.response ? error.response.data : error.message);
        });

}


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