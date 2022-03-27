import React from 'react'
import { SuperContext } from '../SuperContext'
import './ShowTotal.css'

function ShowTotal() {
    const { totalItemsData } = React.useContext(SuperContext);
    return (
        <section className='mb-4'>
            {!(totalItemsData.cantidad) > 0 &&
                <div className='container'>
                    <div className='row d-flex justify-content-around'>
                        <p className='col-7 text-center h3'>Sin Items de momento</p>
                    </div>
                </div>
            }
            {(totalItemsData.cantidad) > 0 &&
                <div className='container'>
                    <div className='row d-flex justify-content-around'>
                        <p className='col-7 text-center h4'>Cantidad: </p><span className='col-3 text-center h3 fw-bolder'>{totalItemsData.cantidad}</span>
                    </div>
                    <div className='row d-flex justify-content-around'>
                        <p className='col-7 text-center h5'>Total: </p><span className='col-3 text-center h4 fw-bolder'>${totalItemsData.totalPrice}</span>
                    </div>
                </div>
            }
        </section>
    )
}

export { ShowTotal };