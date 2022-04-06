import React from 'react'
import { Context } from '../Context';

function MostrarColor(props) {
    const {
        changeColor,
    } = React.useContext(Context);
    const this_color = props.color
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
            background: this_color.background,
            color: this_color.color,
        }
    } else {
        inlineStyle = {
            background: '#000a',
            color: '#fff',
        }
    }
    if (this_color.active) {
        inlineStyle = {
            background: this_color.background,
            color: this_color.color,
            boxShadow: '0px 0px 10px #000',
        }
    }
    
    return (
        <button 
            className='col-3 text-center btn btn-outline-secondary color-btn-option btn-option mt-2'
            onClick={() => changeColor(this_color.id)}
            id={`color-option-${this_color.id}`}
            /* apply hover */
            style={inlineStyle}
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
        >
            {this_color.name}
        </button>
    )
}

export { MostrarColor }