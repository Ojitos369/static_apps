import React from 'react'
import { ContextMatrix } from './ContextMatrix'

function ShowMatrix(props) {
    const rows = props.mat.rows !== '' ? parseInt(props.mat.rows) : 0; 
    const cols = props.mat.cols !== '' ? parseInt(props.mat.cols) : 0; 
    const key = props.id
    const { inputMatrixData, upGradeInputMatrixData } = React.useContext(ContextMatrix)
    const matrix = []
    for (let i = 0; i < rows; i++) {
        matrix.push(
            <div className='row d-flex justify-content-center' key={i}>
                {
                    Array(cols).fill(0).map((_, j) => {
                        return (
                            <input
                                className='col-2 text-center matrix-input'
                                type="number"
                                name={`matrix-${key}-${i}-${j}`}
                                id={`matrix-${key}-${i}-${j}`}
                                placeholder={`matrix-${i+1}-${j+1}`}
                                key={j}
                                required={true}
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