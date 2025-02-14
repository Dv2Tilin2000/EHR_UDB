import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pacientes.css';

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [nuevoPaciente, setNuevoPaciente] = useState({
        nombre: '',
        edad: '',
        genero: '',
        direccion: ''
    });
    const [nuevoEstudio, setNuevoEstudio] = useState({
        tipo_estudio: '',
        resultados: '',
        fecha: ''
    });
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Obtener la lista de pacientes al cargar el componente
    useEffect(() => {
        axios.get('http://localhost:3001/pacientes') // Usa la URL completa
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Error fetching pacientes:', error);
            });
    }, []);

    // Manejar cambios en el formulario de paciente
    const handleChangePaciente = (e) => {
        setNuevoPaciente({
            ...nuevoPaciente,
            [e.target.name]: e.target.value
        });
    };

    // Manejar cambios en el formulario de estudio
    const handleChangeEstudio = (e) => {
        setNuevoEstudio({
            ...nuevoEstudio,
            [e.target.name]: e.target.value
        });
    };

    // Agregar un nuevo paciente
    const handleSubmitPaciente = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/pacientes', nuevoPaciente) // Usa la URL completa
            .then(response => {
                setPacientes([...pacientes, response.data]);
                setNuevoPaciente({ nombre: '', edad: '', genero: '', direccion: '' });
                setMostrarFormulario(false); // Ocultar el formulario después de agregar
            })
            .catch(error => {
                console.error('Error agregando paciente:', error);
            });
    };

    // Agregar un nuevo estudio
    const handleSubmitEstudio = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/estudios', { ...nuevoEstudio, paciente_id: pacienteSeleccionado }) // Usa la URL completa
            .then(response => {
                setNuevoEstudio({ tipo_estudio: '', resultados: '', fecha: '' });
                setPacienteSeleccionado(null); // Resetear paciente seleccionado
                alert('Estudio agregado correctamente');
            })
            .catch(error => {
                console.error('Error agregando estudio:', error);
            });
    };

    // Eliminar un paciente
    const handleDeletePaciente = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
            axios.delete(`http://localhost:3001/pacientes/${id}`) // Usa la URL completa
                .then(() => {
                    setPacientes(pacientes.filter(paciente => paciente.id !== id));
                    alert('Paciente eliminado correctamente');
                })
                .catch(error => {
                    console.error('Error eliminando paciente:', error);
                    if (error.response) {
                        console.error('Respuesta del servidor:', error.response.data);
                        console.error('Código de estado:', error.response.status);
                    } else if (error.request) {
                        console.error('No se recibió respuesta del servidor');
                    } else {
                        console.error('Error configurando la solicitud:', error.message);
                    }
                    alert('Error al eliminar el paciente');
                });
        }
    };

    return (
        <div className="pacientes-container">
            <h1>Lista de Pacientes</h1>
            
            {/* Botón para mostrar/ocultar el formulario de paciente */}
            <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="btn-agregar"
            >
                {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Paciente'}
            </button>

            {/* Lista de pacientes */}
            <div className="lista-pacientes">
                {pacientes.map(paciente => (
                    <div key={paciente.id} className="paciente-card">
                        <h2>{paciente.nombre}</h2>
                        <p>Edad: {paciente.edad} años</p>
                        <p>Género: {paciente.genero}</p>
                        <p>Dirección: {paciente.direccion}</p>
                        <button onClick={() => setPacienteSeleccionado(paciente.id)}>Agregar Estudio</button>
                        <Link to={`/pacientes/${paciente.id}/consultas`} className="btn-estudio">Agregar Consulta</Link>
                        <button onClick={() => handleDeletePaciente(paciente.id)} className="btn-eliminar">Eliminar</button>
                    </div>
                ))}
            </div>

            {/* Formulario para agregar paciente */}
            {mostrarFormulario && (
                <div className="formulario-paciente">
                    <h2>Agregar Nuevo Paciente</h2>
                    <form onSubmit={handleSubmitPaciente}>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={nuevoPaciente.nombre}
                            onChange={handleChangePaciente}
                            required
                        />
                        <input
                            type="number"
                            name="edad"
                            placeholder="Edad"
                            value={nuevoPaciente.edad}
                            onChange={handleChangePaciente}
                            required
                        />
                        <select
                            name="genero"
                            value={nuevoPaciente.genero}
                            onChange={handleChangePaciente}
                            required
                        >
                            <option value="">Seleccione un género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={nuevoPaciente.direccion}
                            onChange={handleChangePaciente}
                            required
                        />
                        <button type="submit">Agregar</button>
                    </form>
                </div>
            )}

            {/* Formulario para agregar estudio */}
            {pacienteSeleccionado && (
                <div className="formulario-estudio">
                    <h2>Agregar Nuevo Estudio</h2>
                    <form onSubmit={handleSubmitEstudio}>
                        <input
                            type="text"
                            name="tipo_estudio"
                            placeholder="Tipo de Estudio"
                            value={nuevoEstudio.tipo_estudio}
                            onChange={handleChangeEstudio}
                            required
                        />
                        <textarea
                            name="resultados"
                            placeholder="Resultados"
                            value={nuevoEstudio.resultados}
                            onChange={handleChangeEstudio}
                            required
                        />
                        <input
                            type="date"
                            name="fecha"
                            value={nuevoEstudio.fecha}
                            onChange={handleChangeEstudio}
                            required
                        />
                        <button type="submit">Agregar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Pacientes;