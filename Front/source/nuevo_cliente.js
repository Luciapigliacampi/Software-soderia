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

selectLocalides.addEventListener("change",function(){
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