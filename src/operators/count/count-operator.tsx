import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { getMetaData } from "../../helpers/object-metadata";
import { OperatorProps } from "../../types/operator-props";

export type CountOperatorProps = {

} & OperatorProps;

export const CountOperator = React.memo((props: CountOperatorProps) => {
    const [expression, setExpression] = useState<{ str: string, func: any }>({ str: "", func: null });

    const output = useMemo(() => {
        if (expression.func) {
            try {
                return props.input.length;
            }
            catch (err) {
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

    const metaData = useMemo(() => {
        return getMetaData(output);
    }, [output]);

    const debouncedOnChange = useCallback(timeDebounce((event: any) => {
        handleOnChange(event);
    }), []);

    return <div className="flex bg-gray-300 p-5 flex-col gap-2 border-solid rounded mb-3">
        <div className="flex flex-row justify-between">
            <div><span className="font-bold">Count</span> {metaData}</div>
            <span className="cursor-pointer hover:text-red-600"><Tooltip title='End me, quick!'><HighlightOffIcon /></Tooltip></span>
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input placeholder="Input an expression here 👉, Ex: x => x.students" onChange={debouncedOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea placeholder="Output goes here 👉" readOnly style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
}
);