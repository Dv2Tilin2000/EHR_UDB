const express = require("express");
const router = express.Router();
const db = require("../db"); // Importamos la conexión a la BD

// Obtener todos los pacientes
router.get("/", (req, res) => {
  db.query("SELECT * FROM pacientes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un paciente por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM pacientes WHERE idpaciente = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(result[0]);
  });
});

// Crear un nuevo paciente
router.post("/", (req, res) => {
  const { nombres, apellidos, fechadenacimiento, genero, email, direccion } = req.body;
  db.query(
    "INSERT INTO pacientes (nombres, apellidos, fechadenacimiento, genero, email, direccion) VALUES (?, ?, ?, ?, ?, ?)",
    [nombres, apellidos, fechadenacimiento, genero, email, direccion],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Paciente creado", id: result.insertId });
    }
  );
});

// Actualizar un paciente
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, fechadenacimiento, genero, email, direccion } = req.body;
  db.query(
    "UPDATE pacientes SET nombres=?, apellidos=?, fechadenacimiento=?, genero=?, email=?, direccion=? WHERE idpaciente=?",
    [nombres, apellidos, fechadenacimiento, genero, email, direccion, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Paciente actualizado" });
    }
  );
});

// Eliminar un paciente
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pacientes WHERE idpaciente = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Paciente eliminado" });
  });
});

module.exports = router;
