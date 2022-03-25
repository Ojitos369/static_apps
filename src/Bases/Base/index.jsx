import React from 'react'
import './Base.css'

function Base(props) {
    return (
        <li className='row d-flex justify-content-around text-center myItemName'>
            <span className='col-2'>{props.base.key}</span>
            <span className='col-8'>{props.base.value}</span>
        </li>
    )
}

export { Base };