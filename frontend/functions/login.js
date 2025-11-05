const usuario = document.getElementById("usuario");
const password = document.getElementById("password");

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
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario: user, password: pass }),
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
    alert("Usuario o contraseña incorrectos ❌");
  }
}

document.querySelector("form").addEventListener("submit", iniciarSesion);
