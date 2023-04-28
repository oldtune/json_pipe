import { useState } from 'react';
import './App.css';

function App() {
  const [pipes, setPipes] = useState([]);
  return (
    <div className="h-full flex">
      <div className='flex basis-2/12 bg-slate-200'>
      </div>
      <div className='flex grow flex-col flex-wrap basis-10/12 flex h-full bg-slate-200'>
        <button>Add pipe <i>?</i></button>
        {/* <div className="flex">
          <InputSource></InputSource>
        </div>
        <div className="flex">
          <FilterOperator />
        </div>
        <div className="flex flex-col">
          <button className="text-6xl text-violet-500 bg-slate-300 hover:bg-slate-400 cursor-pointer">+</button>
        </div> */}
      </div>
      <div className='flex basis-2/12 bg-slate-200'>
      </div>
    </div>
  );
}

export default App;
