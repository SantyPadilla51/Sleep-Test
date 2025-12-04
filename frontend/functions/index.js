// // Referencias
// const btnSueno = document.getElementById("btnSueno");
// const btnEjercicio = document.getElementById("btnEjercicio");
// const btnSocial = document.getElementById("btnSocial");

// const formSueno = document.getElementById("formSueno");
// const formEjercicio = document.getElementById("formEjercicio");
// const formSocial = document.getElementById("formSocial");

// const lista = document.getElementById("listaRegistros");

// // Datos del gráfico
// const datos = {
//   sueno: {},
//   ejercicio: {},
//   social: {},
// };

// // Mostrar/ocultar formularios
// const ocultarFormularios = () => {
//   formSueno.classList.add("d-none");
//   formEjercicio.classList.add("d-none");
//   formSocial.classList.add("d-none");
// };

// btnSueno.addEventListener("click", () => {
//   ocultarFormularios();
//   formSueno.classList.remove("d-none");
// });

// btnEjercicio.addEventListener("click", () => {
//   ocultarFormularios();
//   formEjercicio.classList.remove("d-none");
// });

// btnSocial.addEventListener("click", () => {
//   ocultarFormularios();
//   formSocial.classList.remove("d-none");
// });

// document.addEventListener("DOMContentLoaded", () => {
//   actualizarTabla()
// });

// // Función para actualizar lista y gráfico
// async function agregarRegistro(tipo, dia, horas) {

//   const tipoDeTabla = tipo
//   const descripcion1 = capitalize(dia)
//   const descripcion2 = horas

//   if (!tipoDeTabla || !descripcion1 || !descripcion2) {
//     alert("Por favor, completá todos los campos.");
//     return;
//   }

//   try {
//     const response = await fetch("http://localhost:8080/diagnostico/registro", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ tipoDeTabla, descripcion1, descripcion2 }),
//     });

//     const data = await response.json();
//     if (!response.ok) throw new Error(data.message || "Error en la carga de datos");
//     alert("cargada con éxito ✅");
//   } catch (error) {
//     console.error("Error:", error);
//     alert("No se pudo crear ❌");
//   }

//   actualizarTabla()

// }


// // async function actualizarTabla() {
// //   try {
// //     const response = await fetch("http://localhost:8080/diagnostico/obtener");

// //     if (!response.ok) {
// //       throw new Error("Error al obtener los datos");
// //     }

// //     const data = await response.json(); // datos desde el backend

// //     // Datos para el gráfico
// //     const datos = {
// //       sueño: {},
// //       ejercicio: {},
// //       social: {},
// //     };

// //     // ---------------------------
// //     // 1. MOSTRAR DATOS EN LISTA
// //     // ---------------------------
// //     lista.innerHTML = ""; // vaciar lista antes de cargar

// //     data.forEach((item) => {
// //       const tipo = item.tipoDeTabla.toLowerCase();  // sueño / ejercicio / social
// //       const dia = item.descripcion1;                // lunes, martes…
// //       const horas = Number(item.descripcion2);      // número

// //       // Preparar datos para el gráfico
// //       if (!datos[tipo]) datos[tipo] = {};
// //       datos[tipo][dia] = horas;

// //       // ---------------------------
// //       // CREACIÓN DEL <li>
// //       // ---------------------------
// //       const li = document.createElement("li");
// //       li.classList.add("list-group-item");

// //       const texto = document.createElement("span");
// //       texto.textContent = `${item.tipoDeTabla}: ${item.descripcion2}h de ${item.descripcion1}`;
// //       li.appendChild(texto);

// //       // ---------------------------
// //       // BOTÓN ELIMINAR
// //       // ---------------------------
// //       const btnEliminar = document.createElement("button");
// //       btnEliminar.textContent = "✖";
// //       btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
// //       btnEliminar.style.float = "right";

// //       btnEliminar.addEventListener("click", async () => {
// //         const confirmar = confirm("¿Eliminar este registro?");
// //         if (!confirmar) return;

// //         try {
// //           const resp = await fetch(
// //             `http://localhost:8080/diagnostico/borrar/${item.id}`,
// //             { method: "DELETE" }
// //           );

// //           if (!resp.ok) throw new Error("No se pudo eliminar");

// //           console.log("Registro eliminado");

// //           // RE-CARGAR lista + gráfico con datos reales
// //           actualizarTabla();

// //         } catch (error) {
// //           console.error("Error al eliminar:", error);
// //         }
// //       });

// //       li.appendChild(btnEliminar);
// //       lista.appendChild(li);
// //     });

// //     console.log("Registros cargados correctamente");

// //     // ---------------------------
// //     // 2. ACTUALIZAR EL GRÁFICO
// //     // ---------------------------
// //     actualizarGrafico(datos);

