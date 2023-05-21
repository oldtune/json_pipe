import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { AppContext } from './context/pipesContext';
import { SelectPipeDialog } from './dialog/select-pipe-dialog';
import { InputSource } from './inputs/input-source/input-source';
import { FilterOperator } from './operators/filter/filter';
import { PropertySelector } from './operators/property-selector/property-selector';
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

  const getOperatorByType: (operatorType: OperatorType, operatorId: number) => Operator = (operatorType: OperatorType, operatorId: number) => {
    const lastOperator = getLastOperator();
    const input = lastOperator?.output;

    const newOperator: Operator = {
      key: formatKey(operatorId, PipeElementType.Operator),
      id: operatorId,
      input: input,
      output: null,
      type: operatorType
    };
    return newOperator;
  }

  const getLastOperator: () => Operator | null = () => {
    return pipe.operators[pipe.operators.length - 1];
  }

  const outputChanged = (output: any, id: number) => {
    const operatorCount = pipe.operators.length;
    const operatorIndex = pipe.operators.findIndex(x => x.id === id);
    if (operatorIndex === -1) {
      return;
    }

    let nextOperator = null;

    //not last one, update next one output
    if (operatorIndex !== operatorCount - 1) {
      nextOperator = { ...pipe.operators[operatorIndex + 1], input: output };
    }

    const firstPartArray = [...pipe.operators.slice(0, operatorIndex), { ...pipe.operators[operatorIndex], output: output }];
    const secondPartArray = nextOperator == null ? [] : [{ ...nextOperator }, ...pipe.operators.slice(operatorIndex + 2)];

    setPipe({
      ...pipe,
      operators: [...firstPartArray, ...secondPartArray]
    });
  };

  const getElement: any = (operator: Operator) => {
    switch (operator.type) {
      case OperatorType.Input: return (<InputSource key={operator.key} id={operator.id} onOutputChanged={outputChanged}></InputSource>);
      case (OperatorType.Filter): return (<FilterOperator id={operator.id} onOutputChanged={outputChanged} input={operator.input} key={operator.key}></FilterOperator>);
      case (OperatorType.PropertySelect): return (<PropertySelector id={operator.id} onOutputChanged={outputChanged} input={operator.input} key={operator.key}></PropertySelector>)
    }
  };

  const components = pipe.operators.map(operator => getElement(operator));

  const handleClose: (operatorType?: OperatorType) => void = (operatorType?: OperatorType) => {
    if (operatorType === null || operatorType === undefined) {
      setSelectDialogOpened(false);
      return;
    }

    const newOperator = getOperatorByType(operatorType, operatorCounter);
    setOperatorCounter(operatorCounter + 1);
    setSelectDialogOpened(false);

    const operators: Operator[] = [...pipe.operators, newOperator];

    setPipe(Object.assign({}, { ...pipe, operators: operators }));
  };

  return (
    <AppContext.Provider value={[]} >
      <SelectPipeDialog onSelected={() => { }} open={selectDialogOpened} handleClose={handleClose} />
      <div className="h-full flex">
        <div className='flex basis-2/12 bg-slate-200 grow'>
        </div>
        <div className='flex grow flex-col basis-8/12 flex h-full'>
          {components}
          <Button variant='contained' color='secondary' onClick={addOperatorClick}>Add Operator</Button>
        </div>
        <div className='flex basis-2/12 bg-slate-200 grow'>
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
