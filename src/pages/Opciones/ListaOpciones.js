import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OpcionesIndex = () => {
  const [opciones, setOpciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/opciones');
        setOpciones(response.data);
      } catch (error) {
        console.error('Error al cargar opciones:', error);
        setError('Error al cargar las opciones');
      }
    };

    fetchOpciones();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar esta opción?')) {
      try {
        await axios.delete(`http://localhost:3000/api/opciones/${id}`);
        setOpciones(opciones.filter(opcion => opcion.opcionId !== id));
      } catch (error) {
        console.error('Error al eliminar opción:', error);
        setError('Error al eliminar la opción');
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Listado de Opciones</h2>
        </div>
        <div className="col text-end">
          <Link to="/agregar-opcion" className="btn btn-primary">
            Crear Nueva Opción
          </Link>
        </div>
      </div>
      {opciones.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Opción ID</th>
              <th scope="col">Texto Opción</th>
              <th scope="col">Pregunta ID</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {opciones.map(opcion => (
              <tr key={opcion.opcionId}>
                <td>{opcion.opcionId}</td>
                <td>{opcion.textoOpcion}</td>
                <td>{opcion.preguntaId}</td>
                <td>
                  <Link to={`/opciones/edit/${opcion.opcionId}`} className="btn btn-sm btn-primary me-2">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(opcion.opcionId)} className="btn btn-sm btn-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay opciones disponibles.</p>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default OpcionesIndex;
