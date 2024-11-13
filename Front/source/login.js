if(localStorage.getItem("usuario")) {
    location.href = "panel.html"
}

const formularioLogin = document.getElementById("formularioLogin")
formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault()

    const datos = new FormData(formularioLogin)
    
    console.log(datos.get("usuario"));
    

    if(datos.get("usuario") != "luciapiglia" || datos.get("password") != "12345") {
        alert("Usuario o clave incorrecta");
        return;
    }

    localStorage.setItem("usuario", "Lucia Pigliacampi") 

    location.href = "panel.html"
    
})