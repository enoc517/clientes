import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AgregarFormulario = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [creador, setCreador] = useState('');
    const [activo, setActivo] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

        // Obtener la fecha actual en el formato correcto
        useEffect(() => {
            const obtenerFechaActual = () => {
                const fechaActual = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
                setFechaCreacion(fechaActual);
            };
    
            obtenerFechaActual();
        }, []);

    const agregar = async () => {
        try {
            await axios.post('http://localhost:3000/api/formularios', {
                nombre: nombre,
                descripcion: descripcion,
                fechaCreacion: fechaCreacion,
                creadorFormulario: creador,
                activo: activo
            }).then(() => {
                Swal.fire({
                    title: '<strong>Registro exitoso</strong>',
                    html: '<i>El formulario se agregó correctamente</i>',
                    icon: 'success'
                });
            });
            navigate('/formularios');
        } catch (error) {
            setError('Error al guardar el formulario. Intente nuevamente.');
            console.error('Error al guardar el formulario:', error);
        }
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
                            Agregar Formulario
                        </div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="input-group mb-3">
                                <input onChange={(event) => setNombre(event.target.value)} type="text" className="form-control" placeholder="Nombre" aria-label="Nombre" />
                            </div>
                            <div className="input-group mb-3">
                                <input onChange={(event) => setDescripcion(event.target.value)} type="text" className="form-control" placeholder="Descripción" aria-label="Descripción" />
                            </div>
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
                            <button onClick={agregar} className="btn btn-primary">Guardar Formulario</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarFormulario;
