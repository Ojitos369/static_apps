import React from 'react'
import { ContextMatrix } from './ContextMatrix'
import { Result } from './Result'

function Resultados() {
    const { resultado, loading } = React.useContext(ContextMatrix)
    return (
        <React.Fragment>
            <div className='container-fluent mt-4'>
                {loading &&
                    <p className='row d-flex justify-content-center h2'>
                        Cargando. Por favor Espere
                    </p>
                }
                {resultado.cargado === 1 &&
                    < Result matrix={resultado.matrix} />
                }
                {resultado.cargado === 2 &&
                    <p className='row d-flex justify-content-center h2 text-light'>
                        {resultado.matrix}
                    </p>
                }
            </div>
        </React.Fragment>
    )
}

export { Resultados };