import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import { AppContext } from './context/pipesContext';
import { SelectPipeDialog } from './dialog/select-pipe-dialog';
import { InputSource } from './inputs/input-source/input-source';
import { CountOperator } from './operators/count/counter-operator';
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

  const handleRemove = (operatorId: number) => {
    const operators = pipe.operators;
    const operatorIndex = operators.findIndex(x => x.id == operatorId);
    const isLastOperator = (operators.length - 1) == operatorIndex;
    if (operatorIndex) {
      const input = operators[operatorIndex].input;
      const firstHalf = operators.slice(operatorIndex);
      const secondHalf = isLastOperator ? [] : [{ ...operators[operatorIndex + 1], input: input }, ...operators.slice(operatorIndex + 2)];
      setPipe({ ...pipe, operators: [...firstHalf, ...secondHalf] });
    }
  }

  const getElement: any = (operator: Operator) => {
    switch (operator.type) {
      case OperatorType.Input: return (<InputSource onRemove={handleRemove} key={operator.key} id={operator.id} onOutputChanged={outputChanged}></InputSource>);
      case (OperatorType.Filter): return (<FilterOperator onRemove={handleRemove} id={operator.id} onOutputChanged={outputChanged} input={operator.input} key={operator.key}></FilterOperator>);
      case (OperatorType.PropertySelect): return (<PropertySelector onRemove={handleRemove} id={operator.id} onOutputChanged={outputChanged} input={operator.input} key={operator.key}></PropertySelector>)
      case (OperatorType.Count): return <CountOperator onRemove={handleRemove} id={operator.id} onOutputChanged={outputChanged} input={operator.input} key={operator.key}></CountOperator>
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

    setPipe({ ...pipe, operators: operators });
  };

  return (
    <AppContext.Provider value={[]} >
      <SelectPipeDialog onSelected={() => { }} open={selectDialogOpened} handleClose={handleClose} />
      <div className="h-full flex grow overflow-scroll flex-wrap">
        <div className='flex basis-2/12 grow'>
        </div>
        <div className='flex grow flex-col basis-8/12'>
          {components}
          <Button variant='contained' color='secondary' onClick={addOperatorClick}>Add Operator</Button>
        </div>
        <div className='flex basis-2/12 grow'>
        </div>
      </div>
    </AppContext.Provider >
  );
}

export default App;
