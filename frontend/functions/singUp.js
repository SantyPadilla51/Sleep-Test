const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmar = document.getElementById("confirmar");

async function registrarUsuario(e) {
  e.preventDefault();

  const user = usuario.value.trim();
  const mail = email.value.trim();
  const pass = password.value.trim();
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
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario: user, email: mail, password: pass }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Error al registrarse");

    alert("Cuenta creada con éxito ✅");
    window.location.href = "/login.html";
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo registrar el usuario ❌");
  }
}

document
  .getElementById("formRegistro")
  .addEventListener("submit", registrarUsuario);
