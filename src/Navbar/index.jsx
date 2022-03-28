import React from 'react'
import './Navbar.css'
import { Context } from '../Context';

function NavBar() {
    const { setMostrar } = React.useContext(Context);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button className="navbar-brand" onClick={() => setMostrar('home')}>Home</button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                    </div>
                    <ul className="d-flex navbar-nav">
                        <li className="nav-item app-item d-flex justify-content-center">
                            <button className="nav-link" aria-current="page" onClick={() => setMostrar('names')}>Names Generator</button>
                        </li>
                        <li className="nav-item app-item d-flex justify-content-center">
                            <button className="nav-link" onClick={() => setMostrar('bases')}>Bases Converted</button>
                        </li>
                        <li className="nav-item app-item d-flex justify-content-center">
                            <button className="nav-link" onClick={() => setMostrar('super')}>Super List</button>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='https://github.com/ojitos369/static_apps/' target='_blank' rel='noopener noreferrer'>Repo en Github</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export { NavBar };