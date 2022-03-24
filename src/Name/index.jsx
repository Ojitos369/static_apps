import React from 'react'
import './Name.css'

function Name(props) {
    return (
        <li className='row d-flex justify-content-around text-center myItemName'>
            <span className='col-2'>{props.name.key}</span>
            <span className='col-8'>{props.name.name}</span>
            <span className='col-2'>{props.name.length}</span>
        </li>
    )
}

export { Name };