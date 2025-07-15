import { useMemo, useEffect } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';

export const useVars = () => {
    const { s, f } = useStates();
    
    return {
        styles,
        f,
    }
}

export const useMyEffects = () => {
    const { f } = useVars();
    
    useEffect(() => {
        f.u1('page', 'title', 'Vitim');
    }, []);

}
