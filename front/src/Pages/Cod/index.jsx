import { useVars, useMyEffects } from "./myUse";

export const Cod = props => {
    const { styles, textoCodificar,
        textoDecodificar,
        textoCodificado,
        textoDecodificado,
        actualizarTextoCodificar,
        actualizarTextoDecodificar,
        codificar,
        decodificar, } = useVars();

    return (
        <div className={`${styles.codPage}`}>
            <div className={`${styles.element} ${styles.codificar}`}>
                <div className={`${styles.ask}`}>
                    <textarea className={styles.textField} placeholder="Enter text"
                        value={textoCodificar}
                        onChange={actualizarTextoCodificar} />
                    <button 
                        onClick={codificar}
                        className={styles.button}>Codificar</button>
                </div>
                <div className={`${styles.response}`}>
                    {!!textoCodificado && 
                    <div className={styles.responseDiv}>
                        <p>
                            <span>Codificado</span>
                            <br /><br />
                            <span>{textoCodificado}</span>
                        </p>
                        <button 
                            onClick={() => navigator.clipboard.writeText(textoCodificado)}
                            className={styles.buttonCopy}>Copiar</button>
                    </div>}
                </div>
            </div>
            <div className={`${styles.element} ${styles.codificar}`}>
                <div className={`${styles.ask}`}>
                    <textarea className={styles.textField} placeholder="Enter text"
                        value={textoDecodificar}
                        onChange={actualizarTextoDecodificar} />
                    <button 
                        onClick={decodificar}
                        className={styles.button}>DeCodificar</button>
                </div>
                <div className={`${styles.response}`}>
                    {!!textoDecodificado && 
                    <div className={styles.responseDiv}>
                        <p>
                            {`DeCodificado: `}
                            <br /><br />
                            <span>{textoDecodificado}</span>
                        </p>
                        <button 
                            onClick={() => navigator.clipboard.writeText(textoDecodificado)}
                            className={styles.buttonCopy}>Copiar</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

