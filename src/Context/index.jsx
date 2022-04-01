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
    } = useLocalStorage('classNames', 'dropdown-item');

    const {
        item: classBases,
        saveItems: setClassBases
    } = useLocalStorage('classBases', 'dropdown-item');

    const {
        item: classSuper,
        saveItems: setClassSuper
    } = useLocalStorage('classSuper', 'dropdown-item');

    const changeMostrar = text => {
        setMostrar(text);
        if (text === 'names') {
            setClassNames('dropdown-item app-active');
            setClassBases('dropdown-item');
            setClassSuper('dropdown-item');
        }
        if (text === 'bases') {
            setClassNames('dropdown-item');
            setClassBases('dropdown-item app-active');
            setClassSuper('dropdown-item');
        }
        if (text === 'super') {
            setClassNames('dropdown-item');
            setClassBases('dropdown-item');
            setClassSuper('dropdown-item app-active');
        }
        if (text === 'home') {
            setClassNames('dropdown-item');
            setClassBases('dropdown-item');
            setClassSuper('dropdown-item');
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