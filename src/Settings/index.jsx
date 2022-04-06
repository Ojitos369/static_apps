import React from 'react'
import { Context } from '../Context';
import { MostrarColor } from './MostrarColor';
import { ShowLanguages } from './ShowLanguages';
import './Settings.css'
const texts = require('../texts.json');

function Settings() {
    const {
        colors,
        languages,
        language,
        upgradeCustomColor,
        customColors,
        upgradeCustomTextColor,
        customText,
    } = React.useContext(Context);
    const textos = texts.textos[language.id - 1].settings;
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
            <div className='row d-flex justify-content-center mt-3'>
                {language.id === 1 &&
                <p className='col-12 text-center h5'>
                    Custom Color
                </p>}

                {language.id === 2 &&
                <p className='col-12 text-center h5'>
                    Custom Color
                </p>}
            </div>
            <div className='row'>
                <form 
                    className='container-fluent'
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <div className='col-12'>
                        <div className='row d-flex justify-content-center mb-3'>
                            <div className='col-12 col-md-6 mt-2'>
                                <div className='container-fluent'>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='bg-red-bar' 
                                            value={customColors[0]}
                                            className='col-11 choice-red-bar' 
                                            onChange={() => upgradeCustomColor(1)}
                                        />
                                    </div>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='bg-green-bar' 
                                            value={customColors[1]}
                                            className='col-11 choice-green-bar' 
                                            onChange={() => upgradeCustomColor(1)}
                                        />
                                    </div>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='bg-blue-bar' 
                                            value={customColors[2]}
                                            className='col-11 choice-blue-bar' 
                                            onChange={() => upgradeCustomColor(1)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 mt-2'>
                                <div className='container-fluent'>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="text"
                                            className='col-10 col-md-5 text-center'
                                            placeholder='Color example #000000'
                                            value={customColors[3]}
                                            id='bg-color-hex'
                                            onChange={() => upgradeCustomColor(2)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='row d-flex justify-content-center mt-3'>
                <p className='col-12 text-center h5'>
                    Custom {textos.text}
                </p>
            </div>
            <div className='row'>
                <form 
                    className='container-fluent'
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <div className='col-12'>
                        <div className='row d-flex justify-content-center mb-2'>
                            <div className='col-12 col-md-6 mt-2'>
                                <div className='container-fluent'>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='text-red-bar' 
                                            value={customText[0]}
                                            className='col-11 choice-red-bar' 
                                            onChange={() => upgradeCustomTextColor(1)}
                                        />
                                    </div>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='text-green-bar' 
                                            value={customText[1]}
                                            className='col-11 choice-green-bar' 
                                            onChange={() => upgradeCustomTextColor(1)}
                                        />
                                    </div>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="range" 
                                            min={0} 
                                            max={255} 
                                            id='text-blue-bar' 
                                            value={customText[2]}
                                            className='col-11 choice-blue-bar' 
                                            onChange={() => upgradeCustomTextColor(1)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 col-md-6 mt-2'>
                                <div className='container-fluent'>
                                    <div className='row d-flex justify-content-center mt-2'>
                                        <input 
                                            type="text"
                                            className='col-10 col-md-5 text-center'
                                            placeholder='Color example #000000'
                                            value={customText[3]}
                                            id='text-color-hex'
                                            onChange={() => upgradeCustomTextColor(2)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className='row d-flex justify-content-center mt-5 mb-2'>
                <p className='col-12 text-center h3'>
                    {textos.languaje}
                </p>
            </div>
            <div className='row d-flex justify-content-around mb-5'>
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