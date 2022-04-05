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
        },
        {
            name: 'Matrices',
            classNames: 'nav-link nav-app',
            id: 4,
        }
    ];
    const [mostrar, setMostrar] = useLocalStorage('mostrar', 0);

    const [apps, setApps] = useLocalStorage('apps', appsBase);

    const [colors, setColors] = useLocalStorage('colors', [
        {
            name: 'Dark',
            background: '#212529',
            color: '#fff',
            id: 1,
            active: true,
        },
        {
            name: 'Light',
            background: '#fff',
            color: '#000',
            id: 2,
            active: false,
        },
        {
            name: 'Blue',
            background: '#007bff',
            color: '#000',
            id: 3,
            active: false,
        },
        {
            name: 'Green',
            background: '#28a745',
            color: '#000',
            id: 4,
            active: false,
        },
        {
            name: 'Red',
            background: '#dc3545',
            color: '#fff',
            id: 5,
            active: false,
        }
    ])

    const [ color, setColor ] = useLocalStorage('color', colors[0]);

    /* const {
        item: language,
        saveItems: setLanguage,
    } = useLocalStorage('language', 'es'); */

    const changeMostrar = id => {
        setMostrar(id);
        appsBase.forEach(app => {
            if (app.id === id && app.id !== 10) {
                app.classNames = 'nav-link nav-app app-active';
            } else {
                app.classNames = 'nav-link nav-app';
            }
        });
        setApps(appsBase);
    }

    const changeColor = id => {
        const newColor = colors.filter(color => color.id === id)[0];
        const actualButton = document.getElementById(`color-option-${color.id}`);
        const newButton = document.getElementById(`color-option-${newColor.id}`);
        setColor(newColor);
        const newColors = colors.map(color => {
            if (color.id === id) {
                color.active = true;
            } else {
                color.active = false;
            }
            return color;
        })
        setColors(newColors);
        const fondos = document.getElementsByClassName('my-bg');
        const colores = document.getElementsByClassName('my-color');
        for (let i = 0; i < fondos.length; i++) {
            fondos[i].style.background = `${newColor.background} !important`;
        }
        for (let i = 0; i < colores.length; i++) {
            colores[i].style.color = `${newColor.color} !important`;
        }

        actualButton.classList.remove('my-bg');
        actualButton.classList.remove('my-color');

        newButton.classList.add('my-bg');
        newButton.classList.add('my-color');
    }

    return (
        <Context.Provider value={{
            mostrar,
            apps,
            changeMostrar,
            changeColor,
            colors,
            color,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };