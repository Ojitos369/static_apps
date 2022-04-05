import React from 'react'
import { useLocalStorage } from './useLocalStorage';
const Context = React.createContext();

function Provier(props) {

    const appsBase = [
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
            name: 'Matriz',
            classNames: 'nav-link nav-app',
            id: 4,
        },
        {
            name: 'home',
            classNames: 'nav-link nav-app app-active',
            id: 0,
            render: 'Home'
        },
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

    const [languages, setLanguages] = useLocalStorage('languages', [
        {
            name: 'Español',
            prefix: 'es',
            id: 1,
            active: true,
        },
        {
            name: 'English',
            prefix: 'en',
            id: 2,
            active: false,
        }
    ]);

    const [language, setLanguage]  = useLocalStorage('language', languages[0]);

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
    }

    const changeLanguage = id => {
        const newLanguage = languages.filter(language => language.id === id)[0];
        setLanguage(newLanguage);
        const newLanguages = languages.map(language => {
            if (language.id === id) {
                language.active = true;
            } else {
                language.active = false;
            }
            return language;
        })
        setLanguages(newLanguages);
        let colorsNames;
        let appsNames;
        switch (id) {
            case 1: 
                colorsNames = ['Oscuro', 'Claro', 'Azul', 'Verde', 'Rojo'];
                appsNames = ['Generar Nombres', 'Convertir Bases', 'Lista Super', 'Matriz'];
                break;
            case 2: 
                colorsNames = ['Dark', 'Light', 'Blue', 'Green', 'Red'];
                appsNames = ['Names Generator', 'Bases Converted', 'Super List', 'Matrix'];
                break;
            default: 
                colorsNames = ['Dark', 'Light', 'Blue', 'Green', 'Red'];
                appsNames = ['Names Generator', 'Bases Converted', 'Super List', 'Matrix'];
        }

        const newColors = colors.map(color => {
            color.name = colorsNames[color.id - 1];
            return color;
        });

        const newApps = apps.map(app => {
            app.name = appsNames[app.id - 1];
            return app;
        })

        setColors(newColors);
        setApps(newApps);
    }

    return (
        <Context.Provider value={{
            mostrar,
            apps,
            changeMostrar,
            changeColor,
            colors,
            color,
            changeLanguage,
            languages,
            language,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };