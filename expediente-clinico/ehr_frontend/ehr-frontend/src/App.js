import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inicio from './components/Inicio';
import Pacientes from './components/Pacientes';
import Consultas from './components/Consultas'; 
import Estudios from './components/Estudios'; 
import Diagnosticos from './components/Diagnosticos';

const App = () => {
    return (
        <Router>
            {/* Navbar */}
            <nav className="navbar">
                <Link to="/" className="nav-link">Inicio</Link>
                <Link to="/pacientes" className="nav-link">Pacientes</Link>
                <Link to="/estudios" className="nav-link">Estudios</Link>
            </nav>

            {/* Rutas */}
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/pacientes/:id/consultas" element={<Consultas />} />
                <Route path="/estudios" element={<Estudios />} />
                <Route path="/consultas/:id/diagnosticos" element={<Diagnosticos />} />
            </Routes>
        </Router>
    );
};

export default App;