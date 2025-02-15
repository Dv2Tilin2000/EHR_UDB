import React, { useState } from 'react';

const EstudioForm = ({ idpaciente, agregarEstudio }) => {
  const [codigoestudio, setCodigoestudio] = useState('');
  const [descripcionestudio, setDescripcionestudio] = useState('');
  const [modalidad, setModalidad] = useState('General');
  const [resultado, setResultado] = useState('No atendido');
  const [fechahora, setFechahora] = useState(new Date().toISOString());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoEstudio = {
      idpaciente,
      codigoestudio,
      descripcionestudio,
      modalidad,
      resultado,
      fechahora,
    };

    // Llamada para agregar el estudio
    await fetch(`http://localhost:3000/estudios/${idpaciente}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEstudio),
    });

    // Actualizamos la lista de estudios en el componente principal
    agregarEstudio(nuevoEstudio);

    // Limpiamos el formulario
    setCodigoestudio('');
    setDescripcionestudio('');
    setModalidad('General');
    setResultado('No atendido');
    setFechahora(new Date().toISOString());
  };

  const handleResultadoChange = () => {
    setResultado(resultado === 'Atendido' ? 'No atendido' : 'Atendido');
  };

  return (
    <div className="form-container">
      <h2>Agregar Estudio</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Código del Estudio"
                  value={codigoestudio}
                  onChange={(e) => setCodigoestudio(e.target.value)}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Descripción del Estudio"
                  value={descripcionestudio}
                  onChange={(e) => setDescripcionestudio(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  required
                >
                  <option value="General">General</option>
                  <option value="Especializado">Especializado</option>
                </select>
              </td>
              <td>
                <input
                  type="datetime-local"
                  value={fechahora}
                  onChange={(e) => setFechahora(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="button" onClick={handleResultadoChange}>
                  Cambiar Estado a {resultado === 'Atendido' ? 'No atendido' : 'Atendido'}
                </button>
              </td>
              <td>
                <input
                  type="text"
                  readOnly
                  value={resultado}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button type="submit">Agregar Estudio</button>
        </div>
      </form>
    </div>
  );
};

export default EstudioForm;
