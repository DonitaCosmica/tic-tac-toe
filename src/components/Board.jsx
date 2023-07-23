import { Square } from './Square.jsx'

export function Board({ results, updateBoard }) {
  return(
    <section className="game">
      {
        results.map((square, index) => {
          return(
            <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          )
        })
      }
    </section> 
  );
}
