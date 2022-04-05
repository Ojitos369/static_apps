import React from 'react'
import { Context } from '../Context';

function ShowLanguages(props) {
    const {
        changeLanguage,
        color
    } = React.useContext(Context);
    const this_languaje = props.languaje
    const [state, setState] = React.useState({
        hover: false,
    });

    const toggleHover = () =>{
        state.hover = !state.hover
        setState({...state})
    }
    let inlineStyle;

    if (state.hover) {
        inlineStyle = {
            background: color.background,
            color: color.color,
        }
    } else {
        inlineStyle = {
            background: '#000a',
            languaje: '#fff',
        }
    }
    if (this_languaje.active) {
        inlineStyle = {
            background: color.background,
            color: color.color,
            boxShadow: '0px 0px 10px #000',
        }
    }
    
    return (
        <button 
            className='col-4 text-center btn btn-outline-secondary languaje-btn-option btn-option mt-2'
            onClick={() => changeLanguage(this_languaje.id)}
            id={`languaje-option-${this_languaje.id}`}
            /* apply hover */
            style={inlineStyle}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            {this_languaje.name}
        </button>
    )
}

export { ShowLanguages }