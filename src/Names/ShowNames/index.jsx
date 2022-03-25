import React from 'react'
import { NamesContext } from '../NamesContext'
import { Name } from '../Name'
import './ShowNames.css'

function ShowNames() {
    const { namesShow } = React.useContext(NamesContext);
    return (
        <section className="container">
            <ul className="list-group">
                <li className='row d-flex justify-content-around mb-3 text-center header-names-table'>
                    <span className='col-2'>No.</span>
                    <span className='col-8'>Name</span>
                    <span className='col-2'>Length</span>
                </li>
                {namesShow.map((name) => (
                    <Name key={name.key} name={name} />
                ))}
            </ul>
        </section>
    )
}

export { ShowNames };