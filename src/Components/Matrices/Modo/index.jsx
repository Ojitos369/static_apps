import React from 'react'
import { ContextMatrix } from '../ContextMatrix'
import { ModoItem } from './ModoItem'

function Modo() {
  const {
    modo,
    modos,
  } = React.useContext(ContextMatrix)
  return (
    <div className="dropdown dropdown-container row d-flex justify-content-center">
      <button className="dropdown-container col-10 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        {modos[modo].name}
      </button>
      <ul className="dropdown-menu col-10" aria-labelledby="dropdownMenuButton1">
        {modos.map(this_modo => {
          return (
            < ModoItem modo={this_modo} key={this_modo.id} />
          )
        })}
      </ul>
    </div>
  )
}

export { Modo };