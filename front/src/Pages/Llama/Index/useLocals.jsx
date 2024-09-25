import styles from './styles/index.module.scss';
import { useStates } from '../../../Hooks/useStates';
import { useMemo, useEffect } from 'react';

const useVars = props => {
    const { s, f } = useStates();



    const init = () => {
        f.u0('llama', null);
    }

    return {
        styles,
        init, 
    }
}

const useEffects = props => {
    const { init } = useVars();

    useEffect(() => {
        init();
    }, []);

    return null;
}

export { useVars, useEffects };