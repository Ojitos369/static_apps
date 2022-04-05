import React from 'react'
import { Context } from '../Context';
import { MostrarColor } from './MostrarColor';
import './Settings.css'

function Settings() {
    const {
        colors,
    } = React.useContext(Context);
    return (
        <div className='container-fluent'>
            <div className='row d-flex justify-content-center'>
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
        </div>
    )
}

export { Settings };