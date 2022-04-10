import { Navigate, Route, useLocation } from "react-router-dom";
import routes from "../auth/helpers/routes";
import useAuth from "../auth/useAuth";


//solo poder acceder en caso de que se este logeado
//si no se enviara a la pagina de login 
export default function PrivateRoute({hasRole:role , ...rest}){

    
    return(
        <div>
            <Route {...rest}/>
        </div>
    )
}