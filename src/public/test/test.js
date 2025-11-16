const respuestas = {};

function guardarRespuesta(preguntaId, respuesta) {
  respuestas[preguntaId] = respuesta;
  localStorage.setItem("respuestasTest", JSON.stringify(respuestas));
}
const savedRespuestas = JSON.parse(localStorage.getItem("respuestasTest"));
fetch("/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userData, respuestas: savedRespuestas })
});

const testContainer = document.getElementById("test-container");
const finalizarBtn = document.getElementById("finalizar");

// Generar session_id temporal
let sessionId = localStorage.getItem("session_id");
if (!sessionId) {
  sessionId = "sess_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("session_id", sessionId);
}

fetch("/api/preguntas")
  .then(res => res.json())
  .then(preguntas => {
    preguntas.forEach(p => {
      const div = document.createElement("div");
      div.innerHTML = `<p>${p.texto_pregunta}</p>`;
      
      p.opciones.forEach(opcion => {
        const label = document.createElement("label");
        label.innerHTML = `
          <input type="radio" name="pregunta-${p.id_pregunta}" value="${opcion}">
          ${opcion}
        `;
        div.appendChild(label);

        label.querySelector("input").addEventListener("change", () => {
          respuestas[p.id_pregunta] = opcion;

          fetch("/api/respuestas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: sessionId,
              id_usuario: null, 
              id_pregunta: p.id_pregunta,
              valor: opcion
            })
          });
        });
      });

      testContainer.appendChild(div);
    });
  });

finalizarBtn.addEventListener("click", () => {
  alert("Para guardar tus respuestas, registrate o inicia sesión.");
});

