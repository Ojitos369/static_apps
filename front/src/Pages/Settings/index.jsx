import { useContext } from 'react';
import { AllContext } from '../../App/MyContext';

import styles from './styles/index.module.scss';

const Test = props => {
    const { ls, lf, s, f } = useContext(AllContext);
    return (
        <>
            Component to make tests
        </>
    )
}

export { Test };
