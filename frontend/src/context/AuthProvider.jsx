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

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinario/${datos.id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.msg,tipo:true}
        } catch (error) {
            return {respuesta:error.response.data.msg,tipo:false}
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
            actualizarPerfil
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;