import React from 'react'
import { useContextGlobal } from '../Context/GlobalContext'

const Profile = () => {
      const {state} = useContextGlobal(); 
      const datosUser = state.loggedUser; 
      console.log(datosUser);
      return (
            <>
                  <div className="profile-card">
                        <h1>Perfil</h1>

                        <div className="card-item">
                              <h3>Nombre</h3>
                              <div>{datosUser.firstName}</div>
                        </div>

                        <div className="card-item">
                              <h3>Apellido</h3>
                              <div>{datosUser.lastName}</div>
                        </div>

                        <div className="card-item">
                              <h3>E-mail</h3>
                              <div>{datosUser.email}</div>
                        </div>

                        <div className="card-item">
                              <h3>Nombre de usuario</h3>
                              <div>{datosUser.userName}</div>
                        </div>


                  </div>
            </>
      )
}

export default Profile
