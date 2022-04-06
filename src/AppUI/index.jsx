import React from 'react';
import { NavBar } from '../Navbar';
import { Context } from '../Context';
import { Home } from '../Home';
import { Names } from '../Components/Names';
import { Bases } from '../Components/Bases';
import { Super } from '../Components/Super';
import { Matrices } from '../Components/Matrices';
import { Settings } from '../Settings';

function AppUI() {
    const { mostrar, color } = React.useContext(Context);
    const inlineStyle = {
        background: color.background,
        color: color.color,
    }
    return (
        <div 
            className='container-fluent' id='main-container'
            style={inlineStyle}
        >
            <NavBar />
            {mostrar === 0 && <Home />}
            {mostrar === 1 && <Names />}
            {mostrar === 2 && <Bases />}
            {mostrar === 3 && <Super />}
            {mostrar === 4 && <Matrices />}
            {mostrar === 10 && <Settings />}
        </div>
    );
}

export { AppUI };
