import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { CardType } from "../types/card-type";
import { OperatorType } from "../types/operator-type";
import { SelectPipeCard } from "./select-pipe-card";
export type SelectPipeDialogProps = {
    open: boolean;
    handleClose: (operatorType?: OperatorType) => void;
    onSelected: () => void;
}

const AvailableCards: CardType[] = [
    {
        id: 1, name: "Input", description: "This lets you input json",
        image: "", type: OperatorType.Input
    },
    {
        id: 2, name: "Filter", description: "Filter",
        image: "", type: OperatorType.Filter
    },
    {
        id: 3, name: "Property Selector", description: "Select property or map",
        image: "", type: OperatorType.PropertySelect
    },
    // {
    //     id: 4, name: "Output", description: "Output",
    //     image: "", type: OperatorType.Output
    // }
];

export const SelectPipeDialog: React.FC<SelectPipeDialogProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedCardId, setSelectedCard] = useState<number>();

    const [cardSource, setCardSource] = useState([
        ...AvailableCards
    ]);

    const onClick = (cardId: number) => {
        setSelectedCard(cardId);
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    const getCardTypeById = (id: number) => {
        return AvailableCards.filter(x => x.id === id)[0]?.type;
    }

    const handleClose = () => {
        cancelSelection();
        props.handleClose();
    };

    const handleOnCloseWithSelection = () => {
        if (selectedCardId) {
            const cardType = getCardTypeById(selectedCardId);
            props.handleClose(cardType);
            cancelSelection();
        }
    };

    const cancelSelection = () => {
        // card with id 0 doesn't exist => no card is highlighted
        setSelectedCard(0);
    }

    const cards = cardSource.map(card => <Grid2 xs={3} sx={{ display: "flex" }}><SelectPipeCard description={card.description}
        title={card.name}
        id={card.id}
        key={card.id}
        selected={card.id === selectedCardId}
        onClick={(id) => onClick(id)} />
    </Grid2>);

    return (<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose operator</DialogTitle>
        <DialogContent>
            <Grid2 container spacing={1}>
                {cards}
            </Grid2>
        </DialogContent>
        <DialogActions>
            <Button disabled={!selectedCardId} onClick={handleOnCloseWithSelection}>Ok</Button>
        </DialogActions>
    </Dialog >);
};