import React from 'react'
import { ContextMatrix } from '../ContextMatrix'

function ModoItem(props) {
    const { changeModo} = React.useContext(ContextMatrix)
    const modo = props.modo
    return (
        <li className="dropdown-item col-12 text-light text-center" onClick={() => changeModo(modo.id)}>
            {modo.name}
        </li>
    )
}

export { ModoItem };