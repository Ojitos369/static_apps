import { useMemo } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';

export const useVars = () => {
    const { s, f } = useStates();
    const textoCodificar = useMemo(() => s.cod?.textoCodificar ?? '', [s.cod?.textoCodificar]);
    const textoDecodificar = useMemo(() => s.cod?.textoDecodificar ?? '', [s.cod?.textoDecodificar]);
    const textoCodificado = useMemo(() => s.cod?.textoCodificado ?? '', [s.cod?.textoCodificado]);
    console.log('textoCodificado', textoCodificado);
    const textoDecodificado = useMemo(() => s.cod?.textoDecodificado ?? '', [s.cod?.textoDecodificado]);

    const codificar = () => {
        f.cod.codificar(textoCodificar);
    }
    const decodificar = () => {
        f.cod.decodificar(textoDecodificar);
    }
    const actualizarTextoCodificar = e => {
        f.u1('cod', 'textoCodificar', e.target.value);
        // codificar(e.target.value);
    }
    const actualizarTextoDecodificar = e => {
        f.u1('cod', 'textoDecodificar', e.target.value);
        // decodificar(e.target.value);
    }
    return {
        styles,
        textoCodificar,
        textoDecodificar,
        textoCodificado,
        textoDecodificado,
        actualizarTextoCodificar,
        actualizarTextoDecodificar,
        codificar,
        decodificar, 
    }
}

export const useMyEffects = () => {

}
