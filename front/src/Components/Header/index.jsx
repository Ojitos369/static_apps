import { useContext, useMemo } from 'react';
import { AllContext } from '../../App/MyContext';

import { ButtonMenu } from './ButtonMenu';

import styles from './styles/index.module.scss';

const Header = props => {
    const { ls, lf, s, Link } = useContext(AllContext);

    const title = useMemo(() => {
        return s?.page?.title || '';
    }, [s?.page?.title]);

    return (
        <header
            id="header"
            className={`${styles.header}`}
            >
            <div
                className={`${styles.logo}`}
                >
                <Link
                    to="/"
                    >
                    SA
                </Link>
            </div>

            <p
                className={`${styles.title}`}
                >
                {title}
            </p>

            <div
                className={`${styles.menu}`}
                >
                <ButtonMenu />
            </div>
        </header>
    )
}

export { Header };