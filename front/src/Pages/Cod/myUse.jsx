import { useMemo, useEffect } from 'react';
import {useStates } from '../../Hooks/useStates';
import styles from './styles/index.module.scss';

export const useVars = () => {
    const { s, f } = useStates();
    const textoCodificar = useMemo(() => s.cod?.textoCodificar ?? '', [s.cod?.textoCodificar]);
    const textoDecodificar = useMemo(() => s.cod?.textoDecodificar ?? '', [s.cod?.textoDecodificar]);
    const textoCodificado = useMemo(() => s.cod?.textoCodificado ?? '', [s.cod?.textoCodificado]);
    const codificando = useMemo(() => s.loadings?.cod?.codificar ?? false, [s.loadings?.cod?.codificar]);
    const decodificando = useMemo(() => s.loadings?.cod?.decodificar ?? false, [s.loadings?.cod?.decodificar]);

    const textoDecodificado = useMemo(() => s.cod?.textoDecodificado ?? '', [s.cod?.textoDecodificado]);

    const codificar = (mode) => {
        f.cod.codificar(textoCodificar, mode);
    }
    const decodificar = (mode) => {
        f.cod.decodificar(textoDecodificar, mode);
    }
    const actualizarTextoCodificar = e => {
        f.u1('cod', 'textoCodificar', e.target.value);
        // codificar(e.target.value);
    }
    const actualizarTextoDecodificar = e => {
        f.u1('cod', 'textoDecodificar', e.target.value);
        // decodificar(e.target.value);
    }
    const resetValues = () => {
        f.u1('cod', 'textoCodificar', "");
        f.u1('cod', 'textoDecodificar', "");
        f.u1('cod', 'textoCodificado', "");
        f.u1('cod', 'textoDecodificado', "");
    }
    return {
        styles,
        textoCodificar,
        textoDecodificar,
        textoCodificado,
        textoDecodificado,
        codificando, 
        decodificando, 
        actualizarTextoCodificar,
        actualizarTextoDecodificar,
        codif: codificar,
        decodif: decodificar, 
        resetValues,
        f,
    }
}

export const useMyEffects = () => {
    const { resetValues, f } = useVars();
    
    useEffect(() => {
        f.u1('page', 'title', 'Codificador');
        resetValues();
    }, []);

}
