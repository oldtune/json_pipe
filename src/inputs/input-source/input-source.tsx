import { useCallback } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type InputSourceProps = {
} & OperatorProps;

export const InputSource = (props: InputSourceProps) => {
    const onChange = (event: any, onOutputChanged: any) => {
        const currentInput = event.target.value;
        try {
            if (currentInput) {
                const currentValue = JSON.parse(currentInput);
                onOutputChanged(currentValue, props.id);
            }
        }
        catch (err) {
            //ignore here
        }
    };

    const debouncedOnChange = useCallback(timeDebounce((event: any, onOutputChanged: any) => {
        onChange(event, onOutputChanged);
    }), []);

    return <div className="flex bg-red-200 p-5 flex-col gap-2">
        <div><h3>Json Input</h3></div>
        <div className="flex json-input-wrapper grow">
            <textarea onChange={($event) => debouncedOnChange($event, props.onOutputChanged)} rows={10} className=" p-3 json-input flex grow rounded-lg"></textarea>
        </div>
    </div>
};