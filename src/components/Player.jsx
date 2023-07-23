import { Square } from './Square.jsx'
import { TURNS } from '../constants.js'

export function Player({ turn }) {
  return(
    <section className="turn">
      <Square isSelected={turn == TURNS.X}>
        {TURNS.X}
      </Square>
      <Square isSelected={turn == TURNS.O}>
        {TURNS.O}
      </Square>
    </section> 
  )
}
