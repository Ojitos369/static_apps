import { useVars, useEffects } from "./useLocals";
import { Link } from "react-router-dom";

const Index = (props) => {
    const { styles, loadChat, cid, upgradeCid } = useVars();

    useEffects();

    return (
        <div className={`${styles.indexContainer}`}>
            <h1 className={`${styles.title}`}>Chat AI</h1>

            <div className={`${styles.topSection}`}>
                <div className={`${styles.cidContainer}`}>
                    <label htmlFor="cid" className={`${styles.cidLabel}`}>CID</label>
                    <input 
                        type="text" id="cid" placeholder="cid" className={`${styles.cidInput}`}
                        value={cid}
                        onChange={e => upgradeCid(e.target.value)}
                         />
                </div>
                <div className={`${styles.loadContainer}`}>
                    <Link 
                        onClick={loadChat}
                        to="chat"
                        id="cargarButton" className={`${styles.cargarButton}`}>Cargar</Link>
                </div>
            </div>

            <p className={`${styles.orText}`}>or</p>
            <div className={`${styles.bottomSection}`}>
                <Link 
                    to="chat"
                    id="nuevoButton" className={`${styles.nuevoButton}`}>Nuevo</Link>
            </div>
        </div>
    );
};

export { Index };
