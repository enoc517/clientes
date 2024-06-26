import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Agregarpreguntas = () => {
    const [seccionesDisponibles, setSeccionesDisponibles] = useState([]);
    const [selectedseccion, setSelectedseccion] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [creador, setCreador] = useState('');
    const [activo, setActivo] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerpreguntasDisponibles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/secciones');
                console.log(response);
                setSeccionesDisponibles(response.data);
            } catch (error) {
                console.error('Error obteniendo secciones disponibles:', error);
            }
        };

        obtenerpreguntasDisponibles();
    }, []);

    useEffect(() => {
        const obtenerFechaActual = () => {
            const fechaActual = new Date().toISOString().split('T')[0];
            setFechaCreacion(fechaActual);
        };

        obtenerFechaActual();
    }, []);

    const agregar = async () => {
        try {
            await axios.post('http://localhost:3000/api/preguntas', {
                enunciado: nombre,
                seccionId: selectedseccion,
                fechaCreacion: fechaCreacion,
                creadorPregunta: creador,
                activo: activo
            }).then(()=>{
                Swal.fire({
                    title: '<strong>Registro exitoso</strong>',
                    html : '<i>La pregunta se agregó correctamente</i>',
                    icon : 'success'
                });
            });
            navigate('/preguntas');
        } catch (error) {
            setError('Error al guardar la pregunta. Intente nuevamente.');
            console.error('Error al guardar la pregunta:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedseccion(event.target.value);
    };

    const handleActivoChange = (event) => {
        setActivo(event.target.value === 'true');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Agregar Pregunta
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="input-group mb-3">
                                <input onChange={(event) => setNombre(event.target.value)} type="text" className="form-control" placeholder="Enunciado" aria-label="Enunciado" />
                            </div>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Selecciona una Sección:</h6>
                            <select className="form-select" value={selectedseccion} onChange={handleChange}>
                                <option value="">Selecciona una sección</option>
                                {seccionesDisponibles.map((seccion) => (
                                    <option key={seccion.SeccionId} value={seccion.SeccionId}>
                                        {seccion.Nombre}
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
                            <button onClick={agregar} className="btn btn-primary">Guardar Pregunta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agregarpreguntas;

