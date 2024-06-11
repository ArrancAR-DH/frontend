import React from 'react'
import { useContextGlobal } from '../Context/GlobalContext'

const Profile = () => {
      const {state} = useContextGlobal(); 
      const datosUser = state.loggedUser; 
      console.log(datosUser);
      return (
            <>
                  <div className="profile-card-wrapper">
                        <div className="profile-card">
                              <h1>Información Personal</h1>

                              <div className="profile-card-information-wrapper">
                                    <div className="card-item">
                                          <h3>Nombre</h3>
                                          <input
                                                value={datosUser.firstName}
                                                type="text"
                                          />
                                    </div>

                                    <div className="card-item">
                                          <h3>Apellido</h3>
                                          <input
                                                value={datosUser.lastName}
                                                type="text"
                                          />
                                    </div>

                                    <div className="card-item">
                                          <h3>E-mail</h3>
                                          <input
                                                value={datosUser.email}
                                                type="text"
                                          />
                                    </div>

                                    <div className="card-item">
                                          <h3>Nombre de usuario</h3>
                                          <input
                                                value={datosUser.userName}
                                                type="text"
                                          />
                                    </div>

                                    <div className="card-item">
                                          <h3>Contraseña</h3>
                                          <input
                                                value="**********"
                                                type="text"
                                          />
                                    </div>
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default Profile
