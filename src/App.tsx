import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { InputSource } from './inputs/input-source/InputSource';
import { FilterOperator } from './operators/filter/filter';

function App() {
  const [pipes, setPipes] = useState<any>([]);
  const addOperatorClick = () => {
    if (pipes.length == 0) {
      setPipes([<InputSource />]);
    }
    if (pipes.length == 1) {
      setPipes([...pipes, <FilterOperator input={[1, 2, 3, 4, 5]} />])
    }
  };
  return (
    <div className="h-full flex">
      <div className='flex basis-2/12 bg-slate-200'>
      </div>
      <div className='flex grow flex-col flex-wrap basis-8/12 flex h-full'>
        {pipes}
        <Button variant='contained' color='secondary' onClick={addOperatorClick}>Add Operator</Button>
      </div>
      <div className='flex basis-2/12 bg-slate-200'>
      </div>
    </div>
  );
}

export default App;
