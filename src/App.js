import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import Content from './components/Content';
import FormularioCompleto from './pages/FormularioCompleto/FormularioCompleto';
import Secciones from './pages/secciones/Secciones';
import Eliminar from './pages/secciones/EliminarSeccion';
import AgregarSecciones from './pages/secciones/AgregarSeccion';
import Formularios from './pages/Formulario/Formulario';
import AgregarFormulario from './pages/Formulario/AgregarFormulatio';
import Preguntas from './pages/Preguntas/Preguntas';
import AgregarPregunta from './pages/Preguntas/AgregarPreguntas';

function App() {
  return (
    <Router>
      <div className="App">
        <Aside />
        <Header />
        <div className="wrapper">
          <div className="content-wrapper">
            <Routes>
              <Route path="/formulariocompleto" element={<FormularioCompleto />} />
              <Route path="/secciones" element={<Secciones/>} />
              <Route path="/elimininarSecciones" element={<Eliminar/>} />
              <Route path="/AgregarSeccion" element={<AgregarSecciones/>} />
              <Route path="/formularios" element={<Formularios/>} />
              <Route path="/AgregarFormulario" element={<AgregarFormulario/>} />
              <Route path="/preguntas" element={<Preguntas/>} />
              <Route path="/AgregarPregunta" element={<AgregarPregunta/>} />
            </Routes>
            <Content />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
