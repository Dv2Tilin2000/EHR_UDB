import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
    return (
        <div className="inicio-container">
            <h1>Bienvenido al Sistema de Expediente Clínico Electrónico</h1>
            <p>Seleccione una opción para comenzar:</p>
            <div className="opciones">
                <Link to="/pacientes" className="opcion">Pacientes</Link>
                 
            </div>
        </div>
    );
};

export default Inicio;