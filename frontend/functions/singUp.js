const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const contrasena = document.getElementById("contrasena");
const confirmar = document.getElementById("confirmar");

async function registrarUsuario(e) {
  e.preventDefault();

  const user = nombre.value.trim();
  const mail = email.value.trim();
  const pass = contrasena.value.trim();
  const conf = confirmar.value.trim();

  if (!user || !mail || !pass || !conf) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  if (pass !== conf) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: user, email: mail, contrasena: pass }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Error al registrarse");

    alert("Cuenta creada con éxito ✅");
    window.location.href = "/frontend/components/login.html";
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo registrar el usuario ❌");
  }
}

document
  .getElementById("formRegistro")
  .addEventListener("submit", registrarUsuario);
