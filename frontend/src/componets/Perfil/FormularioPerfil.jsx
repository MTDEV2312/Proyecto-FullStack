import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";


const FormularioPerfil = () => {

    const {auth,actualizarPerfil} = useContext(AuthContext)
    const [form, setForm] = useState({
		id:'',
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        direccion:'',
    })

    useEffect(()=>{

        setForm({
            id:auth._id,
            nombre:auth.nombre,
            apellido:auth.apellido,
            email:auth.email,
            telefono:auth.telefono,
            direccion:auth.direccion
        })
    },[])
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(form).includes(""))
        {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
						return
        }
        const resultado = await actualizarPerfil(form)
        
        setMensaje(resultado)
        setTimeout(() => {
            setMensaje({})
        }, 3000);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
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
                    htmlFor='apellido'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.apellido}
                    onChange={handleChange}
                    placeholder='apellido'
                    name='apellido'
                />
            </div>
            <div>
                <label
                    htmlFor='direccion'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder='direccion'
                    name='direccion'
                />
            </div>

            <div>
                <label
                    htmlFor='telefonotelefono'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='telefono'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder='telefono'
                    name='telefono'
                />
            </div>

            <div>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
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

            <input
                type="submit"
                className='bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all'
                value='Actualizar' />

        </form>
    )
}

export default FormularioPerfil