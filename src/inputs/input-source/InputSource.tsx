import { OperatorProps } from "../../types/operator-props";

export type InputSourceProps = {

} & OperatorProps;

export const InputSource: React.FC<InputSourceProps> = (props) => {
    const onChange = (event: any) => {
        props.triggerReEvaluate(event.target.value);
    }
    return <div className="flex bg-red-200 p-5 flex-col gap-2">
        <div><h3>Json Input</h3></div>
        <div className="flex json-input-wrapper grow">
            <textarea onChange={($event) => onChange($event)} rows={10} className=" p-3 json-input flex grow rounded-lg"></textarea>
        </div>
    </div>
}