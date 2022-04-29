import React from 'react'
import { nanoid } from 'nanoid'
import { firebase } from '../firebase'
const Registro = () => {
    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [direccion, setDireccion] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [ciudad, setCiudad] = React.useState('')
    const [identificacion, setidentificacion] = React.useState('')
    const [id, setId] = React.useState('')


    const [setError] = React.useState(null)
    const [listaFormulario, setlistaFormulario] = React.useState([])


    React.useEffect(() => {
        const obtenerdatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('app1').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))
                //console.log(arrayData)
                setlistaFormulario(arrayData)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerdatos()
    }, [])

    const guardar = async (e) => {
        e.preventDefault()

        if (!nombre.trim()) {
            alert("Digite el nombre")
            return
        }
        if (!apellido.trim()) {
            alert("Digite el apellido")
            return
        }
        if (!correo.trim()) {
            alert("Digite el correo")
            return
        }
        if (!direccion.trim()) {
            alert("Digite la direccion")
            return
        }
        if (!telefono.trim()) {
            alert("Digite el telefono")
            return
        }
        if (!ciudad.trim()) {
            alert("Digite la ciudad")
            return
        }
        if (!identificacion.trim()) {
            alert("Digite el identificacion")
            return
        }
        if (isNaN(identificacion)) {
            alert("Digite un numero en la Identificacion")
            return
        }
        

        try {
            const db = firebase.firestore();
            const estudiante = {
                nombreEstudiante: nombre,
                apellidoEstudiante: apellido,
                correoEstudiante: correo,
                direccionEstudiante: direccion,
                telefonoEstudiante: telefono,
                ciudadEstudiante: ciudad,
                identificacionEstudiante: identificacion
            }
            await db.collection('app1').add(estudiante)
            setlistaFormulario([
                ...listaFormulario,
                { id: nanoid(), nombreEstudiante: nombre, apellidoEstudiante: apellido, correoEstudiante: correo, direccionEstudiante: direccion, telefonoEstudiante: telefono, ciudadEstudiante: ciudad, identificacionEstudiante: identificacion }
            ])
            console.log(listaFormulario)
            e.target.reset()

            setNombre("")
            setApellido("")
            setCorreo("")
            setDireccion("")
            setTelefono("")
            setCiudad("")
            setidentificacion("")
            setError(null)

        } catch (error) {
            console.log(error)
        }

    }


    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('app1').doc(id).delete()
            const aux = listaFormulario.filter(item => item.id !== id)
            setlistaFormulario(aux)
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='container mt-5'>
            <h1 className='text-center'>Formulario De Registro </h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Lista de Estudiantes</h4>
                    <ul className='list-group'>
                        {
                            listaFormulario.map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <span className='lead'>{item.nombreEstudiante}-{item.apellidoEstudiante}-{item.correoEstudiante}-{item.direccionEstudiante}-{item.telefonoEstudiante}-{item.ciudadEstudiante}-{item.identificacionEstudiante}</span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>Eliminar</button>

                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>Registro Universitario</h4>
                    <br />

                    <form onSubmit={guardar}>

                        <input className='form-control mb-2' type="text" placeholder='Ingrese su nombre' onChange={(e) => setNombre(e.target.value)} value={nombre} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su apellido' onChange={(e) => setApellido(e.target.value)} value={apellido} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su correo' onChange={(e) => setCorreo(e.target.value)} value={correo} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su dirección' onChange={(e) => setDireccion(e.target.value)} value={direccion} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su telefono' onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su ciudad' onChange={(e) => setCiudad(e.target.value)} value={ciudad} />
                        <input className='form-control mb-2' type="text" placeholder='Ingrese su identificacion' onChange={(e) => setidentificacion(e.target.value)} value={identificacion} />
                        <br />
                        {

                            <button className='btn btn-primary btn-block' type='submit'>Crear estudiante</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registro
export { firebase }