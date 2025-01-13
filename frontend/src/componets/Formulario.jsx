import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Formulario = () => {

    const navigate = useNavigate()

    //* Paso 1
    const [form, setForm] = useState({
        nombre: '',
        propietario: '',
        email: '',
        celular: '',
        convencional: '',
        sintomas: '',
    })
    //* Paso 2
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            navigate('/dashboard/listar')

        } catch (error) {
            console.log(error)
        }   
    }
    

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre de la Mascota: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder='nombre'
                    name='nombre'
                />
            </div>
            <div>
                <label
                    htmlFor='propietario'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del Propietario: </label>
                <input
                    id='propietario'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.propietario}
                    onChange={handleChange}
                    placeholder='propietario'
                    name='propietario'
                />
            </div>
            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.email}
                    onChange={handleChange}
                    placeholder='email'
                    name='email'
                />
            </div>
            <div>
                <label
                    htmlFor='celular'
                    className='text-gray-700 uppercase font-bold text-sm'>celular: </label>
                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.celular}
                    onChange={handleChange}
                    placeholder='celular'
                    name='celular'
                />
            </div>
            <div>
                <label
                    htmlFor='convencional'
                    className='text-gray-700 uppercase font-bold text-sm'>convencional: </label>
                <input
                    id='convencional'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.convencional}
                    onChange={handleChange}
                    placeholder='convencional'
                    name='convencional'
                />
            </div>

            <div>
                <label
                    htmlFor='sintomas'
                    className='text-gray-700 uppercase font-bold text-sm'>Sintomas: </label>
                <textarea
                    id='sintomas'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.sintomas}
                    onChange={handleChange}
                    name='sintomas'
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-900 cursor-pointer transition-all'
                value='Registrar' />

        </form>
    )
}