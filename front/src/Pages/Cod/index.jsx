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
        codificar,
        decodificar,
        resetValues, 
    } = useVars();

    /* ------------------------------------------------------------
     *  Nuevo estado: pestaña activa  ('text' | 'file')
     * ---------------------------------------------------------- */
    const [tab, setTab] = useState("text");

    /* ------------------------------------------------------------
     *  Manejador de archivos
     * ---------------------------------------------------------- */
    const fileInputRef = useRef(null);

    const cambiarVista = (view) => {
        setTab(view);
        resetValues();
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            /*   data:<mime>;base64,<cadena> -> sólo <cadena>   */
            const base64 = ev.target.result.split(",")[1];
            /*   Formato solicitado:  nombre.ext:base64   */
            const composed = `${file.name}:${base64}`;

            /*  Usamos el “evento sintético” para reutilizar actualizarTexto  */
            actualizarTextoCodificar({ target: { value: composed } });
        };
        reader.readAsDataURL(file);
    };

    /* ------------------------------------------------------------
     *  Utilidades para decodificar y descargar archivos
     * ---------------------------------------------------------- */
    const isBase64File = (txt) => txt.includes(":") && txt.split(":")[1].length > 0;

    const mimeFromName = (name) => {
        const ext = name.split(".").pop().toLowerCase();
        const dict = {
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
            gif: "image/gif",
            mp4: "video/mp4",
            webm: "video/webm",
            mp3: "audio/mpeg",
            wav: "audio/wav",
            txt: "text/plain",
            pdf: "application/pdf",
        };
        return dict[ext] || "application/octet-stream";
    };

    const downloadDecoded = () => {
        if (!isBase64File(textoDecodificado)) return;
        const [name, b64] = textoDecodificado.split(":");
        const binary = atob(b64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        const blob = new Blob([bytes], { type: mimeFromName(name) });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        URL.revokeObjectURL(url);
    };

    const renderDecodedPreview = () => {
        if (!isBase64File(textoDecodificado)) return null;

        const [name, b64] = textoDecodificado.split(":");
        const mime = mimeFromName(name);
        const src = `data:${mime};base64,${b64}`;

        if (mime.startsWith("image/")) {
            return (
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mediaLink}
                >
                    <img
                        src={src}
                        alt={name}
                        className={styles.media}
                    />
                </a>
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
            {/* --------- Cabecera de pestañas --------- */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabBtn} ${tab === "text" ? styles.active : ""}`}
                    onClick={() => cambiarVista("text")}
                    disabled={codificando || decodificando}
                >
                    Texto
                </button>
                <button
                    className={`${styles.tabBtn} ${tab === "file" ? styles.active : ""}`}
                    onClick={() => cambiarVista("file")}
                    disabled={codificando || decodificando}
                >
                    Archivo
                </button>
                <button
                    className={`${styles.tabBtn} ${styles.tabBtnClear}`}
                    onClick={resetValues}
                    disabled={codificando || decodificando}
                >
                    Clear
                </button>
            </div>

            {/* --------- Contenido de la pestaña “Texto” --------- */}
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
                            <p>
                                <span>Codificado</span>
                                <br />
                                {textoCodificado}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoCodificado)}
                                className={styles.buttonCopy}>
                                Copiar
                            </button>
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
                            <p>
                                <span>Decodificado</span>
                                <br />
                                {textoDecodificado}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoDecodificado)}
                                className={styles.buttonCopy}>
                                Copiar
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* --------- Contenido de la pestaña “Archivo” --------- */}
            {tab === "file" && (
                <div className={`${styles.element} ${styles.codificar}`}>
                    {/* Subir y codificar */}
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
                            <p className={styles.fileName}>
                                <span>Codificado</span>
                                <br />
                                {textoCodificado}{/* preview */}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(textoCodificado)}
                                className={styles.buttonCopy}>
                                Copiar
                            </button>
                        </div>
                    )}

                    {/* Decodificar y mostrar/descargar */}
                    <div className={styles.ask}>
                        <textarea
                            className={styles.textField}
                            placeholder="Pega aquí el texto codificado nombre.ext:base64…"
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
                            <button onClick={downloadDecoded} className={styles.buttonCopy}>
                                Descargar
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
