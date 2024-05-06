import { useEffect, useRef, useMemo } from 'react';
import {useStates } from '../../Hooks/useStates';
import { useKeyDown, useKeyUp, useLocalTab } from '../../Hooks';
import styles from './styles/index.module.scss';


const ListenKeys = props => {
    const { keyExec } = props;
    // ---------------------------------------------   KEYBOARD EVENTS   --------------------------------------------- #
    useKeyDown(props.close, ['escape'], keyExec);
    useKeyUp(null, ['any'], keyExec);
    // ---------------------------------------------   /KEYBOARD EVENTS   --------------------------------------------- #

    return null;
}

const Ajustes = props => {
    const { s, f } = useStates();
    const keyExec = !!s.modals?.ac?.ajustes;
    const ztyle = props.zindex ? {zIndex: props.zindex} : {};
    const { tx } = props;

    const ajustes = useMemo(() => s.ac?.ajustes || {}, [s.ac?.ajustes]);

    const close = () => {
        f.u2('modals', 'ac', 'ajustes', false);
    }

    const modalRef = useRef(null);
    useLocalTab(s.modals?.ac?.ajustes, modalRef);

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
            id="modal-ac_ajustes"
            ref={modalRef}
            >
            <div 
                className={`flex ${styles.modal_container} ${styles.modal_container_50} pb-5 pt-5 ${styles.my_modal}`}
                onClick={e => e.stopPropagation()}
                >
                Content Here
                <div className="flex flex-row flex-wrap justify-around">
                    And Here :3
                </div>
            </div>
        </div>
        </>
    )
}

export { Ajustes };