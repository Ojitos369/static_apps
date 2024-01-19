import { useContext, useMemo, useEffect } from 'react';
import { AllContext } from '../../App/MyContext';

import './styles/index.module.css';

const Index = props => {
    const { ls, lf, s, f } = useContext(AllContext);

    useEffect(() => {
        f.upgradeLvl1('page', 'title', 'Simple Apps')
    }, []);
    
    return (
        <>
            Pages
        </>
    )
}

export { Index };
