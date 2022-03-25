import React from 'react'
import { useLocalStorage } from '../../Context/useLocalStorage';
const NamesContext = React.createContext();

function NamesProvier(props) {
    const {
        item: namesShow,
        saveItems: setNamesShow,
    } = useLocalStorage('namesShow', []);
    const {
        item: namesCount,
        saveItems: setNamesCount,
    } = useLocalStorage('namesCount', 10);
    const {
        item: minLength,
        saveItems: setMinLength,
    } = useLocalStorage('minLength', 6);
    const {
        item: maxLength,
        saveItems: setMaxLength,
    } = useLocalStorage('maxLength', 8);
    const {
        item: fusion,
        saveItems: setFusion,
    } = useLocalStorage('fusion', 80);

    const vocals = ['a', 'e', 'i', 'o', 'u'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];

    const actualizarParametros = () => {
        const max_length = document.getElementById('max-length').value;
        const min_length = document.getElementById('min-length').value;
        const fusion = document.getElementById('fusion').value;
        const names_count = document.getElementById('names-count').value;
        
        setMinLength(min_length);
        console.log('min_length: ' + min_length);
        setMaxLength(max_length);
        console.log('max_length: ' + max_length);
        setNamesCount(names_count);
        console.log('names_count: ' + names_count);
        setFusion(fusion);
        console.log('fusion: ' + fusion);
    }

    const generateNames = () => {
        const names = [];

        for (let i = 0; i < namesCount; i++) {
            let name = '';
            const vocal_prob = i%2 === 0 ? fusion : 100 - fusion;
            const diferencia = Math.abs(maxLength - minLength + 1);
            const length = parseInt(Math.floor(Math.random() * diferencia)) + parseInt(minLength);
            for (let j = 0; j < length; j++) {
                const prob = Math.floor(Math.random() * 100);
                if (prob < vocal_prob) {
                    name += vocals[Math.floor(Math.random() * vocals.length)];
                } else {
                    name += consonants[Math.floor(Math.random() * consonants.length)];
                }
            }
            name = name.charAt(0).toUpperCase() + name.slice(1);
            names.push({key: i+1, name: name, length: name.length});
        }
        setNamesShow(names);
    }

    return (
        <NamesContext.Provider value={{
            namesShow,
            setNamesShow,
            minLength,
            setMinLength,
            maxLength,
            setMaxLength,
            fusion,
            setFusion,
            namesCount,
            setNamesCount,
            actualizarParametros,
            generateNames,
        }}>
            {props.children}
        </NamesContext.Provider>
    )
}

export { NamesContext, NamesProvier };