import React from 'react'
import { SuperContext } from '../SuperContext'
import './SuperItem.css'

function SuperItem(props) {
    const { removeItem } = React.useContext(SuperContext);
    return (
        <li className='row d-flex justify-content-around text-center mySuperItemName'>
            <span className='col-2 text-center'>{props.index}</span>
            <span className='col-5 text-center'>{props.item.name}</span>
            <span className='col-2 text-center'>${props.item.priceFormat}</span>
            <span className='col-2 text-center remove-item' onClick={() => {
                    removeItem(props.item.key)
                }}>🗑️</span>
        </li>
    )
}

export { SuperItem };