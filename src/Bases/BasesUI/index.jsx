import React from 'react'
import { BasesContext } from '../BasesContext';
import { BasesShow } from '../BasesShow';
import './BasesUI.css'

function BasesUI() {
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
    return (
        <React.Fragment>
            <p className='col-12 text-center h3'>Rango de Conversion entre 2 a 36</p>
            <p className='col-12 text-center h4'>Separar por comas las diferentes bases a convertir</p>
            <form className='container-fluent mb-5' onSubmit={(e) => {
                e.preventDefault();
                ActualizarEstado();
            }}>
                <div className='row d-flex justify-content-aroud mb-3'>
                    <div className='col-11 col-md-4 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="original-number">Numero</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="text" name='original-number' id='original-number' value={originalNumber} onChange={actualizarOriginalNumber} placeholder='Numero' />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="base-number">Base</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='base-number' id='base-number' value={base} onChange={actualizarBase} placeholder='Base' />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="converted-bases">Bases a convertir</label>
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
                                <label className='col-12' htmlFor="numDecimales">Numero de decimales: {numDecimales}</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 range-names-input' type="range" name='numDecimales' id='numDecimales' value={numDecimales} onChange={ActualizarEstado} min="0" max="10" />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 text-center'>
                        <input type="submit" className='btn btn-primary' onClick={ActualizarEstado} value='Calcular' />
                        <span className='reset' onClick={Reset}>🗑️</span>
                    </div>
                </div>
            </form>

            <BasesShow />
        </React.Fragment>
    )
}

export { BasesUI };