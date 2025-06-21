import React from 'react';

export const FilePreview = ({ parsedFile, onDownload, styles }) => {
    const { fileName, base64, mimeType, isPreviewable } = parsedFile;
    const src = `data:${mimeType};base64,${base64}`;

    return (
        <div className={styles.filePreviewContainer}>
            {isPreviewable && (
                <div className={styles.mediaPreview}>
                    {mimeType.startsWith('image/') && <img src={src} alt={`Vista previa de ${fileName}`} />}
                    {mimeType.startsWith('video/') && <video src={src} controls />}
                    {mimeType.startsWith('audio/') && <audio src={src} controls />}
                </div>
            )}
            <p className={styles.fileName}>
                <strong>Archivo:</strong> {fileName}
            </p>
            <button onClick={() => onDownload(parsedFile)} className={styles.buttonDownload}>
                Descargar
            </button>
        </div>
    );
};