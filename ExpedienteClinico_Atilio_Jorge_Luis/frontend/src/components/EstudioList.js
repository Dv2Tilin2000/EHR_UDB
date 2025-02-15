import React from 'react';

const EstudioList = ({ estudios }) => {

  // Función para cambiar el estado de un estudio
  const handleCambioEstado = async (idestudio, resultado) => {
    const nuevoResultado = resultado === 'Pendiente' ? 'Atendido' : 'Pendiente';
    
    // Actualizar el estado del estudio en el backend
    await fetch(`http://localhost:3000/estudios/${idestudio}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultado: nuevoResultado }),
    });

    // Actualizar la lista de estudios
    const response = await fetch(`http://localhost:3000/estudios`);
    const updatedEstudios = await response.json();

    // Aquí deberías actualizar el estado de estudios (esto sería idealmente a través de una función de callback que venga de App.js)
    // setEstudios(updatedEstudios); // Este es el paso que hace falta para actualizar el estado en el padre
  };

  return (
    <div>
      <h2>Lista de Estudios</h2>
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
          {estudios.map((estudio) => (
            <tr key={estudio.idestudio}>
              <td>{estudio.descripcionestudio}</td>
              <td>{estudio.modalidad}</td>
              <td>{estudio.resultado}</td>
              <td>{new Date(estudio.fechahora).toLocaleString()}</td>
              <td>
                <button onClick={() => handleCambioEstado(estudio.idestudio, estudio.resultado)}>
                  Cambiar Estado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudioList;
