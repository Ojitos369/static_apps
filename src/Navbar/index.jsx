import React from 'react'
import './Navbar.css'
import { Context } from '../Context';

function NavBar() {
    const { 
        changeMostrar,
        classNames,
        classBases,
        classSuper
    } = React.useContext(Context);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button className="navbar-brand" onClick={() => changeMostrar('home')}>Home</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    </div>
                    <ul className="d-flex navbar-nav">
                        <li class="nav-item dropdown">
                            <button 
                                class="nav-link dropdown-toggle"
                                id="apps-navbar"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Some Apps
                            </button>
                            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="apps-navbar">
                                <li className="nav-item app-item d-flex justify-content-center">
                                    <button className={classNames} aria-current="page" onClick={() => changeMostrar('names')}>Names Generator</button>
                                </li>
                                <li className="nav-item app-item d-flex justify-content-center">
                                    <button className={classBases} onClick={() => changeMostrar('bases')}>Bases Converted</button>
                                </li>
                                <li className="nav-item app-item d-flex justify-content-center">
                                    <button className={classSuper} onClick={() => changeMostrar('super')}>Super List</button>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-repo" href='https://github.com/ojitos369/static_apps/' target='_blank' rel='noopener noreferrer'>Repo en Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { NavBar };