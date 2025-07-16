import { ImageGallery } from "./ImageGallery";
import { useEffect, useState } from "react";

export const Completed = ({ styles, processStatus, images, getImagesPage, taskKey, currentPage, hasNextPage }) => {
    const IMAGE_PAGE_LIMIT = 20; // Asumido del backend
    const startImage = (currentPage - 1) * IMAGE_PAGE_LIMIT + 1;
    const endImage = startImage + images.length - 1;

    const [cleanupTime, setCleanupTime] = useState('');

    useEffect(() => {
        if (processStatus?.fin_proceso) {
            const finish = new Date(processStatus.fin_proceso);
            finish.setMinutes(finish.getMinutes() + 30);
            setCleanupTime(finish.toLocaleString());
        }
    }, [processStatus?.fin_proceso]);
    useEffect(() => {
        if (images.length === 0) {
            getImagesPage(taskKey, 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const zipUrl = "http://localhost:8369" + processStatus?.zip_path;
    console.log("zipUrl", zipUrl);

    return (
        <div>
            <h2>Proceso Completado</h2>
            {processStatus && (
                <div className={styles.statusSummary}>
                    <h3>Resumen Final</h3>
                    <p><strong>Estado:</strong> {processStatus.estatus}</p>
                    <p><strong>Imágenes generadas:</strong> {processStatus.imagenes_totales}</p>
                    <p><strong>Tiempo total de proceso:</strong> {processStatus.tiempo_transcurrido}</p>
                    <p><strong>Finalizado:</strong> {new Date(processStatus.fin_proceso).toLocaleString()}</p>
                    {zipUrl && (
                        <a href={zipUrl} download className={styles.downloadButton}>
                            Descargar ZIP
                        </a>
                    )}
                </div>
            )}
            {cleanupTime && (
                <p className={styles.cleanupMessage}>
                    Los archivos se eliminarán automáticamente a las: <strong>{cleanupTime}</strong>.
                </p>
            )}
            {images.length > 0 && (
                <p className={styles.imageRangeIndicator}>
                    Mostrando: {startImage} - {endImage}
                </p>
            )}
            <ImageGallery images={images} />
            <div className={styles.paginationControls}>
                {currentPage > 1 && (
                    <button onClick={() => getImagesPage(taskKey, currentPage - 1)} className={styles.button}>
                        Anterior
                    </button>
                )}
                {hasNextPage && (
                    <button onClick={() => getImagesPage(taskKey, currentPage + 1)} className={styles.button}>
                        Siguiente
                    </button>
                )}
            </div>
        </div>
    );
};