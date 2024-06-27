import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Preguntas = () => {
  const [enunciado, setEnunciado] = useState('');
  const [seccionId, setSeccionId] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [creadorPregunta, setCreadorPregunta] = useState('');
  const [activo, setActivo] = useState('1');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enunciado || !seccionId || !fechaCreacion || !creadorPregunta) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const formData = {
      enunciado,
      seccionId,
      fechaCreacion,
      creadorPregunta,
      activo
    };

    try {
      const response = await axios.post('http://localhost:3000/api/preguntas', formData);
      if (response.status === 201) {
        console.log('Formulario enviado con éxito');
        setError('');
        navigate('/preguntas');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al enviar el formulario');
    }
  };

  return (
    <div className="container form-container" style={containerStyle}>
      <div className="form-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>Formulario de Preguntas</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="enunciado" className="form-label">Enunciado</label>
          <input type="text" className="form-control" id="enunciado" value={enunciado} onChange={(e) => setEnunciado(e.target.value)} placeholder="Ingrese Enunciado"/>
        </div>
        <div className="mb-3">
          <label htmlFor="seccionId" className="form-label">Sección ID</label>
          <input type="text" className="form-control" id="seccionId" value={seccionId} onChange={(e) => setSeccionId(e.target.value)} placeholder="Ingrese Sección ID"/>
        </div>
        <div className="mb-3">
          <label htmlFor="fechaCreacion" className="form-label">Fecha de Creación</label>
          <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="creadorPregunta" className="form-label">Creador de Pregunta</label>
          <input type="text" className="form-control" id="creadorPregunta" value={creadorPregunta} onChange={(e) => setCreadorPregunta(e.target.value)} placeholder="Ingrese el nombre del creador"/>
        </div>
        <div className="mb-3">
          <label htmlFor="activo" className="form-label">Activo</label>
          <select className="form-select" id="activo" value={activo} onChange={(e) => setActivo(e.target.value)}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-custom" style={{ backgroundColor: '#4e73df', color: 'white' }}>Agregar</button>
      </form>
    </div>
  );
};

const containerStyle = {
  backgroundColor: '#f8f9fa',
  maxWidth: '600px',
  margin: '50px auto',
  padding: '30px',
  border: '1px solid #e3e6f0',
  borderRadius: '10px',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
};

export default Preguntas;
