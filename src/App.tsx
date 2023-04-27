import { useState } from 'react';
import './App.css';
import InputBox from './inputbox/inputbox';

function App() {
  const [focusId, setFocus] = useState(1);
  return (
    <div className="App h-full">
      <div className='flex grow flex-row flex-wrap h-full bg-slate-200'>
        <div className="basis-1/3 flex grow">
          <InputBox content={'hello'} id={1}></InputBox>
        </div>
        <div className="basis-1/3 flex grow">
          <InputBox content={'hello 2'} id={2}></InputBox>
        </div>
        <div className="basis-1/3 flex grow">
          <InputBox content={'hello 3'} id={3}></InputBox>
        </div>
      </div>
    </div>
  );
}

export default App;
