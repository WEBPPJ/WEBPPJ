import { useContext } from "react"
import { AuthContext } from "./AuthProvider"

export default function useAuth(){
    //llamada a la funcion AuthContext
    const contextValue=useContext(AuthContext);
    return contextValue;
}