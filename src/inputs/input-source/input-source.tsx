import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from '@mui/material';
import { useCallback, useState } from "react";
import { timeDebounce } from "../../helpers/debounce";
import { getMetaData } from "../../helpers/object-metadata";
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
                const currentValueMetaData = getMetaData(currentValue);
                setMetadata(currentValueMetaData);
            }
        }
        catch (err) {
            //ignore here
        }
    };

    const debouncedOnChange = useCallback(timeDebounce((event: any, onOutputChanged: any) => {
        onChange(event, onOutputChanged);
    }), []);

    return <div className="flex bg-gray-300 px-5 pb-5 pt-2 flex-col gap-2 rounded border-solid mb-3">
        <div className="flex flex-row justify-between">
            <div><span className="font-bold">Json text input</span> {metaData}</div>
            <span className="cursor-pointer hover:text-red-600" onClick={() => props.onRemove(props.id)}><Tooltip title='End me, quick!'><HighlightOffIcon /></Tooltip></span>
        </div>
        <div className="flex json-input-wrapper grow">
            <textarea placeholder='Input goes here 👉: {"Choose Kindness":"❤️"}' onChange={($event) => debouncedOnChange($event, props.onOutputChanged)} rows={10} className=" p-3 json-input flex grow rounded-lg outline-none "></textarea>
        </div>
    </div>
};