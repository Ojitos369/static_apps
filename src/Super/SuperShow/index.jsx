import React from 'react'
import { SuperContext } from '../SuperContext'
import { SuperItem } from '../SuperItem'

import './SuperShow.css'

function SuperShow() {
    const { items, cantidad } = React.useContext(SuperContext);
    return (
        <section className="container">
            {(cantidad > 0) && <ul className="list-group">
                <li className='row d-flex justify-content-around mb-3 text-center header-names-table'>
                    <span className='col-2 text-center'>No</span>
                    <span className='col-4 text-center'>Item</span>
                    <span className='col-2 text-center'>Price</span>
                    <span className='col-2 text-center'>Remove</span>
                </li>
                {items.map((item, index) => (
                    <SuperItem key={item.key} item={item} index={index + 1}/>
                ))}
            </ul>}
        </section>
    )
}

export { SuperShow };