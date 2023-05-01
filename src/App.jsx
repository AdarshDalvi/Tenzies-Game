import React from 'react'
import './styles/App.css'
import Die from './Die'
import { nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [dice,setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)
  const [bestScore,setBestScore] = React.useState(JSON.parse(localStorage.getItem("bestScore"))|| 0)
  const [noOfRolls, setNoOfRolls] = React.useState(0)

  localStorage.setItem("bestScore",JSON.stringify(bestScore))


  React.useEffect(()=>{
    const allheld= dice.every((die)=>{
      return die.isHeld
    })
    const firstElement = dice[0].value
    const allSameValue = dice.every((die)=>{
      return firstElement === die.value
    })
    if(allSameValue && allheld){
      if(bestScore===0 || bestScore>noOfRolls){
        setBestScore(oldBest=>noOfRolls)
      }
      setTenzies(true)
    }
  },[dice])

  window.onbeforeunload = function ()
  { 
    setNoOfRolls(0)
    return "";
  };

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  function rollDice() {
    if(!tenzies){
      setNoOfRolls(oldScore=>oldScore+1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            generateNewDie()
      }))
    }else{
      setTenzies(false)
      setNoOfRolls(0)
      setDice(allNewDice())
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
  }


  const diceElements = dice.map(die => (
    <Die 
        key={die.id} 
        die={die}
        holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      <h1>Tenzies</h1>
      {tenzies&&<p className='subtitle'>You Won !</p>}
      {!tenzies&&<p className='subtitle'>Roll until all dice are the same. Click<br/> each die to freeze it at its current value<br/> between rolls. The less the rolls,<br/> the better the score !</p>}
      <div className='die-container'>
        {tenzies&&<Confetti/>}
        {diceElements}
      </div>
      <button className='roll-button' onClick={rollDice}>
        {!tenzies?"Roll":"New Game"}
      </button>
      <div className='scoreCard'>
        <p>No. of Rolls : {noOfRolls}</p>
        <p>Best Score : {bestScore}</p>
      </div>
    </main>
  )
}


