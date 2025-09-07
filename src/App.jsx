import { useState } from 'react'
import './App.css'
import Grid from './components/Grid.jsx'

function App(){
  const board = Array(9).fill(null).map(()=>Array(9).fill(null));
  const [board,setBoard] = useState(n);
  const puzzle = Array(9).fill(null).map(()=>Array(9).fill(null));

  // [row,col]

  const [selected,setSelected] = useState(null);
  const handleInput = (rIdx,cIdx,value) =>{
    if(value === "" ||( value >= 1 && value <=9) ){

    }
  } 
  return(
    <div style={{textAlign: 'center'}}>
      <h1>Sudoku Solver</h1>
      <Grid board = {board} puzzle = {puzzle} selected={selected} setSelected= {setSelected} />
    </div>
  )
}

export default App;
