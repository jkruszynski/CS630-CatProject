import {Box, Card, CardContent, Grid, GridListTileBar, Table, Typography} from "@material-ui/core";
import catpic from "../assets/cat.jpeg";
import SearchComponent from "./SearchComponent";

export default function SearchPage() {
    return (
        <div style={{ width: '150px', height: '300px', padding: '15px' }}>
            {/*<Card>*/}
            {/*    <CardContent style={{ padding: '10px', alignContent: "center", display: "flex"}}>*/}
            {/*        <Grid style={{ alignContent: "center"}}>*/}
            {/*            <img src={catpic} alt={'cat'} height='130px' width='130px'/>*/}
            {/*            <Typography style={{ alignContent: 'center' }}>House Cat</Typography>*/}
            {/*        </Grid>*/}
            {/*    </CardContent>*/}
            {/*</Card>*/}
            <SearchComponent/>
        </div>
    )
}