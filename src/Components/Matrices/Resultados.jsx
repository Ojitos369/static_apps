import React from 'react'
import { ContextMatrix } from './ContextMatrix'

function Resultados() {
    const { resultado } = React.useContext(ContextMatrix)
    return (
        <React.Fragment>
            <a href={resultado.matrix}>
            {resultado.matrix}</a>
        </React.Fragment>
    )
}

export { Resultados };