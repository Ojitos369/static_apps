import { showCurrency } from "../../Core/helper";
import { AnimateEdit, AnimateRemove } from "../../Components/Icons";

const ShowItems = props => {
    const { agregados, styles, deleteAction, editAction } = props;
    const tx = props.tx?.showItems || {};

    const trClass = 'trClass text-[0.8rem] font-bold bg-[var(--my-edilar)] text-[var(--my-white)]';
    const thClass = 'thClass border-solid border-2 m-0 py-2 px-2 border border-[var(--my-minor)]';

    const fields = [
        {label: tx.item, field: 'nombre', type: 'text', show: true},
        {label: tx.cantidad, field: 'cantidad', type: 'number', show: true},
        {label: tx.precio, field: 'precio', type: 'currency', show: true},
        {label: tx.total, field: 'total', type: 'currency', show: true},
        {label: tx.editar, Icon: AnimateEdit, iconProps: {text: tx.edit}, type: 'icon', show: true,
            onClick: editAction
        },
        {label: tx.eliminar, Icon: AnimateRemove, iconProps: {text: tx.remove}, type: 'icon', show: true,
            onClick: deleteAction
        },
    ]

    return (
        <div className="w-11/12 table-container mt-5">
            <div className='overflow-x overflow-x-scroll table-div'>
                <table className='table table-auto border-collapse border rounded-2xl w-full mt-2 mb-2'>
                    <thead>
                        <tr className={`${trClass}`}>
                            {fields.map((ele, i) => {
                                if (ele.show) {
                                    return (<th key={i} className={`${thClass}`}>
                                        {ele.label}
                                    </th>)
                                }
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {agregados.map((ele, i) => {
                            return (<ShowElement
                                key={i}
                                ele={ele}
                                index={i}
                                fields={fields}
                                styles={styles}
                            />)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const ShowElement = props => {
    const { ele, index, fields, styles } = props;

    return (
        <tr className={`text-[0.75rem] ${index % 2 === 0 ? 'bg-[#0000]' : 'bg-[#8884]'} hover:bg-[#888]`}>
            {fields.map((field, i) => {
                const Icon = field.Icon || null;
                const show = field?.show ?? true;
                if (!show) return null;

                return (
                    <td 
                        key={i} 
                        className={`${styles.td} ${styles[field.type]}`}
                        >
                        {field.type === 'text' && (ele[field.field] ?? '')}
                        {field.type === 'number' && (ele[field.field] ?? 0)}
                        {field.type === 'currency' && showCurrency(ele[field.field])}
                        {field.type === 'icon' &&
                        <span
                            className={`${styles.span} cursor-pointer`}
                            onClick={() => field.onClick(index)}
                            >
                            <Icon
                                {...(field.iconProps || {})}
                                 />
                        </span>
                        }
                    </td>
                )
            })}
        </tr>
    )
}

export { ShowItems };