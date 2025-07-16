import { useCallback, useMemo, useEffect } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';

export const useVars = () => {
    const { s, f } = useStates();

    const video = useMemo(() => s.vitim?.video ?? '', [s.vitim?.video]);
    const options = useMemo(() => s.vitim?.options ?? {}, [s.vitim?.options]);
    const loading = useMemo(() => s.loadings?.vitim?.loading ?? false, [s.loadings?.vitim?.loading]);
    const status = useMemo(() => s.vitim?.status ?? 'IDLE', [s.vitim?.status]);
    const taskKey = useMemo(() => s.vitim?.taskKey ?? null, [s.vitim?.taskKey]);
    const processStatus = useMemo(() => s.vitim?.processStatus ?? null, [s.vitim?.processStatus]);
    const images = useMemo(() => s.vitim?.images ?? [], [s.vitim?.images]);
    const totalImages = useMemo(() => s.vitim?.totalImages ?? 0, [s.vitim?.totalImages]);
    const currentPage = useMemo(() => s.vitim?.currentPage ?? 1, [s.vitim?.currentPage]);
    const hasNextPage = useMemo(() => s.vitim?.hasNextPage ?? false, [s.vitim?.hasNextPage]);

    const setVideo = (video) => {
        f.u1('vitim', 'video', video);
    }

    const setOptions = (newOptions) => {
        f.u1('vitim', 'options', newOptions);
    }

    const sendVideo = () => {
        f.vitim.sendVideo(video, options);
    }

    const checkStatus = (key) => {
        f.vitim.checkStatus(key);
    }

    const getImagesPageOld = (key, page) => {
        f.vitim.getImagesPage(key, page);
    }
    const getImagesPage = useCallback(
        (key, page) => f.vitim.getImagesPage(key, page),
        [f.vitim]      // o simplemente [f] si f es estable
    );

    const scheduleCleanup = (key) => {
        f.vitim.scheduleCleanup(key);
    }

    return {
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
        f,
    }
}

export const useMyEffects = () => {
    const { f } = useVars();
    
    useEffect(() => {
        f.u1('page', 'title', 'Vitim');
        
        return () => {
            // Reset vitim state on unmount
            f.u1('vitim', 'status', 'IDLE');
            f.u1('vitim', 'taskKey', null);
            f.u1('vitim', 'processStatus', null);
            f.u1('vitim', 'images', []);
            f.u1('vitim', 'video', null);
            f.u1('vitim', 'currentPage', 1);
            f.u1('vitim', 'hasNextPage', false);
        }
    }, []);
}