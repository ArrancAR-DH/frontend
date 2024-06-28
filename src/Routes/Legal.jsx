import React from 'react'
import { terminosYCondicionesTitulo, terminosYCondicionesLineas, copyright } from '../Components/InformacionLegal'
import BackButton from '../Components/BackButton/BackButton'

const Legal = () => {


    return (
        <div className="legal__container">
            <BackButton />
            <h2>Información Legal</h2>
            <div className="terminos">
                <h3>Términos y condiciones</h3>
                {terminosYCondicionesTitulo.map((line, index) => {
                    return <p key={index} className='linea__de__termino'>{line}</p>
                })}
                <ol>
                    {terminosYCondicionesLineas.map((line, index) => {
                        return <li key={index} className='linea__de__termino'>{line}</li>
                    })}
                </ol>
            </div>
            <div className="copyright">
                <h3>Información Sobre Copyright</h3>
                <p className='texto__copyright'>{copyright}</p>
            </div>
        </div>
    )
}

export default Legal