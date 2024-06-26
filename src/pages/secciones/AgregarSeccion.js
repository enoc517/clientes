import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AgregarSecciones = () => {
    const [formulariosDisponibles, setFormulariosDisponibles] = useState([]);
    const [selectedFormulario, setSelectedFormulario] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [creador, setCreador] = useState('');
    const [activo, setActivo] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener los formularios disponibles
    useEffect(() => {
        const obtenerFormulariosDisponibles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/formularios');
                setFormulariosDisponibles(response.data);
            } catch (error) {
                console.error('Error obteniendo formularios disponibles:', error);
            }
        };

        obtenerFormulariosDisponibles();
    }, []);

    // Obtener la fecha actual en el formato correcto
    useEffect(() => {
        const obtenerFechaActual = () => {
            const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
            setFechaCreacion(fechaActual);
        };

        obtenerFechaActual();
    }, []);

    // Función para agregar una nueva sección
    const agregar = async () => {
        try {
            await axios.post('http://localhost:3000/api/secciones', {
                nombre: nombre,
                descripcion: descripcion,
                formularioId: selectedFormulario,
                fechaCreacion: fechaCreacion,
                creadorSeccion: creador,
                activo: activo
            }).then(()=>{
                Swal.fire({
                    title: '<strong>Regstro extoso</strong>',
                    html : '<i>Ok</i>',
                    icon : 'success'
                })
            });
            navigate('/secciones');
        } catch (error) {
            setError('Error al guardar la sección. Intente nuevamente.');
            console.error('Error al guardar la sección:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedFormulario(event.target.value);
    };

    const handleActivoChange = (event) => {
        setActivo(event.target.value === 'true'); // Convertir a booleano
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Agregar Secciones
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="input-group mb-3">
                                <input onChange={(event) => setNombre(event.target.value)} type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" />
                            </div>
                            <div className="input-group mb-3">
                                <input onChange={(event) => setDescripcion(event.target.value)} type="text" className="form-control" placeholder="Descripcion" aria-label="Descripcion" />
                            </div>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Selecciona un formulario:</h6>
                            <select className="form-select" value={selectedFormulario} onChange={handleChange}>
                                <option value="">Selecciona un formulario</option>
                                {formulariosDisponibles.map((formulario) => (
                                    <option key={formulario.FormularioId} value={formulario.FormularioId}>
                                        {formulario.Nombre}
                                    </option>
                                ))}
                            </select>
                            <br />
                            <div className="input-group mb-3">
                                <input onChange={(event) => setCreador(event.target.value)} type="text" className="form-control" placeholder="Creador" aria-label="Creador" />
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="activo"
                                    id="activoTrue"
                                    value="true"
                                    checked={activo === true}
                                    onChange={handleActivoChange}
                                />
                                <label className="form-check-label" htmlFor="activoTrue">
                                    Activo
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="activo"
                                    id="activoFalse"
                                    value="false"
                                    checked={activo === false}
                                    onChange={handleActivoChange}
                                />
                                <label className="form-check-label" htmlFor="activoFalse">
                                    Desactivado
                                </label>
                            </div>
                            <br />
                            <button onClick={agregar} className="btn btn-primary">Guardar Sección</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarSecciones;
