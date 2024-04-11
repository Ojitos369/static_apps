import { useMemo, useEffect } from 'react';
import {useStates } from '../../App/useStates';

import './styles/index.module.css';

const Index = props => {
    const { ls, lf, s, f } = useStates();

    useEffect(() => {
        f.u1('page', 'title', 'Simple Apps')
    }, []);
    
    return (
        <>
            Pages
        </>
    )
}

export { Index };
