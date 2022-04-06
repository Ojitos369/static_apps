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

    const colorsBase = [
        {
            name: 'Dark',
            background: '#212529',
            color: '#fff',
            id: 1,
            active: true,
            otherNames: [
                'Oscuro',
                'Dark',
            ],
        },
        {
            name: 'Light',
            background: '#fff',
            color: '#000',
            id: 2,
            active: false,
            otherNames: [
                'Claro',
                'Light',
            ],
        },
        {
            name: 'Blue',
            background: '#007bff',
            color: '#000',
            id: 3,
            active: false,
            otherNames: [
                'Azul',
                'Blue',
            ],
        },
        {
            name: 'Green',
            background: '#28a745',
            color: '#000',
            id: 4,
            active: false,
            otherNames: [
                'Verde',
                'Green',
            ],
        },
        {
            name: "Orange",
            background: '#fd7e14',
            color: '#fff',
            id: 5,
            active: false,
            otherNames: [
                'Naranja',
                'Orange',
            ],
        },
        {
            name: 'Violet',
            background: '#9b76df',
            color: '#000',
            id: 6,
            active: false,
            otherNames: [
                'Violeta',
                'Violet',
            ],
        },
        {
            name: 'Custom',
            background: '#000',
            color: '#fff',
            id: 99,
            active: false,
            otherNames: [
                'Custom',
                'Custom',
            ],
        }
    ]

    const [colors, setColors] = useLocalStorage('colors', colorsBase);

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

    const customColorsBase = [0,0,0, "#000"]

    const [customColors, setCustomColors] = useLocalStorage('customColors', customColorsBase);

    const customTextBase = [255,255,255, "#fff"]

    const [customText, setCustomText] = useLocalStorage('customText', customTextBase);

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
    
    const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
    const numbers_change = [10, 11, 12, 13, 14, 15, 16];

    const convertDecimalToHex = (number) => {
        if (parseInt(number) === 0) {
            return '00';
        }
        const base = 16
        let continuar = true;
        let resultado = [];
        let decimales = parseFloat(number) % 1;
        let aux = parseInt(parseFloat(number) - decimales);

        while (continuar) {
            let residuo = parseInt(aux % base);
            aux -= residuo;
            aux /= base;

            if (residuo > 9) {
                residuo = letters[numbers_change.indexOf(residuo)];
            }
            if (!(residuo === 0 && aux === 0)) {
                resultado.push(residuo);
            }
            aux === 0 ? continuar = false : continuar = true;
        }
        resultado.reverse();

        return resultado.join('').replace('-', '');
    }

    const convertHexToDec = (number) => {
        let entero = number;
        const base = 16;

        let numberList = entero.toString().split('');
        numberList.reverse();

        let resultado = 0;
        for (let i = 0; i < numberList.length; i++) {
            let aux = numberList[i];
            if (letters.includes(aux)) {
                let index = letters.indexOf(aux);
                aux = numbers_change[index];
            }
            resultado += parseInt(aux) * Math.pow(parseInt(base), i);
        }
        return resultado;
    }

    const changeColor = id => {
        const newColor = colorsBase.filter(color => color.id === id)[0];
        newColor.active = true;
        setColor(newColor);
        const newColors = colorsBase.map(color => {
            if (color.id === id) {
                color.active = true;
            } else {
                color.active = false;
            }
            if (color.id === 99) {
                const customColor = newColor.background.replace('#', '');
                const customColorList = customColor.split('');
                let red;
                let green;
                let blue;
                if (customColorList.length === 6) {
                    red = customColorList[0] + customColorList[1];
                    green = customColorList[2] + customColorList[3];
                    blue = customColorList[4] + customColorList[5];
                } else if (customColorList.length === 3) {
                    red = customColorList[0] + customColorList[0];
                    green = customColorList[1] + customColorList[1];
                    blue = customColorList[2] + customColorList[2];
                }
                color.background = `#${red}${green}${blue}`;
                setCustomColors([convertHexToDec(red), convertHexToDec(green), convertHexToDec(blue), `#${red}${green}${blue}`]);

                const customTextColor = newColor.color.replace('#', '');
                const customTextColorList = customTextColor.split('');
                if (customTextColorList.length === 6) {
                    red = customTextColorList[0] + customTextColorList[1];
                    green = customTextColorList[2] + customTextColorList[3];
                    blue = customTextColorList[4] + customTextColorList[5];
                } else if (customTextColorList.length === 3) {
                    red = customTextColorList[0] + customTextColorList[0];
                    green = customTextColorList[1] + customTextColorList[1];
                    blue = customTextColorList[2] + customTextColorList[2];
                }
                color.color = `#${red}${green}${blue}`;
                setCustomText([convertHexToDec(red), convertHexToDec(green), convertHexToDec(blue), `#${red}${green}${blue}`]);
            }
            return color;
        })
        setColors(newColors);
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
        let appsNames;
        switch (id) {
            case 1: 
                appsNames = ['Generar Nombres', 'Convertir Bases', 'Lista Super', 'Matriz'];
                break;
            case 2: 
                appsNames = ['Names Generator', 'Bases Converted', 'Super List', 'Matrix'];
                break;
            default: 
                appsNames = ['Names Generator', 'Bases Converted', 'Super List', 'Matrix'];
        }

        const newColors = colorsBase.map(thisColor => {
            thisColor.name = thisColor.otherNames[id - 1];
            if (thisColor.id === color.id) {
                thisColor.active = true;
            } else {
                thisColor.active = false;
            }
            return thisColor;
        });

        const newApps = apps.map(app => {
            app.name = appsNames[app.id - 1];
            return app;
        })

        setColors(newColors);
        setApps(newApps);
    }

    const upgradeCustomColor = (modo) => {
        if (modo === 1) {
            let redBar = document.getElementById('bg-red-bar').value;
            let greenBar = document.getElementById('bg-green-bar').value;
            let blueBar = document.getElementById('bg-blue-bar').value;
            let newCustomColors = [redBar, greenBar, blueBar];
            redBar = convertDecimalToHex(redBar).toString();
            if (redBar.length === 1) {
                redBar = '0' + redBar;
            }
            greenBar = convertDecimalToHex(greenBar).toString();
            if (greenBar.length === 1) {
                greenBar = '0' + greenBar;
            }
            blueBar = convertDecimalToHex(blueBar).toString();
            if (blueBar.length === 1) {
                blueBar = '0' + blueBar;
            }
            const customColor = '#' + redBar + greenBar + blueBar;
            newCustomColors.push(customColor);
            setCustomColors(newCustomColors);
            const newColors = colors.map(color => {
                if (color.id === 99) {
                    color.background = customColor;
                    color.active = true;
                    setColor(color);
                } else {
                    color.active = false;
                }
                return color;
            });
            setColors(newColors);
        } else {
            let input = document.getElementById('bg-color-hex').value;
            input = input.toLowerCase();
            const newCustomColors = [customColors[0], customColors[1], customColors[2], input];
            setCustomColors(newCustomColors);
            // check regex for hexadecimal (3 or 6)
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (regex.test(input)) {
                const newColors = colors.map(color => {
                    if (color.id === 99) {
                        color.background = input;
                        color.active = true;
                        setColor(color);
                    } else {
                        color.active = false;
                    }
                    return color;
                });
                setColors(newColors);
                let customColorList = input.replace('#', '').split('');
                let  red;
                let  green;
                let  blue;
                if (customColorList.length === 6) {
                    red = customColorList[0] + customColorList[1];
                    green = customColorList[2] + customColorList[3];
                    blue = customColorList[4] + customColorList[5];
                } else if (customColorList.length === 3) {
                    red = customColorList[0] + customColorList[0];
                    green = customColorList[1] + customColorList[1];
                    blue = customColorList[2] + customColorList[2];
                }
                setCustomColors([convertHexToDec(red), convertHexToDec(green), convertHexToDec(blue), input]);

            } else {return}
        }
    }

    const upgradeCustomTextColor = (modo) => {
        if (modo === 1) {
            let redBar = document.getElementById('text-red-bar').value;
            let greenBar = document.getElementById('text-green-bar').value;
            let blueBar = document.getElementById('text-blue-bar').value;
            let newCustomText = [redBar, greenBar, blueBar];
            redBar = convertDecimalToHex(redBar).toString();
            if (redBar.length === 1) {
                redBar = '0' + redBar;
            }
            greenBar = convertDecimalToHex(greenBar).toString();
            if (greenBar.length === 1) {
                greenBar = '0' + greenBar;
            }
            blueBar = convertDecimalToHex(blueBar).toString();
            if (blueBar.length === 1) {
                blueBar = '0' + blueBar;
            }
            const customColor = '#' + redBar + greenBar + blueBar;
            newCustomText.push(customColor);
            setCustomText(newCustomText);
            const newColors = colors.map(color => {
                if (color.id === 99) {
                    color.color = customColor;
                    color.active = true;
                    setColor(color);
                } else {
                    color.active = false;
                }
                return color;
            });
            setColors(newColors);
        } else {
            let input = document.getElementById('text-color-hex').value;
            input = input.toLowerCase();
            const newCustomText = [customText[0], customText[1], customText[2], input];
            setCustomText(newCustomText);
            // check regex for hexadecimal (3 or 6)
            const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (regex.test(input)) {
                const newColors = colors.map(color => {
                    if (color.id === 99) {
                        color.color = input;
                        color.active = true;
                        setColor(color);
                    } else {
                        color.active = false;
                    }
                    return color;
                });
                setColors(newColors);
                let customColorList = input.replace('#', '').split('');
                let  red;
                let  green;
                let  blue;
                if (customColorList.length === 6) {
                    red = customColorList[0] + customColorList[1];
                    green = customColorList[2] + customColorList[3];
                    blue = customColorList[4] + customColorList[5];
                } else if (customColorList.length === 3) {
                    red = customColorList[0] + customColorList[0];
                    green = customColorList[1] + customColorList[1];
                    blue = customColorList[2] + customColorList[2];
                }
                setCustomText([convertHexToDec(red), convertHexToDec(green), convertHexToDec(blue), input]);

            } else {return}
        }
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
            upgradeCustomColor,
            customColors,
            upgradeCustomTextColor,
            customText,
        }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, Provier };