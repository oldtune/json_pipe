import React, { useCallback, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type FilterOperatorProps = {
    input?: any[];
} & OperatorProps;

export const FilterOperator = React.memo((props) => {
    const [output, setOutput] = useState<any[]>([]);
    const [outputString, setOutputString] = useState('');

    const [filterExpression, setFilterExpression] = useState<string>('');

    const calculate = (input: any[], expression: string) => {
        try {
            if (input && expression) {
                const func = eval(`(${expression})`);

                return input.filter(func);
            }
        }
        catch (err) {
            console.log(err);
            return input;
        }
    }

    const handleOnChange = (e: any) => {
        setFilterExpression(e.target.value);
    };

    const debouncedHandleOnChange = useCallback(timeDebounce((e: any) => handleOnChange(e)), [filterExpression]);

    return <div className="flex gap-2 p-5 flex-wrap flex-col bg-lime-600">
        <div>
            Filter Operator
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input onChange={debouncedHandleOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea readOnly style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
});