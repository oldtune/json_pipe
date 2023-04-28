export const RestSource: React.FC = () => {
    return <div className="flex grow flex-wrap flex-col basis-full">
        <div>
            <label>Source</label>
            <input />
            <label>Method</label>
            <select>
                <option>GET</option>
            </select>
        </div>
        <div>Output</div>
    </div>
}