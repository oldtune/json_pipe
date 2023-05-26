import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { sum } from '../../helpers/array-sum';
import { timeDebounce } from "../../helpers/debounce";
import { getMetaData } from "../../helpers/object-metadata";
import { OperatorProps } from "../../types/operator-props";

export type SumOperatorProps = {

} & OperatorProps;
export const SumOperator: React.FC<SumOperatorProps> = (props) => {
    const [expression, setExpression] = useState<{ str: string, func: any }>({ str: "", func: null });

    const output = useMemo(() => {
        if (expression.func) {
            try {
                if (Array.isArray(props.input)) {
                    if (props.input.length > 0) {
                        const firstEle = props.input[0];
                        //if array of number
                        if (typeof firstEle === "number") {
                            return sum(props.input);
                        }
                        //if array of object
                        return sum(props.input.map(expression.func))
                    }
                }
                return sum(expression.func(props.input));
            }
            catch (err) {
                //ignore
                return 0;
            }
        }
    }, [expression, props.input]);

    useEffect(() => {
        if (output) {
            props.onOutputChanged(output, props.id);
        }
    }, [expression, props.input]);

    const handleOnChange = (e: any) => {
        try {
            const newExpression = eval(e.target.value);
            if (newExpression) {
                setExpression({ str: e.target.value, func: newExpression });
            }
        }
        catch (err) {
            //ignore error here
        }
    };

    const outputString: string = useMemo(() => {
        const result = JSON.stringify(output);
        return result;
    }, [output]);

    const metaData: string = useMemo(() => {
        return getMetaData(output);
    }, [output]);

    const debouncedOnChange = useCallback(timeDebounce((event: any) => {
        handleOnChange(event);
    }), []);

    return <div className="flex bg-gray-300 p-5 flex-col gap-2 border-solid rounded mb-3">
        <div className="flex flex-row justify-between">
            <div><span className="font-bold">Sum</span> {metaData}</div>
            <span className="cursor-pointer hover:text-red-600" onClick={() => { props.onRemove(props.id) }}><Tooltip title='End me, quick!'><HighlightOffIcon /></Tooltip></span>
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input placeholder="Input expression here, Ex: if input is an array of object, do x => x.age, array of number do x => x, object has an array of number property, do x => x.scores" onChange={debouncedOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Output here</div>
            <div><textarea readOnly placeholder="Output goes here 👉" style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
}