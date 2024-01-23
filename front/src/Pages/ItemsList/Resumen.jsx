
const Resumen = props => {
    const { cantidad, total, disponible, changeDisponible, restante, styles } = props;

    return (
        <div
            className={`${styles.resumen}`}
            >
            <div className={`${styles.cantidadContainer} ${styles.infoContainer}`}>
                <h4>Cantidad</h4>
                <p>{cantidad}</p>
            </div>
            <div className={`${styles.totalContainer} ${styles.infoContainer}`}>
                <h4>Total</h4>
                <p>{total}</p>
            </div>
            <div className={`${styles.disponibleContainer} ${styles.infoContainer}`}>
                <label>Disponible</label>
                <input 
                    type="text"
                    value={disponible}
                    onChange={changeDisponible}
                     />
            </div>
            <div className={`${styles.restanteContainer} ${styles.infoContainer}`}>
                <h4>Restante</h4>
                <p>{restante}</p>
            </div>
        </div>
    )
}

export { Resumen };