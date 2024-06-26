import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormulariosCompletados = () => {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/formulariosCompletados'); // URL ajustada
        setFormularios(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchFormularios();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Formularios Completados</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Formulario ID</th>
              <th>Usuario ID</th>
              <th>Puntuación Final</th>
              <th>Fecha de Creación</th>
              <th>Activo</th>
              <th>Respuesta ID</th>
            </tr>
          </thead>
          <tbody>
            {formularios.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No hay formularios completados disponibles.</td>
              </tr>
            ) : (
              formularios.map((formulario) => (
                <tr key={formulario.FormularioCompletadoId}>
                  <td>{formulario.FormularioId}</td>
                  <td>{formulario.UsuarioId}</td>
                  <td>{formulario.PuntuacionFinal}</td>
                  <td>{new Date(formulario.Fechacreacion).toLocaleDateString()}</td>
                  <td>{formulario.Activo ? 'Sí' : 'No'}</td>
                  <td>{formulario.RespuestaId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormulariosCompletados;
