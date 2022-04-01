import React from 'react'
import { BasesContext } from '../BasesContext'
import { Base } from '../Base'
import './BasesShow.css'

function BasesShow() {
    const { resultados, error, errorBases } = React.useContext(BasesContext);
    return (
        <section className="container">
            {error && <div className="alert alert-danger text-center">Error en la conversion, verifica los datos</div>}
            {errorBases && <div className="alert alert-danger text-center">Error en la conversion, Las bases solo pueden ser de 2 a 36</div>}
            {!(error || errorBases ) && <ul className="list-group">
                <li className='row d-flex justify-content-around mb-3 text-center header-names-table'>
                    <span className='col-2'>Base</span>
                    <span className='col-8'>Resultado</span>
                </li>
                {resultados.map((base) => (
                    <Base key={base.key} base={base} />
                ))}
            </ul>}
        </section>
    )
}

export { BasesShow };