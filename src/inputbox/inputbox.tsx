
export type InputBoxProps = {
    content: any
    id: any;
};

export default function InputBox(props: InputBoxProps) {
    return (
        <div className="basis-full flex flex-grow bg-stone-600">{props.content}</div>
    );
}