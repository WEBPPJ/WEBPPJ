import { createContext, useState} from 'react'
import roles from './helpers/roles';

export const AuthContext = createContext()

export default function AuthProvider({children}){

    const [user, setUser]=useState(null);//estado del usuario
    
    const login =(userCredentials, fromlocation)=> {
        //usuario de prueba
        setUser({id:1,name:'Bastian', role: roles.support});
       
    }

    //cambios de estado del login
    const logout =()=> setUser(null);

    const isLogged=()=>!!user;

    const hasRole=(role)=>user?.role===role;

    const updateUser =(data)=>{
        setUser({
            ...user,
            ...data
        })
    }

    //valores a traspasar
    const contextValue={
        user,
        updateUser,
        isLogged,
        hasRole,
        login,
        logout,
    }
    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}