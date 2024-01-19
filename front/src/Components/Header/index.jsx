import { useContext, useMemo } from 'react';
import { AllContext } from '../../App/MyContext';

import { ButtonMenu } from './ButtonMenu';

import styles from './styles/index.module.scss';

import sa_l from '../../static/img/sa_l.png';

const Header = props => {
    const { f, s, Link } = useContext(AllContext);

    const title = useMemo(() => {
        return s?.page?.title || '';
    }, [s?.page?.title]);

    const updateMenu = status => {
        f.upgradeLvl2('modals', 'menu', 'index', status);
    }
    const showMenu = e => {
        if (!!e) {e.preventDefault(); e.stopPropagation();}
        updateMenu(true);
    }

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
                    <img 
                        src={sa_l} 
                        alt=""
                        className={`${styles.img}`}
                        />
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
                <ButtonMenu 
                    onClick={showMenu}
                    value={!!s.modals?.menu?.index}
                    update={updateMenu}
                />
            </div>
        </header>
    )
}

export { Header };