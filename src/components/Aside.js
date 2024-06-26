import React from 'react';
import { Link } from 'react-router-dom';

export default function Aside() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Modelo Madurez</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Dashboard */}
                        {/* Forms */}
                        <li className="nav-item">
                            <Link to="/formulariocompleto" className="nav-link">
                                <i className="nav-icon fas fa-file-alt" />
                                <p>Formulario Completo</p>
                            </Link>
                        </li>
                        {/* Forms */}
                        <li className="nav-item">
                            <Link to="/formularios" className="nav-link">
                                <i className="nav-icon fas fa-file-alt" />
                                <p>Formularios</p>
                            </Link>
                        </li>
                        {/* Sections */}
                        <li className="nav-item">
                            <Link to="/secciones" className="nav-link">
                                <i className="nav-icon fas fa-th" />
                                <p>Secciones</p>
                            </Link>
                        </li>
                        {/* Questions */}
                        <li className="nav-item">
                            <Link to="/preguntas" className="nav-link">
                                <i className="nav-icon fas fa-question-circle" />
                                <p>Preguntas</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}
