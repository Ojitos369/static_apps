import styles from './styles/ImageGallery.module.scss';
import { DownloadIcon } from '../../Components/Icons';
import { useState } from 'react';

export const ImageGallery = ({ images, getImagesPage, currentPage, hasNextPage, taskKey }) => {
    const handleImageClick = (e, img) => {
        e.preventDefault();
        window.open(img, '_blank');
    };

    if (!images || images.length === 0) {
        return <p>No hay imágenes para mostrar.</p>;
    }

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.imageGallery}>
                {images.map((img, index) => {
                    img = `http://localhost:8369${img}`;
                    return (
                    <div key={index} className={styles.galleryItem}>
                        <a href={img} onClick={(e) => handleImageClick(e, img)} title="Click to open in new tab">
                            <img src={img} alt={`Frame ${index}`} className={styles.galleryImage} />
                        </a>
                    </div>
                )})}
            </div>
            {hasNextPage && (
                <button onClick={() => getImagesPage(taskKey, currentPage + 1)} className={styles.loadMoreButton}>
                    Cargar más
                </button>
            )}
        </div>
    );
};
