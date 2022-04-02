import React from 'react'
import { Modo } from './Modo'
import { Suma } from './Suma'
import { Resultados } from './Resultados'
import { ContextMatrix } from './ContextMatrix'
import './Matrices.css'

function MatricesUI() {
    const { modo } = React.useContext(ContextMatrix)
    return (
        <React.Fragment>
            <Modo />
            {modo === 0 && <Suma />}
            {modo === 1 && <Suma />}
            <Resultados />
        </React.Fragment>
    )
}

export { MatricesUI };