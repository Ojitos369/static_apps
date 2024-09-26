import { useContext } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';


const Test = props => {
    
    return (
        <div className={`${styles.container}`}>
            Test
        </div>
    )
}

const FbEvent = props => {
    const { ls, lf, s, f } = useStates();

    const sendLlamada = e => {
        if (!!e) e.preventDefault();
        f.fbTest.test();
    }

    return (
        <div className={`flex w-full justify-center`}>
            <button 
                className='bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded mt-5'
                onClick={sendLlamada}>Send Llamada</button>
        </div>
    )
}

export { Test };
