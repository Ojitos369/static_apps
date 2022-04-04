import React from 'react'
import { ContextMatrix } from './ContextMatrix'

function ShowMatrix(props) {
    const rows = props.mat.rows !== '' ? parseInt(props.mat.rows) : 0; 
    const cols = props.mat.cols !== '' ? parseInt(props.mat.cols) : 0; 
    const key = props.id
    const { inputMatrixData, upGradeInputMatrixData } = React.useContext(ContextMatrix)
    let classMatrix = 'col-2 text-center matrix-input'
    if (cols > 5){
        classMatrix = 'col-1 text-center matrix-input'
    }
    const matrix = []
    for (let i = 0; i < rows; i++) {
        matrix.push(
            <div className='row d-flex justify-content-center' key={i}>
                {
                    Array(cols).fill(0).map((_, j) => {
                        return (
                            <input
                                className={classMatrix}
                                type="number"
                                name={`matrix-${key}-${i}-${j}`}
                                id={`matrix-${key}-${i}-${j}`}
                                placeholder={`matrix-${i+1}-${j+1}`}
                                key={j}
                                required={true}
                                value={inputMatrixData[key][i][j]}
                                onChange={() => upGradeInputMatrixData(key, i, j)}
                            />
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className='col-12 container mt-3'>
            {matrix}    
        </div>
    )
}

export { ShowMatrix };