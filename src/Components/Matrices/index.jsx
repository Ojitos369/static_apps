import React from 'react'
import { MatricesUI } from './MatricesUI'
import { ProvierMatrix } from './ContextMatrix'


function Matrices() {
    return (
        <ProvierMatrix>
            <MatricesUI />
        </ProvierMatrix>
    )
}

export { Matrices };