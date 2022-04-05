import React from 'react'
import { Modo } from './Modo'
import { DobleMatriz } from './DobleMatriz'
import { UnaMatriz } from './UnaMatriz'
import { NumberMatriz } from './NumberMatriz'
import { Resultados } from './Resultados'
import { ContextMatrix } from './ContextMatrix'
import './Matrices.css'
import { Context } from '../../Context';

function MatricesUI() {
    const texts = require('../../texts.json');
    const { language } = React.useContext(Context);
    const { modo } = React.useContext(ContextMatrix)
    const textos = texts.textos[language.id - 1].matrix;
    return (
        <React.Fragment>
            <Modo />
            <div className='row'>
                <p className='col-12 text-center h3 mt-2'>
                    {textos.limitBase}
                </p>
            </div>
            {(modo === 0 || modo === 1 || modo === 2 ) && <DobleMatriz />}
            {modo === 3 && <NumberMatriz />}
            {modo === 4 && <UnaMatriz />}
            <Resultados />
            <div className='row mt-4 mb-5'>
                <p 
                    className='col-12 text-center h6 mt-2'
                >
                    <a 
                        href="https://matricesop.herokuapp.com/operations/swagger/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {textos.apiRef}
                    </a>
                </p>
            </div>
        </React.Fragment>
    )
}

export { MatricesUI };