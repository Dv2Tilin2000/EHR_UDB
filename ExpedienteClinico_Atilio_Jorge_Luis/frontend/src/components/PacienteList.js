import React, { useState, useEffect } from 'react';
import EstudioForm from './EstudioForm';

const PacienteList = ({ pacientes, setPacientes }) => {
  const [estudios, setEstudiosState] = useState({});
  const [showEstudioForm, setShowEstudioForm] = useState(false);
  const [currentPacienteId, setCurrentPacienteId] = useState(null);

  // Función para obtener los estudios de un paciente
  const getEstudios = async (idpaciente) => {
    const response = await fetch(`http://localhost:3000/estudios/${idpaciente}`);
    const data = await response.json();
    setEstudiosState((prevState) => ({
      ...prevState,
      [idpaciente]: data, // Guardamos los estudios del paciente específico
    }));
  };

  // Función para manejar el cambio de estado de un estudio específico
  const handleCambioEstadoEstudio = async (idestudio, estado, idpaciente) => {
    const nuevoEstado = estado === 'No atendido' ? 'Atendido' : 'No atendido';
    
    // Actualizar el estado del estudio en la base de datos
    await fetch(`http://localhost:3000/estudios/${idestudio}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultado: nuevoEstado }),
    });

    // Actualizar solo el estado del estudio específico en el estado local
    setEstudiosState((prevState) => {
      const updatedEstudios = prevState[idpaciente].map((estudio) => {
        if (estudio.idestudio === idestudio) {
          return { ...estudio, resultado: nuevoEstado };
        }
        return estudio;
      });
      return {
        ...prevState,
        [idpaciente]: updatedEstudios,
      };
    });
  };

  // Función para eliminar un paciente
  const handleEliminarPaciente = async (idpaciente) => {
    await fetch(`http://localhost:3000/pacientes/${idpaciente}`, {
      method: 'DELETE',
    });

    // Eliminar el paciente de la lista local después de la eliminación
    setPacientes((prevState) => prevState.filter((paciente) => paciente.idpaciente !== idpaciente));
  };

  const handleAgregarEstudio = (idpaciente) => {
    setShowEstudioForm(true);
    setCurrentPacienteId(idpaciente);
  };

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.idpaciente}>
              <td>{paciente.nombres}</td>
              <td>{paciente.apellidos}</td>
              <td>
                <button onClick={() => handleAgregarEstudio(paciente.idpaciente)}>
                  Agregar Estudio
                </button>
                <button onClick={() => handleEliminarPaciente(paciente.idpaciente)}>
                  Eliminar Paciente
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mostrar formulario de estudio */}
      {showEstudioForm && (
        <EstudioForm
          idpaciente={currentPacienteId}
          agregarEstudio={(nuevoEstudio) => {
            setEstudiosState((prevState) => {
              const updatedEstudios = prevState[currentPacienteId]
                ? [...prevState[currentPacienteId], nuevoEstudio]
                : [nuevoEstudio];
              return {
                ...prevState,
                [currentPacienteId]: updatedEstudios,
              };
            });
          }}
        />
      )}

      {/* Mostrar los estudios del paciente seleccionado */}
      {pacientes.map((paciente) => (
        <div key={paciente.idpaciente}>
          <h3>Estudios de {paciente.nombres} {paciente.apellidos}</h3>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Modalidad</th>
                <th>Resultado</th>
                <th>Fecha y Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudios[paciente.idpaciente]?.map((estudio) => (
                <tr key={estudio.idestudio}>
                  <td>{estudio.descripcionestudio}</td>
                  <td>{estudio.modalidad}</td>
                  <td>{estudio.resultado}</td>
                  <td>{new Date(estudio.fechahora).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleCambioEstadoEstudio(estudio.idestudio, estudio.resultado, paciente.idpaciente)
                      }
                    >
                      Cambiar Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PacienteList;
