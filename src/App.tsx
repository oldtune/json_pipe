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
import { PipeElementType, formatKey } from './types/pipe-element-type';

function App() {
  const [operatorCounter, setOperatorCounter] = useState<number>(1);
  const [pipe, setPipe] = useState<Pipe>({ id: 1, operators: [] });
  const [selectDialogOpened, setSelectDialogOpened] = useState(false);

  const addOperatorClick = () => {
    setSelectDialogOpened(true);
  };

  const getOperatorByType: (operatorType: OperatorType, pipeId: number, operatorId: number) => Operator = (operatorType: OperatorType, pipeId: number, operatorId: number) => {
    const lastOperator = getLastOperator();
    const input = lastOperator?.output;

    const newOperator: Operator = {
      element: getElement(operatorType, pipeId, operatorId),
      key: formatKey(operatorId, PipeElementType.Operator),
      id: operatorId,
      input: input,
      output: null,
      type: operatorType
    };
    return newOperator;
  }

  function reEvaluate(output: any, operatorId: number) {
    debugger
    const operator = getOperator(operatorId);
    if (operator) {
      const operator = getOperator(operatorId);
      if (operator) {
        const index = pipe.operators.indexOf(operator);
        const pipeLength = pipe.operators.length;
        setPipe({
          ...pipe,
          operators: [...pipe.operators.slice(0, index),
          { ...operator, output: output },
          ...pipe.operators.slice(index + 1, pipeLength - 1)]
        });
      }
    }
  };

  const getOperator: (operatorId: number) => Operator | null = (operatorId: number) => {
    const operator = pipe.operators.find(x => x.id === operatorId);
    if (!operator) {
      return null;
    }

    return operator;
  }

  const getLastOperator: () => Operator | null = () => {
    return pipe.operators[pipe.operators.length - 1];
  }

  const getElement: (operatorType: OperatorType, pipeId: number, operatorId: number, input?: any) => ReactNode = (operatorType: OperatorType, pipeId: number, operatorId: number, input?: any) => {
    switch (operatorType) {
      case OperatorType.Input: return <InputSource triggerReEvaluate={(output) => { reEvaluate(output, operatorId); }}></InputSource>;
      case OperatorType.Filter: return <FilterOperator input={input} triggerReEvaluate={(output) => { reEvaluate(output, operatorId) }}></FilterOperator>
    }
  };

  const handleClose: (operatorType?: OperatorType) => void = (operatorType?: OperatorType) => {
    if (operatorType === null || operatorType === undefined) {
      setSelectDialogOpened(false);
      return;
    }

    const newOperator = getOperatorByType(operatorType, 1, operatorCounter);
    setOperatorCounter(operatorCounter + 1);
    setSelectDialogOpened(false);
    const operators: Operator[] = [...pipe.operators, newOperator];

    setPipe({ ...pipe, operators: operators });
  };

  return (
    <AppContext.Provider value={[]} >
      <SelectPipeDialog onSelected={() => { }} open={selectDialogOpened} handleClose={handleClose} />
      <div className="h-full flex">
        <div className='flex basis-2/12 bg-slate-200'>
        </div>
        <div className='flex grow flex-col flex-wrap basis-8/12 flex h-full'>
          {pipe.operators.map(operator => operator.element)}
          <Button variant='contained' color='secondary' onClick={addOperatorClick}>Add Operator</Button>
        </div>
        <div className='flex basis-2/12 bg-slate-200'>
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