// //   } catch (error) {
// //     console.error("Error:", error);
// //     alert("No se pudieron cargar los datos ❌");
// //   }
// // }




// async function actualizarTabla() {
//   try {
//     const response = await fetch("http://localhost:8080/diagnostico/obtener");

//     if (!response.ok) throw new Error("Error al obtener los datos");

//     const data = await response.json();

//     const datos = { sueño: {}, ejercicio: {}, social: {} };

//     lista.innerHTML = "";

//     data.forEach((item) => {
//       const tipo = item.tipoDeTabla.toLowerCase();
//       const dia = item.descripcion1;
//       const horas = Number(item.descripcion2);

//       if (!datos[tipo]) datos[tipo] = {};
//       datos[tipo][dia] = horas;

//       const li = document.createElement("li");
//       li.classList.add("list-group-item");

//       const texto = document.createElement("span");
//       texto.textContent = `${item.tipoDeTabla}: ${horas}h de ${dia}`;
//       li.appendChild(texto);

//       const contenedorBotones = document.createElement("span");
//       contenedorBotones.style.float = "right";

//       // 🔍 BOTÓN MODIFICAR
//       const btnModificar = document.createElement("button");
//       btnModificar.textContent = "🔍";
//       btnModificar.classList.add("btn", "btn-info", "btn-sm", "me-2");

//       btnModificar.addEventListener("click", () => {
//         window.location.href = `modificar.html?id=${item.id}`;
//       });

//       // ✖ BOTÓN ELIMINAR
//       const btnEliminar = document.createElement("button");
//       btnEliminar.textContent = "✖";
//       btnEliminar.classList.add("btn", "btn-danger", "btn-sm");

//       btnEliminar.addEventListener("click", async () => {
//         const confirmar = confirm("¿Eliminar este registro?");
//         if (!confirmar) return;

//         try {
//           const resp = await fetch(
//             `http://localhost:8080/diagnostico/borrar/${item.id}`,
//             { method: "DELETE" }
//           );

//           if (!resp.ok) throw new Error("No se pudo eliminar");

//           actualizarTabla();
//         } catch (error) {
//           console.error("Error al eliminar:", error);
//         }
//       });

//       contenedorBotones.appendChild(btnModificar);
//       contenedorBotones.appendChild(btnEliminar);
//       li.appendChild(contenedorBotones);

//       lista.appendChild(li);
//     });

//     actualizarGrafico(datos);

//   } catch (error) {
//     console.error("Error:", error);
//     alert("No se pudieron cargar los datos ❌");
//   }
// }





// formSueno.addEventListener("submit", (e) => {
//   e.preventDefault();
//   agregarRegistro("sueño", suenoDia.value, suenoHoras.value);
//   formSueno.reset();
// });

// formEjercicio.addEventListener("submit", (e) => {
//   e.preventDefault();
//   agregarRegistro("ejercicio", ejercicioDia.value, ejercicioHoras.value);
//   formEjercicio.reset();
// });

// formSocial.addEventListener("submit", (e) => {
//   e.preventDefault();
//   agregarRegistro("social", socialDia.value, socialHoras.value);
//   formSocial.reset();
// });







// // Gráfico con Chart.js
// const ctx = document.getElementById("graficoSemanal");
// const grafico = new Chart(ctx, {
//   type: "bar",
//   data: {
//     labels: [
//       "Lunes",
//       "Martes",
//       "Miércoles",
//       "Jueves",
//       "Viernes",
//       "Sábado",
//       "Domingo",
//     ],
//     datasets: [
//       {
//         label: "Sueño",
//         data: [],
//         backgroundColor: "rgba(13, 110, 253, 0.7)",
//       },
//       {
//         label: "Ejercicio",
//         data: [],
//         backgroundColor: "rgba(25, 135, 84, 0.7)",
//       },
//       {
//         label: "Social",
//         data: [],
//         backgroundColor: "rgba(255, 193, 7, 0.7)",
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: "Horas" } },
//     },
//   },
// });



// function capitalize(texto) {
//   return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
// }










// // Actualizar gráfico según datos
// function actualizarGrafico(datos) {
//   const dias = grafico.data.labels;

//   // Sueño
//   grafico.data.datasets[0].data = dias.map(
//     (d) => datos["sueño"][d] || 0
//   );

//   // Ejercicio
//   grafico.data.datasets[1].data = dias.map(
//     (d) => datos["ejercicio"][d] || 0
//   );

//   // Social
//   grafico.data.datasets[2].data = dias.map(
//     (d) => datos["social"][d] || 0
//   );

//   grafico.update();
// }



