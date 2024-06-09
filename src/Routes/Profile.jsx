import React from 'react'
import { useContextGlobal } from '../Context/GlobalContext'

const Profile = () => {
    const {state} = useContextGlobal(); 
    const datosUser = state.loggedUser; 
    console.log(datosUser);
    return (
    <div>
        <h4>{datosUser.firstName} - {datosUser.lastName}</h4>
        <h4>{datosUser.email}</h4>
    </div>
  )
}

export default Profile