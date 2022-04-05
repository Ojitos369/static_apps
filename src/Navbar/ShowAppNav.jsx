import React from 'react'
import { Context } from '../Context';
import './Navbar.css'

function ShowAppNav(props) {
    const { 
        changeMostrar
    } = React.useContext(Context);
    const app = props.app;
    return (
        <React.Fragment>
        {app.id !== 10 &&
        <li className="nav-item app-item d-flex justify-content-center">
            <button className={app.classNames} aria-current="page" onClick={() => changeMostrar(app.id)}>{app.name}</button>
        </li>
        }
        </React.Fragment>
    )
}

export { ShowAppNav };