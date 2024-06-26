import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const elimininarSecciones = () => {
    return <div className="aline-center-items">

        <div class="btn-group " role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-light">
                <Link to="/secciones">Volver a Secciones</Link>
            </button>

        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Numero Respuesta</th>
                    <th scope="col">Numero Formulario</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Pregunta</th>
                    <th scope="col">Opcion</th>
                    <th scope="col">Respuesta</th>
                    <th scope="col">Fecha respuesta</th>

                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>
                    </td>

                    <td>
                    </td>

                    <td>
                    </td>

                    <td>
                    </td>

                    <td>
                    </td>

                    <td>
                    </td>

                    <td>
                        <button type="button" class="btn btn-danger">
                            Eliminar
                        </button>
                    </td>

                </tr>
                <tr>

                </tr>
            </tbody>
        </table>
    </div>;
}

export default elimininarSecciones;