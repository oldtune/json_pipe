import { ReactNode } from "react";
import { OperatorType } from "./operator-type";

export type Operator = {
    key: string; //use formatId
    id: number;
    input: any; //hold object
    output: any; //hold object
    type: OperatorType;
    element: ReactNode;
};