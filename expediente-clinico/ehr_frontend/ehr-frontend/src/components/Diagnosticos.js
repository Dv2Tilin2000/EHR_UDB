import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Diagnosticos.css';

const Diagnosticos = () => {
    const { id } = useParams(); // ID de la consulta
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [nuevoDiagnostico, setNuevoDiagnostico] = useState({
        codigo_enfermedad: '',
        descripcion: ''
    });

    // Obtener los diagnósticos de la consulta
    useEffect(() => {
        axios.get(`/consultas/${id}/diagnosticos`)
            .then(response => {
                console.log('Diagnósticos recibidos:', response.data); // Agrega este console.log
                setDiagnosticos(response.data);
            })
            .catch(error => {
                console.error('Error fetching diagnosticos:', error);
            });
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevoDiagnostico({
            ...nuevoDiagnostico,
            [e.target.name]: e.target.value
        });
    };

    // Agregar un nuevo diagnóstico
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/diagnosticos', { ...nuevoDiagnostico, consulta_id: id })
            .then(response => {
                setDiagnosticos([...diagnosticos, response.data]);
                setNuevoDiagnostico({ codigo_enfermedad: '', descripcion: '' });
            })
            .catch(error => {
                console.error('Error agregando diagnóstico:', error);
            });
    };

    return (
        <div className="diagnosticos-container">
            <h1>Diagnósticos de la Consulta</h1>
            <ul>
                {diagnosticos.map(diagnostico => (
                    <li key={diagnostico.id}>
                        <strong>Interpretaciones/Hallazgos :</strong> {diagnostico.codigo_enfermedad} - <strong>Indicaciones:</strong> {diagnostico.descripcion}
                    </li>
                ))}
            </ul>

            <div className="formulario-diagnostico">
                <h2>Agregar Nuevo Diagnóstico</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="codigo_enfermedad"
                        placeholder="Interpretaciones/Hallazgos"
                        value={nuevoDiagnostico.codigo_enfermedad}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="descripcion"
                        placeholder="Indicaciones"
                        value={nuevoDiagnostico.descripcion}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
    );
};

export default Diagnosticos;