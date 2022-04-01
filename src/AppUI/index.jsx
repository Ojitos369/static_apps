import React from 'react';
import { NavBar } from '../Navbar';
import { Context } from '../Context';
import { Names } from '../Components/Names';
import { Bases } from '../Components/Bases';
import { Super } from '../Components/Super';
import { Home } from '../Home';

function AppUI() {
    const { mostrar } = React.useContext(Context);
    return (
        <React.Fragment>
            <NavBar />
            {mostrar === 0 && <Home />}
            {mostrar === 1 && <Names />}
            {mostrar === 2 && <Bases />}
            {mostrar === 3 && <Super />}
        </React.Fragment>
    );
}

export { AppUI };
