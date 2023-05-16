
export type OperatorProps = {
    //input could be anything, string or [] or {} whatever
    id: number;
    input?: any;
    //from child to parent or operator to list
    // triggerReEvaluate: (output: any) => void;
    onOutputChanged: (output: any, id: number) => void;
};