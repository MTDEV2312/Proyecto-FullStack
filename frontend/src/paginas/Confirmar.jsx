import logoDog from '../assets/dog-hand.webp'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Mensaje from '../componets/Alertas/Mensaje.jsx'


export const Confirmar = () => {
    //* Paso 1
    const {token} = useParams()
    const [mensaje, setMensaje] = useState("")
    //* Paso 2
    const verifyToken = async (params) => {
        try {
            const url = `http://localhost:3000/api/confirmar/${token}`
            const respuesta = await axios.get(url)
            setMensaje({respuesta: respuesta.data.msg, tipo: false})
        } catch (error) {
            const mensajeError = error.response?.data?.msg || error.response?.data || 'Error en el registro'
            setMensaje({respuesta: mensajeError, tipo: true})
        }
    }
    
    useEffect(() => {
        verifyToken()
    },[])
    return (
        
        <div className="flex flex-col items-center justify-center">
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDog} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>

        </div>
    )
}