import React from 'react';
import {useStates } from '../../Hooks/useStates';
import { useKeyDown, useKeyUp } from '../../Hooks';
import styles from '/src/Components/Modals/styles/index.module.scss';
// console.log(styles);

const ListenKeys = props => {
    const { keyExec } = props;
    // ---------------------------------------------   KEYBOARD EVENTS   --------------------------------------------- #
    useKeyDown(props.close, ['escape'], keyExec);
    useKeyUp(null, ['any'], keyExec);
    // ---------------------------------------------   /KEYBOARD EVENTS   --------------------------------------------- #

    return null;
}

const ModalThemeChanged = props => {
    const { ls, s, f } = useStates();
    const keyExec = !!s.modals?.themes?.changed;
    const ztyle = props.zindex ? {zIndex: props.zindex} : {};

    const close = () => {
        f.u2('modals', 'themes', 'changed', false);
    }

    return (
        <>
        {keyExec && 
        <ListenKeys 
            keyExec={keyExec}
            close={close}
        />}
        <div
            className={`${styles.modal_info}`}
            style={{...ztyle}}
            onClick={close}
            >
            <div 
                className={`flex ${styles.modal_container} ${styles.modal_container_50} pb-5 pt-5 ${styles.my_modal}`}
                onClick={e => e.stopPropagation()}
                >
                <h3 className="text-center basis-full text-bold">
                    Thema Cambiado a: {ls.theme}
                </h3>
            </div>
        </div>
        </>
    )
}

export { ModalThemeChanged };