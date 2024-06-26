import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Preguntas = () => {
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPreguntas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/preguntas');
            setPreguntas(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPreguntas();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirmar eliminación",
            html: "<i>¿Realmente quieres eliminar la pregunta?</i>" + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/preguntas/${id}`);
                Swal.fire(
                    'Eliminado',
                    'La pregunta ha sido eliminada.',
                    'success'
                )
                fetchPreguntas();
            }
        });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(preguntas);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Preguntas");
        XLSX.writeFile(workbook, "preguntas.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Preguntas', 20, 10);
        doc.autoTable({
            head: [['#Pregunta', 'Enunciado', '#Seccion', 'Fecha Creación', 'Creador', 'Activo']],
            body: preguntas.map(pregunta => [
                pregunta.PreguntaId,
                pregunta.Enunciado,
                pregunta.SeccionId,
                new Date(pregunta.FechaCreacion).toLocaleDateString(),
                pregunta.CreadorPregunta,
                pregunta.Activo ? 'Sí' : 'No'
            ]),
        });
        doc.save('preguntas.pdf');
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
            <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-primary text-white">
                    <Link to="/Agregarpregunta" className="text-white text-decoration-none">Crear Pregunta</Link>
                </button>
                <button type="button" className="btn btn-success text-white" onClick={exportToExcel}>
                    Exportar a Excel
                </button>
                <button type="button" className="btn btn-danger text-white" onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </div>
            <h1 className="mb-4">preguntas</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#pregunta</th>
                            <th>Enunciado</th>
                            <th>#Seccion</th>
                            <th>Fecha Creación</th>
                            <th>Creador</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No hay preguntas disponibles.</td>
                            </tr>
                        ) : (
                            preguntas.map((pregunta) => (
                                <tr key={pregunta.PreguntaId}>
                                    <td>{pregunta.Enunciado}</td>
                                    <td>{pregunta.SeccionId}</td>
                                    <td>{new Date(pregunta.FechaCreacion).toLocaleDateString()}</td>
                                    <td>{pregunta.Creadorpregunta}</td>
                                    <td>{pregunta.Activo ? 'Sí' : 'No'}</td>
                                    <td className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(pregunta.PreguntaId)}>
                                            Eliminar
                                        </button>
                                        <button type="button" className="btn btn-warning">
                                            <Link to={`/editarSeccion/${pregunta.PreguntaId}`} className="text-dark text-decoration-none">Editar</Link>
                                        </button>
                                        <button type="button" className="btn btn-success">
                                            <Link to={`/detallesSeccion/${pregunta.PreguntaId}`} className="text-white text-decoration-none">Detalles</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Preguntas;