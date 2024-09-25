import styles from './styles/index.module.scss';
import { useStates } from '../../../Hooks/useStates';
import { useMemo, useEffect } from 'react';

const useVars = props => {
    const { s, f, useNavigate } = useStates();
    const navigate = useNavigate();

    const cid = useMemo(() => s.llama?.chat?.cid || '', [s.llama?.chat?.cid]);


    const init = () => {
        f.u0('llama', null);
    }

    const loadChat = () => {
        f.llama.loadChat(cid, navigate);
    }

    const upgradeCid = value => {
        f.u2('llama', 'chat', 'cid', value);
    }

    return {
        styles,
        init, 
        loadChat,
        cid, upgradeCid, 
    }
}

const useEffects = props => {
    const { init } = useVars();

    useEffect(() => {
        init();
    }, []);

    return null;
}

export { useVars, useEffects };