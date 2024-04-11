import { useEffect, useMemo, useState } from 'react';
import {useStates } from '../../App/useStates';
import { useKeyDown, useKeyUp } from '../../App/myHooks';

import { Play, Pause, Gears } from '../../App/Icons';

import { Ajustes } from './Ajustes';
import { GeneralModal } from '../../Components/Modals/GeneralModal';

import styles from './styles/index.module.scss';
import texts from '../../static/json/languages/automatas_celular.json';

const ListenKeys = props => {
    const { keyExec } = props;
    // ---------------------------------------------   KEYBOARD EVENTS   --------------------------------------------- #
    useKeyDown(props.showControl, ['control'], keyExec);
    useKeyDown(props.zoomIn, ['+'], keyExec);
    useKeyDown(props.zoomOut, ['-'], keyExec);
    useKeyDown(props.reset, ['r'], keyExec);
    useKeyDown(props.toogleRun, ['space'], keyExec);
    useKeyDown(props.toogleCircular, ['c'], keyExec);

    useKeyUp(null, ['any'], keyExec);
    // ---------------------------------------------   /KEYBOARD EVENTS   --------------------------------------------- #

    return null;
}

const AutomatasCelular = props =>{
    const { s, f } = useStates();

    const tx = useMemo(() => {
        return texts[s.settings?.configuraciones?.idioma] || {};
    }, [s.settings?.configuraciones?.idioma]);

    const dev = false;

    const reg = useMemo(() => s.ac?.reg || [], [s.ac?.reg]);
    const run = useMemo(() => !!s.ac?.run, [s.ac?.run]);
    const ctrl = useMemo(() => !!s.shortCuts?.keys?.control || false, [s.shortCuts?.keys?.control]);
    const ajustes = useMemo(() => s.ac?.ajustes || {}, [s.ac?.ajustes]);
    const game_mode_class = `game_${ajustes.gamemode}`;

    const keyExec = true;

    const upgradeAjustes = (key, value) => {
        f.u2('ac', 'ajustes', key, value);
    }

    const toogleRun = e => {
        if (!!e) {e.stopPropagation(); e.preventDefault();}
        f.u1('ac', 'run', !run);
    }

    const toogleCircular = e => {
        if (!!e) {e.stopPropagation(); e.preventDefault();}
        // setCircular(!circular);
        upgradeAjustes('circular', !ajustes?.circular);
    }

    const zoomIn = e => {
        if (!!e) {e.stopPropagation(); e.preventDefault();}
        if (!ctrl) {
            // setSpeed(speed + speedSize);
            upgradeAjustes('speed', ajustes?.speed + ajustes?.speedSize);
        } else {
            let cellSize = parseInt(document.documentElement.style.getPropertyValue('--cell-size'));
            cellSize += ajustes?.perZoom;
            document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
        }
    }

    const zoomOut = e => {
        if (!!e) {e.stopPropagation(); e.preventDefault();}
        if (!ctrl) {
            if (ajustes?.speed > ajustes?.speedSize) {
                // setSpeed(speed - speedSize);
                upgradeAjustes('speed', ajustes?.speed - ajustes?.speedSize);
            } else {
                // setSpeed(0);
                upgradeAjustes('speed', 0);
            }
        } else {
            let cellSize = parseInt(document.documentElement.style.getPropertyValue('--cell-size'));
            cellSize -= ajustes?.perZoom;
            document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
        }
    }

    const zoomWheel = e => {
        // console.log('e', e);
        if (!ctrl) return;
        if (!!e) {e.stopPropagation(); e.preventDefault();}
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }

    const addOne = (i, j) => {
        let newReg = JSON.parse(JSON.stringify(reg));
        let value = newReg[i][j];
        if (!(value >= -1)) return;
        const originValue = value;
        value += ajustes?.addPerTouch;
        if (value > ajustes?.maxPerCell) {
            value = ajustes?.maxPerCell;
        }

        const diff = value - originValue;
        // console.log('newReg', newReg, i, j, value);
        newReg[i][j] = value;
        // setExiste(existe + diff);
        upgradeAjustes('existe', ajustes?.existe + diff);
        f.u1('ac', 'reg', newReg);
    }

    const removeOne = (i, j) => {
        let newReg = JSON.parse(JSON.stringify(reg));
        let value = newReg[i][j];
        const originValue = value;
        value -= ajustes?.addPerTouch;
        if (value < -1) {
            value = -1;
        }

        const diff = value - originValue;
        newReg[i][j] = value;
        // setExiste(existe + diff);
        upgradeAjustes('existe', ajustes?.existe + diff);
        f.u1('ac', 'reg', newReg);
    }

    const createClean = () => {
        let newReg = [];
        for(let i = 0; i < ajustes?.ysize; i++){
            let row = [];
            for(let j = 0; j < ajustes?.xSize; j++){
                row.push(0);
            }
            newReg.push(row);
        }
        return newReg;
    }

    const reset = () => {
        let newReg = createClean();
        if (ajustes?.autoAddBlocks) {
            newReg = randomBlock(newReg);
        }
        // setExiste(0);
        // setCiclo(0);
        upgradeAjustes('existe', 0);
        upgradeAjustes('ciclo', 0);
        f.u1('ac', 'reg', newReg);
    }

    const randomBlock = reg => {
        let newReg = [...reg];
        for(let i = 0; i < ajustes?.ysize; i++){
            for(let j = 0; j < ajustes?.xSize; j++){
                // rand int from 1 to 10
                let rand = Math.floor(Math.random() * 10) + 1;
                if (rand == 5) {
                    newReg[i][j] = -1;
                }
            }
        }
        return newReg;
    }

    const gameOfLife = (actual, vecinos, newCop, i, j) => {
        const {up, down, left, right, upLeft, upRight, downLeft, downRight} = vecinos;
        const sum = up + down + left + right + upLeft + upRight + downLeft + downRight;
        if (actual === 0) {
            if (sum === 3) {
                actual = 1;
            }
        } else {
            if (sum < 2 || sum > 3) {
                actual = 0;
            }
        }
        newCop[i][j] = actual;

        return [actual, newCop];
    }

    const waterSim = (actual, vecinos, newCop, i, j) => {
        let {up, down, left, right, upLeft, upRight, downLeft, downRight, rightRight, downDown} = vecinos;
        // console.log(actual, vecinos, newCop, i, j);
        if (actual < 0 || !(actual > -1)) {
            newCop[i][j] = actual;
            return [actual, newCop];
        }
        // out
        let toQuit = 0;
        let toAdd = 0;
        let temp = actual;

        if (temp >= 1) {
            if (down < ajustes?.limitPerCell && down > -1) {
                toQuit++;
                temp--;
            }
            if (temp >= 2) {
                if (left < actual && left > -1) {
                    toQuit++;
                    temp--;
                }
                if (right < actual && right > -1) {
                    toQuit++;
                    temp--;
                }
            }
            if (temp > ajustes?.limitPerCell && up < temp && up > -1) {
                toQuit++;
            }
        }

        if (up >= 1 && actual < ajustes?.limitPerCell && actual > -1) {
            toAdd++;
        }
        temp = left;
        if (temp >= 1 && actual > -1) {
            if (downLeft < ajustes?.limitPerCell && downLeft > -1) {
                temp--;
            }
            if (temp >= 2) {
                if (left > actual) {
                    toAdd++;
                    temp--;
                }
            }
        }

        temp = right;
        if (temp >= 1 && actual > -1) {
            if (downRight < ajustes?.limitPerCell && downRight > -1) {
                temp--;
            }
            if (temp >= 2) {
                if (right > actual) {
                    toAdd++;
                    temp--;
                }
            }
        }

        temp = down;
        if (temp > ajustes?.limitPerCell) {
            if (downDown < ajustes?.limitPerCell && downDown > -1) {
                temp--;
            }
            if (temp >= 2) {
                if (downLeft < down && downLeft > -1) {
                    temp--;
                }
                if (downRight < down && downRight > -1) {
                    temp--;
                }
            }
            if (temp > ajustes?.limitPerCell && actual < temp && actual > -1) {
                toAdd++;
            }
        }

        // actual += toAdd;
        actual = actual + toAdd - toQuit;

        newCop[i][j] = actual;
        return [actual, newCop];
    }

    const logic = (actual, vecinos, newCop, i, j) => {
        const option = ajustes?.gamemode;
        let r = [actual, newCop];
        switch (option) {
            case 1: r = waterSim(actual, vecinos, newCop, i, j); break;
            case 2: r = gameOfLife(actual, vecinos, newCop, i, j); break;
            default: break;
        }
        
        return r;
    }

    const nextStage = () => {
        let newCop = createClean();
        let totals = 0;
        const defaultVal = -1;

        if (dev) {
            console.log("\n------------\n")
            console.log(existe, ciclo);
            console.table(reg);
        }
        const ysize = ajustes?.ysize;
        const xSize = ajustes?.xSize;

        for(let i = 0; i < ysize; i++){
            for(let j = 0; j < xSize; j++){
                let actual = reg[i][j];
                let up, down, left, right, upLeft, upRight, downLeft, downRight, rightRight, leftLeft, downDown;
                if (!ajustes?.circular) {
                    up = reg?.[i-1]?.[j] ?? defaultVal;
                    down = reg?.[i+1]?.[j] ?? defaultVal;
                    left = reg?.[i]?.[j-1] ?? defaultVal;
                    right = reg?.[i]?.[j+1] ?? defaultVal;
                    upLeft = reg?.[i-1]?.[j-1] ?? defaultVal;
                    upRight = reg?.[i-1]?.[j+1] ?? defaultVal;
                    downLeft = reg?.[i+1]?.[j-1] ?? defaultVal;
                    downRight = reg?.[i+1]?.[j+1] ?? defaultVal;
                    rightRight = reg?.[i]?.[j+2] ?? defaultVal;
                    leftLeft = reg?.[i]?.[j-2] ?? defaultVal;
                    downDown = reg?.[i+2]?.[j] ?? defaultVal;
                } else {
                    up = i === 0 ? reg[ysize-1][j] : reg[i-1][j];
                    down = i === ysize-1 ? reg[0][j] : reg[i+1][j];
                    left = j === 0 ? reg[i][xSize-1] : reg[i][j-1];
                    right = j === xSize-1 ? reg[i][0] : reg[i][j+1];
                    upLeft = i === 0 ? (j === 0 ? reg[ysize-1][xSize-1] : reg[ysize-1][j-1]) : (j === 0 ? reg[i-1][xSize-1] : reg[i-1][j-1]);
                    upRight = i === 0 ? (j === xSize-1 ? reg[ysize-1][0] : reg[ysize-1][j+1]) : (j === xSize-1 ? reg[i-1][0] : reg[i-1][j+1]);
                    downLeft = i === ysize-1 ? (j === 0 ? reg[0][xSize-1] : reg[0][j-1]) : (j === 0 ? reg[i+1][xSize-1] : reg[i+1][j-1]);
                    downRight = i === ysize-1 ? (j === xSize-1 ? reg[0][0] : reg[0][j+1]) : (j === xSize-1 ? reg[i+1][0] : reg[i+1][j+1]);
                    rightRight = j === xSize-1 ? reg[i][1] : (reg[i]?.[j+2] || -1);
                    leftLeft = j === 0 ? (reg[i]?.[xSize-2] || -1) : (reg[i]?.[j-2] || -1);
                    downDown = i === ysize-1 ? reg[1][j] : (reg[i+2]?.[j] || -1);
                }

                let vecinos = {up, down, left, right, upLeft, upRight, downLeft, downRight, rightRight, leftLeft, downDown};
                const r = logic(actual, vecinos, newCop, i, j);
                actual = r[0];
                newCop = r[1];

                totals += (actual > 0 ? actual : 0);
            }
        }
        // setExiste(totals);
        upgradeAjustes('existe', totals);
        f.u1('ac', 'reg', newCop);
    }

    useEffect(() => {
        if (!ajustes?.loaded) return;
        const element = document;
        element.addEventListener('wheel', zoomWheel, { passive: false });
        return () => {
            element.removeEventListener('wheel', zoomWheel);
        };
    }, [
        zoomWheel,
        ctrl,
        ajustes?.loaded
    ]);

    useEffect(() => {
        if (!ajustes?.loaded) return;
        if (!run || ajustes?.existe === 0) {
            if (run) {
                f.u1('ac', 'run', false);
            }
            return;
        };
        const interval = setInterval(() => {
            nextStage();
            // setCiclo(ciclo + 1);
            upgradeAjustes('ciclo', ajustes?.ciclo + 1);
        }, ajustes?.speed);
        return () => clearInterval(interval);

    }, [reg, run, ctrl, ajustes]);

    useEffect(() => {
        // f.u1('ac', 'ajustes_temps', ajustes);
        if (!(ajustes?.loaded ?? true)) {
            upgradeAjustes('loaded', true);
            reset();
        }
    }, [s.ac?.ajustes]);

    useEffect(() => {
        // --cell-size
        const ajustes = {
            speed: dev ? 1000 : 50,
            speedSize: dev ? 100 : 50,
            ysize: dev ? 5 : 30,
            xSize: dev ? 5 : 30,
            loaded: false,
            existe: 0,
            ciclo: 0,
            circular: true,
            limitPerCell: 4,
            maxPerCell: 9,
            addPerTouch: 1,
            autoAddBlocks: true,
            perZoom: 1,
            gamemode: 1,
        }
        f.u1('ac', 'ajustes', ajustes);
        document.documentElement.style.setProperty('--cell-size', '15px');

        f.u1('page', 'title', 'Automatas Celular');
    }, []);

    useEffect(() => {
        if (!ajustes?.reset) return;
        upgradeAjustes('reset', false);
        reset();
    }, [ajustes?.reset]);

    const showControl = e => {
        if (!!e) {e.stopPropagation(); e.preventDefault();}
    }
    
    return (
        <main>
            {keyExec && 
            <ListenKeys 
                keyExec={keyExec}
                zoomIn={zoomIn}
                zoomOut={zoomOut}
                showControl={showControl}
                toogleRun={toogleRun}
                toogleCircular={toogleCircular}
                reset={reset}
            />}

            <div className={`${styles.ajustes_icon}`}>
                <span 
                    onClick={() => f.u2('modals', 'ac', 'ajustes', true)}>
                    <Gears />
                </span>
            </div>

            <div 
                className={`${styles.reg_container}`}>
                {reg.map((row, i) => {
                    return (
                        <div 
                            key={i}
                            className={`${styles.reg_row} ${styles[game_mode_class]}`}>
                            {row.map((col, j) => {
                                const fill = `fill_${col}`;
                                return (
                                    <div 
                                        key={j}
                                        className={`${styles.reg_col} ${styles[fill]} ${!!col && styles.filled}`}
                                        // click
                                        onClick={() => {
                                            addOne(i, j);
                                        }}
                                        // right click
                                        onContextMenu={e => {
                                            e.preventDefault();
                                            removeOne(i, j);
                                        }}
                                        >
                                        <p>
                                            
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            {ajustes?.loaded && <div 
                className={`${styles.toogleButon}`}
                >
                <span className={`${styles.speed_info}`}>
                    {ajustes?.speed / 1000} {tx.seconds}
                </span>
                <span className={`${styles.total_info}`}>
                    {tx.ciclo}: {ajustes?.ciclo} ({ajustes?.existe}) {ajustes?.circular && 'c'}
                </span>
                <span
                    className={`${styles.toggle_icon}`}
                    onClick={toogleRun} >
                    {run ? <Pause /> : <Play />}
                </span>
            </div>}
            {!!s?.modals?.ac?.ajustes &&
            <GeneralModal
                Component={Ajustes}
                tx={tx}
                lvl1="ac"
                lvl2="ajustes"
                modal_container_w="modal_container_80"
                ajustes={ajustes}
                f={f}
                />}
        </main>
    )
}

export { AutomatasCelular };
