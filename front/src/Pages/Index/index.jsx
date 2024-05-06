import { useMemo, useEffect } from 'react';
import {useStates } from '../../Hooks/useStates';
import { GreatBat98 } from '../../Components/Cards/GreatBat98';

import './styles/index.module.css';

const Index = props => {
    const { ls, lf, s, f } = useStates();

    useEffect(() => {
        f.u1('page', 'title', 'Simple Apps')
    }, []);
    
    return (
        <>
            Pages
            <GreatBat98 />
        </>
    )
}

export { Index };
