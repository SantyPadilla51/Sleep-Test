document.getElementById("formRegistro").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("usuario").value.trim();
  const email = document.getElementById("email").value.trim();
  const contrasena = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar").value;

  // ✅ OBTENER VALORES QUE FALTABAN
  const genero = document.getElementById("genero").value;
  const edad = parseInt(document.getElementById("edad").value);

  // Validación
  if (contrasena !== confirmar) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const data = {
    nombre,
    email,
    contrasena,
    genero,
    edad
  };

  try {
    const res = await fetch("/usuarios/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json.message || "Error en el registro.");
      return;
    }

    alert("Registro exitoso ✅");
    window.location.href = "../login/index.html";

  } catch (err) {
    console.error(err);
    alert("Error en el registro");
  }
});
