const express = require("express");
const router = express.Router();
const db = require("../db"); // Importamos la conexión a MySQL

// Obtener todos los estudios
router.get("/", (req, res) => {
  db.query("SELECT * FROM estudios", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un estudio por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM estudios WHERE idestudio = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Estudio no encontrado" });
    }
    res.json(result[0]);
  });
});

// Crear un nuevo estudio
router.post("/", (req, res) => {
    const { idpaciente, codigoestudio, descripcionestudio, modalidad, resultado, fechahora } = req.body;
    
    db.query(
      "INSERT INTO estudios (idpaciente, codigoestudio, descripcionestudio, modalidad, resultado, fechahora) VALUES (?, ?, ?, ?, ?, ?)",
      [idpaciente, codigoestudio, descripcionestudio, modalidad, resultado, fechahora],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Estudio creado", id: result.insertId });
      }
    );
  });
  

// Actualizar un estudio
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { codigoestudio, descripcionestudio, modalidad, resultado, fechahora } = req.body;
  db.query(
    "UPDATE estudios SET codigoestudio=?, descripcionestudio=?, modalidad=?, resultado=?, fechahora=? WHERE idestudio=?",
    [codigoestudio, descripcionestudio, modalidad, resultado, fechahora, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Estudio actualizado" });
    }
  );
});

// Eliminar un estudio
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM estudios WHERE idestudio = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Estudio eliminado" });
  });
});

module.exports = router;
