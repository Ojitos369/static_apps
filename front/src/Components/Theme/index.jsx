import React, { Fragment, useEffect } from 'react';
import {useStates } from '../../App/useStates';
import { Sun, Moon } from '../../App/Icons';
import styles from './styles/index.module.scss';
// console.log(styles);

const Theme = props => {
    const { ls, lf, s, f } = useStates();
    return (
        <button
            className={`${styles.toggle_theme_button}`}
            id='toggle_theme_button'
            onClick={lf.toggleTheme}
            >
            <span>
                {ls.theme === 'white' ? <Sun /> : <Moon />}
            </span>
        </button>
    )
}

export { Theme };
