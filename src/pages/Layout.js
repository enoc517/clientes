import { Outlet , Link} from "react-router-dom";

const layout = () =>{
    return <div>
        <nav>
            <ul>
                <li>
                    <Link to="/formulariocompleto">Formulario Completo</Link>
                </li>
                <li>

                </li>
                <li>

                </li>
            </ul>
        </nav>
        <hr/>
        <Outlet/>
    </div>
}

export default layout;