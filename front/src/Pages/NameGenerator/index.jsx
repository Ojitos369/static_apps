import {useStates } from '../../App/useStates';

import styles from './styles/index.module.scss';

const Test = props => {
    const { ls, lf, s, f } = useStates();
    return (
        <>
            Component to make tests
        </>
    )
}

export { Test };
