import { OperatorType } from "./operator-type";

//name CardType to avoid collision with mui Card
export type CardType = {
    id: number;
    name: string;
    description: string;
    image: string;
    type: OperatorType;
};