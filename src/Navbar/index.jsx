import React from 'react'
import './Navbar.css'
import { Context } from '../Context';
import { ShowAppNav } from './ShowAppNav';

function NavBar() {
    const texts = require('../texts.json');
    const { 
        changeMostrar,
        apps,
        color,
        language,
    } = React.useContext(Context);
    let classNavbar = "navbar navbar-expand-lg";
    let customStyle = {
        color: color.color,
    }
    const textos = texts.textos[language.id - 1].navbar;
    return (
        <nav className={classNavbar}>
            <div className="container">
            <button className="navbar-brand" onClick={() => changeMostrar(0)} style={customStyle}>
                {textos.home}
            </button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" style={customStyle}>
                    <div className="navbar-nav me-auto mb-2 mb-lg-0" style={customStyle}>
                    </div>
                    <ul className="d-flex navbar-nav" style={customStyle}>
                        <li className="nav-item">
                        <button className='nav-link' aria-current="page" onClick={() => changeMostrar(10)} style={customStyle}>
                            {textos.settings}
                        </button>
                        </li>
                        <li className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-toggle"
                                id="apps-navbar"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={customStyle}
                            >
                                {textos.apps}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-navbar dropdown-menu-dark" aria-labelledby="apps-navbar">
                                {apps.map((app, index) => (
                                    app.id !== 0 && (
                                        <ShowAppNav key={index} app={app} />
                                    )
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-repo" href='https://github.com/ojitos369/static_apps/' target='_blank' rel='noopener noreferrer' style={customStyle}>Github Repo</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { NavBar };
