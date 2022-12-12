import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'

const getRandomColor = () => {
  const number = (Math.random() * 0xfffff * 1000000).toString(16);
  return `#${number.slice(0, 6)}`
} 

export function App() {
  const [color, setColor] = useState<string>("")
  const [answers, setAnswers] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>()

  const generateColors = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => .5 - Math.random()));
  }

  function handleCheckAnswer(guess: string) {
    if(guess === color) {
      setIsCorrect(true)
      generateColors()
    } else {
      setIsCorrect(false)
    }
  }

  useEffect(() => {
    generateColors()
  }, [])

  return (
   <div className="App">
    <div>
      <div className='guess-me' style={{ background: color }}></div>
      { answers.map(guess => {
        return (
            <button key={guess} onClick={() => handleCheckAnswer(guess)}>
              {guess}
            </button> 
        )
      })}
      { isCorrect == false && <div className='wrong'>Wrong</div> }
      { isCorrect == true && <div className='correct'>Correct</div> }
      </div>
    </div>
  )
}
