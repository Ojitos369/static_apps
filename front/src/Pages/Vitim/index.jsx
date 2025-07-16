import { useVars, useMyEffects } from "./myUse";
import { useEffect } from "react";
import { Uploader } from "./Uploader";
import { ProcessingStatus } from "./ProcessingStatus";
import { Completed } from "./Completed";

export const Vitim = () => {
    const {
        styles,
        video,
        options,
        loading,
        status,
        taskKey,
        processStatus,
        images,
        totalImages,
        currentPage,
        hasNextPage,
        setVideo,
        setOptions,
        sendVideo,
        checkStatus,
        getImagesPage,
        scheduleCleanup,
    } = useVars();

    useEffect(() => {
        let interval;
        if (status === 'PROCESSING' && taskKey) {
            // Inicia el polling para el estado
            interval = setInterval(() => {
                checkStatus(taskKey);
            }, 5000);
        }
        
        // Limpia el intervalo cuando el componente se desmonta o el estado cambia
        return () => clearInterval(interval);
    }, [status, taskKey]);

    useEffect(() => {
        // Carga las imágenes cuando el estado es PROCESSING
        if (status === 'PROCESSING' && taskKey) {
            getImagesPage(taskKey, currentPage);
        }
    }, [status, taskKey, currentPage, processStatus]); // se añade processStatus para recargar si hay cambios

    useEffect(() => {
        // Cuando el proceso termina, programa la limpieza
        if (status === 'COMPLETED' && taskKey) {
            scheduleCleanup(taskKey);
        }
    }, [status, taskKey]);


    useMyEffects();

    return (
        <div className={styles.vitimPage}>
            {(status === 'IDLE' || status === 'UPLOADING') && (
                <Uploader 
                    styles={styles} 
                    loading={loading || status === 'UPLOADING'} 
                    video={video}
                    setVideo={setVideo} 
                    setOptions={setOptions} 
                    sendVideo={sendVideo} 
                    options={options} 
                />
            )}
            {status === 'PROCESSING' && (
                <ProcessingStatus 
                    styles={styles} 
                    processStatus={processStatus} 
                    images={images} 
                    totalImages={totalImages} 
                    currentPage={currentPage} 
                    hasNextPage={hasNextPage} 
                    getImagesPage={getImagesPage} 
                    taskKey={taskKey} 
                />
            )}
            {status === 'COMPLETED' && (
                <Completed 
                    styles={styles} 
                    processStatus={processStatus}
                    images={images}
                    getImagesPage={getImagesPage}
                    currentPage={currentPage}
                    hasNextPage={hasNextPage}
                    taskKey={taskKey}
                />
            )}
            {status === 'FAILED' && (
                <div>
                    <h2>Ha ocurrido un error</h2>
                    <p>No se pudo completar el proceso. Por favor, inténtalo de nuevo.</p>
                    {/* Opcional: mostrar más detalles del error si están disponibles */}
                </div>
            )}
        </div>
    );
};

export default Vitim;