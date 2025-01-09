import axios from 'axios';
import { createContext, useState,useEffect } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [auth , setAuth] = useState({})

    const perfil = async (token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url,options)
            setAuth(respuesta.data)
            console.log(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            perfil(token)
        }
    }, [])
    return(
        <AuthContext.Provider value={{
            //? Contenido del mensaje
            auth,
            setAuth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;