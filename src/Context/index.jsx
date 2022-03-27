import React from 'react'
import { useLocalStorage } from './useLocalStorage';
const Context = React.createContext();

function Provier(props) {
    const {
        item: mostrar,
        saveItems: setMostrar,
    } = useLocalStorage('mostrar', 'home');
    return (
        <Context.Provider value={{
            mostrar,
            setMostrar,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };