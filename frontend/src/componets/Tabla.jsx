import axios from "axios";
import { useState,useEffect } from "react";
import { MdDeleteForever,MdNoteAdd,MdInfo } from "react-icons/md";
import Mensaje from "./Alertas/Mensaje";

const Tabla = () => {
    //* Paso 1
    
    const [pacientes, setPacientes] = useState([])

    //* Paso 2

    const handleSubmit = async(e) => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
            const options = {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url, options)
            console.log(respuesta.data);
            setPacientes(respuesta.data, ...pacientes)
        } catch (error) {
            console.log(error) 
        }
    }
    
    useEffect(()=>{
        handleSubmit()
    },[])
    return (
        <>
            {
                pacientes.length == 0
                    ?
                    <Mensaje tipo={false}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Propietario</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Celular</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pacientes.map((paciente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={paciente._id}>
                                        <td>{index + 1}</td>
                                        <td key={paciente.id}>{paciente.nombre}</td>    
                                        <td key={paciente.id}>{paciente.propietario}</td>
                                        <td key={paciente.id}>{paciente.email}</td>
                                        <td key={paciente.id}>{paciente.celular}</td>
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{paciente.estado && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />

                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" />

                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" />
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </> 
    )
}

export default Tabla