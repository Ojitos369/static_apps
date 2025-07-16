import { useVars, useMyEffects } from "./myUse";
import { useState, useRef } from "react";

export const Vitim = () => {
    const {
        styles,
        video,
        options,
        loading,
        setVideo,
        setOptions,
        sendVideo,
    } = useVars();

    const [preview, setPreview] = useState(null);
    const videoRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith("video/")) {
            alert("Please select a video file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            setVideo(ev.target.result);
            setPreview(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        setOptions({ ...options, [name]: value });
    };

    const handlePreview = () => {
        if (videoRef.current) {
            const startTime = options.start || 0;
            const endTime = options.end || videoRef.current.duration;

            if (startTime >= endTime) {
                alert("Start time must be less than end time.");
                return;
            }

            videoRef.current.currentTime = startTime;
            videoRef.current.play();

            setTimeout(() => {
                videoRef.current.pause();
            }, (endTime - startTime) * 1000);
        }
    };

    useMyEffects();

    return (
        <div className={styles.vitimPage}>
            <div className={styles.element}>
                <div className={styles.ask}>
                    <input
                        type="file"
                        accept="video/*"
                        className={styles.fileInput}
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                </div>

                {preview && (
                    <div className={styles.previewContainer}>
                        <video ref={videoRef} src={preview} controls className={styles.media} />
                        <button onClick={handlePreview} className={styles.button}>Preview</button>
                    </div>
                )}

                <div className={styles.options}>
                    <input type="text" name="base_name_for_images" placeholder="Base name for images" onChange={handleOptionChange} />
                    <input type="number" name="fps" placeholder="FPS (30, 60)" onChange={handleOptionChange} />
                    <input type="text" name="type" placeholder="Image type (png, jpg)" onChange={handleOptionChange} />
                    <input type="text" name="start" placeholder="Start time (e.g., 60, 15, 03:12)" onChange={handleOptionChange} />
                    <input type="text" name="end" placeholder="End time (e.g., 60, 15, 03:12)" onChange={handleOptionChange} />
                </div>

                <button
                    onClick={sendVideo}
                    className={styles.button}
                    disabled={loading || !video}
                >
                    {loading ? "Processing..." : "Process Video"}
                </button>
            </div>
        </div>
    );
};