import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { getMetaData } from "../../helpers/object-metadata";
import { OperatorProps } from "../../types/operator-props";

export type MapOperatorProps = {

} & OperatorProps;
export const MapOperator: React.FC<MapOperatorProps> = (props) => {
    const [expression, setExpression] = useState<{ str: string, func: any }>({ str: "", func: null });

    const output = useMemo(() => {
        if (expression.func && props.input) {
            try {
                debugger
                if (Array.isArray(props.input)) {
                    return props.input.map(expression.func);
                }
                return expression.func(props.input);
            }
            catch (err) {
                //ignore
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
            <div><span className="font-bold">Property Selector</span> {metaData}</div>
            <span className="cursor-pointer hover:text-red-600" onClick={() => props.onRemove(props.id)}><Tooltip title='End me, quick!'><HighlightOffIcon /></Tooltip></span>
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input placeholder="Input expression here to map() on array or get only a property of an object or map to new array of object. Ex: 'x => x.followers' or 'x => x.name' or 'x => ({name: x.name})" onChange={debouncedOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea readOnly placeholder="Output goes here 👉" style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
}