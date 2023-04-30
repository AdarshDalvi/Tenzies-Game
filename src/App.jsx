import { useState } from 'react'
import './styles/App.css'
import Die from './Die'

export default function App() {



  const allNewDice = function allNew(){
    let randomArray=[]
    for(let i=0;i<10;++i){
      randomArray.push(Math.ceil(Math.random()*6))
    }
    return randomArray
  }

  let diceElements= allNewDice().map((item,index)=>{
    return (
      <Die
        key={index}
        value={item}
      />)
  })

  
  

  return (
    <main>
      <h1>Tenzies</h1>
      <p className='subtitle'>Roll until all dice are the same. Click<br/> each die to freeze it at its current value<br/> between rolls.</p>
      <div className='die-container'>
        {diceElements}
        
      </div>
      <button className='roll-button'>
        Roll
      </button>
    </main>
  )
}


