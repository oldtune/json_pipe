import { OperatorProps } from "../../types/operator-props";

export type InputSourceProps = {
    operatorCount: number;
} & OperatorProps;

export const InputSource = (props: InputSourceProps) => {
    const onChange = (event: any) => {
        const currentInput = event.target.value;
        try {
            debugger
            const output = JSON.parse(currentInput);
            props.onOutputChanged(output, props.id);
        }
        catch (err) {
            //ignore here
        }
    };

    // const debouncedOnChange = useCallback(timeDebounce((event: any) => {
    //     onChange(event);
    // }), []);

    return <div className="flex bg-red-200 p-5 flex-col gap-2">
        <div><h3>Json Input</h3></div>
        <div className="flex json-input-wrapper grow">
            <textarea onChange={($event) => onChange($event)} rows={10} className=" p-3 json-input flex grow rounded-lg"></textarea>
        </div>
    </div>
};