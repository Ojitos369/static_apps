import { useContext, useEffect, useMemo } from 'react';
import { AllContext } from '../../App/MyContext';
import { justNumbers } from "../../App/core/helper";

const AddItem = props => {
    const { s, f } = useContext(AllContext);
    const { styles } = props;
    const tx = props.tx?.add || {};

    const item = useMemo(() => {
        return s.itemsList?.itemToAdd || {};
    }, [s.itemsList?.itemToAdd]);


    const submit = e => {
        if (!!e) {e.preventDefault();}
        // s.itemsList?.agregados
        let itemFull = {...item, total: (item.cantidad || 0) * (item.precio || 0)}
        f.upgradeLvl1('itemsList', 'agregados', [...(s.itemsList?.agregados || []), itemFull]);
        f.upgradeLvl1('itemsList', 'itemToAdd', null);
    }

    const upgrade = e => {
        let { name, value } = e.target;
        if (name !== 'nombre') {
            value = justNumbers(value);
        }

        f.upgradeLvl1('itemsList', 'itemToAdd', { ...item, [name]: value });
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
                <input type="submit" value={tx.submit} />
            </div>
        </form>
    )
}

export { AddItem };