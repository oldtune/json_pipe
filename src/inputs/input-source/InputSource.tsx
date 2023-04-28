export const InputSource: React.FC = () => {
    return <div className="flex grow bg-red-200 p-5 flex-col gap-2">
        <div><h3>Json Input</h3></div>
        <div className="flex json-input-wrapper grow">
            <textarea rows={10} className=" p-3 json-input flex grow rounded-lg"></textarea>
        </div>
    </div>
}