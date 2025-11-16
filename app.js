require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./backend/src/routes/usuarios.routes");
const adminRoutes = require("./backend/src/routes/admin.routes");
const preguntasRoutes = require("./backend/src/routes/preguntas.routes");
const respuestasRoutes = require("./backend/src/routes/respuestas.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/admin", adminRoutes);
app.use("/usuarios", usuariosRoutes);
app.use('/respuestas', respuestasRoutes);

app.use("/preguntas", preguntasRoutes);
app.use("/respuestas", respuestasRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en puerto ${PORT}`);
});

