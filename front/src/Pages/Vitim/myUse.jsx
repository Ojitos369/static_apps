import { useMemo, useEffect } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';

export const useVars = () => {
    const { s, f } = useStates();

    const video = useMemo(() => s.vitim?.video ?? '', [s.vitim?.video]);
    const options = useMemo(() => s.vitim?.options ?? {}, [s.vitim?.options]);
    const loading = useMemo(() => s.loadings?.vitim?.loading ?? false, [s.loadings?.vitim?.loading]);

    const setVideo = (video) => {
        f.u1('vitim', 'video', video);
    }

    const setOptions = (newOptions) => {
        f.u1('vitim', 'options', newOptions);
    }

    const sendVideo = () => {
        f.vitim.sendVideo(video, options);
    }

    return {
        styles,
        video,
        options,
        loading,
        setVideo,
        setOptions,
        sendVideo,
        f,
    }
}

export const useMyEffects = () => {
    const { f } = useVars();
    
    useEffect(() => {
        f.u1('page', 'title', 'Vitim');
    }, []);
}