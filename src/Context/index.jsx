import React from 'react'
import { useLocalStorage } from './useLocalStorage';
const Context = React.createContext();

function Provier(props) {
    const {
        item: mostrar,
        saveItems: setMostrar,
    } = useLocalStorage('mostrar', 'home');
    const {
        item: classNames,
        saveItems: setClassNames
    } = useLocalStorage('classNames', 'nav-app');

    const {
        item: classBases,
        saveItems: setClassBases
    } = useLocalStorage('classBases', 'nav-app');

    const {
        item: classSuper,
        saveItems: setClassSuper
    } = useLocalStorage('classSuper', 'nav-app');

    const changeMostrar = text => {
        setMostrar(text);
        if (text === 'names') {
            setClassNames('nav-app app-active');
            setClassBases('nav-app');
            setClassSuper('nav-app');
        }
        if (text === 'bases') {
            setClassNames('nav-app');
            setClassBases('nav-app app-active');
            setClassSuper('nav-app');
        }
        if (text === 'super') {
            setClassNames('nav-app');
            setClassBases('nav-app');
            setClassSuper('nav-app app-active');
        }
        if (text === 'home') {
            setClassNames('nav-app');
            setClassBases('nav-app');
            setClassSuper('nav-app');
        }
    }

    return (
        <Context.Provider value={{
            mostrar,
            classNames,
            classBases,
            classSuper,
            changeMostrar
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };