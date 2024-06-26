import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";

const detallesSecciones = () => {
    return <div>

        <div class="btn-group " role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-light">
                <Link to="/respuestas">Volver a Respuestas</Link>
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
                        <button type="button" class="btn btn-warning">
                            <Link to="/editarrespuestas">Editar</Link>
                        </button>
                    </td>

                </tr>
                <tr>

                </tr>
            </tbody>
        </table>
        <Outlet />
    </div>;
}

export default detallesSecciones;