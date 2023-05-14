import { Operator } from "./operator";

export type Pipe = {
    operators: Operator[];
    id: number;
    //could only be [] or {} 
    currentValue: any;
};