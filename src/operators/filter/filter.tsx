import React, { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { getMetaData } from "../../helpers/object-metadata";
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
        props.onOutputChanged(output, props.id);
    }, [expression, props.input]);

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
        if (output) {
            const result = JSON.stringify(output);
            return result;
        }
        return "";
    }, [output]);

    const metaData = useMemo(() => {
        return getMetaData(output);
    }, [output]);

    const debouncedOnChange = useCallback(timeDebounce((event: any) => {
        handleOnChange(event);
    }), []);

    return <div className="flex gap-2 p-5 flex-wrap flex-col bg-gray-300 border-solid rounded mb-3">
        <div>
            <span className="font-bold">Filter Operator</span> {metaData}
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input placeholder="Input expression here. Ex: x=>x.name =='Harry Spotter'" onChange={debouncedOnChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea placeholder="Ouput an array here 👉" readOnly style={{ minWidth: '100%' }} value={outputString} /></div>
        </div>
    </div>
});