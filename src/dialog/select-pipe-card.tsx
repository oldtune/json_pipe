import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import "./select-pipe-card.css";

export type SelectPipeCardProps = {
    selected: boolean;
    onClick: (id: number) => void;
    id: number;
    title: string;
    description: string;
    image: string;
};

export const SelectPipeCard: React.FC<SelectPipeCardProps> = (props) => {
    return <Card sx={{ maxWidth: 345, border: props.selected ? "1px solid #FFD700" : "", display: "flex", alignSelf: "stretch" }} onClick={() => props.onClick(props.id)}>
        <CardActionArea>
            <CardMedia sx={{ maxHeight: "200px" }}
                component="img"
                image={props.image}
                alt="Operator"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
};