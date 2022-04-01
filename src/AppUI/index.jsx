import React from 'react';
import { NavBar } from '../Navbar';
import { Context } from '../Context';
import { Home } from '../Home';
import { Names } from '../Components/Names';
import { Bases } from '../Components/Bases';
import { Super } from '../Components/Super';
import { Matrices } from '../Components/Matrices';

function AppUI() {
    const { mostrar } = React.useContext(Context);
    return (
        <React.Fragment>
            <NavBar />
            {mostrar === 0 && <Home />}
            {mostrar === 1 && <Names />}
            {mostrar === 2 && <Bases />}
            {mostrar === 3 && <Super />}
            {mostrar === 4 && <Matrices />}
        </React.Fragment>
    );
}

export { AppUI };
