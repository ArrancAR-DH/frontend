import React from 'react'

const EditVehicleOverlay = ({ vehicle, setVehicleBeingEdited }) => {
    function submitForm(e) {
        e.preventDefault()
    }

    return (
        <div className="editing__vehicle__overlay">
            <h2>Edicion de vehículo</h2>
            <h3>{vehicle.brand?.name}</h3>
            <h5>{vehicle.model?.name}</h5>
            <form onSubmit={submitForm}>
                <div className='overlay__buttons'>
                    <button>Guardar</button>
                    <button type="button" onClick={() => { setVehicleBeingEdited(false) }}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default EditVehicleOverlay