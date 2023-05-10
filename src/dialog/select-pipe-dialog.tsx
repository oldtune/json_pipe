import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { InputSource } from "../inputs/input-source/InputSource";
import { CardType } from "../types/card-type";
import { SelectPipeCard } from "./select-pipe-card";
export type SelectPipeDialogProps = {
    open: boolean;
    handleClose: () => void;
    onSelect: () => void;
}

const AvailableCards: CardType[] = [
    {
        id: 1, name: "Input", description: "This lets you input json",
        image: "", element: <InputSource />
    }];

export const SelectPipeDialog: React.FC<SelectPipeDialogProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardType>();
    const [cardSource, setCardSource] = useState([
        ...AvailableCards
    ]);

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const cards = cardSource.map(card => <SelectPipeCard />);

    return (<Dialog open={open} onClose={props.handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Please pick an Operator
            </DialogContentText>
            <div className="grid">

            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>Ok</Button>
            <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>);
};