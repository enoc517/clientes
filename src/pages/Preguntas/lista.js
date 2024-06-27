import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PreguntasIndex = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/preguntas');
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        setError('Error al obtener las preguntas');
      }
    };

    fetchPreguntas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/preguntas/${id}`);
      setPreguntas(preguntas.filter(pregunta => pregunta.preguntasId !== id));
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
      setError('Error al eliminar la pregunta');
    }
  };

  return (
    <div className="container">
      <h3 className="my-4">Listado de Preguntas</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/agregar-pregunta" className="btn btn-primary mb-3">Crear Nueva Pregunta</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Enunciado</th>
            <th>Sección ID</th>
            <th>Fecha de Creación</th>
            <th>Creador</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {preguntas.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No hay preguntas disponibles</td>
            </tr>
          ) : (
            preguntas.map((pregunta) => (
              <tr key={pregunta.preguntasId}>
                <td>{pregunta.preguntasId}</td>
                <td>{pregunta.enunciado}</td>
                <td>{pregunta.seccionId}</td>
                <td>{pregunta.fechaCreacion}</td>
                <td>{pregunta.creadorPregunta}</td>
                <td>{pregunta.activo ? 'Sí' : 'No'}</td>
                <td>
                  <Link to={`/editar-pregunta/${pregunta.preguntasId}`} className="btn btn-warning btn-sm mr-2">Editar</Link>
                  <button onClick={() => handleDelete(pregunta.preguntasId)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PreguntasIndex;
