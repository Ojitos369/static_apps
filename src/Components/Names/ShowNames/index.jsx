import React from 'react'
import { NamesContext } from '../NamesContext'
import { Name } from '../Name'
import './ShowNames.css'
import { Context } from '../../../Context';

function ShowNames() {
    const texts = require('../../../texts.json');
    const { language } = React.useContext(Context);
    const { namesShow } = React.useContext(NamesContext);
    const textos = texts.textos[language.id - 1].names;
    return (
        <section className="container">
            <ul className="list-group">
                <li className='row d-flex justify-content-around mb-3 text-center header-names-table'>
                    <span className='col-2'>No.</span>
                    <span className='col-8'>
                        {textos.names}
                    </span>
                    <span className='col-2'>
                        {textos.length}
                    </span>
                </li>
                {namesShow.map((name) => (
                    <Name key={name.key} name={name} />
                ))}
            </ul>
        </section>
    )
}

export { ShowNames };