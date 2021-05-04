import {Box, Card, CardContent, Grid, GridListTileBar, Table, Typography} from "@material-ui/core";
import catpic from "../assets/cat.jpeg";
import {FC} from "react";

export type BreedCardProps = {
    breedData?: any
};

export const BreedCard: FC<BreedCardProps> = ({ breedData = {} }) => {
    return (
        <div style={{ width: '150px', padding: '15px' }}>
            <Card>
                <CardContent style={{ padding: '10px', alignContent: "center", display: "flex"}}>
                        <Grid style={{ alignContent: "center"}}>
                            <img src={breedData.image} alt={'cat'} height='130px' width='130px'/>
                            <Typography style={{ alignContent: 'center' }}>{breedData.breed}</Typography>
                        </Grid>
                </CardContent>
            </Card>
        </div>
    )
}