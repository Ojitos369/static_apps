import { useVars, useEffects } from "./useLocals";
import { marked } from "marked";

const Chat = props => {
    const { styles,
        cid, hist,
        actualMessage, upgradeActualMessage,
        enviaMensaje, preguntando, eliminarChat
    } = useVars();

    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });

    useEffects();

    return (
        <div className={`${styles.chatPageContainer}`}>
            <h1 className={`${styles.title}`}>
                Chat {cid || 'nuevo'}
                <button 
                    onClick={eliminarChat}
                    className={`${styles.deleteButton}`}>Delete</button>
            </h1>

            <div className={`${styles.chatContainer}`}>
                {hist.map((msg, i) => {
                    const { role, content } = msg;
                    return (
                        <div key={i} className={`${styles.messageContainer} ${role === 'user' ? styles.user : styles.assistant}`}>
                            <div className={styles.messageText} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                        </div>
                    )
                })}
            </div>

            <div className={`${styles.endContainer}`}>
                {preguntando ? 
                <p className={`${styles.preguntandoText}`}>Chat is writing...</p> :
                <form className={`${styles.formContainer}`}>
                    <textarea 
                        type="text" id="messageInput" placeholder="Message" className={`${styles.messageInput}`}
                        value={actualMessage}
                        onChange={e => upgradeActualMessage(e.target.value)}
                        />
                    <button 
                        onClick={enviaMensaje}
                        id="enviarButton" className={`${styles.enviarButton}`}>Enviar</button>
                </form>
                }
            </div>
        </div>
    );
}

export { Chat };
