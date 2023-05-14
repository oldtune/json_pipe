import { Button } from '@mui/material';
import { ReactNode, useState } from 'react';
import './App.css';
import { AppContext } from './context/pipesContext';
import { SelectPipeDialog } from './dialog/select-pipe-dialog';
import { InputSource } from './inputs/input-source/InputSource';
import { FilterOperator } from './operators/filter/filter';
import { Operator } from './types/operator';
import { OperatorType } from "./types/operator-type";
import { Pipe } from './types/pipe';
import { PipeElementType, formatId } from './types/pipe-element-type';

function App() {
  // const [pipeCounter, setPipeCounter] = useState<number>(1);
  const [operatorCounter, setOperatorCounter] = useState<number>(1);
  const [pipes, setPipes] = useState<Pipe[]>([{ currentValue: [], id: 1, operators: [] }]);
  const [selectDialogOpened, setSelectDialogOpened] = useState(false);

  const addOperatorClick = () => {
    setSelectDialogOpened(true);
  };

  const getOperatorByType: (operatorType: OperatorType, currentValue: any, operatorId: number) => Operator = (operatorType: OperatorType, currentValue: any, operatorId: number) => {
    const element = getElement(operatorType, currentValue);
    const newOperator: Operator = {
      element: getElement(operatorType, currentValue),
      id: formatId(operatorId, PipeElementType.Operator),
      input: "",
      output: "",
      type: operatorType
    };
    return newOperator;
  }

  const getElement: (operatorType: OperatorType, currentValue: any) => ReactNode = (operatorType: OperatorType, currentValue: any) => {
    switch (operatorType) {
      case OperatorType.Input: return <InputSource></InputSource>;
      case OperatorType.Filter: return <FilterOperator input={currentValue}></FilterOperator>
    }
  };

  const handleClose: (operatorType?: OperatorType) => void = (operatorType?: OperatorType) => {
    if (operatorType == null || operatorType == undefined) {
      setSelectDialogOpened(false);
      return;
    }

    const newOperator = getOperatorByType(operatorType, pipes[0].currentValue, operatorCounter);
    setOperatorCounter(operatorCounter + 1);
    setSelectDialogOpened(false);
    const firstPipe = { ...pipes[0] };
    const operators: Operator[] = [...firstPipe.operators, newOperator];

    setPipes([{ ...firstPipe, operators: operators }, ...pipes.slice(1)]);
    console.log(pipes);
  };

  return (
    <AppContext.Provider value={[]} >
      <SelectPipeDialog onSelected={() => { }} open={selectDialogOpened} handleClose={handleClose} />
      <div className="h-full flex">
        <div className='flex basis-2/12 bg-slate-200'>
        </div>
        <div className='flex grow flex-col flex-wrap basis-8/12 flex h-full'>
          {pipes[0].operators.map(operator => operator.element)}
          <Button variant='contained' color='secondary' onClick={addOperatorClick}>Add Operator</Button>
        </div>
        <div className='flex basis-2/12 bg-slate-200'>
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
