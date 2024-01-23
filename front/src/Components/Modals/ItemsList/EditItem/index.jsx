import React, { useEffect, useContext, Fragment } from 'react';
import { AllContext } from '../../../../App/MyContext';
import { useKeyDown, useKeyUp } from '../../../../App/myHooks';
import styles from '/src/Components/Modals/styles/index.module.scss';


const ListenKeys = props => {
    const { keyExec } = props;
    // ---------------------------------------------   KEYBOARD EVENTS   --------------------------------------------- #
    useKeyDown(props.close, ['escape'], keyExec);
    useKeyUp(null, ['any'], keyExec);
    // ---------------------------------------------   /KEYBOARD EVENTS   --------------------------------------------- #

    return null;
}

const EditItem = props => {
    const { s, f } = useContext(AllContext);
    const keyExec = !!s.modals?.itemsList?.editItem;
    const ztyle = props.zindex ? {zIndex: props.zindex} : {};

    const close = () => {
        f.upgradeLvl2('modals', 'itemsList', 'editItem', false);
    }

    return (
        <>
        {keyExec && 
        <ListenKeys 
            keyExec={keyExec}
            close={close}
        />}
        <div
            className={`${styles.modal_info} ${!s.modals?.itemsList?.editItem && 'hidden'}`}
            style={{...ztyle}}
            onClick={close}
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

export { EditItem };