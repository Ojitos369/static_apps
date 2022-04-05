import React from 'react'
import { ShowMatrix } from './ShowMatrix'
import { ContextMatrix } from './ContextMatrix'

function NumberMatriz() {
    const {
        Mat1,
        escalar,
        upgradeEscalar,
        upgradeMatrix,
        calcularMatrices,
    } = React.useContext(ContextMatrix);
    return (
        <React.Fragment>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    calcularMatrices();
                }}
                className='container-fluent mt-2'
            >
                <div className='row'>
                    <div className='col-12 col-md mt-3'>
                        <div className='container-fluent'>
                            <div className='row d-flex justify-content-center'>
                                <p className='col-12 text-center h4'>Escalar</p>
                            </div>
                            <div className='row d-flex justify-content-around'>
                                <input 
                                    className='col-4 text-center matrix-options-input'
                                    type="number"
                                    name="escalar"
                                    id="escalar"
                                    placeholder='Escalar'
                                    min={1}
                                    max={10}
                                    step='any'
                                    value={escalar}
                                    onChange={upgradeEscalar}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md mt-3'>
                        <div className='container-fluent'>
                            <div className='row d-flex justify-content-center'>
                                <p className='col-12 text-center h4'>Matriz 1</p>
                            </div>
                            <div className='row d-flex justify-content-around'>
                                <input
                                    className='col-4 text-center matrix-options-input'
                                    type="number"
                                    name="rows-mat-1"
                                    id="rows-mat-1"
                                    placeholder='Rows mat 1'
                                    min={1}
                                    max={10}
                                    step='any'
                                    value={Mat1.rows}
                                    onChange={upgradeMatrix}
                                />
                                <input
                                    className='col-4 text-center matrix-options-input'
                                    type="number"
                                    name="cols-mat-1"
                                    id="cols-mat-1"
                                    placeholder='Cols mat 1'
                                    min={1}
                                    max={10}
                                    step='any'
                                    value={Mat1.cols}
                                    onChange={upgradeMatrix}
                                />
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <ShowMatrix id={1} mat={Mat1} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-3 d-flex justify-content-center'>
                    <input className='btn btn-primary col-10' type="submit" value="Calcular" />
                </div>
            </form>
        </React.Fragment>
    )
}

export { NumberMatriz };