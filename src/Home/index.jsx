import React from 'react'
import './Home.css'
import { Context } from '../Context';

function Home() {
    const texts = require('../texts.json');
    const { language } = React.useContext(Context);
    const textos = texts.textos[language.id - 1].home;
    return (
        <section 
            className='container home-container'
        >
            <div className='row'></div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>
                        {textos.title}
                    </p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>
                        {textos.addMore}
                    </p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h1'>
                        {textos.suggestions}
                    </p>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 text-center'>
                    <p className='h6'>
                        {textos.advise}
                    </p>
                </div>
            </div>
        </section>
    )
}

export { Home };