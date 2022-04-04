import React from 'react'

function Result(props) {
    const { matrix } = props

    return (
        <React.Fragment>
            {matrix.map((row, i) => {
                return (
                    <div className='row d-flex justify-content-center' key={i}>
                        {
                            row.map((col, j) => {
                                return (
                                    col.toString().includes('.') ? 
                                    <p className='col-1 element-matrix-result text-center h2' key={j}>
                                        {parseFloat(col).toFixed(2)}
                                    </p> : 
                                    <p className='col-1 element-matrix-result text-center h2' key={j}>
                                        {parseInt(col)}
                                    </p>
                                )
                            })
                        }
                    </div>
                    )
            })}
        </React.Fragment>
    )
}

export { Result };