import React from 'react'
import AdministracionPhoneError from '../Components/Phone Error/AdministracionPhoneError'
import { Link } from 'react-router-dom'

const ListUsers = () => {
    return (
        <div className='list__users__container'>
            <Link to={`/administracion`}><h3>Volver</h3></Link>
            <h2 className='title__admin'>Administración</h2>
            <div className="administracion__funciones">
            </div>
            <AdministracionPhoneError />
        </div>
    )
}

export default ListUsers