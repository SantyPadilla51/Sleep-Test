require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Importar rutas (CommonJS)
//const adminRoutes = require("./routes/admin.routes");
//const preguntasRoutes = require("./routes/preguntas.routes");
//const respuestasRoutes = require("./routes/respuestas.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const testRoutes = require("./routes/test.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

//app.use("/admin", adminRoutes);
//app.use("/preguntas", preguntasRoutes);
//app.use("/respuestas", respuestasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("tests", testRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en puerto ${PORT}`);
});
