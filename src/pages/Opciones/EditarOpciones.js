import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const OpcionesEditar = () => {
  const { id } = useParams();
  const history = useHistory();

  const [textoOpcion, setTextoOpcion] = useState('');
  const [preguntaId, setPreguntaId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarOpcion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/opciones/${id}`);
        const opcion = response.data;

        setTextoOpcion(opcion.textoOpcion);
        setPreguntaId(opcion.preguntaId);
      } catch (error) {
        console.error('Error al cargar la opción:', error);
        setError('Error al cargar la opción');
      }
    };

    cargarOpcion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      textoOpcion,
      preguntaId
    };

    try {
      await axios.put(`http://localhost:3000/api/opciones/${id}`, formData);
      history.push('/opciones');
    } catch (error) {
      console.error('Error al actualizar la opción:', error);
      setError('Error al actualizar la opción');
    }
  };

  return (
    <div className="container">
      <h2>Editar Opción</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="textoOpcion" className="form-label">Texto de la Opción</label>
          <input type="text" className="form-control" id="textoOpcion" value={textoOpcion} onChange={(e) => setTextoOpcion(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="preguntaId" className="form-label">Pregunta ID</label>
          <input type="text" className="form-control" id="preguntaId" value={preguntaId} onChange={(e) => setPreguntaId(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default OpcionesEditar;
