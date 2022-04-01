import React from 'react'
import { useLocalStorage } from './useLocalStorage';
const Context = React.createContext();

function Provier(props) {
    const appsBase = [
        {
            name: 'home',
            classNames: 'nav-link nav-app app-active',
            id: 0,
            render: 'Home'
        }, 
        {
            name: 'Names Generator',
            classNames: 'nav-link nav-app',
            id: 1,
            render: 'Names'
        }, 
        {
            name: 'Bases Converted',
            classNames: 'nav-link nav-app',
            id: 2,
            render: 'Bases'
        }, 
        {
            name: 'Super List',
            classNames: 'nav-link nav-app',
            id: 3,
            render: 'Super'
        }
    ];
    const {
        item: mostrar,
        saveItems: setMostrar,
    } = useLocalStorage('mostrar', 0);

    const {
        item: apps,
        saveItems: setApps,
    } = useLocalStorage('apps', appsBase);

    const changeMostrar = id => {
        setMostrar(id);
        appsBase.forEach(app => {
            if (app.id === id) {
                app.classNames = 'nav-link nav-app app-active';
            } else {
                app.classNames = 'nav-link nav-app';
            }
        });
        setApps(appsBase);
    }

    return (
        <Context.Provider value={{
            mostrar,
            apps,
            changeMostrar,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };