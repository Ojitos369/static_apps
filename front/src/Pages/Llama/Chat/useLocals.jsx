import styles from './styles/index.module.scss';
import { useStates } from '../../../Hooks/useStates';
import { useMemo, useEffect } from 'react';

const useVars = props => {
    const { s, f, useNavigate } = useStates();
    const navigate = useNavigate();

    const cid = useMemo(() => s.llama?.chat?.cid || '', [s.llama?.chat?.cid]);
    const hist = useMemo(() => s.llama?.chat?.hist || [], [s.llama?.chat?.hist]);
    const actualMessage = useMemo(() => s.llama?.chat?.actualMessage || '', [s.llama?.chat?.actualMessage]);
    const preguntando = useMemo(() => !!s.loadings?.llama?.chat, [s.loadings?.llama?.chat]);

    const upgradeActualMessage = value => {
        f.u2('llama', 'chat', 'actualMessage', value);
    }

    const enviaMensaje = e => {
        if (!!e) e.preventDefault();
        f.llama.chat(actualMessage, cid);
    }

    const eliminarChat = () => {
        f.llama.deleteChat(cid, navigate);
    }

    return {
        styles,
        cid, hist,
        actualMessage, upgradeActualMessage,
        enviaMensaje,
        preguntando,
        eliminarChat,
    }
}

const useEffects = props => {
    const { f } = useStates();

    useEffect(() => {
        f.u2('llama', 'chat', 'actualMessage', '');
        f.u2('loadings', 'llama', 'chat', false);

        const element = document.getElementById('messageInput');
        if (!!element) element.focus();
    }, []);

    return null;
}

export { useVars, useEffects };