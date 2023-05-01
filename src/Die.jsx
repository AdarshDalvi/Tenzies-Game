import { nanoid } from 'nanoid'
import './styles/Die.css'


export default function Die(props){
    let style={
        backgroundColor:props.die.isHeld?"#59E391":"white"
    }

    let gridStyle= {
        gridTemplateColumns: props.die.value===1?"1fr" : "1fr 1fr"
    }

    
    let dots=[]
    function createDots(){
        let tempArray=[]
        for(let i=0; i<props.die.value; i++){
            tempArray.push(<div className='dots' key={nanoid()}></div>)
        }
        return tempArray
    }

    dots= createDots()

    return (
        <div className='die-face' style={style}  onClick={props.holdDice} >
            <div className='die-content' style={gridStyle}>
                {dots}
            </div>
        </div>
    )
}