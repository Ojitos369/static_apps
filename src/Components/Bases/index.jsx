import React from 'react'
import { BasesUI } from './BasesUI'
import { BasesProvier } from './BasesContext';


function Bases() {
    return (
        <BasesProvier>
            <BasesUI />
        </BasesProvier>
    )
}

export { Bases };