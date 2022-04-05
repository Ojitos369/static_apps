import React from 'react'
import { NamesContext } from '../NamesContext';
import { ShowNames } from '../ShowNames';
import './Names.css'
import { Context } from '../../../Context';

function NamesUI() {
    const texts = require('../../../texts.json');
    const { language } = React.useContext(Context);
    const { minLength, maxLength, fusion, namesCount, actualizarParametros, generateNames } = React.useContext(NamesContext);
    const textos = texts.textos[language.id - 1].names;
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
                                <label className='col-12' htmlFor="min-length">
                                    {textos.minLen}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='min-length' id='min-length' value={minLength} onChange={() => {actualizarParametros(); generateNames();}} placeholder={textos.minLen} />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="max-length">
                                    {textos.maxLen}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='max-length' id='max-length' value={maxLength} onChange={() => {actualizarParametros(); generateNames();}} placeholder={textos.maxLen} />
                            </div>
                        </div>
                    </div>
                    <div className='col-11 col-md-4 text-center '>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="names-count">
                                    {textos.cantidad[0]}
                                </label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 number-names-input' type="number" name='names-count' id='names-count' value={namesCount} onChange={() => {actualizarParametros(); generateNames();}} placeholder={textos.cantidad[1]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-aroud'>
                    <div className='col-9 text-center'>
                        <div className='container'>
                            <div className='row d-flex justify-content-center'>
                                <label className='col-12' htmlFor="fusion">{textos.fusion}: {fusion}%</label>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <input className='col-10 range-names-input' type="range" name='fusion' id='fusion' value={fusion} onChange={() => {actualizarParametros(); generateNames();}} min="10" max="90" />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 text-center'>
                        <input type="submit" className='btn btn-primary' onClick={() => {actualizarParametros(); generateNames();}} value={textos.generar} />
                    </div>
                </div>
            </form>

            <ShowNames />
        </React.Fragment>
    )
}

export { NamesUI };