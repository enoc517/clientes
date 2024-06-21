import './App.css';
import { Routes , Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FormularioCompleto from "./pages/FormularioCompleto";
function App() {
  return (
    <div>
      <h1>Routes</h1>
      <Routes>
        <Route path="/" element={<Layout/>}>
         <Route path="formulariocompleto" element={<FormularioCompleto/>}></Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
