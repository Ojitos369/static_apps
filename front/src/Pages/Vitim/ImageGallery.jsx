import styles from './styles/ImageGallery.module.scss';
import { useEffect } from 'react';

// Es una buena práctica obtener la URL base de la API desde variables de entorno.
// Asegúrate de tener un archivo .env en la raíz de tu proyecto con VITE_API_BASE_URL=http://localhost:8369
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8369';

export const ImageGallery = ({ images, getImagesPage, currentPage, hasNextPage, taskKey }) => {
    const handleImageClick = (e, img) => {
        e.preventDefault();
        // Añadir 'noopener noreferrer' es una buena práctica de seguridad.
        window.open(img, '_blank', 'noopener,noreferrer');
    };

    // Para depurar, puedes agregar un console.log aquí para ver qué se recibe.
    useEffect(() => {
        console.log('Prop "images" recibida en ImageGallery:', images);
    }, [images]);

    if (!images || images.length === 0) {
        return <p>No hay imágenes para mostrar.</p>;
    }

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.imageGallery}>
                {images.map((imagePath) => {
                    const imageUrl = `${API_BASE_URL}${imagePath}`;
                    return (
                    <div key={imagePath} className={styles.galleryItem}>
                        <a href={imageUrl} onClick={(e) => handleImageClick(e, imageUrl)} title="Click para abrir en una nueva pestaña">
                            <img src={imageUrl} alt="Imagen de la galería" className={styles.galleryImage} />
                        </a>
                    </div>
                )})}
            </div>
        </div>
    );
};
