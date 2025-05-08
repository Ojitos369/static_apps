import React, { useEffect, Fragment } from 'react';
import {useStates } from '../../../Hooks/useStates';
import { useKeyDown, useKeyUp } from '../../../Hooks';
import styles from './styles/index.module.scss';

import  { CircleXmark } from '../../Icons';

const ListenKeys = props => {
    const { keyExec } = props;
    // ---------------------------------------------   KEYBOARD EVENTS   --------------------------------------------- #
    useKeyDown(props.close, ['escape'], keyExec);
    useKeyUp(null, ['any'], keyExec);
    // ---------------------------------------------   /KEYBOARD EVENTS   --------------------------------------------- #

    return null;
}

const Menu = props => {
    const { s, f, Link } = useStates();
    const keyExec = !!s.modals?.menu?.index;
    const ztyle = props.zindex ? {zIndex: props.zindex} : {};

    const apps = [
        {name: "Home", path: ""},
        {name: "Items List", path: "items_list"},
        {name: "Automatas Celular", path: "ac"},
        {name: "Cod", path: "cod"},
        {name: "Chat", path: "llama"},
        {name: "Im2aci", path: "im2aci"},
        {name: "Test", path: "test"},
    ]

    const close = () => {
        f.u2('modals', 'menu', 'index', false);
    }

    return (
        <>
        {keyExec && 
        <ListenKeys 
            keyExec={keyExec}
            close={close}
        />}
        <div
            className={`${styles.modal_info} ${!s.modals?.menu?.index && 'hidden'}`}
            style={{...ztyle}}
            onClick={close}
            >
            <div 
                className={`flex ${styles.modal_container} pb-5 pt-5 ${styles.my_modal}`}
                onClick={e => e.stopPropagation()}
                >
                <span
                    className={`${styles.close_modal} manita`}
                    onClick={close}
                    >
                    <CircleXmark />
                </span>
                <div 
                    className={`${styles.menu_items}`}
                    >
                    {apps.map((app, i) => (
                        <Link
                            key={i}
                            to={app.path}
                            onClick={close}
                            className={`${styles.menu_item}`}
                            >
                            {app.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export { Menu };