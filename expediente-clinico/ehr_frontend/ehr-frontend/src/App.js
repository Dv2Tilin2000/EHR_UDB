import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inicio from './components/Inicio';
import Pacientes from './components/Pacientes';
import Consultas from './components/Consultas';
import Estudios from './components/Estudios';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/" className="nav-link">Inicio</Link>
                <Link to="/pacientes" className="nav-link">Pacientes</Link>
                <Link to="/consultas" className="nav-link">Consultas</Link>
                <Link to="/estudios" className="nav-link">Estudios</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/pacientes" element={<Pacientes />} />
                <Route path="/consultas" element={<Consultas />} />
                <Route path="/estudios" element={<Estudios />} />
            </Routes>
        </Router>
    );
};

export default App;