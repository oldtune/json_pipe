import React, { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type CountOperatorProps = {

} & OperatorProps;

export const CountOperator = React.memo((props: CountOperatorProps) => {
    const [expression, setExpression] = useState<{ str: string, func: any }>({ str: "", func: null });

    const output = useMemo(() => {
        if (expression.func && props.input) {
            try {
                return props.input.length;
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

    const debouncedOnChange = useCallback(timeDebounce((event: any) => {
        handleOnChange(event);
    }), []);

    return <div className="flex bg-green-200 p-5 flex-col gap-2">
        <div><h3>Count</h3></div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input onChange={debouncedOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea readOnly style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
}
);