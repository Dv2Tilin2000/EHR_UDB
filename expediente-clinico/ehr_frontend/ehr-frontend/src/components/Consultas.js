import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Consultas.css';

const Consultas = () => {
    const { id } = useParams(); // ID del paciente
    const navigate = useNavigate();
    const [consultas, setConsultas] = useState([]);
    const [nuevaConsulta, setNuevaConsulta] = useState({
        fecha: '',
        motivo: '',
        notas: ''
    });

    // Obtener las consultas del paciente
    useEffect(() => {
        axios.get(`/pacientes/${id}/consultas`)
            .then(response => {
                console.log('Consultas recibidas:', response.data);
                setConsultas(response.data);
            })
            .catch(error => {
                console.error('Error fetching consultas:', error);
            });
    }, [id]);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNuevaConsulta({
            ...nuevaConsulta,
            [e.target.name]: e.target.value
        });
    };

    // Agregar una nueva consulta
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/consultas', { ...nuevaConsulta, paciente_id: id })
            .then(response => {
                setConsultas([...consultas, response.data]);
                setNuevaConsulta({ fecha: '', motivo: '', notas: '' });
            })
            .catch(error => {
                console.error('Error agregando consulta:', error);
            });
    };

    // Eliminar paciente
    const handleDeletePaciente = () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer.')) {
            axios.delete(`/pacientes/${id}`)
                .then(() => {
                    alert('Paciente eliminado correctamente.');
                    navigate('/'); // Redirigir a la página principal después de la eliminación
                })
                .catch(error => {
                    console.error('Error eliminando paciente:', error);
                    alert('Hubo un error al eliminar el paciente.');
                });
        }
    };

    return (
        <div className="consultas-container">
            <h1>Consultas del Paciente</h1>

            {/* Botón para eliminar paciente */}
            <button className="btn-delete" onClick={handleDeletePaciente}>
                Eliminar Paciente
            </button>

            <ul>
                {consultas.map(consulta => (
                    <li key={consulta.id}>
                        <Link to={`/consultas/${consulta.id}/diagnosticos`}>
                            <strong>Fecha:</strong> {consulta.fecha} - <strong>Motivo:</strong> {consulta.motivo}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="formulario-consulta">
                <h2>Agregar Nueva Consulta</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="date"
                        name="fecha"
                        value={nuevaConsulta.fecha}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="motivo"
                        placeholder="Motivo"
                        value={nuevaConsulta.motivo}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="notas"
                        placeholder="Notas"
                        value={nuevaConsulta.notas}
                        onChange={handleChange}
                    />
                    <button type="submit">Agregar</button>
                </form>
            </div>
        </div>
    );
};

export default Consultas;
