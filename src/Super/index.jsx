import React from 'react'
import { SuperUI } from './SuperUI'
import { SuperProvier } from './SuperContext';


function Super() {
    return (
        <SuperProvier>
            <SuperUI />
        </SuperProvier>
    )
}

export { Super };