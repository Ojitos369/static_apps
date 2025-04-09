import { useEffect, useRef, useState } from 'react';
import { useStates } from '../../Hooks/useStates';

const Test = props => {
    const { ls, lf, s, f } = useStates();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [streamActivo, setStreamActivo] = useState(false);
    const resp = s.app?.test || {};

    useEffect(() => {
        let interval = null;

        const iniciarCamara = async () => {
            try {
                const constraints = { video: { facingMode: "environment" } }; // Usa la cámara trasera si está disponible
                const stream = await navigator.mediaDevices.getUserMedia(constraints);

                const video = videoRef.current;
                if (video) {
                    video.srcObject = stream;

                    video.onloadedmetadata = () => {
                        video.play();
                        setStreamActivo(true);

                        // Solo iniciar intervalo cuando el video tenga tamaño
                        interval = setInterval(() => {
                            if (video.videoWidth > 0 && video.videoHeight > 0) {
                                capturarYEnviarImagen();
                            }
                        }, 3000);
                    };
                }
            } catch (err) {
                console.error("Error al acceder a la cámara:", err);
                alert("No se pudo acceder a la cámara. Verifica permisos o protocolo HTTPS.");
            }
        };

        iniciarCamara();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            if (interval) clearInterval(interval);
        };
    }, []);

    const capturarYEnviarImagen = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas || video.videoWidth === 0) return;

        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];

        f.app.enviarArchivo(base64);
    };

    return (
        <div>
            <h2>Lectura desde cámara</h2>
            <video
                ref={videoRef}
                style={{ width: '100%', maxWidth: '400px' }}
                playsInline
                muted
                autoPlay
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {!streamActivo && <p>Cargando cámara...</p>}

            <div className='mt-3 w-full row flex'>
                <p className='w-full'>{resp.codigo}</p>
                <p className='w-full'>{resp.mensaje}</p>
            </div>
        </div>
    );
};

export { Test };