const btnSueno = document.getElementById("btnSueno");
const btnEjercicio = document.getElementById("btnEjercicio");
const btnSocial = document.getElementById("btnSocial");

const formSueno = document.getElementById("formSueno");
const formEjercicio = document.getElementById("formEjercicio");
const formSocial = document.getElementById("formSocial");

const lista = document.getElementById("listaRegistros");

// ---------------------------------------------
// DATOS PRINCIPALES DEL GRÁFICO
// ---------------------------------------------
let datos = {
  sueño: {},
  ejercicio: {},
  social: {},
};

// ---------------------------------------------
// MOSTRAR / OCULTAR FORMULARIOS
// ---------------------------------------------
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

// ---------------------------------------------
// AGREGAR REGISTRO
// ---------------------------------------------
async function agregarRegistro(tipo, dia, horas) {
  const tipoDeTabla = tipo;
  const descripcion1 = capitalize(dia);
  const descripcion2 = horas;

  try {
    const response = await fetch("http://localhost:8080/diagnostico/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipoDeTabla, descripcion1, descripcion2 }),
    });

    if (!response.ok) throw new Error("Error al cargar registro");

    alert("Cargada con éxito ✅");
    actualizarTabla();

  } catch (error) {
    console.error(error);
    alert("No se pudo crear ❌");
  }
}

// ---------------------------------------------
// ACTUALIZAR TABLA + GRÁFICO
// ---------------------------------------------
async function actualizarTabla() {
  try {
    const response = await fetch("http://localhost:8080/diagnostico/obtener");
    if (!response.ok) throw new Error("Error al obtener datos");

    const data = await response.json();

    // Reiniciar datos del gráfico cada vez
    datos = {
      sueño: {},
      ejercicio: {},
      social: {},
    };

    lista.innerHTML = "";

    data.forEach((item) => {
      const tipo = item.tipoDeTabla.toLowerCase(); // sueño, ejercicio, social
      const dia = item.descripcion1;
      const horas = Number(item.descripcion2);

      if (!datos[tipo]) datos[tipo] = {};
      datos[tipo][dia] = horas;

      const li = document.createElement("li");
      li.classList.add("list-group-item");

      const texto = document.createElement("span");
      texto.textContent = `${item.tipoDeTabla}: ${horas}h de ${dia}`;
      li.appendChild(texto);

      const btns = document.createElement("span");
      btns.style.float = "right";

      // 🔍 BOTÓN MODIFICAR
      const btnModificar = document.createElement("button");
      btnModificar.textContent = "🔍";
      btnModificar.classList.add("btn", "btn-info", "btn-sm", "me-2");
      btnModificar.addEventListener("click", () => {
        window.location.href = `modificar.html?id=${item.id}`;
      });

      // ✖ BOTÓN ELIMINAR
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "✖";
      btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
      btnEliminar.addEventListener("click", async () => {
        if (!confirm("¿Eliminar este registro?")) return;

        const resp = await fetch(
          `http://localhost:8080/diagnostico/borrar/${item.id}`,
          { method: "DELETE" }
        );

        if (!resp.ok) {
          alert("No se pudo eliminar❌");
          return;
        }

        actualizarTabla();
      });

      btns.appendChild(btnModificar);
      btns.appendChild(btnEliminar);
      li.appendChild(btns);

      lista.appendChild(li);
    });

    actualizarGrafico(datos);

  } catch (error) {
    console.error(error);
    alert("No se pudieron cargar los datos ❌");
  }
}

// ---------------------------------------------
// EVENTOS PARA AGREGAR
// ---------------------------------------------
formSueno.addEventListener("submit", (e) => {
  e.preventDefault();
  agregarRegistro("sueño", suenoDia.value, suenoHoras.value);
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

// ---------------------------------------------
// GRÁFICO
// ---------------------------------------------
const ctx = document.getElementById("graficoSemanal");
const grafico = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Lunes",
      "Martes",
      "Miercoles",
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

// ---------------------------------------------
// ACTUALIZAR GRÁFICO CON DATOS
// ---------------------------------------------
function actualizarGrafico(datos) {
  const dias = grafico.data.labels;

  grafico.data.datasets[0].data = dias.map((d) => datos["sueño"][d] || 0);
  grafico.data.datasets[1].data = dias.map((d) => datos["ejercicio"][d] || 0);
  grafico.data.datasets[2].data = dias.map((d) => datos["social"][d] || 0);

  grafico.update();
}

// ---------------------------------------------
// ENTRADA GARANTIZADA: SIEMPRE CARGA TABLA
// ---------------------------------------------
function iniciarApp() {
  actualizarTabla();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarApp);
} else {
  iniciarApp();
}

// ---------------------------------------------
// CAPITALIZAR TEXTO
// ---------------------------------------------
function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}