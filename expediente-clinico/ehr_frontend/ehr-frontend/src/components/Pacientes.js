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
        axios.get('/pacientes')
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
        axios.post('/pacientes', nuevoPaciente)
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
        axios.post('/estudios', { ...nuevoEstudio, paciente_id: pacienteSeleccionado })
            .then(response => {
                setNuevoEstudio({ tipo_estudio: '', resultados: '', fecha: '' });
                alert('Estudio agregado correctamente');
            })
            .catch(error => {
                console.error('Error agregando estudio:', error);
            });
    };

    return (
        <div className="pacientes-container">
            <h1>Lista de Pacientes</h1>
            <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="btn-agregar"
            >
                {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Paciente'}
            </button>

            <div className={`formulario-paciente ${mostrarFormulario ? 'mostrar' : ''}`}>
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

            <div className="lista-pacientes">
                {pacientes.map(paciente => (
                    <div key={paciente.id} className="paciente-card">
                        <h2>{paciente.nombre}</h2>
                        <p>Edad: {paciente.edad} años</p>
                        <p>Género: {paciente.genero}</p>
                        <p>Dirección: {paciente.direccion}</p>
                        <button onClick={() => setPacienteSeleccionado(paciente.id)}>Agregar Estudio</button>
                        <Link to={`/pacientes/${paciente.id}/consultas`} className="btn-estudio">Agregar Consulta</Link>
                    </div>
                ))}
            </div>

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