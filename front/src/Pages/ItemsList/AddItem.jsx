import { useEffect, useMemo } from 'react';
import {useStates } from '../../Hooks/useStates';
import { justNumbers } from "../../Core/helper";

const AddItem = props => {
    const { s, f } = useStates();
    const { styles } = props;
    const tx = props.tx?.add || {};

    const item = useMemo(() => {
        return s.itemsList?.itemToAdd || {};
    }, [s.itemsList?.itemToAdd]);


    const submit = e => {
        if (!!e) {e.preventDefault();}
        // s.itemsList?.agregados
        let itemFull = {...item, total: (item.cantidad || 0) * (item.precio || 0)}
        f.u1('itemsList', 'agregados', [...(s.itemsList?.agregados || []), itemFull]);
        f.u1('itemsList', 'itemToAdd', null);
        document.getElementById('nombre_input').focus();
    }

    const upgrade = e => {
        let { name, value } = e.target;
        if (name !== 'nombre') {
            value = justNumbers(value);
        }

        f.u1('itemsList', 'itemToAdd', { ...item, [name]: value });
    }

    return (
        <form 
            className={`${styles.addItem}`}
            onSubmit={submit}
            >
            <div className={`${styles.inputContainer}`}>
                <label>{tx.nombre}</label>
                <input 
                    type="text"
                    name="nombre"
                    id="nombre_input"
                    value={item.nombre || ''}
                    onChange={upgrade}
                    />
            </div>
            <div className={`${styles.inputContainer}`}>
                <label>{tx.cantidad}</label>
                <input 
                    type="text"
                    name="cantidad"
                    value={item.cantidad || ''}
                    onChange={upgrade}
                    />
            </div>
            <div className={`${styles.inputContainer}`}>
                <label>{tx.precio}</label>
                <input 
                    type="text"
                    name="precio"
                    value={item.precio || ''}
                    onChange={upgrade}
                    />
            </div>
            <div className={`${styles.inputContainer} ${styles.submit}`}>
                <input type="submit" value={tx.submit ?? ''} />
            </div>
        </form>
    )
}

export { AddItem };