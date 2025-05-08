import { useEffect, useMemo, useCallback, useState, useRef, useLayoutEffect } from 'react'; // Añade useRef y useLayoutEffect
import { useStates } from '../../Hooks/useStates';
import styles from "./styles/index.module.scss";
import Swal from 'sweetalert2';

const Im2aci = props => {
    const { s, f } = useStates();

    // --- Inicio del Workaround para f inestable ---
    const fRef = useRef(f);
    useLayoutEffect(() => {
        // Mantener fRef.current siempre con la última versión de f
        // Esto es crucial porque f podría ser un nuevo objeto en cada render.
        fRef.current = f;
    });
    // --- Fin del Workaround ---

    const [localAncho, setLocalAncho] = useState(100);
    const [localRmbg, setLocalRmbg] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pastedFile, setPastedFile] = useState(null); // Considerar si este estado es aún necesario
    const [copyButtonText, setCopyButtonText] = useState("Copiar ASCII");

    const imageUrl = useMemo(() => s.im2aci?.image_url, [s.im2aci?.image_url]);
    const arteAscii = useMemo(() => s.im2aci?.arte_ascii, [s.im2aci?.arte_ascii]);

    const imagePreviewUrl = useMemo(() => {
        if (imageUrl) {
            if (imageUrl.startsWith('http') || imageUrl.startsWith('data:')) {
                return imageUrl;
            }
            return `/static/image_temp/${imageUrl}`;
        }
        return null;
    }, [imageUrl]);

    const handleFile = useCallback((file) => { // Ahora no dependerá de 'f' directamente
        if (!file || !file.type.startsWith('image/')) {
            Swal.fire('Error', 'Por favor, selecciona un archivo de imagen.', 'error');
            return;
        }
        setIsLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            // Usar fRef.current para acceder a las funciones de f
            fRef.current.im2aci.saveImage(base64String);
            fRef.current.u1('im2aci', 'arte_ascii', '');
            setCopyButtonText("Copiar ASCII");
            setPastedFile(null);
            setIsLoading(false);
        };
        reader.onerror = () => {
            Swal.fire('Error', 'No se pudo leer el archivo.', 'error');
            setIsLoading(false);
        }
        reader.readAsDataURL(file);
    }, []); // Dependencias vacías para que handleFile sea estable.
             // ESLint podría advertir sobre fRef.current.im2aci.saveImage, etc. no estar en las dependencias.
             // Esto es parte del workaround: asumimos que queremos la última versión de estas funciones.

    const handleGenerarAscii = useCallback(async () => {
        if (!imageUrl) {
            Swal.fire('Atención', 'Primero carga una imagen.', 'warning');
            return;
        }
        setIsGenerating(true);
        setCopyButtonText("Copiar ASCII");
        // Usar fRef.current para acceder a las funciones de f
        fRef.current.u1('im2aci', 'ancho', localAncho);
        fRef.current.u1('im2aci', 'rmbg', localRmbg);

        try {
            await fRef.current.im2aci.img2ascii(imageUrl, localAncho, localRmbg);
        } catch (error) {
            console.error("Error al generar ASCII:", error);
        } finally {
            setIsGenerating(false);
        }
    }, [imageUrl, localAncho, localRmbg]); // f ya no es dependencia directa aquí.
                                            // Se usa fRef.current. ESLint podría advertir.

    const handleCopyAscii = useCallback(() => {
        if (!arteAscii) {
            Swal.fire('Error', 'No hay arte ASCII para copiar.', 'error');
            return;
        }
        navigator.clipboard.writeText(arteAscii)
            .then(() => {
                setCopyButtonText("¡Copiado!");
                setTimeout(() => setCopyButtonText("Copiar ASCII"), 2000);
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles:', err);
                Swal.fire('Error', 'No se pudo copiar el arte ASCII. Intenta manually.', 'error');
            });
    }, [arteAscii]);

    useEffect(() => {
        const handlePasteEvent = (event) => { // Renombrado para evitar confusión con handleFile
            const items = (event.clipboardData || event.originalEvent.clipboardData)?.items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        const blob = items[i].getAsFile();
                        if (blob) {
                            handleFile(blob); // handleFile ahora es estable
                        }
                        break;
                    }
                }
            }
        };
        window.addEventListener('paste', handlePasteEvent);
        return () => {
            window.removeEventListener('paste', handlePasteEvent);
        };
    }, [handleFile]); // handleFile ahora es estable, por lo que este efecto no se re-ejecuta innecesariamente.

    // Sincronizar estado local con el global
    useEffect(() => {
      if (s.im2aci?.ancho !== undefined && s.im2aci.ancho !== localAncho) {
        setLocalAncho(s.im2aci.ancho);
      }
      if (s.im2aci?.rmbg !== undefined && s.im2aci.rmbg !== localRmbg) {
        setLocalRmbg(s.im2aci.rmbg);
      }
    }, [s.im2aci?.ancho, s.im2aci?.rmbg, localAncho, localRmbg]); // Añadidas localAncho/localRmbg para ser más correctos

    // Limpiar arte ASCII si la imagen cambia
    useEffect(() => {
        if (imageUrl) {
            // Usar fRef.current para acceder a las funciones de f
            fRef.current.u1('im2aci', 'arte_ascii', '');
            setCopyButtonText("Copiar ASCII");
        }
        // 'f' ya no está en las dependencias. Se accede a través de fRef.current.
        // ESLint podría advertir sobre fRef.current.u1 no estar en las dependencias.
    }, [imageUrl]); // Este es el efecto que probablemente causaba el bucle.


    return (
        <div className={styles.im2aciPage}>
            <h2>Convertidor de Imagen a Arte ASCII</h2>

            <div
                className={styles.dropZone}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const files = e.dataTransfer.files;
                    if (files && files.length > 0) {
                        handleFile(files[0]); // handleFile es estable
                        e.dataTransfer.clearData();
                    }
                }}
            >
                <p>Arrastra una imagen aquí, pégala (Ctrl+V), o haz clic para seleccionarla.</p>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={(e) => e.target.files && e.target.files.length > 0 && handleFile(e.target.files[0])}
                    className={styles.fileInput}
                />
                {isLoading && <p className={styles.loadingMessage}>Cargando imagen...</p>}
            </div>

            <div className={styles.controls}>
                <label htmlFor="ancho">Ancho del ASCII (caracteres):</label>
                <input
                    type="number"
                    id="ancho"
                    value={localAncho}
                    onChange={(e) => setLocalAncho(parseInt(e.target.value, 10) || 100)}
                    min="10"
                    max="500"
                />

                <label htmlFor="rmbg" className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        id="rmbg"
                        checked={localRmbg}
                        onChange={(e) => {
                            setLocalRmbg(e.target.checked);
                            if (e.target.checked) {
                                Swal.fire('Info', 'Remover el fondo está activado. Esto podría hacer el proceso un poco más lento.', 'info');
                            }
                        }}
                    />
                    Remover fondo
                </label>
            </div>

            {imagePreviewUrl && (
                <div className={styles.previewSection}>
                    <h3>Previsualización:</h3>
                    <img src={imagePreviewUrl} alt="Previsualización" className={styles.imagePreview} />
                </div>
            )}

            <button
                onClick={handleGenerarAscii} // handleGenerarAscii ahora usa fRef
                className={styles.generateButton}
                disabled={!imageUrl || isGenerating}
            >
                {isGenerating ? 'Generando...' : 'Generar Arte ASCII'}
            </button>

            {arteAscii && (
                <div className={styles.asciiArtSection}>
                    <h3>Arte ASCII:</h3>
                    <pre className={styles.asciiArtOutput}>{arteAscii}</pre>
                    <button
                        onClick={handleCopyAscii}
                        className={styles.copyButton}
                        disabled={copyButtonText === "¡Copiado!"}
                    >
                        {copyButtonText}
                    </button>
                </div>
            )}
        </div>
    );
};

export { Im2aci };
