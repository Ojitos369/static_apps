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
        },
        {
            name: 'Multiplicación por Matriz',
            id: 2,
        },
        {
            name: 'Multiplicación por escalar',
            id: 3,
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
        rows: '',
        cols: '',
        matrix: [[], [], [], []]
    });

    const {
        item: Mat2,
        saveItems: setMat2
    } = useLocalStorage('Mat2', {
        rows: '',
        cols: '',
        matrix: [[], [], [], []]
    })

    const {
        item: escalar,
        saveItems: setEscalar
    } = useLocalStorage('escalar', 1);


    let  inputStartData = [
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
        ],
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
        ],
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
        ],
    ]
    const {
        item: inputMatrixData,
        saveItems: setInputMatrixData
    } = useLocalStorage('inputMatrixData', inputStartData);

    let resultadoData = {
        rows: 0,
        cols: 0,
        matrix: [],
        cargado: 0
    }

    const {
        item: resultado,
        saveItems: setResultado
    } = useLocalStorage('resultado', resultadoData);

    const {
        item: modos,
        saveItems: setModos
    } = useLocalStorage('modos', modosList);

    const changeModo = (id) => {
        setModo(id);
        setModos(modosList);
        setResultado({
            cols: 0,
            rows: 0,
            matrix: [],
            cargado: 0
        });
    }

    const upgradeMat1 = () => {
        let newMat1Row = document.getElementById('rows-mat-1').value;
        let newMat1Col = document.getElementById('cols-mat-1').value;

        if (newMat1Row < 1 && newMat1Row !== '') {
            newMat1Row = 1;
        }
        if (newMat1Col < 1 && newMat1Col !== '') {
            newMat1Col = 1;
        }
        if (newMat1Row > 10) {
            newMat1Row = 10;
        }
        if (newMat1Col > 10) {
            newMat1Col = 10;
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
        let newMat2Col = document.getElementById('cols-mat-2').value;
        let newMat2Row = document.getElementById('rows-mat-2').value;
        if (newMat2Row < 1 && newMat2Row !== '') {
            newMat2Row = 1;
        }
        if (newMat2Col < 1 && newMat2Col !== '') {
            newMat2Col = 1;
        }
        if (newMat2Row > 10) {
            newMat2Row = 10;
        }
        if (newMat2Col > 10) {
            newMat2Col = 10;
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

    const upgradeEscalar = () => {
        let newEscalar = document.getElementById('escalar').value;
        setEscalar(newEscalar);
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

    const [actualizar, setActualizar] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const getMatSolution = async () => {
        let myObject;
        try {
            let stringMat2;
            let stringMat1 = stringMatrix(Mat1);
            if (modo !== 3) {
                stringMat2 = stringMatrix(Mat2);
            }
            let linkApiSum;
            if ( modo === 0 ) {
                linkApiSum = apiHost + 'sum/' + stringMat1 + '/' + stringMat2;
            } else if ( modo === 1 ) {
                linkApiSum = apiHost + 'sub/' + stringMat1 + '/' + stringMat2;
            } else if ( modo === 2 ) {
                linkApiSum = apiHost + 'mult/matrix/' + stringMat1 + '/' + stringMat2;
            } else if ( modo === 3 ) {
                linkApiSum = apiHost + 'mult/escalar/' + escalar + '/' + stringMat1;
            }
            const response = await fetch(linkApiSum);
            const data = await response.json();
            console.log(linkApiSum)
            console.log(response.status)
            console.log(data)
            if (data.status === 'ok') {
                const matResponse = data.result;
                myObject = {
                    cols: matResponse[0].length,
                    rows: matResponse.length,
                    matrix: matResponse,
                    cargado: 1
                };
            } else {
                myObject = {
                    cols: 0,
                    rows: 0,
                    matrix: data.errors[0],
                    cargado: 2
                };
            }
        } catch (error) {
            myObject = {
                cols: 0,
                rows: 0,
                matrix: [],
                cargado: 0
            };
        }
        setResultado(myObject);
        setLoading(false);
    }

    const upGradeInputMatrixData = (key, i, j) => {
        const dato = document.getElementById(`matrix-${key}-${i}-${j}`).value;
        let newInputMatrixData = inputMatrixData
        newInputMatrixData[key][i][j] = dato;
        console.log(newInputMatrixData[key]);
        setInputMatrixData(newInputMatrixData);
        upgradeMatrix();
    }

    React.useEffect(() => {
        getMatSolution();
    }, [actualizar])

    const calcularMatrices = () => {
        upgradeMatrix();
        upgradeMat1Data();
        if (modo !== 3) {
            upgradeMat2Data();
        } else {
            upgradeEscalar();
        }
        setLoading(true);
        setActualizar(!actualizar);
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
            upgradeEscalar,
            resultado,
            loading,
            inputMatrixData,
            upGradeInputMatrixData,
        }}>
            {props.children}
        </ContextMatrix.Provider>
    )
}

export { ContextMatrix, ProvierMatrix };
