import { ReactNode } from "react";
import { OperatorType } from "./operator-type";

export type Operator = {
    id: string; //use formatId
    input: any; //hold object
    output: any; //hold object
    type: OperatorType;
    element: ReactNode;
};