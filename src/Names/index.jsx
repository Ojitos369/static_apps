import React from 'react'
import { NamesUI } from './NamesUI';
import { NamesProvier } from './NamesContext';
function Names() {
    return (
        <NamesProvier>
            <NamesUI />
        </NamesProvier>
    )
}

export { Names };