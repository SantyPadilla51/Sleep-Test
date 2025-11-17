const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmar = document.getElementById("confirmar");
const edad = document.getElementById("edad");
const genero = document.getElementById("genero");

async function registrarUsuario(e) {
  e.preventDefault();

  const nombre = usuario.value.trim();
  const mail = email.value.trim();
  const contrasena = password.value.trim();
  const conf = confirmar.value.trim();
  const age = edad.value.trim();
  const gen = genero.value.trim();

  if (!nombre || !mail || !contrasena || !conf || !age || !gen) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  if (contrasena !== conf) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        email: mail,
        contrasena,
        genero: gen,
        edad: age,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Error al registrarse");

    alert("Cuenta creada con éxito ✅");
    window.location.href =
      "http://127.0.0.1:5500/frontend/components/login.html";
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo registrar el usuario ❌");
  }
}

document
  .getElementById("formRegistro")
  .addEventListener("submit", registrarUsuario);
