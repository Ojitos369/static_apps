import React from 'react'
import { Context } from '../Context';
import { ShowNames } from '../ShowNames';
import './Names.css'

function Names() {
    const { minLength, maxLength, fusion, namesCount, actualizarParametros, generateNames } = React.useContext(Context);
    return (
        <React.Fragment>
            <form className='container-fluent mb-5' onSubmit={(e) => {
                e.preventDefault();
                actualizarParametros();
                generateNames();
            }}>
                <div className='row d-flex justify-content-aroud mb-3'>
                    <div className='col-11 col-md-4 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="min-length">Min Length</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='min-length' id='min-length' value={minLength} onChange={() => {actualizarParametros(); generateNames();}} placeholder='Min Length' />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="max-length">Max Length</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='max-length' id='max-length' value={maxLength} onChange={() => {actualizarParametros(); generateNames();}} placeholder='Max Length' />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="names-count">Cantidad</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='names-count' id='names-count' value={namesCount} onChange={() => {actualizarParametros(); generateNames();}} placeholder='Cantidad de nombres' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-aroud'>
                    <div className='col-9 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="fusion">Fusion de Vocales: {fusion}%</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 range-names-input' type="range" name='fusion' id='fusion' value={fusion} onChange={() => {actualizarParametros(); generateNames();}} min="10" max="90" />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 text-center'>
                        <input type="submit" className='btn btn-primary' onClick={() => {actualizarParametros(); generateNames();}} value='Generar' />
                    </div>
                </div>
            </form>

            <ShowNames />
        </React.Fragment>
    )
}

export { Names };