import { useContext, useEffect } from 'react';
import { AllContext } from '../../App/MyContext';

import styles from './styles/index.module.scss';

const ItemsList = props => {
    const { ls, lf, s, f } = useContext(AllContext);

    useEffect(() => {
        f.upgradeLvl1('page', 'title', 'Items List')
    }, []);

    return (
        <>
            Component to make tests
        </>
    )
}

export { ItemsList };
