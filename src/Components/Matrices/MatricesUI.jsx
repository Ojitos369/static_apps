import React from 'react'
import { Modo } from './Modo'
import { DobleMatriz } from './DobleMatriz'
import { Resultados } from './Resultados'
import { ContextMatrix } from './ContextMatrix'
import './Matrices.css'

function MatricesUI() {
    const { modo } = React.useContext(ContextMatrix)
    return (
        <React.Fragment>
            <Modo />
            <div className='row'>
                <p className='col-12 text-center h3 mt-2'>
                    De momento solo disponible hasta matrices 5x5
                </p>
            </div>
            {modo === 0 && <DobleMatriz />}
            {modo === 1 && <DobleMatriz />}
            <Resultados />
        </React.Fragment>
    )
}

export { MatricesUI };