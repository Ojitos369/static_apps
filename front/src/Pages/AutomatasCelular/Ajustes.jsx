import { useEffect, useState, useMemo } from 'react';
import {useStates } from '../../App/useStates';
import { justNumbers } from '../../App/core/helper';

const Ajustes = props => {
    const { s, f } = useStates();
    const { tx } = props;
    const ajustes = useMemo(() => {
        return s.ac?.ajustes || {}
    }, [s.ac?.ajustes]);
    const localSettings = useMemo(() => {

        return s.ac?.ajustes_temps || {}
    }, [s.ac?.ajustes_temps]);

    const modes = useMemo(() => {
        const modes = tx.modes || {};
        const texts = Object.keys(modes).map(key => {
            return {title: modes[key].name, value: modes[key].value};
        })
        return texts;
    }, [tx]);

    const fields = [
        {field: 'speed', title: tx.ajustes_options.speed, value: localSettings.speed, type: "number", 
            parse: "int", show: true,
        },
        {field: 'speedSize', title: tx.ajustes_options.speedSize, value: localSettings.speedSize, type: "number", 
            parse: "int", show: true,
        },
        {field: 'ysize', title: tx.ajustes_options.ysize, value: localSettings.ysize, type: "number", 
            parse: "int", show: true,
        },
        {field: 'xSize', title: tx.ajustes_options.xSize, value: localSettings.xSize, type: "number", 
            parse: "int", show: true,
        },
        {field: 'circular', title: tx.ajustes_options.circular, value: localSettings.circular, type: "option", 
            parse: "bool", show: true,
            options: [
                {value: true, title: tx.ajustes_options.yes},
                {value: false, title: tx.ajustes_options.no},
            ]
        },
        {field: 'limitPerCell', title: tx.ajustes_options.limitPerCell, value: localSettings.limitPerCell, type: "number", 
            parse: "int", show: true,
        },
        {field: 'maxPerCell', title: tx.ajustes_options.maxPerCell, value: localSettings.maxPerCell, type: "number", 
            parse: "int", show: true,
        },
        {field: 'addPerTouch', title: tx.ajustes_options.addPerTouch, value: localSettings.addPerTouch, type: "number", 
            parse: "int", show: true,
        },
        {field: 'autoAddBlocks', title: tx.ajustes_options.autoAddBlocks, value: localSettings.autoAddBlocks, type: "option",  
            parse: "bool", show: !["2", 2].includes(localSettings.gamemode),
            options: [
                {value: true, title: tx.ajustes_options.yes},
                {value: false, title: tx.ajustes_options.no},
            ]
        },
        {field: 'perZoom', title: tx.ajustes_options.perZoom, value: localSettings.perZoom, type: "number", 
            parse: "int", show: true,
        },
        {field: 'gamemode', title: tx.ajustes_options.gamemode, value: localSettings.gamemode, type: "option", 
            parse: "int", show: true,
            options: modes
        },
    ]

    const changeAjuste = (field, value) => {
        f.u2('ac', 'ajustes_temps', field, value);
    }

    const guardar = () => {
        let settings = JSON.parse(JSON.stringify(localSettings));;
        fields.forEach(field => {
            switch (field.parse) {
                case "int":
                    settings[field.field] = parseInt(settings[field.field]);
                    break;
                case "bool":
                    settings[field.field] = ["true", true].includes(settings[field.field])
                    break;
                default:
                    break;
            }
        });
        f.u1('ac', 'ajustes', {...settings, reset: true});
        f.u2('modals', 'ac', 'ajustes', false);
    }

    const cancelar = () => {
        f.u2('modals', 'ac', 'ajustes', false);
    }

    useEffect(() => {
        if (["2", 2].includes(localSettings.gamemode)) {
            const update = {
                autoAddBlocks: false,
                limitPerCell: 1,
                maxPerCell: 1,
                addPerTouch: 1,
            }
            Object.keys(update).forEach(key => {
                f.u2('ac', 'ajustes_temps', key, update[key]);
            });
        }
        if (["1", 1].includes(localSettings.gamemode)) {
            const update = {
                limitPerCell: 4,
                maxPerCell: 9,
                addPerTouch: 1,
            }
            Object.keys(update).forEach(key => {
                f.u2('ac', 'ajustes_temps', key, update[key]);
            });
        }
    }, [localSettings.gamemode]);

    useEffect(() => {
        f.u1('ac', 'ajustes_temps', ajustes);
    }, [s.modals]);

    return (
        <div className="flex flex-col w-full items-center px-5">
            <p className="w-11 text-center my-3">
                {tx.ajustes_title}
            </p>

            <div className="flex flex-wrap w-full justify-center">
                {fields.map((field, i) => {
                    if (!field.show) {
                        return null;
                    }
                    return (
                        <div key={i} className="flex flex-col w-10/12 md:w-1/3 mt-3 px-5">
                            <label className="w-full text-start px-2">
                                {field.title}
                            </label>
                            {field.type === "text" && 
                            <input 
                                type="text"
                                className='text-black px-3 py-[5px] rounded-md'
                                value={field.value}
                                onChange={e => changeAjuste(field.field, e.target.value)}
                            />}
                            {field.type === "number" && 
                            <input 
                                type="text"
                                className='text-black px-3 py-[5px] rounded-md'
                                value={field.value}
                                onChange={e => {
                                    let value = e.target.value;
                                    value = justNumbers(value);
                                    changeAjuste(field.field, value)
                                }}
                            />}
                            {field.type === "option" && 
                            <select 
                                className='text-black px-3 py-[5px] rounded-md'
                                value={field.value}
                                onChange={e => changeAjuste(field.field, e.target.value)}
                            >
                                {field.options.map((option, i) => {
                                    return (
                                        <option key={i} value={option.value}>
                                            {option.title}
                                        </option>
                                    )
                                })}
                            </select>}
                        </div>
                    )
                })}
            </div>
            
            <div className="flex my-5 w-full justify-center">
                <button
                    className="bg-green-700 text-white px-5 py-2 rounded-md w-1/4 hover:bg-green-600 mx-3"
                    onClick={guardar}
                    >
                    {tx.ajustes_options.save}
                </button>

                <button
                    className="bg-red-700 text-white px-5 py-2 rounded-md w-1/4 hover:bg-red-600 mx-3"
                    onClick={cancelar}
                    >
                    {tx.ajustes_options.cancel}
                </button>
            </div>

        </div>
    )
}

export { Ajustes };