import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export default function Restablecer() {

    //* Paso 1
    const {token}= useParams()

    const [tokenback,setTokenback] = useState(false)
    const [form,setForm] = useState({
        password: "",
        confirmpassword: ""
    })

    //* Paso 2

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
            const respuesta = await axios.post(url,{form})
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data || 'Error en el registro')
        }
    }

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setTokenback(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response?.data?.msg || error.response?.data || 'Error en el registro')
        }
    }


    useEffect(() => {
        verifyToken()
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center">
            <ToastContainer />
            {
                tokenback &&
                <form className='w-full' onSubmit={handleSubmit}>
                    <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                    <input type="text" name="password" placeholder="Enter your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    value={form.password} onChange={handleChange}/>
                    <label className="mb-2 block text-sm font-semibold" >Confirmar Contraseña</label>
                    <input type="text" name="confirmpassword" placeholder="Repeat your password" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                    value={form.confirmpassword} onChange={handleChange}/>
                    <button type="submit" className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Restablecer</button>
                </form>
            }
        </div>
    )
}
