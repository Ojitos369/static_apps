import React from 'react'
import { BasesContext } from '../BasesContext';
import { BasesShow } from '../BasesShow';
import './BasesUI.css'
import { Context } from '../../../Context';

function BasesUI() {
    const texts = require('../../../texts.json');
    const { language } = React.useContext(Context);
    const {
        numDecimales,
        base,
        actualizarOriginalNumber,
        convertedBases,
        actualizarBase,
        originalNumber,
        actualizarConvertedBases,
        ActualizarEstado,
        Reset,
    } = React.useContext(BasesContext);
    const textos = texts.textos[language.id - 1].bases;
    return (
        <React.Fragment>
            <p className='col-12 text-center h3'>
                {textos.title}
            </p>
            <p className='col-12 text-center h4'>
                {textos.indications}
            </p>
            <form className='container-fluent mb-5' onSubmit={(e) => {
                e.preventDefault();
                ActualizarEstado();
            }}>
                <div className='row d-flex justify-content-aroud mb-3'>
                    <div className='col-11 col-md-4 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="original-number">
                                    {textos.number}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="text" name='original-number' id='original-number' value={originalNumber} onChange={actualizarOriginalNumber} placeholder={textos.number} />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="base-number">
                                    {textos.base}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='base-number' id='base-number' value={base} onChange={actualizarBase} placeholder={textos.base} />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="converted-bases">
                                    {textos.convert}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="text" name='converted-bases' id='converted-bases' value={convertedBases} onChange={actualizarConvertedBases} placeholder="2,8,10,16" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-aroud'>
                    <div className='col-9 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="numDecimales">{textos.decimals}: {numDecimales}</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 range-names-input' type="range" name='numDecimales' id='numDecimales' value={numDecimales} onChange={ActualizarEstado} min="0" max="10" />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 text-center'>
                        <input type="submit" className='btn btn-primary' onClick={ActualizarEstado} value={textos.calcular} />
                        <span className='reset' onClick={Reset}>🗑️</span>
                    </div>
                </div>
            </form>

            <BasesShow res={textos.result} />
        </React.Fragment>
    )
}

export { BasesUI };