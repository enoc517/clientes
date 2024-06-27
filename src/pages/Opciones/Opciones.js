import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Opciones = () => {
  const [preguntasId, setPreguntasId] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [valor, setValor] = useState('');
  const [activo, setActivo] = useState('1');
  const [creadorOpcion, setCreadorOpcion] = useState('');
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!preguntasId || !respuesta || !valor || !creadorOpcion || !fechaCreacion) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const formData = {
      preguntasId,
      respuesta,
      valor,
      activo,
      creadorOpcion,
      fechaCreacion
    };

    try {
      const response = await axios.post('http://localhost:3000/api/opciones', formData);
      if (response.status === 201) {
        console.log('Formulario enviado con éxito');
        setError('');
        setPreguntasId('');
        setRespuesta('');
        setValor('');
        setActivo('1');
        setCreadorOpcion('');
        setFechaCreacion('');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error al enviar el formulario');
    }
  };

  return (
    <div className="container form-container" style={{ backgroundColor: '#f8f9fa', maxWidth: '600px', margin: '50px auto', padding: '30px', backgroundColor: '#ffffff', border: '1px solid #e3e6f0', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
      <div className="form-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>Formulario de Opciones</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="preguntasId" className="form-label">Preguntas ID</label>
          <input type="text" className="form-control" id="preguntasId" value={preguntasId} onChange={(e) => setPreguntasId(e.target.value)} placeholder="Ingrese Preguntas ID"/>
        </div>
        <div className="mb-3">
          <label htmlFor="respuesta" className="form-label">Respuesta</label>
          <input type="text" className="form-control" id="respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} placeholder="Ingrese Respuesta"/>
        </div>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor</label>
          <input type="number" className="form-control" id="valor" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ingrese Valor"/>
        </div>
        <div className="mb-3">
          <label htmlFor="activo" className="form-label">Activo</label>
          <select className="form-select" id="activo" value={activo} onChange={(e) => setActivo(e.target.value)}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="creadorOpcion" className="form-label">Creador de Opción</label>
          <input type="text" className="form-control" id="creadorOpcion" value={creadorOpcion} onChange={(e) => setCreadorOpcion(e.target.value)} placeholder="Ingrese el nombre del creador"/>
        </div>
        <div className="mb-3">
          <label htmlFor="fechaCreacion" className="form-label">Fecha de Creación</label>
          <input type="date" className="form-control" id="fechaCreacion" value={fechaCreacion} onChange={(e) => setFechaCreacion(e.target.value)}/>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-custom" style={{ backgroundColor: '#4e73df', color: 'white' }}>Agregar</button>
      </form>
    </div>
  );
};

export default Opciones;
