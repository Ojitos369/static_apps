import React from 'react'
import { useLocalStorage } from '../../Context/useLocalStorage';
import { v4 as uuid } from 'uuid';
const SuperContext = React.createContext();


function SuperProvier(props) {
    const {
        item: items,
        saveItems: setItems
    } = useLocalStorage('items', []);

    const {
        item: cantidad,
        saveItems: setCantidad
    } = useLocalStorage('cantidad', 0);

    const {
        item: itemNameInput,
        saveItems: setItemNameInput
    } = useLocalStorage('itemNameInput', '');

    const {
        item: itemPriceInput,
        saveItems: setItemPriceInput
    } = useLocalStorage('itemPriceInput', '');

    const {
        item: itemCantidadInput,
        saveItems: setItemCantidadInput
    } = useLocalStorage('itemCantidadInput', 1);

    const {
        item: totalItemsData,
        saveItems: setTotalItemsData
    } = useLocalStorage('totalItemsData', {
        cantidad: 0,
        totalPrice: 0
    });


    const priceFormat = price => {
        // if price < 1000, return format 999.00
        // if price >= 1000, return format 123,456,000.00

        // round with 2 decimals
        price = Math.round(price * 100) / 100;
        let priceFormat = price.toString();
        if (priceFormat.length < 4) {
            return `${priceFormat}`;
        }
        let newStringPrice = '';
        const splitPrice = priceFormat.split('.');
        const decimals = splitPrice[1];
        const intPrice = splitPrice[0];
        for (let i = intPrice.length - 1, j = 0; i >= 0; i--, j++) {
            if (j % 3 === 0 && j !== 0) {
                newStringPrice = `,${newStringPrice}`;
            }
            newStringPrice = `${intPrice[i]}${newStringPrice}`;
        }
        return `${newStringPrice}.${decimals || '00'}`;
    }


    const addItem = () => {
        const addItemName = itemNameInput;
        const addItemPrice = itemPriceInput * itemCantidadInput;
        const addItemCantidad = itemCantidadInput;
        items.push({
            key: uuid(),
            name: addItemName,
            price: parseFloat(addItemPrice),
            priceFormat: priceFormat(addItemPrice),
            cantidad: addItemCantidad,
        })
        setItems(items);
        setCantidad(cantidad + 1);
        const totalPrice = items.reduce((total, item) => total + item.price, 0);
        setTotalItemsData({
            cantidad: cantidad + 1,
            totalPrice: priceFormat(totalPrice),
        });
        setItemNameInput('');
        setItemPriceInput('');
        setItemCantidadInput(1);
        document.getElementById('add-item-name').focus();
    }

    const upgradeItemName = () => {
        const addItemName = document.getElementById('add-item-name').value;
        setItemNameInput(addItemName);
    }

    const upgradeItemPrice = () => {
        const addItemPrice = document.getElementById('add-item-price').value;
        setItemPriceInput(addItemPrice);
    }

    const upgradeItemCantidad = () => {
        const addItemCantidad = document.getElementById('add-item-cantidad').value;
        setItemCantidadInput(addItemCantidad);
    }

    const removeItem = (key) => {
        const newItems = items.filter(item => item.key !== key);
        setItems(newItems);
        setCantidad(cantidad - 1);
        const totalPrice = newItems.reduce((total, item) => total + item.price, 0);
        setTotalItemsData({
            cantidad: cantidad - 1,
            totalPrice: priceFormat(totalPrice)
        });
    }

    const reset = () => {
        setItems([]);
        setCantidad(0);
        setTotalItemsData({
            cantidad: 0,
            totalPrice: 0
        });
    }
    return (
        <SuperContext.Provider value={{
            items,
            cantidad,
            totalItemsData,
            removeItem,
            addItem,
            reset,
            itemNameInput,
            itemPriceInput,
            upgradeItemName,
            upgradeItemPrice,
            itemCantidadInput,
            upgradeItemCantidad
        }}>
            {props.children}
        </SuperContext.Provider>
    )
}

export { SuperContext, SuperProvier };
