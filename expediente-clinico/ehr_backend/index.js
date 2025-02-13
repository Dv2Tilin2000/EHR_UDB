// Importar dependencias
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

// Crear la aplicación Express
const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Parsear JSON en las solicitudes

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los pacientes
app.get('/pacientes', (req, res) => {
    const query = 'SELECT * FROM Pacientes';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo paciente
app.post('/pacientes', (req, res) => {
    const { nombre, edad, genero, direccion } = req.body;
    const query = 'INSERT INTO Pacientes (nombre, edad, genero, direccion) VALUES (?, ?, ?, ?)';
    connection.query(query, [nombre, edad, genero, direccion], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, nombre, edad, genero, direccion });
    });
});

// Ruta para obtener consultas
app.get('/pacientes/:id/consultas', (req, res) => {
    const pacienteId = req.params.id;
    const query = 'SELECT * FROM Consultas WHERE paciente_id = ?';
    connection.query(query, [pacienteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

//Ruta para agregar nueva consulta
app.post('/consultas', (req, res) => {
    const { paciente_id, fecha, motivo, notas } = req.body;
    const query = 'INSERT INTO Consultas (paciente_id, fecha, motivo, notas) VALUES (?, ?, ?, ?)';
    connection.query(query, [paciente_id, fecha, motivo, notas], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, paciente_id, fecha, motivo, notas });
    });
});

// Obtener diagnósticos de una consulta
app.get('/consultas/:id/diagnosticos', (req, res) => {
    const consultaId = req.params.id;
    const query = 'SELECT * FROM Diagnosticos WHERE consulta_id = ?';
    connection.query(query, [consultaId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Agregar un nuevo diagnóstico
app.post('/diagnosticos', (req, res) => {
    const { consulta_id, codigo_enfermedad, descripcion } = req.body;
    const query = 'INSERT INTO Diagnosticos (consulta_id, codigo_enfermedad, descripcion) VALUES (?, ?, ?)';
    connection.query(query, [consulta_id, codigo_enfermedad, descripcion], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: results.insertId, consulta_id, codigo_enfermedad, descripcion });
    });
});

// Obtener estudios de un paciente
app.get('/pacientes/:id/estudios', (req, res) => {
    const pacienteId = req.params.id;
    const query = 'SELECT * FROM Estudios WHERE paciente_id = ?';
    connection.query(query, [pacienteId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Agregar un nuevo estudio
app.post('/estudios', (req, res) => {
    const { paciente_id, tipo_estudio, resultados, fecha } = req.body;
    const query = 'INSERT INTO Estudios (paciente_id, tipo_estudio, resultados, fecha) VALUES (?, ?, ?, ?)';
    connection.query(query, [paciente_id, tipo_estudio, resultados, fecha], (err, results) => {
        if (err) {
            console.error('Error insertando estudio:', err); // Agrega este console.error
            return res.status(500).json({ error: err.message });
        }
        console.log('Estudio insertado:', results); // Agrega este console.log
        res.json({ id: results.insertId, paciente_id, tipo_estudio, resultados, fecha });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

