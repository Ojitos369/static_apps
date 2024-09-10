import { useContext } from 'react';
import {useStates } from '../../Hooks/useStates';

import styles from './styles/index.module.scss';

const Test = props => {
    const { ls, lf, s, f } = useStates();
    return (
        <div className={`${styles.test}`}>

        </div>
    )
}

export { Test };
