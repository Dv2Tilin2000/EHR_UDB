import React, { useState, useEffect } from 'react';
import PacienteForm from './components/PacienteForm';
import PacienteList from './components/PacienteList';
import './styles.css'; // Importa los estilos

function App() {
  const [pacientes, setPacientes] = useState([]);

  // Función para obtener los pacientes
  const getPacientes = async () => {
    const response = await fetch('http://localhost:3000/pacientes');
    const data = await response.json();
    setPacientes(data);
  };

  // Obtener pacientes al cargar la página
  useEffect(() => {
    getPacientes();
  }, []);

  return (
    <div className="App">
      <h1>Expediente Clinico Harlem</h1>

      {/* Formulario de paciente */}
      <PacienteForm getPacientes={getPacientes} />

      {/* Lista de pacientes */}
      <PacienteList
        pacientes={pacientes}
        setPacientes={setPacientes} // Pasa setPacientes a PacienteList para manejar la eliminación
      />
    </div>
  );
}

export default App;
