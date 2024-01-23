import { useContext, useEffect, useMemo } from 'react';
import { AllContext } from '../../App/MyContext';

import styles from './styles/index.module.scss';
import { justNumbers } from "../../App/core/helper";

import { EditItem } from '../../Components/Modals/ItemsList/EditItem';

import { Resumen } from './Resumen';
import { AddItem } from './AddItem';
import { ShowItems } from './ShowItems';

const ItemsList = props => {
    const { s, f } = useContext(AllContext);

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
        f.upgradeLvl1('itemsList', 'disponible', value);
    }

    const deleteAction = index => {
        let new_list = [...agregados];
        new_list.splice(index, 1);
        f.upgradeLvl1('itemsList', 'agregados', new_list);
    }

    const editAction = index => {
        console.log('edit', index, agregados[index]);
    }

    useEffect(() => {
        f.upgradeLvl1('page', 'title', 'Items List')
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
            />
            <AddItem 
                styles={styles}
            />
            {cantidad > 0 &&
            <ShowItems 
                agregados={agregados}
                styles={styles}
                deleteAction={deleteAction}
                editAction={editAction}
            />}
            {!!s.modals?.itemsList?.editItem &&
            <EditItem />}
        </section>
    )
}

export { ItemsList };
