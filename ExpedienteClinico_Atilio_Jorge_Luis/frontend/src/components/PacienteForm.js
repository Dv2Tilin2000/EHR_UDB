import React, { useState } from 'react';

const PacienteForm = ({ getPacientes }) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [fechadenacimiento, setFechadenacimiento] = useState('');
  const [genero, setGenero] = useState('Masculino'); // Default value set to "Masculino"
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoPaciente = { nombres, apellidos, fechadenacimiento, genero, email, direccion };

    // Llamada a la API para agregar paciente
    await fetch('http://localhost:3000/pacientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoPaciente),
    });

    // Limpiar el formulario
    setNombres('');
    setApellidos('');
    setFechadenacimiento('');
    setGenero('Masculino');
    setEmail('');
    setDireccion('');

    // Obtener pacientes nuevamente
    getPacientes();
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Paciente</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><input
                type="text"
                placeholder="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
              /></td>
              <td><input
                type="text"
                placeholder="Apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
              /></td>
            </tr>
            <tr>
              <td><input
                type="date"
                value={fechadenacimiento}
                onChange={(e) => setFechadenacimiento(e.target.value)}
                required
              /></td>
              <td>
                <select
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /></td>
              <td><input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              /></td>
            </tr>
          </tbody>
        </table>

        <div className="button-container">
          <button type="submit">Agregar Paciente</button>
        </div>
      </form>
    </div>
  );
};

export default PacienteForm;
