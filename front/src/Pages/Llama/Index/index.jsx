import { useVars, useEffects } from "./useLocals";

const Index = (props) => {
    const { styles } = useVars();

    useEffects();

    return (
        <div className={`${styles.indexContainer}`}>
            <h1 className={`${styles.title}`}>Chat AI</h1>

            <div className={`${styles.topSection}`}>
                <div className={`${styles.cidContainer}`}>
                    <label htmlFor="cid" className={`${styles.cidLabel}`}>CID</label>
                    <input type="text" id="cid" placeholder="cid" className={`${styles.cidInput}`} />
                </div>
                <button id="cargarButton" className={`${styles.cargarButton}`}>Cargar</button>
            </div>

            <div className={`${styles.bottomSection}`}>
                <p className={`${styles.orText}`}>or</p>
                <button id="nuevoButton" className={`${styles.nuevoButton}`}>Nuevo</button>
            </div>
        </div>
    );
};

export { Index };
