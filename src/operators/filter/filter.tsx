export type FilterOperatorProps = {
    expression: string;
}
export const FilterOperator: React.FC = () => {
    return <div className="flex grow gap-2 p-5 flex-wrap flex-col bg-lime-600">
        <div>
            Filter Operator
        </div>
        <div className="gap-2 flex flex-col">
            <div>Input expression</div>
            <input />
        </div>
        <div className="flex flex-col gap-2">
            <div>Output</div>
            <div>Brief output here</div>
            <div><textarea /></div>
        </div>
    </div>
}