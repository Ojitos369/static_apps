import React from 'react'
import { SuperContext } from '../SuperContext';
import { ShowTotal } from '../ShowTotal'
import { SuperShow } from '../SuperShow';
import './SuperUI.css'
import { Context } from '../../../Context';

function SuperUI() {
    const texts = require('../../../texts.json');
    const { language } = React.useContext(Context);
    const { 
        addItem,
        reset,
        itemNameInput,
        itemPriceInput,
        upgradeItemName,
        upgradeItemPrice,
        itemCantidadInput,
        upgradeItemCantidad
    } = React.useContext(SuperContext);
    const textos = texts.textos[language.id - 1].super;
    return (
        <React.Fragment>
            <form className='container-fluent mb-3 mb-md-5' onSubmit={(e) => {
                e.preventDefault();
                addItem();
            }}>
                <div className='row d-flex justify-content-around'>
                    <div className='col-12 col-md-3'>
                        <div className='container-fluent'>
                            <div className='row'>
                                <label className='text-center' htmlFor="add-item-name">{textos.name}</label>
                            </div>
                            <div className='row'>
                                <input className='super-input text-center' value={itemNameInput} onChange={upgradeItemName} type="text" id='add-item-name' placeholder={textos.name} required/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='container-fluent'>
                            <div className='row'>
                                <label className='text-center' htmlFor="add-item-price">{textos.price}</label>
                            </div>
                            <div className='row'>
                                <input className='super-input text-center' value={itemPriceInput} onChange={upgradeItemPrice} type="number" id='add-item-price' placeholder={textos.price} required step="any"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='container-fluent'>
                            <div className='row'>
                                <label className='text-center' htmlFor="add-item-cantidad">{textos.quantity}</label>
                            </div>
                            <div className='row'>
                                <input className='super-input text-center' value={itemCantidadInput} onChange={upgradeItemCantidad} type="number" id='add-item-cantidad' placeholder={textos.quantity} required step="any"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row d-flex justify-content-around mt-4'>
                    <div className='col-10 col-md-7'>
                        <div className='container'>
                            <div className='row'>
                                <label className='text-center' htmlFor="add-item-price">{textos.add}</label>
                            </div>
                            <div className='row'>
                            <input className='super-input col btn btn-primary' type="submit" value={textos.add} />
                            </div>
                        </div>
                    </div>
                    <div className='col-2 col-md-2'>
                        <div className='container-fluent remove-item' onClick={reset}>
                            <div className='row'>
                                <label className='text-center' htmlFor="add-item-price">Reset</label>
                            </div>
                            <div className='row'>
                                <span className='text-center'>❌</span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            < ShowTotal />
            < SuperShow />
        </React.Fragment>
    )
}

export { SuperUI };