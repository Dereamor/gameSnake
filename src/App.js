import React from 'react';
import './App.css';

const BOARD_CIZE = 10;
const DEAFULT_CELLS_VALUE = Array(BOARD_CIZE).fill(Array(BOARD_CIZE).fill(0))
const AVALIBLE_MOVES = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
const SPEED = 100

const checkAvalibleSlot = position => {
  switch (true) {
    case position >= BOARD_CIZE:
      return 0
      case position < 0:
        return BOARD_CIZE - 1
        default:
          return position 
  }
}

const App = () => {
  const [snake, setsnake] = React.useState ([ [1, 1]])
  const [food, setFood] = React.useState( [0,0] )
  const [direction, setDirection] = React.useState(AVALIBLE_MOVES[0])

  const handleKeyDown = (event) => {
        const index = AVALIBLE_MOVES.indexOf(event.key)
    if (index > -1) {
      setDirection(AVALIBLE_MOVES[index])
    }
  }

  React.useEffect( () => {
    document.addEventListener('keydown', handleKeyDown)
  })

  React.useEffect ( () => {
    const interval = gameLoop()
    return() => clearInterval(interval)
    gameLoop()
  }, [snake])

  const generateFood = () => {
    let newFood
    do {
        newFood = [
          Math.floor(Math.random() * BOARD_CIZE),
          Math.floor(Math.random() * BOARD_CIZE)
        ]
    } while (snake.some(elem => elem[0] === newFood[0] && elem[1] === newFood[1]))
    setFood(newFood)
  }
  
  const gameLoop = () => {
    
    const timerId = setTimeout( () => {
      console.log('gameloop')
      const newSnake = snake
     let move = []

      switch (direction) {
        case AVALIBLE_MOVES[0]:
          move = [1, 0]
          break;
        case AVALIBLE_MOVES[1]:
          move = [-1, 0]
          break;
        case AVALIBLE_MOVES[2]:
          move = [0, 1]
          break;
        case AVALIBLE_MOVES[3]:
          move = [0, -1]
          break;
      }
      
  
      const head = [
        checkAvalibleSlot(newSnake[newSnake.length-1][0] + move[0]),
        checkAvalibleSlot(newSnake[newSnake.length-1][1] + move[1])
      ]
        console.log({head})
        newSnake.push(head)
        let spliceIndex = 1
        if (head[0] === food[0] && head[1] === food[1]) {
          spliceIndex = 0
          generateFood() 
        }
        setsnake(newSnake.slice(spliceIndex))
        
    }, SPEED)
    return timerId
    
  }

  return (
    <div>
      {direction}
      {DEAFULT_CELLS_VALUE.map((row, indexR) =>(
        <div key={indexR} className='row'>
        {row.map((cell, indexC) => {
          let type = snake.some(elem => elem[0] === indexR && elem[1] === indexC) && 'snake'
          if (type !== 'snake') {
          type = (food[0] === indexR && food[1] === indexC) && 'food'
          }
          return (
            <Cell key={indexC} type={type}/>
          )
        })}
        </div>
      ))}
    </div>
  );
}

const Cell = ({type}) => {
  return <div className= {`cell ${type}`} />
}

export default App;
