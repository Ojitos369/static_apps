import { ImageGallery } from "./ImageGallery";

export const ProcessingStatus = ({ styles, processStatus, images, totalImages, currentPage, hasNextPage, getImagesPage, taskKey }) => {
    const IMAGE_PAGE_LIMIT = 20; // Asumido del backend
    const startImage = (currentPage - 1) * IMAGE_PAGE_LIMIT + 1;
    const endImage = startImage + images.length - 1;

    return (
        <div>
            <h2>Procesando...</h2>
            {processStatus && (
                <div className={styles.statusSummary}>
                    <h3>Resumen del Proceso</h3>
                    <p><strong>Estado:</strong> {processStatus.estatus}</p>
                    <p><strong>Progreso:</strong> {processStatus.vueltas} / {processStatus.imagenes_totales} imágenes</p>
                    <p><strong>Tiempo transcurrido:</strong> {processStatus.tiempo_transcurrido}</p>
                    <p><strong>Tiempo restante estimado:</strong> {processStatus.tiempo_restante_aproximado}</p>
                    <p><strong>Iniciado:</strong> {new Date(processStatus.inicio_proceso).toLocaleString()}</p>
                    <p><strong>Nombre base:</strong> {processStatus.base_name}</p>
                    <p><strong>FPS de guardado:</strong> {processStatus.saving_fps}</p>
                </div>
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
