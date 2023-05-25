import { useCallback, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { OperatorProps } from "../../types/operator-props";

export type InputSourceProps = {
} & OperatorProps;

export const InputSource = (props: InputSourceProps) => {
    const [metaData, setMetadata] = useState('');
    const onChange = (event: any, onOutputChanged: any) => {
        const currentInput = event.target.value;
        try {
            if (currentInput) {
                const currentValue = JSON.parse(currentInput);
                onOutputChanged(currentValue, props.id);

                if (Array.isArray(currentValue)) {
                    setMetadata(`[] - ${currentValue.length} items`);
                }
                else {
                    setMetadata("{} - Object");
                }
            }
        }
        catch (err) {
            //ignore here
        }
    };

    const debouncedOnChange = useCallback(timeDebounce((event: any, onOutputChanged: any) => {
        onChange(event, onOutputChanged);
    }), []);

    return <div className="flex bg-gray-200 p-5 flex-col gap-2 rounded border-solid ">
        <div>
            <span className="font-bold">Json text input</span> {metaData}
        </div>
        <div className="flex json-input-wrapper grow">
            <textarea placeholder='Input goes here 👉: {"Choose Kindness":"❤️"}' onChange={($event) => debouncedOnChange($event, props.onOutputChanged)} rows={10} className=" p-3 json-input flex grow rounded-lg outline-none "></textarea>
        </div>
    </div>
};