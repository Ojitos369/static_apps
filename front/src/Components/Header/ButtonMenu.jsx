import { useState } from 'react';
import styles from './styles/button.module.scss';
const ButtonMenu = props => {
    const [check, setCheck] = useState(false);

    return (
        <label 
            className={`${styles.menuButton}`}
            for="check">
            <input 
                className={`${styles.check}`}
                value={check}
                onChange={e => setCheck(e.target.checked)}
                type="checkbox" id="check" />
            <span 
                className={`${!check ? styles.top : styles.topActive}`}
                ></span>
            <span 
                className={`${!check ? styles.mid : styles.midActive}`}
                ></span>
            <span 
                className={`${!check ? styles.bot : styles.botActive}`}
                ></span>
        </label>
    )
}

export { ButtonMenu }