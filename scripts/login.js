// funcion que se encarga de la autenticacion del usuario
function handleLoginFormSubmit(event) {
    event.preventDefault() // Previene el envío predeterminado del formulario

    // Obtiene los valores de los campos de entrada
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    // Configura los datos que se enviarán
    const data = {
        username: username,
        password: password
    }

    // Usa Axios para realizar la petición POST
    axios
        .post("https://rinokey.com/restAuth.php", data)
        .then((response) => {
            // Supongamos que `response.data.success` es `true` si la autenticación es exitosa
            if (response.data.success) {
                //Agregar la respuesta al local storage.
                // !! Pasa el dato de ocultar: este valida si se va a
                // mostrar el contenido de axa con la funcion que genero el Meny
                //1 indica que no se le mostraran los datos  y
                // 0 que si se le mostraran
                localStorage.setItem(
                    "ocultarContenidoAxa",
                    JSON.stringify(response.data.ocultar)
                )
                localStorage.setItem(
                    "listaMostrarCompañias",
                    JSON.stringify(response.data.aseguradoras)
                )
                /* Datos de la peticion de LogIn */
                /* console.log('response.data',response.data) */

                //Redireccionamiento a dashboard
                window.location.href = "http://localhost:4444/app.html"
            } else {
                // Manejo de respuesta fallida
                alert("Correo o contraseña incorrecta.")
            }
        })
        .catch((error) => {
            console.error("Error durante la autenticación:", error)
            alert(
                "Error durante la autenticación, por favor verifica tu conexión."
            )
        })
}

// Visualización de la contraseña
const passwordInput = document.getElementById("password")
const passwordIcon = document.getElementById("password-icon")

// Muestra u oculta la contraseña al hacer clic en el icono
passwordIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        // Si la contraseña está oculta, muéstrala
        passwordInput.type = "text" // Cambia el tipo de entrada a texto
        passwordIcon.classList.remove("fa-eye-slash") // Cambia el icono a ojo abierto
        passwordIcon.classList.add("fa-eye") // Cambia el icono a ojo cerrado
    } else {
        // Si la contraseña está visible, ocúltala
        passwordInput.type = "password" // Cambia el tipo de entrada a contraseña
        passwordIcon.classList.remove("fa-eye") // Cambia el icono a ojo cerrado
        passwordIcon.classList.add("fa-eye-slash") // Cambia el icono a ojo abierto
    }
})

// Al cargar el contenido del documento
document.addEventListener("DOMContentLoaded", () => {
    printLoginDetails()
    // Agrega un controlador de eventos para el envío del formulario
    const loginForm = document.getElementById("loginForm")
    loginForm.addEventListener("submit", handleLoginFormSubmit)
    // Inicializa las partículas
    initParticles()
})

function printLoginDetails() {
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    usernameInput.value = "desarrollo@rinorisk.com"
    passwordInput.value = "iXBGbcTl4o"
}
