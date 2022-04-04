import React from 'react'
import { Modo } from './Modo'
import { DobleMatriz } from './DobleMatriz'
import { UnaMatriz } from './UnaMatriz'
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
                    De momento solo disponible hasta matrices 10x10
                </p>
            </div>
            {modo !== 3 && <DobleMatriz />}
            {modo === 3 && <UnaMatriz />}
            <Resultados />
        </React.Fragment>
    )
}

export { MatricesUI };