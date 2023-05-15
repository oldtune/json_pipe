
export type OperatorProps = {
    //input could be anything, string or [] or {} whatever
    input?: any;
    //from child to parent or operator to list
    triggerReEvaluate: (output: any) => void;
};