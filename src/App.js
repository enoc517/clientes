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
import PreguntasIndex from './pages/preguntas/lista';
import Preguntas from './pages/preguntas/Preguntas';
import EditarPregunta from './pages/preguntas/EditarPregunta';
import OpcionesIndex from './pages/opciones/ListaOpciones';
import Opciones from './pages/opciones/Opciones';
import OpcionesEditar from './pages/preguntas/EditarPregunta';

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
              <Route path="/preguntas" element={<PreguntasIndex/>}></Route>
              <Route path="/agregar-pregunta" element={<Preguntas/>}></Route>
              <Route path="/editar-pregunta" element={<EditarPregunta/>}></Route>
              <Route path="/opciones" element={<OpcionesIndex/>}></Route>
              <Route path="/agregar-opcion" element={<Opciones/>}></Route>
              <Route path="/editar-opcion" element={<OpcionesEditar/>}></Route>
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
