import { useEffect, useMemo } from 'react';
import {useStates } from '../../App/useStates';

import styles from './styles/index.module.scss';
import { justNumbers } from "../../App/core/helper";

import { EditItem } from '../../Components/Modals/ItemsList/EditItem';

import { Resumen } from './Resumen';
import { AddItem } from './AddItem';
import { ShowItems } from './ShowItems';

import texts from '../../static/json/languages/item_list.json';

const ItemsList = props => {
    const { s, f } = useStates();
    const tx = useMemo(() => {
        return texts[s.settings?.configuraciones?.idioma] || {};
    }, [s.settings?.configuraciones?.idioma]);

    const [agregados, cantidad, total, disponible, restante] = useMemo(() => {
        const agregados = s.itemsList?.agregados || [];
        const disponible = s.itemsList?.disponible;
        let restante = '-';
        let total = agregados.reduce((acc, cur) => acc + cur.total, 0);
        total = justNumbers(total);
        if (disponible) {
            restante = disponible - total;
        }
        return [agregados, agregados.length, total, disponible, restante]
    }, [s.itemsList?.agregados, s.itemsList?.disponible]);

    const changeDisponible = e => {
        let value = e.target.value;
        if (value === '') {
            value = null;
        }
        if ((value ?? '-') !== '-') {
            value = justNumbers(value);
        }
        f.u1('itemsList', 'disponible', value);
    }

    const deleteAction = index => {
        let new_list = [...agregados];
        new_list.splice(index, 1);
        f.u1('itemsList', 'agregados', new_list);
    }

    const editAction = index => {
        console.log('edit', index, agregados[index]);
    }

    useEffect(() => {
        f.u1('page', 'title', 'Items List')
    }, []);

    return (
        <section 
            className={`${styles.itemsList}`}
            >
            <Resumen 
                cantidad={cantidad}
                total={total}
                disponible={disponible}
                changeDisponible={changeDisponible}
                restante={restante}
                styles={styles}
                tx={tx}
            />
            <AddItem 
                styles={styles}
                tx={tx}
            />
            {cantidad > 0 &&
            <ShowItems 
                agregados={agregados}
                styles={styles}
                tx={tx}
                deleteAction={deleteAction}
                editAction={editAction}
            />}
            {!!s.modals?.itemsList?.editItem &&
            <EditItem
                tx={tx}
                />}
        </section>
    )
}

export { ItemsList };
