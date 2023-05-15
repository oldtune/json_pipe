export enum PipeElementType {
    Pipe,
    Operator
}

export const formatKey = (id: number, type: PipeElementType): string => {
    if (type === PipeElementType.Operator) {
        return `operator_${id}`;
    }

    return `pipe_${id}`;
}