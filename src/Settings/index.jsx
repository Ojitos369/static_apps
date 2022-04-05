import React from 'react'
import { Context } from '../Context';
import { MostrarColor } from './MostrarColor';
import { ShowLanguages } from './ShowLanguages';
import './Settings.css'

function Settings() {
    const {
        colors,
        languages,
        language,
    } = React.useContext(Context);
    return (
        <div className='container-fluent'>
            <div className='row d-flex justify-content-center mt-5 mb-2'>
                <p className='col-12 text-center h3'>Color</p>
            </div>
            <div className='row d-flex justify-content-around'>
                {colors.map((color, index) => {
                    return (
                        <MostrarColor
                            key={index}
                            color={color}
                        />
                    )
                })}
            </div>
            <div className='row d-flex justify-content-center mt-5 mb-2'>
                {language.id === 1 &&
                <p className='col-12 text-center h3'>
                    Idioma
                </p>}

                {language.id === 2 &&
                <p className='col-12 text-center h3'>
                    Language
                </p>}
            </div>
            <div className='row d-flex justify-content-around'>
                {languages.map((languaje, index) => {
                    return (
                        <ShowLanguages
                            key={index}
                            languaje={languaje}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export { Settings };