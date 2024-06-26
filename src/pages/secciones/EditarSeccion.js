import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom";

const editarSecciones = () => {
    return <div className="aline-center-items">

        <div class="btn-group " role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-light ">
                <Link to="/respuestas">Volver a Respuestas</Link>
            </button>

        </div>

        <div class="card" style={{ marginInline: + '40' }}>
            <div class="card-body">
                <h5 class="card-title">Respuesta</h5>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingresa la respuesta" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                <h6 class="card-subtitle mb-2 text-body-secondary">Fecha de la Respuesta </h6>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Ingresa la fecha de la respuesta" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                </div>
                <button type="button" class="btn btn-light">
                    <Link to="/respuestas">Guardar Respuesta</Link>
                </button>
            </div>
        </div>
        <Outlet />
    </div>;
}

export default editarSecciones;