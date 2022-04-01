import React from 'react'
import { useLocalStorage } from '../../Context/useLocalStorage';
const ContextMatrix = React.createContext();

function ProvierMatrix(props) {
    const apiHost = 'https://matricesop.herokuapp.com/operations/';
    const modosList = [
        {
            name: 'Suma',
            id: 0,
        },
        {
            name: 'Resta',
            id: 1,
        }
    ]
    const {
        item: modo,
        saveItems: setModo
    } = useLocalStorage('modo', 0);

    const {
        item: Mat1,
        saveItems: setMat1
    } = useLocalStorage('Mat1', {
        rows: 4,
        cols: 4,
        matrix: [[], [], [], []]
    });

    const {
        item: Mat2,
        saveItems: setMat2
    } = useLocalStorage('Mat2', {
        rows: 4,
        cols: 4,
        matrix: [[], [], [], []]
    })

    const {
        item: escalar,
        saveItems: setEscalar
    } = useLocalStorage('escalar', 1);

    const {
        item: resultado,
        saveItems: setResultado
    } = useLocalStorage('resultado', {
        rows: 0,
        cols: 0,
        matrix: []
    });

    const {
        item: modos,
        saveItems: setModos
    } = useLocalStorage('modos', modosList);

    const changeModo = (id) => {
        setModo(id);
        setModos(modosList);
    }

    const upgradeMat1 = () => {
        let newMat1Row = document.getElementById('rows-mat-1').value;
        let newMat1Col = document.getElementById('cols-mat-1').value;
        if (newMat1Row < 1 || newMat1Row === '') {
            newMat1Row = 1;
        }
        if (newMat1Col < 1 || newMat1Col === '') {
            newMat1Col = 1;
        }
        if (newMat1Row > 5) {
            newMat1Row = 5;
        }
        if (newMat1Col > 5) {
            newMat1Col = 5;
        }
        let newMat1 = {
            rows: newMat1Row,
            cols: newMat1Col,
            matrix: []
        }
        setMat1(newMat1);
    }

    const upgradeMat1Data = () => {
        let newMat1 = {
            rows: Mat1.rows,
            cols: Mat1.cols,
            matrix: []
        }
        for (let i = 0; i < newMat1.rows; i++) {
            newMat1.matrix.push([])
            for (let j = 0; j < newMat1.cols; j++) {
                let element = document.getElementById(`matrix-1-${i}-${j}`);
                newMat1.matrix[i].push(element.value)
            }
        }
        setMat1(newMat1);
    }

    const upgradeMat2 = () => {
        let newMat2Col = parseInt(document.getElementById('cols-mat-2').value);
        let newMat2Row = parseInt(document.getElementById('rows-mat-2').value);
        if (newMat2Row < 1 || newMat2Row === '') {
            newMat2Row = 1;
        }
        if (newMat2Col < 1 || newMat2Col === '') {
            newMat2Col = 1;
        }
        if (newMat2Row > 5) {
            newMat2Row = 5;
        }
        if (newMat2Col > 5) {
            newMat2Col = 5;
        }

        let newMat2 = {
            rows: newMat2Row,
            cols: newMat2Col,
            matrix: []
        }
        setMat2(newMat2);
    }

    const upgradeMat2Data = () => {
        let newMat2 = {
            rows: Mat2.rows,
            cols: Mat2.cols,
            matrix: []
        }
        for (let i = 0; i < newMat2.rows; i++) {
            newMat2.matrix.push([])
            for (let j = 0; j < newMat2.cols; j++) {
                let element = document.getElementById(`matrix-2-${i}-${j}`);
                newMat2.matrix[i].push(element.value)
            }
        }
        setMat2(newMat2);
    }

    const upgradeMatrix = () => {
        upgradeMat1();
        if (modo !== 3) {
            upgradeMat2();
        }
    }

    const stringMatrix = (matrix) => {
        let string = '[';
        for (let i = 0; i < matrix.rows; i++) {
            string += '['
            for (let j = 0; j < matrix.cols; j++) {
                string += `${matrix.matrix[i][j]},`
            }
            string = string.substring(0, string.length - 1);
            string += '],'
        }
        string = string.substring(0, string.length - 1);
        string += ']';
        return string;
    }

    const sumaMat = () => {
        let stringMat1 = stringMatrix(Mat1);
        let stringMat2 = stringMatrix(Mat2);
        const linkApiSum = apiHost + 'sum/' + stringMat1 + '/' + stringMat2;
        return {
            cols: 1,
            rows: 1,
            matrix: linkApiSum
        }
    }

    const calcularMatrices = () => {
        upgradeMatrix();
        upgradeMat1Data();
        if (modo !== 3) {
            upgradeMat2Data();
        }
        if (modo === 0) {
            // Suma
            const newResult = sumaMat();
            setResultado(newResult);
        }
    }

    return (
        <ContextMatrix.Provider value={{
            modo,
            modos,
            changeModo,
            Mat1,
            Mat2,
            upgradeMatrix,
            calcularMatrices,
            escalar,
            resultado,
        }}>
            {props.children}
        </ContextMatrix.Provider>
    )
}

export { ContextMatrix, ProvierMatrix };
