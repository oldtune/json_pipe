import React, { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type FilterOperatorProps = {
    input?: any[];
} & OperatorProps;

export const FilterOperator = React.memo((props: FilterOperatorProps) => {
    const [expression, setFilterExpression] = useState({ str: "", func: null });

    const output = useMemo(() => {
        if (expression.func && props.input) {
            try {
                const result = props.input.filter(expression.func);
                return result;
            }
            catch (err) {
                return [];
            }
        }
    }, [expression, props.input]);

    useEffect(() => {

    }, [output, props.input]);

    const handleOnChange = (e: any) => {
        try {
            const newExpression = eval(e.target.value);
            if (newExpression) {
                setFilterExpression({ str: e.target.value, func: newExpression });
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

    return <div className="flex gap-2 p-5 flex-wrap flex-col bg-lime-600">
        <div>
            Filter Operator
        </div>
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
});