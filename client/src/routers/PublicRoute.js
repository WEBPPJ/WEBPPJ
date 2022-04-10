import { Navigate, Route } from "react-router-dom";
import routes from "../auth/helpers/routes";
import useAuth from "../auth/useAuth";


//en caso de estar logeado se deshabilitan las rutas que no sean privadas
export default function PublicRoute(props){

    //const user=null;

    const {isLogged} = useAuth();

    if(isLogged()) return<Navigate to={routes.projects} />

    return(
        <div>
            <Route {...props}/>
        </div>
    )
}