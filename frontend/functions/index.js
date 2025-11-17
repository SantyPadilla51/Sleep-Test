// Referencias
const btnSueno = document.getElementById("btnSueno");
const btnEjercicio = document.getElementById("btnEjercicio");
const btnSocial = document.getElementById("btnSocial");

const formSueno = document.getElementById("formSueno");
const formEjercicio = document.getElementById("formEjercicio");
const formSocial = document.getElementById("formSocial");

const lista = document.getElementById("listaRegistros");

// Datos del gráfico
const datos = {
  sueno: {},
  ejercicio: {},
  social: {},
};

// Mostrar/ocultar formularios
const ocultarFormularios = () => {
  formSueno.classList.add("d-none");
  formEjercicio.classList.add("d-none");
  formSocial.classList.add("d-none");
};

btnSueno.addEventListener("click", () => {
  ocultarFormularios();
  formSueno.classList.remove("d-none");
});

btnEjercicio.addEventListener("click", () => {
  ocultarFormularios();
  formEjercicio.classList.remove("d-none");
});

btnSocial.addEventListener("click", () => {
  ocultarFormularios();
  formSocial.classList.remove("d-none");
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarTabla()
});

// Función para actualizar lista y gráfico
async function agregarRegistro(tipo, dia, horas) {

  const tipoDeTabla = tipo
  const descripcion1 = capitalize(dia)
  const descripcion2 = horas

   if (!tipoDeTabla || !descripcion1 || !descripcion2) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/diagnostico/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoDeTabla,descripcion1,descripcion2 }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Error en la carga de datos");
    alert("cargada con éxito ✅");
  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo crear ❌");
  }

  actualizarTabla()
  
}


async function actualizarTabla() {
  try {
    const response = await fetch("http://localhost:8080/diagnostico/obtener");
    
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }

    const data = await response.json(); // <-- la data del backend

    // ---------------------------
    // 1. MOSTRAR DATOS EN LISTA
    // ---------------------------
    lista.innerHTML = "";

    data.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `${item.tipoDeTabla}: ${item.descripcion2}h de ${item.descripcion1}`;
      lista.appendChild(li);
    });

    console.log("Registros cargados correctamente");

    // ---------------------------
    // 2. PREPARAR DATOS PARA EL GRAFICO
    // ---------------------------
    const datos = {
      sueño: {},
      ejercicio: {},
      social: {},
    };

    data.forEach((item) => {
      const tipo = item.tipoDeTabla.toLowerCase();  // sueño / ejercicio / social
      const dia = item.descripcion1;                // lunes, martes…
      const horas = Number(item.descripcion2);      // cantidad

      if (!datos[tipo]) datos[tipo] = {};
      datos[tipo][dia] = horas;
    });

    // ---------------------------
    // 3. ACTUALIZAR GRAFICO
    // ---------------------------
    actualizarGrafico(datos);

  } catch (error) {
    console.error("Error:", error);
    alert("No se pudieron cargar los datos ❌");
  }
}



// Manejar formularios
formSueno.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarRegistro("sueno", suenoDia.value, suenoHoras.value);
  formSueno.reset();
});

formEjercicio.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarRegistro("ejercicio", ejercicioDia.value, ejercicioHoras.value);
  formEjercicio.reset();
});

formSocial.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarRegistro("social", socialDia.value, socialHoras.value);
  formSocial.reset();
});




// Gráfico con Chart.js
const ctx = document.getElementById("graficoSemanal");
const grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Sueño",
        data: [],
        backgroundColor: "rgba(13, 110, 253, 0.7)",
      },
      {
        label: "Ejercicio",
        data: [],
        backgroundColor: "rgba(25, 135, 84, 0.7)",
      },
      {
        label: "Social",
        data: [],
        backgroundColor: "rgba(255, 193, 7, 0.7)",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Horas" } },
    },
  },
});



function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}










// Actualizar gráfico según datos
function actualizarGrafico(datos) {
  const dias = grafico.data.labels;

  // Sueño
  grafico.data.datasets[0].data = dias.map(
    (d) => datos["sueño"][d] || datos["sueno"]?.[d] || 0
  );

  // Ejercicio
  grafico.data.datasets[1].data = dias.map(
    (d) => datos["ejercicio"][d] || 0
  );

  // Social
  grafico.data.datasets[2].data = dias.map(
    (d) => datos["social"][d] || 0
  );

  grafico.update();
}
