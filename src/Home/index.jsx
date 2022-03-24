import React from 'react'
import './Home.css'

function Home() {
    return (
        <section className='container home-container'>
            <div className='row'>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>Disfruta de las apps disponibles</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>Estaremos agregando mas constantemente</p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>Puedes Enviar tus sugerencias y se implementaran pronto</p>
                </div>
            </div>
        </section>
    )
}

export { Home };