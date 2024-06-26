import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Formularios = () => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFormularios = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/formularios');
            setFormularios(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFormularios();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirmar eliminación",
            html: "<i>¿Realmente quieres eliminar el formulario?</i>" + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/formularios/${id}`);
                Swal.fire(
                    'Eliminado',
                    'El formulario ha sido eliminada.',
                    'success'
                )
                fetchFormularios();
            }
        });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(formularios);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Formularios");
        XLSX.writeFile(workbook, "formularios.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Formularios', 20, 10);
        doc.autoTable({
            head: [['#Formulario', 'Nombre', 'Descripción', 'Fecha Creación', 'Creador', 'Activo']],
            body: formularios.map(formulario => [
                formulario.FormularioId,
                formulario.Nombre,
                formulario.Descripcion,
                new Date(formulario.FechaCreacion).toLocaleDateString(),
                formulario.CreadorFormulario,
                formulario.Activo ? 'Sí' : 'No'
            ]),
        });
        doc.save('formularios.pdf');
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
            <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-primary text-white">
                    <Link to="/AgregarFormulario" className="text-white text-decoration-none">Crear Sección</Link>
                </button>
                <button type="button" className="btn btn-success text-white" onClick={exportToExcel}>
                    Exportar a Excel
                </button>
                <button type="button" className="btn btn-danger text-white" onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </div>
            <h1 className="mb-4">Formularios</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>#Formulario</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha Creación</th>
                            <th>Creador</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formularios.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No hay formularios disponibles.</td>
                            </tr>
                        ) : (
                            formularios.map((formulario) => (
                                <tr key={formulario.FormularioId}>
                                    <td>{formulario.FormularioId}</td>
                                    <td>{formulario.Nombre}</td>
                                    <td>{formulario.Descripcion}</td>
                                    <td>{new Date(formulario.FechaCreacion).toLocaleDateString()}</td>
                                    <td>{formulario.CreadorFormulario}</td>
                                    <td>{formulario.Activo ? 'Sí' : 'No'}</td>
                                    <td className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(formulario.FormularioId)}>
                                            Eliminar
                                        </button>
                                        <button type="button" className="btn btn-warning">
                                            <Link to={`/editarSeccion/${formulario.FormularioId}`} className="text-dark text-decoration-none">Editar</Link>
                                        </button>
                                        <button type="button" className="btn btn-success">
                                            <Link to={`/detallesSeccion/${formulario.FormularioId}`} className="text-white text-decoration-none">Detalles</Link>
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

export default Formularios;
