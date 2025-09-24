import { useEffect, useState } from 'react'
import './App.css'
import Grid from './components/Grid.jsx'
import Controls from "./components/Controls.jsx"
import { fetchPuzzle } from './fetch-puzzle';


function App() {
  // const board = Array(9).fill(null).map(()=>Array(9).fill(null));
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [solution,setSolution] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [status,setStatus] = useState('');
  const [error,setError] = useState('');
  const [greenCount,setGreenCount] = useState(0);
  const handleCheck = () => {
    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if(flatBoard.every((cell ,i) => cell === flatSolution[i])){
      setStatus('Correct!');

      let count = 0;
      const totalCells = 81;
      const interval = setInterval(()=>{
        count++;
        setGreenCount(count)
        if(count === totalCells)clearInterval(interval);
      },30)

    }
    else{
      setStatus('Incorrect, try again');
      setGreenCount(0);
    }
  }


    useEffect(()=>{
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      }
    );
  },[]);



  const handleReset = () => {
    setBoard(puzzle.map((row) => [...row]));
    setStatus('');
    setSelected(null);
    setGreenCount(0)
  }






  const handleNewPuzzle = () => {
    setGreenCount(0);
    fetchPuzzle({
      setError,
      setStatus,
      setPuzzle,
      setSolution,
      setBoard,
      setSelected,
      }
    );
  }



  const [selected, setSelected] = useState(null);
  const handleInput = (rIdx, cIdx, value) => {
  if (value === "" || (value >= 1 && value <= 9)) {
    setBoard((prev) =>
      prev.map((row, r) =>
        row.map((cell, c) =>
          r === rIdx && c === cIdx
            ? value
              ? parseInt(value)
              : null
            : cell
        )
      )
    );
    
  }
};
  if(error){
    return <div style={{color : 'red'}}>{error}</div>
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sudoku Solver</h1>
      <Grid board={board} handleInput={handleInput} puzzle={puzzle} selected={selected} setSelected={setSelected}  greenCount = {greenCount}/>
      <Controls handleCheck={handleCheck}  handleReset = {handleReset} handleNewPuzzle={handleNewPuzzle}/>
      {status && <div className='status'>{status}</div>}
    </div>
  )
}

export default App;
