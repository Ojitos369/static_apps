
const Resumen = props => {
    const { cantidad, total, disponible, changeDisponible, restante, styles } = props;
    const tx = props.tx?.resume || {};

    return (
        <div
            className={`${styles.resumen}`}
            >
            <div className={`${styles.cantidadContainer} ${styles.infoContainer}`}>
                <h4>{tx.cantidad}</h4>
                <p>{cantidad}</p>
            </div>
            <div className={`${styles.totalContainer} ${styles.infoContainer}`}>
                <h4>{tx.total}</h4>
                <p>{total}</p>
            </div>
            <div className={`${styles.disponibleContainer} ${styles.infoContainer}`}>
                <label>{tx.disponible}</label>
                <input 
                    type="text"
                    value={disponible ?? ''}
                    onChange={changeDisponible}
                     />
            </div>
            <div className={`${styles.restanteContainer} ${styles.infoContainer}`}>
                <h4>{tx.restante}</h4>
                <p>{restante}</p>
            </div>
        </div>
    )
}

export { Resumen };