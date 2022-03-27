import React from 'react';
import { NavBar } from '../Navbar';
import { Context } from '../Context';
import { Names } from '../Names';
import { Bases } from '../Bases';
import { Super } from '../Super';
import { Home } from '../Home';

function AppUI() {
    const { mostrar } = React.useContext(Context);
    console.log(mostrar);
    return (
        <React.Fragment>
            <NavBar />
            {mostrar === 'names' && <Names />}
            {mostrar === 'bases' && <Bases />}
            {mostrar === 'super' && <Super />}
            {mostrar === 'home' && <Home />}
        </React.Fragment>
    );
}

export { AppUI };
