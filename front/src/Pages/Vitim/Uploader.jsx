import { useRef, useState } from 'react';

export const Uploader = ({ styles, loading, video, setVideo, setOptions, sendVideo, options }) => {
    const [videoShow, setVideoShow] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith("video/")) {
            alert("Please select a video file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target.result;
            setVideo(result);
            setVideoShow(result);
        };
        reader.readAsDataURL(file);
    };

    const handleOptionChange = (e) => {
        const { name, value } = e.target;
        let newOptions;
        if (name === 'base_name_for_images') {
            newOptions = { ...options, name: value };
        } else if (name === 'type') {
            newOptions = { ...options, typeImg: value };
        } else {
            newOptions = { ...options, [name]: value };
        }
        setOptions(newOptions);
        updateVideoShow(newOptions);
    };

    const updateVideoShow = (currentOptions) => {
        if (video) { // Use the original video data URL
            const { start, end } = currentOptions;
            let videoUrl = video; // Start with the clean data URL
            if (start && end && parseFloat(start) < parseFloat(end)) {
                videoUrl = `${video}#t=${start},${end}`;
            }
            setVideoShow(videoUrl);
        }
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={styles.element}>
            <div className={styles.ask}>
                <input
                    type="file"
                    accept="video/*"
                    className={styles.fileInput}
                    onChange={handleFileChange}
                    disabled={loading}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <button onClick={handleCustomButtonClick} className={styles.button} disabled={loading}>
                    Select Video
                </button>
            </div>

            <div className={styles.previewContainer}>
                {videoShow && <video src={videoShow} controls className={styles.media} />}
            </div>

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
                disabled={loading || !videoShow}
            >
                {loading ? "Processing..." : "Process Video"}
            </button>
        </div>
    );
};