import React from 'react'
import { useLocalStorage } from '../../../Context/useLocalStorage';
const BasesContext = React.createContext();

function BasesProvier(props) {
    const [resultados, setResultados] = useLocalStorage('resultados', []);

    const [base, setBase] = useLocalStorage('base', {});

    const [convertedBases, setConvertedBases] = useLocalStorage('convertedBases', []);

    const [originalNumber, setOriginalNumber] = useLocalStorage('originalNumber', '');

    const [numDecimales, setNumDecimales] = useLocalStorage('numDecimales', 0);

    const [error, setError] = useLocalStorage('error', false);

    const [errorBases, setErrorBases] = useLocalStorage('errorBases', false);


    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const numbers_change = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

    const convertToDecimal = (number, base, decimales) => {
        let entero;
        let decimal;
        if (number.toString().includes('.')) {
            entero = number.split('.')[0]
            decimal = number.split('.')[1]
        }
        else {
            entero = number;
            decimal = 0;
        }

        let numberList = entero.toString().split('');
        numberList.reverse();

        let resultado = 0;
        for (let i = 0; i < numberList.length; i++) {
            let aux = numberList[i];
            if (letters.includes(aux)) {
                let index = letters.indexOf(aux);
                aux = numbers_change[index];
                if (base <= 10) {
                    setError(true);
                    return false;
                } else {
                    setError(false);
                }
            }
            if (aux > base - 1){
                setError(true);
                return false;
            }
            else {
                setError(false);
            }
            resultado += parseInt(aux) * Math.pow(parseInt(base), i);
        }

        if (decimal) {
            resultado = parseFloat(resultado)
            let numeroDeDecimales = decimal.length;
            if (numeroDeDecimales > decimales) {
                numeroDeDecimales = decimales;
            }
            for (let i = 0; i < numeroDeDecimales; i++) {
                let aux = decimal[i];
                if (letters.includes(aux)) {
                    let index = letters.indexOf(aux);
                    aux = numbers_change[index];
                }
                resultado += parseFloat(parseFloat(aux) * Math.pow(parseInt(base), -(i + 1)));
            }
        }
        return resultado;
    }

    const convertFromDecimal = (number, base, numeroDecimales) => {
        base = parseInt(base);
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

        if (decimales > 0) {
            resultado.push('.');
            let i = 0
            let cont = true;
            while (cont) {
                let aux2 = parseFloat(decimales) * parseFloat(base);
                let residuo = parseInt(aux2);
                decimales = aux - residuo;
                if (residuo > 9) {
                    residuo = letters[numbers_change.indexOf(residuo)];
                }
                resultado.push(residuo);
                if (parseInt(decimales) < 0 || i === numeroDecimales - 1) {
                    cont = false;
                    break;
                }
                i++;
            }
        }

        return resultado.join('').replace('-', '');
    }


    const crearConversiones = () => {
        let conversiones = [];
        const myconvertedBases = convertedBases.split(',');
        for (let i = 0; i < myconvertedBases.length; i++) {
            if (originalNumber.toString() === '0') {
                conversiones.push({
                    key: myconvertedBases[i],
                    value: 0,
                });
            } else {
                const decimal = convertToDecimal(originalNumber, base, numDecimales);
                if (!decimal) { return false; }
                const res = convertFromDecimal(decimal, myconvertedBases[i], numDecimales);
                conversiones.push({
                    key: myconvertedBases[i],
                    value: res,
                });
            }
        }
        setResultados(conversiones);
    }


    const ActualizarEstado = () => {
        const number = document.getElementById('original-number').value;
        const base = document.getElementById('base-number').value;
        const numDecimales = document.getElementById('numDecimales').value;
        let convertedBases = document.getElementById('converted-bases').value;
        convertedBases = convertedBases.replace(/\s/g, '');
        if (parseInt(base) > 36 || parseInt(base) < 2) {
            setErrorBases(true);
            return false;
        }
        const checkConvertedBases = convertedBases.split(',');
        for (let i = 0; i < checkConvertedBases.length; i++) {
            const re = /^[0-9]+$/;
            if (!re.test(checkConvertedBases[i])) {
                setErrorBases(true);
                return false;
            }
            const thisNumber = parseInt(checkConvertedBases[i]);
            if (thisNumber > 36 || thisNumber < 2) {
                setErrorBases(true);
                return false;
            }
        }
        setErrorBases(false);
        setOriginalNumber(number);
        setBase(base);
        setNumDecimales(numDecimales);
        setConvertedBases(convertedBases);
        crearConversiones();
    }


    const actualizarOriginalNumber = () => {
        const number = document.getElementById('original-number').value.toUpperCase();
        setOriginalNumber(number);
    }


    const actualizarBase = () => {
        const base = document.getElementById('base-number').value;
        setBase(base);
    }


    const actualizarConvertedBases = () => {
        let convertedBases = document.getElementById('converted-bases').value;
        convertedBases = convertedBases.replace(/\s/g, '');
        setConvertedBases(convertedBases);
    }


    const Reset = () => {
        setOriginalNumber('');
        setBase('');
        setNumDecimales(0);
        setConvertedBases('');
        setResultados([]);
        setError(false);
        setErrorBases(false);
    }

    return (
        <BasesContext.Provider value={{
            resultados,
            base,
            Reset,
            numDecimales,
            actualizarOriginalNumber,
            convertedBases,
            actualizarBase,
            originalNumber,
            actualizarConvertedBases,
            ActualizarEstado,
            error,
            errorBases
        }}>
            {props.children}
        </BasesContext.Provider>
    )
}

export { BasesContext, BasesProvier };
