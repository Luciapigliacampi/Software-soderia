const formularioLogin = document.getElementById("formularioLogin")
formularioLogin.addEventListener('submit', (event) => {
    event.preventDefault()

    const datos = new FormData(formularioLogin)

    location.href = "http://127.0.0.1:5500/Software-soderia/Front/panel.html"
    
})