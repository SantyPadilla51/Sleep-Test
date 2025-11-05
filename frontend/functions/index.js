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

// Función para actualizar lista y gráfico
function agregarRegistro(tipo, dia, horas) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = `${dia}: ${horas}h de ${tipo}`;
  lista.appendChild(li);

  // Guardar datos
  if (!datos[tipo][dia]) datos[tipo][dia] = 0;
  datos[tipo][dia] += Number(horas);

  actualizarGrafico();
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

// Actualizar gráfico según datos
function actualizarGrafico() {
  const dias = grafico.data.labels;

  grafico.data.datasets[0].data = dias.map((d) => datos.sueno[d] || 0);
  grafico.data.datasets[1].data = dias.map((d) => datos.ejercicio[d] || 0);
  grafico.data.datasets[2].data = dias.map((d) => datos.social[d] || 0);

  grafico.update();
}
