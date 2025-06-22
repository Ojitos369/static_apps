import { useVars, useMyEffects } from "./myUse";
import { useState, useRef } from "react";

export const Cod = () => {
    const {
        styles,
        textoCodificar,
        textoDecodificar,
        textoCodificado,
        textoDecodificado,
        codificando,
        decodificando,
        actualizarTextoCodificar,
        actualizarTextoDecodificar,
        codif,
        decodif,
        resetValues,
    } = useVars();

    /* --------------------------- pestaña activa --------------------------- */
    const [tab, setTab] = useState("text");

    /* --------------------------- meta del último archivo ------------------ */
    const [fileMeta, setFileMeta] = useState(null); // { name, mime }

    const fileInputRef = useRef(null);

    /* --------------------------- helpers ---------------------------------- */
    const limpiarTodo = () => {
        resetValues();
        setFileMeta(null);
    };

    const cambiarVista = (view) => {
        setTab(view);
        limpiarTodo();
    };

    const codificar = () => codif(tab);   // le pasas el modo actual a tu store
    const decodificar = () => decodif(tab);   // le pasas el modo actual a tu store

    /* --------------------------- subida de archivo ------------------------ */
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const base64 = ev.target.result.split(",")[1]; // quitamos data:mime;
            setFileMeta({ name: file.name, mime: file.type || "application/octet-stream" });
            actualizarTextoCodificar({ target: { value: base64 } });
        };
        reader.readAsDataURL(file);
    };

    /* --------------------------- utilidades Base-64 ----------------------- */
    const isPureBase64 = (txt) =>
        /^[A-Za-z0-9+/]+\={0,2}$/.test(txt.trim()) && txt.trim().length % 4 === 0;

    const downloadDecoded = () => {
        if (!isPureBase64(textoDecodificado)) return;

        const b64  = textoDecodificado.trim();
        const mime = fileMeta?.mime || "application/octet-stream";
        const name = fileMeta?.name || "archivo.bin";

        const bin  = atob(b64);
        const buf  = Uint8Array.from(bin, (c) => c.charCodeAt(0));
        const blob = new Blob([buf], { type: mime });
        const url  = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    };

    const openImageWindow = (b64, mime) => {
        const bin  = atob(b64);
        const buf  = Uint8Array.from(bin, (c) => c.charCodeAt(0));
        const blob = new Blob([buf], { type: mime });
        const url  = URL.createObjectURL(blob);
        const win  = window.open(url, "_blank");
        win.onload = () => URL.revokeObjectURL(url);
    };

    const renderDecodedPreview = () => {
        if (!isPureBase64(textoDecodificado)) return null;
        if (!fileMeta) return <p className={styles.fileName}>Archivo listo para descargar</p>;

        const { mime, name } = fileMeta;
        const src = `data:${mime};base64,${textoDecodificado.trim()}`;

        if (mime.startsWith("image/")) {
            return (
                <img
                    src={src}
                    alt={name}
                    className={`${styles.media} ${styles.mediaLink}`}
                    onClick={() => openImageWindow(textoDecodificado.trim(), mime)}
                    style={{ cursor: "zoom-in" }}
                />
            );
        }
        if (mime.startsWith("video/")) {
            return <video src={src} controls className={styles.media} />;
        }
        if (mime.startsWith("audio/")) {
            return <audio src={src} controls className={styles.media} />;
        }
        return <p className={styles.fileName}>{name}</p>;
    };

    useMyEffects();

    return (
        <div className={styles.codPage}>
            {/* -------- Tabs -------- */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabBtn} ${tab === "text" ? styles.active : ""}`}
                    onClick={() => cambiarVista("text")}
                    disabled={codificando || decodificando}
                >Texto</button>
                <button
                    className={`${styles.tabBtn} ${tab === "file" ? styles.active : ""}`}
                    onClick={() => cambiarVista("file")}
                    disabled={codificando || decodificando}
                >Archivo</button>
                <button
                    className={`${styles.tabBtn} ${styles.tabBtnClear}`}
                    onClick={limpiarTodo}
                    disabled={codificando || decodificando}
                >Clear</button>
            </div>

            {/* -------- Pestaña TEXTO -------- */}
            {tab === "text" && (
                <div className={`${styles.element} ${styles.codificar}`}>
                    <div className={styles.ask}>
                        <textarea
                            className={styles.textField}
                            placeholder="Ingresa texto…"
                            value={textoCodificar}
                            onChange={actualizarTextoCodificar}
                            disabled={codificando}
                        />
                        <button
                            onClick={codificar}
                            className={styles.button}
                            disabled={codificando || !textoCodificar.trim()}
                        >
                            {codificando ? "Codificando…" : "Codificar"}
                        </button>
                    </div>

                    {!!textoCodificado && (
                        <div className={styles.response}>
                            <p><span>Codificado</span><br />{textoCodificado}</p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoCodificado)}
                                className={styles.buttonCopy}
                            >Copiar</button>
                        </div>
                    )}

                    <div className={styles.ask}>
                        <textarea
                            className={styles.textField}
                            placeholder="Texto para decodificar…"
                            value={textoDecodificar}
                            onChange={actualizarTextoDecodificar}
                            disabled={decodificando}
                        />
                        <button
                            onClick={decodificar}
                            className={styles.button}
                            disabled={decodificando || !textoDecodificar.trim()}
                        >
                            {decodificando ? "Decodificando…" : "Decodificar"}
                        </button>
                    </div>

                    {!!textoDecodificado && (
                        <div className={styles.response}>
                            <p><span>Decodificado</span><br />{textoDecodificado}</p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoDecodificado)}
                                className={styles.buttonCopy}
                            >Copiar</button>
                        </div>
                    )}
                </div>
            )}

            {/* -------- Pestaña ARCHIVO -------- */}
            {tab === "file" && (
                <div className={`${styles.element} ${styles.codificar}`}>
                    <div className={styles.ask}>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className={styles.fileInput}
                            onChange={handleFileChange}
                            disabled={codificando}
                        />
                        <button
                            onClick={codificar}
                            className={styles.button}
                            disabled={codificando || !textoCodificar}
                        >
                            {codificando ? "Codificando…" : "Codificar"}
                        </button>
                    </div>

                    {!!textoCodificado && (
                        <div className={styles.response}>
                            <p className={styles.fileName}><span>Codificado</span><br />{textoCodificado}</p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoCodificado)}
                                className={styles.buttonCopy}
                            >Copiar</button>
                        </div>
                    )}

                    <div className={styles.ask}>
                        <textarea
                            className={styles.textField}
                            placeholder="Pega aquí la cadena Base-64 codificada…"
                            value={textoDecodificar}
                            onChange={actualizarTextoDecodificar}
                            disabled={decodificando}
                        />
                        <button
                            onClick={decodificar}
                            className={styles.button}
                            disabled={decodificando || !textoDecodificar.trim()}
                        >
                            {decodificando ? "Decodificando…" : "Decodificar"}
                        </button>
                    </div>

                    {!!textoDecodificado && (
                        <div className={styles.response}>
                            {renderDecodedPreview()}
                            <button
                                onClick={downloadDecoded}
                                className={styles.buttonCopy}
                            >Descargar</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
