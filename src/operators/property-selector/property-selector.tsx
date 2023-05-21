import { useCallback, useEffect, useMemo, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type PropertySelectorOperatorProps = {

} & OperatorProps;
export const PropertySelector: React.FC<PropertySelectorOperatorProps> = (props) => {
    const [expression, setExpression] = useState<{ str: string, func: any }>({ str: "", func: null });

    const output = useMemo(() => {
        debugger
        if (expression.func && props.input) {
            try {
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
    }, [output, props]);

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

    return <div className="flex bg-yellow-200 p-5 flex-col gap-2">
        <div><h3>Property Selector</h3></div>
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