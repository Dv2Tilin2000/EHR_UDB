require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Para leer JSON en las peticiones

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Cambia esto si tu usuario es diferente
  password: "1234", // Agrega tu contraseña si tienes una
  database: "expediente_clinico",
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Reconocer rutas pacientes
const pacientesRoutes = require("./routes/pacientes");
app.use("/pacientes", pacientesRoutes);

// Reconocer rutas estudios 
const estudiosRoutes = require("./routes/estudios");
app.use("/estudios", estudiosRoutes);

