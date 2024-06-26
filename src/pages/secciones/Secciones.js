import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Secciones = () => {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSecciones = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/secciones');
            setSecciones(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSecciones();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirmar eliminación",
            html: "<i>¿Realmente quieres eliminar la sección?</i>" + id,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/secciones/${id}`);
                Swal.fire(
                    'Eliminado',
                    'La sección ha sido eliminada.',
                    'success'
                )
                fetchSecciones();
            }
        });
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(secciones);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Secciones");
        XLSX.writeFile(workbook, "secciones.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Secciones', 20, 10);
        doc.autoTable({
            head: [['Sección', 'Nombre', 'Descripción', '# Formulario', 'Fecha de Creación', 'Creador de la Sección', 'Activo']],
            body: secciones.map(seccion => [
                seccion.SeccionId,
                seccion.Nombre,
                seccion.Descripcion,
                seccion.FormularioId,
                new Date(seccion.FechaCreacion).toLocaleDateString(),
                seccion.CreadorSeccion,
                seccion.Activo ? 'Sí' : 'No'
            ]),
        });
        doc.save('secciones.pdf');
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-5">
            <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-primary text-white">
                    <Link to="/AgregarSeccion" className="text-white text-decoration-none">Crear Sección</Link>
                </button>
                <button type="button" className="btn btn-success text-white" onClick={exportToExcel}>
                    Exportar a Excel
                </button>
                <button type="button" className="btn btn-danger text-white" onClick={exportToPDF}>
                    Exportar a PDF
                </button>
            </div>
            <h1 className="mb-4">Secciones</h1>
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Sección</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th># Formulario</th>
                            <th>Fecha de Creación</th>
                            <th>Creador de la Sección</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secciones.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center">No hay secciones disponibles.</td>
                            </tr>
                        ) : (
                            secciones.map((seccion) => (
                                <tr key={seccion.SeccionId}>
                                    <td>{seccion.SeccionId}</td>
                                    <td>{seccion.Nombre}</td>
                                    <td>{seccion.Descripcion}</td>
                                    <td>{seccion.FormularioId}</td>
                                    <td>{new Date(seccion.FechaCreacion).toLocaleDateString()}</td>
                                    <td>{seccion.CreadorSeccion}</td>
                                    <td>{seccion.Activo ? 'Sí' : 'No'}</td>
                                    <td className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(seccion.SeccionId)}>
                                            Eliminar
                                        </button>
                                        <button type="button" className="btn btn-warning">
                                            <Link to={`/editarSeccion/${seccion.SeccionId}`} className="text-dark text-decoration-none">Editar</Link>
                                        </button>
                                        <button type="button" className="btn btn-success">
                                            <Link to={`/detallesSeccion/${seccion.SeccionId}`} className="text-white text-decoration-none">Detalles</Link>
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

export default Secciones;

