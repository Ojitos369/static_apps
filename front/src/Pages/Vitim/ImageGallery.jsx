import styles from './styles/ImageGallery.module.scss';
import { DownloadIcon } from '../../Components/Icons';
import { useState } from 'react';

export const ImageGallery = ({ images }) => {
    if (!images || images.length === 0) {
        return <p>No hay imágenes para mostrar.</p>;
    }

    return (
        <div className={styles.imageGallery}>
            {images.map((imgSrc, index) => {
                imgSrc = "http://localhost:8369/"+imgSrc;
                const [show, setShow] = useState(false);
                // console.log(imgSrc);
                return (
                    <div key={index} className={styles.imageContainer}
                        >
                        <a href={imgSrc} target="_blank" rel="noopener noreferrer" className={styles.imageLink}>
                            <img src={imgSrc} alt={`Frame ${index}`} className={styles.galleryImage} />
                        </a>
                        {show && (
                            <a href={imgSrc} download onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} className={styles.downloadIcon}>
                                <span className={styles.downloadSpanIcon}>
                                    <DownloadIcon />
                                </span>
                            </a>
                        )}
                    </div>
            )})}
        </div>
    );
};
