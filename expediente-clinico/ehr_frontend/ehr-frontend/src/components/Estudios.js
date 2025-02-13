import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Estudios.css';

const Estudios = () => {
    const { id } = useParams(); // ID del paciente
    const [estudios, setEstudios] = useState([]);
    const [nuevoEstudio, setNuevoEstudio] = useState({
        tipo_estudio: '',
        resultados: '',
        fecha: ''
    });

    // Obtener los estudios del paciente
    useEffect(() => {
        axios.get(`/pacientes/${id}/estudios`)
            .then(response => {
                console.log('Estudios recibidos:', response.data); // Agrega este console.log
                setEstudios(response.data);
            })
            .catch(error => {
                console.error('Error fetching estudios:', error);
            });
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevoEstudio({
            ...nuevoEstudio,
            [e.target.name]: e.target.value
        });
    };

    // Agregar un nuevo estudio
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/estudios', { ...nuevoEstudio, paciente_id: id })
            .then(response => {
                console.log('Estudio agregado:', response.data); // Agrega este console.log
                setEstudios([...estudios, response.data]);
                setNuevoEstudio({ tipo_estudio: '', resultados: '', fecha: '' });
            })
            .catch(error => {
                console.error('Error agregando estudio:', error);
            });
    };

    return (
        <div className="estudios-container">
            <h1>Resultados de Estudios del Paciente</h1>
            <ul>
                {estudios.map(estudio => (
                    <li key={estudio.id}>
                        <strong>Tipo:</strong> {estudio.tipo_estudio} - <strong>Resultados:</strong> {estudio.resultados} - <strong>Fecha:</strong> {estudio.fecha}
                    </li>
                ))}
            </ul>

            <div className="formulario-estudio">
                <h2>Agregar Nuevo Estudio</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="tipo_estudio"
                        placeholder="Tipo de Estudio"
                        value={nuevoEstudio.tipo_estudio}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="resultados"
                        placeholder="Resultados"
                        value={nuevoEstudio.resultados}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="fecha"
                        value={nuevoEstudio.fecha}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
    );
};

export default Estudios;