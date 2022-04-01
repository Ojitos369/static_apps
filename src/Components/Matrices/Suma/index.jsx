import React from 'react'
import { ShowMatrix } from '../ShowMatrix'
import { ContextMatrix } from '../ContextMatrix'

function Suma() {
    const {
        Mat1,
        Mat2,
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
                className='container-fluent mt-4'
            >
                <div className='row'>
                    <div className='col-12 col-md'>
                        <div className='container-fluent'>
                            <div className='row d-flex justify-content-around'>
                                <input
                                    className='col-4 text-center'
                                    type="number"
                                    name="rows-mat-1"
                                    id="rows-mat-1"
                                    placeholder='Rows mat 1'
                                    min={1}
                                    max={5}
                                    value={Mat1.rows}
                                    onChange={upgradeMatrix}
                                />
                                <input
                                    className='col-4 text-center'
                                    type="number"
                                    name="cols-mat-1"
                                    id="cols-mat-1"
                                    placeholder='Cols mat 1'
                                    min={1}
                                    max={5}
                                    value={Mat1.cols}
                                    onChange={upgradeMatrix}
                                />
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <ShowMatrix id={1} mat={Mat1} />
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md'>
                        <div className='container-fluent'>
                            <div className='row d-flex justify-content-around'>
                                <input 
                                    className='col-4
                                    text-center'
                                    type="number"
                                    name="rows-mat-2"
                                    id="rows-mat-2"
                                    placeholder='Rows mat 2'
                                    min={1}
                                    max={5}
                                    value={Mat2.rows}
                                    onChange={upgradeMatrix}
                                />
                                <input 
                                    className='col-4
                                    text-center'
                                    type="number"
                                    name="cols-mat-2"
                                    id="cols-mat-2"
                                    placeholder='Cols mat 2'
                                    min={1}
                                    max={5}
                                    value={Mat2.cols}
                                    onChange={upgradeMatrix}
                                />
                            </div>
                            <div className='row'>
                                <ShowMatrix id={2} mat={Mat2} />
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

export { Suma };