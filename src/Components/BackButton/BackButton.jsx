 import React from 'react'

const BackButton = ({ number = 0 }) => {
    const link = window.location.href
    const newLinkArr = link.split('/')
    for (let i = 0; i < number + 1; i++) {
        newLinkArr.pop()
    }
    return (
        <button className='back-button' onClick={() => {
            window.location.href = newLinkArr.join('/')
        }}>
            Volver
        </button>
    )
}

export default BackButton