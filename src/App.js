import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import Content from './components/Content';
import FormularioCompleto from './pages/FormularioCompleto/FormularioCompleto';

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
              {/* Otras rutas */}
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
