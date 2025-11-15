const usuario = document.getElementById("email");
const password = document.getElementById("contrasena");

async function iniciarSesion(e) {
  e.preventDefault();
  console.log("Iniciando sesion..");

  const user = usuario.value.trim();
  const pass = password.value.trim();

  // Validación básica
  if (!user || !pass) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user, contrasena: pass }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    alert("Inicio de sesión exitoso ✅");

    // Guardar token o redirigir al dashboard
    localStorage.setItem("token", data.token);
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

document.querySelector("form").addEventListener("submit", iniciarSesion);
